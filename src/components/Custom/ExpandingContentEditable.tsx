import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import DOMPurify from "dompurify";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { highlightSixLetterAndMoreWords } from "@/lib/utils";

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
  //const [cursorPosition, setCursorPosition] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    }, 700),
    []
  );

  const getGlobalCursorPosition = (contentEditableDiv) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return 0;

    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(contentEditableDiv);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    return preCaretRange.toString().length;
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    adjustContentEditableHeight();
    const newContent = e.target.innerText;
    console.log("InnerText: ", newContent);
    console.log("Value: ", value);
    //Get and set current cursor position
    const selection = window.getSelection();
    console.log("Selection: ", selection);
    //const cursorPos = selection?.focusOffset || 0;
    const cursorPos = getGlobalCursorPosition(contentEditableRef.current);
    console.log("CursorPos: ", cursorPos);

    debouncedUpdate(newContent, cursorPos);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const processContent = useCallback(
    (text: string, cursorPos: number) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      const sanitizedContent = DOMPurify.sanitize(text);
      const finalContent = highlightSixLetterAndMoreWords(sanitizedContent);

      onChange(finalContent);

      //The following restores cursor position after the content is processed
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
          // console.log("Current position:", cursorPos);
          // console.log("CurrentNode: ", currentNode);
          // console.log("CurrentoffSet: ", currentOffset);
          if (currentNode.nodeType === Node.TEXT_NODE) {
            //If cursor position falls within the text node, set range for start and end otherwise add length of the content to offset
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
      }, 0);
    },
    [onChange]
  );

  const handlePaste = (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    selection.deleteFromDocument();
    const range = selection.getRangeAt(0);
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
    handleInput(event);
  };

  //Cleanup any timeouts from processText on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const showCursorPosition = () => {
    //console.log("--------------------------------");
    const selection = window.getSelection();
    //console.log("Selection: ", selection);
    const cursorPos = getGlobalCursorPosition(contentEditableRef.current);
    //console.log("CursorPos from Click: ", cursorPos);
    //console.log("--------------------------------");
  };

  return (
    <ScrollArea className="w-full">
      <div
        ref={contentEditableRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onClick={showCursorPosition}
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
