import { initializeApp } from "firebase/app";
import { ref, push, onValue, remove, update, set } from "firebase/database";
import { database } from "@/services/firebaseAPI";
import { Entry, EntryPlusID } from "@/types/types";

//const database = getFirebase("user", "pass");
export const collectionName = "fragmentCollection";
const typeListRef = ref(database, `${collectionName}/typeList`);
const contentRef = ref(database, `${collectionName}/content`);
const chatsRef = ref(database, `${collectionName}/chats`);

/*
onValue(typeListRef, (snapshot) => {
  const types = snapshot.val();
  console.log(types); // ["article", "video", "podcast", "image"]
});

// To get content for a specific type (e.g., articles)
const articlesRef = ref(database, `${collectionName}/content/article`);
onValue(articlesRef, (snapshot) => {
  const articles = snapshot.val();
  console.log(articles); // Array of article objects
});
*/

/* Sample Json Object for Collections
const sampleCollection = {
  "contentCollection": {
    "typeList": [
      "article",
      "video",
      "podcast",
      "image"
    ],
    "content": {
      "article": [
        {
          "id": "a1",
          "title": "Introduction to Firebase",
          "author": "John Doe",
          "publishDate": "2024-08-08"
        },
        {
          "id": "a2",
          "title": "Advanced React Patterns",
          "author": "Jane Smith",
          "publishDate": "2024-08-07"
        }
      ],
      "video": [
        {
          "id": "v1",
          "title": "Firebase Tutorial",
          "duration": "10:30",
          "uploader": "TechChannel"
        }
      ],
      "podcast": [
        {
          "id": "p1",
          "title": "Web Development Trends 2024",
          "host": "Dev Talk Show",
          "length": "45:00"
        }
      ],
      "image": [
        {
          "id": "i1",
          "title": "Sunset Landscape",
          "photographer": "Nature Clicks",
          "resolution": "4K"
        }
      ]
    }
  }
}

*/

export function addCollectionEntry() {
  console.log("addCollectionEntry called this function is empty");
}

export function addTypeList() {
  //This section may be refactored into a Context.tsx file
  const wordSet = new Set([
    "character",
    "location",
    "lore",
    "guidelines",
    "tropes",
    "other",
  ]);
  //const sortedTypeList = [...wordSet].sort();
  const orderedTypeList = [
    "character",
    "location",
    "lore",
    "guidelines",
    "tropes",
    "other",
  ];
  //-------------------------------------------------------

  set(typeListRef, orderedTypeList);

  //NOTE: For testing purposes remove after development
  console.log("add types completed");
  onValue(typeListRef, (snapshot) => {
    if (snapshot.exists()) {
      const types = Object.entries(snapshot.val());
      console.log(types);
      for (let type of types) {
        console.log("type: " + type[1]);
      }
    } else {
      console.log("No types found");
    }
  });
}

//import { fetchEntries, updateEntry } from "./dataAccess";

export function fetchEntries() {
  const characterList: Entry[] = [
    {
      type: "character",
      title: "John Doe",
      tags: ["protagonist", "hero"],
      alias: ["JD", "The Unknown Man"],
      description: "A mysterious character with a hidden past.",
      notes: "Consider revealing his background in chapter 5.",
      additions: [
        { sceneOrder: 1, content: "John appears for the first time." },
        {
          sceneOrder: 3,
          content: "John reveals a crucial piece of information.",
        },
      ],
    },
    {
      type: "character",
      title: "Olivia Martini",
      tags: ["love-interest", "friend"],
      alias: ["OM", "The UnMan"],
      description: "A mysterious character with a hidden past.",
      notes: "Consider killing her over and over again",
      additions: [
        { sceneOrder: 1, content: "Olivia dies" },
        { sceneOrder: 3, content: "JOlivia dies again" },
      ],
    },
    {
      type: "character",
      title: "Jackson Lee",
      tags: ["side-character", "friend"],
      alias: ["JL", "The Known Man"],
      description: "Friend of the main character who knows",
      notes: "Consider revealing his background in chapter 6.",
      additions: [
        { sceneOrder: 2, content: "Appears for the first time to John" },
        {
          sceneOrder: 3,
          content: "John reveals a crucial piece of information to Jackson",
        },
      ],
    },
    {
      type: "character",
      title: "Lee Jack",
      tags: ["side-character", "friend"],
      alias: ["LJ", "The Man Knowing"],
      description: "The alter ego of Jackson Lee who knows he is the alter ego",
      notes: "He is the real jackson and jackson is the alter ego",
      additions: [
        { sceneOrder: 3, content: "Appears for the first time to John" },
        { sceneOrder: 4, content: "Lee is the one that kills Olivia" },
      ],
    },
  ];

  const locationList: Entry[] = [
    {
      type: "location",
      title: "Whispering Woods",
      tags: ["forest", "mysterious", "central"],
      alias: ["WW", "The Enchanted Forest", "Murmur Grove"],
      description:
        "A dense, misty forest known for its eerie whispers and shifting paths.",
      notes: "Key location for several plot twists and character revelations.",
      additions: [
        {
          sceneOrder: 1,
          content: "First appearance of the Whispering Woods in the story.",
        },
        {
          sceneOrder: 3,
          content: "A hidden clearing in the woods reveals an ancient secret.",
        },
      ],
    },
    {
      type: "location",
      title: "Crimson Cliffs",
      tags: ["coastal", "dangerous", "scenic"],
      alias: ["CC", "The Red Bluffs", "Bloodstone Precipice"],
      description: "Towering cliffs of red rock overlooking a turbulent sea.",
      notes: "Consider setting a dramatic confrontation scene here",
      additions: [
        {
          sceneOrder: 1,
          content: "Characters first view the Crimson Cliffs from a distance",
        },
        {
          sceneOrder: 3,
          content: "A perilous climb up the cliffs leads to a discovery",
        },
      ],
    },
    {
      type: "location",
      title: "Neon Nexus",
      tags: ["urban", "futuristic", "central"],
      alias: ["NN", "The Glowing City", "Luminous Metropolis"],
      description:
        "A bustling cyberpunk city filled with towering skyscrapers and neon lights.",
      notes: "Hub for technology and information gathering scenes.",
      additions: [
        {
          sceneOrder: 2,
          content: "Characters arrive in Neon Nexus for the first time",
        },
        {
          sceneOrder: 3,
          content: "A secret meeting takes place in a hidden neon-lit alley",
        },
      ],
    },
    {
      type: "location",
      title: "Echoing Caverns",
      tags: ["underground", "mysterious", "ancient"],
      alias: ["EC", "The Resonant Depths", "Whispering Caves"],
      description:
        "A vast network of underground caves known for their strange acoustic properties.",
      notes: "Potential for hidden civilizations or ancient artifacts",
      additions: [
        {
          sceneOrder: 3,
          content: "Characters discover the entrance to the Echoing Caverns",
        },
        {
          sceneOrder: 4,
          content: "An ancient message is deciphered from the cave echoes",
        },
      ],
    },
    {
      type: "location",
      title: "Floating Isles of Aether",
      tags: ["aerial", "magical", "archipelago"],
      alias: ["FI", "Sky Islands", "Celestial Archipelago"],
      description:
        "A chain of floating islands suspended in the sky, each with its own unique ecosystem.",
      notes:
        "Perfect setting for aerial battles or a quest to unite the fragmented sky kingdoms.",
      additions: [
        {
          sceneOrder: 5,
          content:
            "Characters first arrive on the lowest of the Floating Isles.",
        },
        {
          sceneOrder: 7,
          content:
            "A dramatic chase sequence across multiple floating islands.",
        },
      ],
    },
    {
      type: "location",
      title: "Chrono Citadel",
      tags: ["temporal", "ancient", "enigmatic"],
      alias: ["Ch", "The Timeless Fortress", "Eternity's Bastion"],
      description:
        "A massive structure where time flows differently in each room and corridor.",
      notes:
        "Use for time-bending puzzles and encounters with characters from different eras.",
      additions: [
        {
          sceneOrder: 6,
          content:
            "The party enters the Chrono Citadel, experiencing time dilation.",
        },
        {
          sceneOrder: 8,
          content:
            "A crucial item is found in a room where time flows backwards.",
        },
      ],
    },
    {
      type: "location",
      title: "Mirage Oasis",
      tags: ["desert", "illusion", "sanctuary"],
      alias: ["MO", "The Shimmering Haven", "Fata Morgana"],
      description:
        "A lush oasis in the heart of a scorching desert, known for its reality-bending properties.",
      notes:
        "Ideal for scenes involving deception, self-discovery, or hidden truths.",
      additions: [
        {
          sceneOrder: 4,
          content:
            "Characters stumble upon the Mirage Oasis after days in the desert.",
        },
        {
          sceneOrder: 9,
          content:
            "The true nature of the oasis is revealed, changing everything.",
        },
      ],
    },
  ];

  const sampleEntries: EntryPlusID[] = [
    {
      id: "char1",
      content: {
        type: "character",
        title: "Elara Moonwhisper",
        tags: ["protagonist", "elf", "mage"],
        alias: ["The Starlight Sorceress", "Lady of the Silver Grove"],
        description:
          "A wise and powerful elven mage with silvery hair and eyes that sparkle like starlight. Elara is known for her mastery of celestial magic and her deep connection to the natural world.",
        notes:
          "Elara's staff, the Moonbeam Scepter, is a family heirloom passed down through generations of her lineage.",
        additions: [
          {
            type: "quote",
            content:
              "Magic flows through all things. We need only learn to listen.",
          },
        ],
      },
    },
    {
      id: "char2",
      content: {
        type: "character",
        title: "Grimlock Ironheart",
        tags: ["supporting", "dwarf", "warrior"],
        alias: ["The Mountain's Fist", "Stonecrusher"],
        description:
          "A stout and sturdy dwarf warrior with a fiery red beard and arms like tree trunks. Grimlock is renowned for his unmatched strength and unwavering loyalty to his clan.",
        notes:
          "Grimlock carries a massive warhammer named 'Earthshaker', forged in the heart of a volcano.",
      },
    },
    {
      id: "loc1",
      content: {
        type: "location",
        title: "Crystalspire Citadel",
        tags: ["fortress", "magic", "landmark"],
        alias: ["The Shimmering Stronghold", "Mage's Haven"],
        description:
          "A towering fortress made entirely of enchanted crystal, rising high above the surrounding plains. The Crystalspire Citadel serves as both a defensive stronghold and the premier academy for magical studies in the realm.",
        notes:
          "The citadel changes color throughout the day, reflecting the position of the sun and moon.",
        additions: [
          {
            type: "landmark",
            content:
              "The Grand Arcanum - A vast library housing countless magical tomes and artifacts.",
          },
        ],
      },
    },
    {
      id: "loc2",
      content: {
        type: "location",
        title: "Whispering Woods",
        tags: ["forest", "mystical", "dangerous"],
        alias: ["The Murmuring Grove", "Forest of Secrets"],
        description:
          "An ancient forest shrouded in perpetual mist, where the trees seem to whisper forgotten secrets. The Whispering Woods is home to mysterious creatures and is said to hold powerful magic within its depths.",
        notes:
          "Travelers often report hearing voices or seeing visions of their past and future while traversing the woods.",
      },
    },
    {
      id: "char3",
      content: {
        type: "character",
        title: "Zephyr Swiftwing",
        tags: ["antagonist", "rogue", "shapeshifter"],
        alias: ["The Shadow Thief", "Mistress of Many Faces"],
        description:
          "A cunning and elusive shapeshifter with piercing golden eyes. Zephyr is a master of disguise and deception, known for her unparalleled skills in espionage and theft.",
        notes:
          "Zephyr possesses a magical amulet that enhances her shapeshifting abilities, allowing her to maintain forms for extended periods.",
      },
    },
  ];
  /*
      if ((id === "tags") | (id === "alias")) {
      value = value
        ? value
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== "")
        : [];
  */

  return sampleEntries;
}

export function getCharacterList() {
  const sampleEntries: EntryPlusID[] = [
    {
      id: "char1",
      content: {
        type: "character",
        title: "Elara Moonwhisper",
        tags: ["protagonist", "elf", "mage"],
        alias: ["The Starlight Sorceress", "Lady of the Silver Grove"],
        description:
          "A wise and powerful elven mage with silvery hair and eyes that sparkle like starlight. Elara is known for her mastery of celestial magic and her deep connection to the natural world.",
        notes:
          "Elara's staff, the Moonbeam Scepter, is a family heirloom passed down through generations of her lineage.",
        additions: [
          {
            type: "quote",
            content:
              "Magic flows through all things. We need only learn to listen.",
          },
        ],
      },
    },
    {
      id: "char2",
      content: {
        type: "character",
        title: "Grimlock Ironheart",
        tags: ["supporting", "dwarf", "warrior"],
        alias: ["The Mountain's Fist", "Stonecrusher"],
        description:
          "A stout and sturdy dwarf warrior with a fiery red beard and arms like tree trunks. Grimlock is renowned for his unmatched strength and unwavering loyalty to his clan.",
        notes:
          "Grimlock carries a massive warhammer named 'Earthshaker', forged in the heart of a volcano.",
      },
    },
    {
      id: "loc1",
      content: {
        type: "location",
        title: "Crystalspire Citadel",
        tags: ["fortress", "magic", "landmark"],
        alias: ["The Shimmering Stronghold", "Mage's Haven"],
        description:
          "A towering fortress made entirely of enchanted crystal, rising high above the surrounding plains. The Crystalspire Citadel serves as both a defensive stronghold and the premier academy for magical studies in the realm.",
        notes:
          "The citadel changes color throughout the day, reflecting the position of the sun and moon.",
        additions: [
          {
            type: "landmark",
            content:
              "The Grand Arcanum - A vast library housing countless magical tomes and artifacts.",
          },
        ],
      },
    },
    {
      id: "loc2",
      content: {
        type: "location",
        title: "Whispering Woods",
        tags: ["forest", "mystical", "dangerous"],
        alias: ["The Murmuring Grove", "Forest of Secrets"],
        description:
          "An ancient forest shrouded in perpetual mist, where the trees seem to whisper forgotten secrets. The Whispering Woods is home to mysterious creatures and is said to hold powerful magic within its depths.",
        notes:
          "Travelers often report hearing voices or seeing visions of their past and future while traversing the woods.",
      },
    },
    {
      id: "char3",
      content: {
        type: "character",
        title: "Zephyr Swiftwing",
        tags: ["antagonist", "rogue", "shapeshifter"],
        alias: ["The Shadow Thief", "Mistress of Many Faces"],
        description:
          "A cunning and elusive shapeshifter with piercing golden eyes. Zephyr is a master of disguise and deception, known for her unparalleled skills in espionage and theft.",
        notes:
          "Zephyr possesses a magical amulet that enhances her shapeshifting abilities, allowing her to maintain forms for extended periods.",
      },
    },
  ];

  const characterlist: EntryPlusID[] = sampleEntries.filter(
    (entry) => entry.content.type === "character"
  );

  return characterlist;
}

export function getlocationList() {
  const sampleEntries: EntryPlusID[] = [
    {
      id: "char1",
      content: {
        type: "character",
        title: "Elara Moonwhisper",
        tags: ["protagonist", "elf", "mage"],
        alias: ["The Starlight Sorceress", "Lady of the Silver Grove"],
        description:
          "A wise and powerful elven mage with silvery hair and eyes that sparkle like starlight. Elara is known for her mastery of celestial magic and her deep connection to the natural world.",
        notes:
          "Elara's staff, the Moonbeam Scepter, is a family heirloom passed down through generations of her lineage.",
        additions: [
          {
            type: "quote",
            content:
              "Magic flows through all things. We need only learn to listen.",
          },
        ],
      },
    },
    {
      id: "char2",
      content: {
        type: "character",
        title: "Grimlock Ironheart",
        tags: ["supporting", "dwarf", "warrior"],
        alias: ["The Mountain's Fist", "Stonecrusher"],
        description:
          "A stout and sturdy dwarf warrior with a fiery red beard and arms like tree trunks. Grimlock is renowned for his unmatched strength and unwavering loyalty to his clan.",
        notes:
          "Grimlock carries a massive warhammer named 'Earthshaker', forged in the heart of a volcano.",
      },
    },
    {
      id: "loc1",
      content: {
        type: "location",
        title: "Crystalspire Citadel",
        tags: ["fortress", "magic", "landmark"],
        alias: ["The Shimmering Stronghold", "Mage's Haven"],
        description:
          "A towering fortress made entirely of enchanted crystal, rising high above the surrounding plains. The Crystalspire Citadel serves as both a defensive stronghold and the premier academy for magical studies in the realm.",
        notes:
          "The citadel changes color throughout the day, reflecting the position of the sun and moon.",
        additions: [
          {
            type: "landmark",
            content:
              "The Grand Arcanum - A vast library housing countless magical tomes and artifacts.",
          },
        ],
      },
    },
    {
      id: "loc2",
      content: {
        type: "location",
        title: "Whispering Woods",
        tags: ["forest", "mystical", "dangerous"],
        alias: ["The Murmuring Grove", "Forest of Secrets"],
        description:
          "An ancient forest shrouded in perpetual mist, where the trees seem to whisper forgotten secrets. The Whispering Woods is home to mysterious creatures and is said to hold powerful magic within its depths.",
        notes:
          "Travelers often report hearing voices or seeing visions of their past and future while traversing the woods.",
      },
    },
    {
      id: "char3",
      content: {
        type: "character",
        title: "Zephyr Swiftwing",
        tags: ["antagonist", "rogue", "shapeshifter"],
        alias: ["The Shadow Thief", "Mistress of Many Faces"],
        description:
          "A cunning and elusive shapeshifter with piercing golden eyes. Zephyr is a master of disguise and deception, known for her unparalleled skills in espionage and theft.",
        notes:
          "Zephyr possesses a magical amulet that enhances her shapeshifting abilities, allowing her to maintain forms for extended periods.",
      },
    },
  ];

  const locationlist: EntryPlusID[] = sampleEntries.filter(
    (entry) => entry.content.type === "location"
  );

  return locationlist;
}

export function updateEntry(id, entry) {
  console.log("updateEntry triggered in dataAccess");
  console.log("Entry ID: ", id, " Entry Details: ", entry);

  const exactLocationOfEntryRef = ref(
    database,
    `${collectionName}/content/${id}`
  );
  update(exactLocationOfEntryRef, { content: entry });
  //NOTE: Cleanup console.log after development phase
}

export function addEntry(entry) {
  //NOTE: Cleanup console.log after development phase
  console.log("addEntry triggered in dataAccess");
  console.log("Entry Details: ", entry);
  push(contentRef, { content: entry });
}

export function addChat(ref, chat) {
  console.log("addChat triggered in dataAccess");
  set(ref, { chat });
}

export function getNewChatRef() {
  console.log("getNewChatRef triggered in dataAccess");
  const newChatRef = push(chatsRef);
  return newChatRef;
}

export function updateChat(id, chat) {
  console.log("updateChat triggered in dataAccess");
  /*
  const exactLocationOfChatRef = ref(database, `${collectionName}/chats/${id}`);
  update(exactLocationOfChatRef, chat);
  */
}
