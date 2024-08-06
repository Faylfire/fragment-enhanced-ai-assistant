import OpenAI from "openai";
//import { createClient } from "@supabase/supabase-js";

/** OpenAI config 
if (!import.meta.env.VITE_OPENAI_API_KEY)
  throw new Error("OpenAI API key is missing or invalid.");

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
*/

/** LMStudio config */
if (!import.meta.env.VITE_LM_STUDIO_API_KEY)
  throw new Error("LMStudio API key is missing or invalid.");

export const lmclient = new OpenAI({
  apiKey: import.meta.env.VITE_LM_STUDIO_API_KEY,
  baseURL: "http://localhost:1234/v1",
  dangerouslyAllowBrowser: true,
});
