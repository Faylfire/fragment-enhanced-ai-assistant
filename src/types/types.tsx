// Define the structure for a single chat message
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Define the structure for a single chat entry
export interface ChatEntry {
  id: string;
  chatTitle: string;
  chatContent: ChatMessage[];
}

// Define the ChatList as an array of ChatEntry objects
export type ChatList = ChatEntry[];


//Define the structure for Additions to the collection Entries
export interface Addition {
  sceneOrder: number;
  content: string;
}

// Define the main entry type
export interface Entry {
  // The type of collection the entry belongs to
  collectionType: 'character' | 'location' | string;

  // The title or name of the entry
  title: string;

  // Tags or labels used for filtering
  tags: string[];

  // Aliases (array of names)
  aliases: string[];

  // Description of the entry
  description: string;

  // Notes about the entry
  notes: string;

  // Array of additional content
  additions: Addition[];
}