// Define the structure for a single chat message
export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

// Define the structure for a single chat entry
export interface ChatEntry {
  id: string;
  chatID: string;
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
  type:
    | "character"
    | "location"
    | "lore"
    | "guidelines"
    | "tropes"
    | "other"
    | string;

  // The title or name of the entry
  title: string;

  // Tags or labels used for filtering
  tags?: string | string[];

  // Aliases (array of names)
  alias?: string | string[];

  // Description of the entry
  description: string;

  // Notes about the entry
  notes?: string;

  // Array of additional content
  additions?: Addition[];
}

export interface EntryPlusID {
  id: string;
  content: Entry;
}

interface Collection<T extends string> {
  typelist: T[];
  categories: {
    [K in T]: [{ id: string; content: Entry }];
  };
}

/*
const sampleData: Collection<"character" | "location" | "lore" | "guidelines" | "tropes" | "other"> = {
  typeList: ["character", "location", "lore", "guidelines", "tropes", "other"],
  categories: {
    character: [
      {
        id: "character1",
        content: {
          type: "character",
          title: "Character 1",
          tags: ["antagonist"],
          aliases: ["Alias 1", "Alias 2", "Alias 3"],
          description: "Description of character 1",
          notes: "Additional notes about character 1",
          additions: []
        }
      },
      {
        id: "character2",
        content: {
          type: "character",
          title: "Character 2",
          tags: ["protagonist"],
          aliases: ["Alias 1", "Alias 2", "Alias 3"],
          description: "Description of character 2",
          notes: "Additional notes about character 2",
          additions: []
        }
      }
    ],
    location: [
      {
        id: "location1",
        content: {
          type: "location",
          title: "Location 1",
          tags: ["ocean"],
          aliases: ["Alias 1", "Alias 2", "Alias 3"],
          description: "Description of location 1",
          notes: "Additional notes about location 1",
          additions: []
        }
      }
    ],
    lore: [
      {
        id: "lore1",
        content: {
          type: "lore",
          title: "Lore 1",
          tags: ["myth"],
          aliases: ["Alias 1", "Alias 2", "Alias 3"],
          description: "Description of lore 1",
          notes: "Additional notes about lore 1",
          additions: []
        }
      }
    ],
    guidelines: [
      {
        id: "guidelines1",
        content: {
          type: "guidelines",
          title: "Guideline 1",
          tags: ["style"],
          aliases: ["Alias 1", "Alias 2", "Alias 3"],
          description: "Description of guideline 1",
          notes: "Additional notes about guideline 1",
          additions: []
        }
      }
    ],
    tropes: [
      {
        id: "tropes1",
        content: {
          type: "tropes",
          title: "Trope 1",
          tags: ["cliché"],
          aliases: ["Alias 1", "Alias 2", "Alias 3"],
          description: "Description of trope 1",
          notes: "Additional notes about trope 1",
          additions: []
        }
      }
    ],
    other: [
      {
        id: "other1",
        content: {
          type: "other",
          title: "Other 1",
          tags: ["miscellaneous"],
          aliases: ["Alias 1", "Alias 2", "Alias 3"],
          description: "Description of other 1",
          notes: "Additional notes about other 1",
          additions: []
        }
      }
    ]
  }
};


*/
