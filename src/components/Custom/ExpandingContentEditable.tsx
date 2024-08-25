import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import DOMPurify from "dompurify";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ExpandingContentEditableProps {
  placeholder?: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
  minRows?: number;
  maxRows?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

// Custom debounce function
const debounce = (func, delay: number) => {
  let timeoutId: string | number | NodeJS.Timeout | undefined;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const ExpandingContentEditable: React.FC<
  ExpandingContentEditableProps
> = ({
  placeholder,
  value,
  className,
  onChange,
  minRows = 1,
  maxRows = 10,
  onKeyDown,
}) => {
  const [rows, setRows] = useState(minRows);
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  //useEffect running the code to create an automatically high adjusting input div with contentEditable
  useEffect(() => {
    adjustContentEditableHeight();
  }, [value]);

  const adjustContentEditableHeight = () => {
    const div = contentEditableRef.current;
    if (div) {
      // Reset height to single row
      div.style.height = `${minRows * 24 + 16}px`;

      // Calculate the new height
      const lineHeight = 24; // Assuming line height of 24px
      const paddingTop = 8; // Assuming padding of 8px
      const paddingBottom = 8;
      const newHeight = div.scrollHeight - paddingTop - paddingBottom;

      // Calculate new rows
      const newRows = Math.max(
        minRows,
        Math.min(Math.ceil(newHeight / lineHeight), maxRows)
      );

      // Set the new height and rows
      div.style.height = `${
        newRows * lineHeight + paddingTop + paddingBottom
      }px`;
      setRows(newRows);
    }
  };

  const debouncedUpdate = useCallback(
    debounce((value, cursorPos) => {
      processContent(value, cursorPos);
    }, 300),
    []
  );

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.target.innerText;
    console.log("InnerText: ", newContent);
    console.log("Value: ", value);
    //Get and set current cursor position
    const selection = window.getSelection();
    const cursorPos = selection?.focusOffset || 0;
    console.log("CursorPos: ", cursorPos);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    debouncedUpdate(newContent, cursorPos);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const processContent = useCallback(
    (text: string, cursorPos: number) => {
      const sanitizedContent = DOMPurify.sanitize(text);
      const words = sanitizedContent.split(/\s+/);

      const processedText = words
        .map((word) => {
          if (word.length > 5) {
            return `<span class="cursor-pointer underline text-blue-600">${word}</span>`;
          }
          return word;
        })
        .join(" ");

      //Add a space to the end of the processed text because the split and search removed spaces
      const finalContent = processedText + " ";

      onChange(finalContent);

      timeoutRef.current = setTimeout(() => {
        if (text === "") {
          console.log("early timeout return");
          return;
        }

        const contentEditableDiv = contentEditableRef.current;
        if (!contentEditableDiv) {
          console.log("early timeout return position 2");
          return;
        }

        const selection = window.getSelection();
        const range = document.createRange();

        let currentNode = contentEditableDiv.firstChild;
        let currentOffset = 0;

        while (currentNode) {
          if (currentNode.nodeType === Node.TEXT_NODE) {
            if (currentOffset + currentNode.textContent.length >= cursorPos) {
              range.setStart(currentNode, cursorPos - currentOffset);
              range.setEnd(currentNode, cursorPos - currentOffset);
              break;
            }
            currentOffset += currentNode.textContent.length;
          } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
            const spanText = currentNode.textContent;
            if (currentOffset + spanText.length >= cursorPos) {
              const textNode = currentNode.firstChild;
              range.setStart(textNode, cursorPos - currentOffset);
              range.setEnd(textNode, cursorPos - currentOffset);
              break;
            }
            currentOffset += spanText.length;
          }
          currentNode = currentNode.nextSibling;
        }

        selection.removeAllRanges();
        selection.addRange(range);
        timeoutRef.current = null;
      }, 10);
    },
    [onChange]
  );

  const handlePaste = (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  //Cleanup any timeouts from processText on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <ScrollArea className="w-full">
      <div
        ref={contentEditableRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        className={cn(
          "resize-none overflow-y-auto w-full p-2 border rounded font-semibold text-background bg-muted-foreground placeholder-background/60",
          className
        )}
        style={{
          maxHeight: `${maxRows * 24 + 16}px`,
          minHeight: `${minRows * 24 + 16}px`,
        }}
        dangerouslySetInnerHTML={{ __html: value || placeholder || "" }}
      />
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};
