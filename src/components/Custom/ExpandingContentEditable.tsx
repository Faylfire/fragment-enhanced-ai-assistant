import React, { useState, useRef, useEffect } from "react";
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

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    //const newValue = e.currentTarget.innerText;
    //onChange(processContent(e.currentTarget));

    //onChange(newValue);
    const newContent = e.target.innerHTML;
    const sanitizedContent = DOMPurify.sanitize(newContent);
    //const sanitizedContent = DOMPurify.sanitize(newContent);
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const start = range.startOffset;
    const end = range.endOffset;
    onChange(processContent(sanitizedContent));

    setTimeout(() => {
      if (newContent === "") {
        return;
      }
      const newRange = document.createRange();
      newRange.setStart(contentEditableRef.current.childNodes[0], start);
      newRange.setEnd(contentEditableRef.current.childNodes[0], end);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const processContent = (text: String) => {
    const processedText = text;
    //const words = text.split(/\s+/);
    // const processedText = words
    //   .map((word) => {
    //     // Replace this with your actual matching logic
    //     if (word.length > 5) {
    //       return `<span class="cursor-pointer underline text-blue-600">${word}</span>`;
    //     }
    //     return word;
    //   })
    //   .join(" ");
    return processedText;
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

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
