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
