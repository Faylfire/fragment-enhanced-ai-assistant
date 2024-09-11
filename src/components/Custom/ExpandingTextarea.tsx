import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ExpandingTextareaProps {
  placeholder?: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
  minRows?: number;
  maxRows?: number;
}

export const ExpandingTextarea: React.FC<ExpandingTextareaProps> = ({
  placeholder,
  value,
  className,
  onChange,
  minRows = 1,
  maxRows = 10,
  onKeyDown,
}) => {
  const [rows, setRows] = useState(minRows);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to single row
      textarea.style.height = `${minRows * 24 + 16}px`;
      console.log("Adjusting textarea height");
      // Calculate the new height
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
      const paddingTop = parseInt(getComputedStyle(textarea).paddingTop);
      const paddingBottom = parseInt(getComputedStyle(textarea).paddingBottom);
      const newHeight = textarea.scrollHeight - paddingTop - paddingBottom;

      // Calculate new rows
      const newRows = Math.max(
        minRows,
        Math.min(Math.floor(newHeight / lineHeight), maxRows)
      );

      // Set the new height and rows
      textarea.style.height = `${
        newRows * lineHeight + paddingTop + paddingBottom
      }px`;
      setRows(newRows);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    onKeyDown(e);
  };

  return (
    <textarea
      ref={textareaRef}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      rows={rows}
      className={cn(
        "resize-none overflow-y w-full p-2 border rounded font-semibold text-background bg-muted-foreground placeholder-background/60",
        className
      )}
    />
  );
};
