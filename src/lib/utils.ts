import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

//Tailwind function that merges clsx and twMerge to allow more proper merging and overwriting of styles when using shadcn and such ui components
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//capitalize the first letter of a string
export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getFirstSentence(text) {
  // Regular expression to match the first sentence
  const match = text.match(/^.*?[.!?](?:\s|$)/);
  let sentence = match ? match[0].trim() : text;

  // Check if the sentence is longer than 280 characters
  if (sentence.length > 280) {
    // Truncate to 277 characters and add '...'
    sentence = sentence.substring(0, 277) + "...";
  }

  return sentence;
}

export function simpleIsEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

//----------------------------------------------------------------
//The following set of functions filters for words that are in
function splitTextOnSpace(text) {
  // Split text on whitespace
  const words = text.split(/\s+/);
  // Define punctuation pattern

  return words;
}

function splitWordWithPunctuation(text) {
  const pattern = /(["',.:;?!(){}\[\]]+)|([\w']+)/g;
  let parts = [];
  let match;
  while ((match = pattern.exec(text)) !== null) {
    if (match[1]) {
      parts.push(match[1]); // Punctuation
    } else if (match[2]) {
      parts.push(match[2]); // Word
    }
  }
  return parts;
}

function shouldHighlight(word: string): boolean {
  //This function is the logic for if a word should be highlighted
  return word.trim().length > 5;
}

function testWordParts(parts) {
  return parts
    .map((part) => {
      if (/[\w']+/.test(part)) {
        //Logic for checking if the word should be wrapped in a span
        if (shouldHighlight(part)) {
          return `<span class="cursor-pointer underline text-blue-600">${part}</span>`;
        }
      }
      return part;
    })
    .join("");
}

function wrapWordsInSpan(words) {
  const nbsp = String.fromCharCode(160);
  const processedWords = words
    .map((word) => {
      return testWordParts(splitWordWithPunctuation(word));
    })
    .join(" ")
    .trim();

  const finalContent = `${processedWords}${nbsp}`;
  return finalContent;
}

export function highlightSixLetterAndMoreWords(text) {
  const words = splitTextOnSpace(text);
  return wrapWordsInSpan(words);
}

export function highlightKeywordsFromCollection(
  text: string,
  keywordColors = {
    quick: "text-red-600",
    fox: "text-blue-600",
    "The Orb": "text-indigo-600",
    "Jarn Smith": "text-green-600",
  }
) {
  const nbsp = String.fromCharCode(160);
  if (text?.length > 0) {
    const highlightedText = highlightKeywords(text, keywordColors).trim();
    const finalContent: string = `${highlightedText}${nbsp}`;
    return finalContent;
  }
  return "";
}

function highlightKeywordsChineseSupport(
  text: string,
  keywordColors: Record<string, string>
) {
  //This functionality requires addtional work, does not detect chinese in the middle of a sentence only at beginnings
  const keywords = Object.keys(keywordColors);
  const pattern = new RegExp(
    `(${keywords.map(escapeRegExp).join("|")})|([\\u4e00-\\u9fff]+)`,
    "gu"
  );
  return text.replace(pattern, (match) => {
    const color = keywordColors[match];
    if (color) {
      return `<span class="cursor-pointer underline decoration-dotted font-bold ${color}">${match}</span>`;
    }
    return match;
  });
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightKeywords(text, keywordColors) {
  const keywords = Object.keys(keywordColors);
  const pattern = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
  return text.replace(pattern, (match) => {
    const color = keywordColors[match];
    const styles = `cursor-pointer underline decoration-dotted font-bold ${color}`;
    return `<span class="${styles}">${match}</span>`;
  });
}
