import React, { createContext, useContext, useState, useEffect } from "react";
import { Entry, EntryPlusID } from "@/types/types";
import {
  fetchEntries,
  updateEntry,
  addEntry,
  collectionName,
} from "@/services/dataAccess";
import { database } from "@/services/firebaseAPI";
import { ref, onValue, off } from "firebase/database";
import { simpleIsEqual } from "@/lib/utils";

const FormContext = createContext();
const typeListRef = ref(database, `${collectionName}/typeList`);
const contentRef = ref(database, `${collectionName}/content`);

export const FormProvider = ({ children }) => {
  const [entry, setEntry] = useState({
    id: "",
    content: {
      type: "",
      name: "",
      tags: "",
      alias: "",
      notes: "",
      description: "",
    },
  }); //Type Entrys

  const [entries, setEntries] = useState([]); //type EntryPlusID[]
  const [supportingEntryIds, setSupportingEntryIds] = useState(new Set()); //A set of all entry ids found in the prompt
  const [keywordColors, setKeywordColors] = useState({});

  //NOTE: The following line for selectedEntry might not be needed
  //const [selectedEntry, setSelectedEntry] = useState({}); //type Entry

  const [typeList, setTypeList] = useState([
    "character",
    "location",
    "lore",
    "guideline",
    "trope",
    "other",
  ]); //type string

  const updateEntryData = async (updatedEntryID, updatedEntry: Entry) => {
    const foundEntry = entries.find((obj) => obj.id === updatedEntryID);
    if (foundEntry) {
      //If nothing was changed in the update, the database will not be triggered
      if (simpleIsEqual(updatedEntry, foundEntry.content)) {
        console.log("No changes found, update not necessary");
      } else {
        await updateEntry(updatedEntryID, updatedEntry);
      }
    } else {
      console.log("Did not find entry with id for update");
    }
  };

  function getFormattedKeywords(item: Entry) {
    const typeColors = {
      character: "text-indigo-600",
      location: "text-emerald-600",
      lore: "text-amber-600",
      guideline: "text-sky-600",
      trope: "text-fuchsia-600",
      other: "text-slate-600",
    };
    const keywords = {};
    const id = item.id;
    const color = typeColors[item.content.type];

    keywords[item.content.title] = { id: id, color: color };
    const hasAlias = Boolean(item?.content.alias);
    if (hasAlias) {
      //split on comma then iterate through and push keywords.
      const aliases = item.content.alias.split(",");
      aliases.forEach((alias) => {
        keywords[alias.trim()] = { id: id, color: color };
      });
    }
    return keywords;
  }

  //Subscribing to onValue change for Collection entries
  useEffect(() => {
    const handleContent = (snapshot: any) => {
      console.log("onvalue called");
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.val());
        const dataEntries: EntryPlusID[] = [];
        let keywords = {};

        console.log(data);
        for (let item of data) {
          //console.log(item[0]);
          //console.log(item[1]);
          let formattedEntryItem = { id: item[0], content: item[1].content };
          let formattedKeywords = getFormattedKeywords(formattedEntryItem);
          keywords = { ...keywords, ...formattedKeywords };
          dataEntries.push(formattedEntryItem);
        }
        console.log("dataEntries: ", dataEntries);
        console.log("keywords: ", keywords);
        setKeywordColors(keywords);
        setEntries(dataEntries);
      }
    };

    onValue(contentRef, handleContent);

    return () => off(contentRef, "value", handleContent);
  }, []);

  //Subscribing to onValue changes to typeList
  useEffect(() => {
    const handleTypeList = (snapshot: any) => {
      console.log("typelist onvalue called");
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.val());
        const types = [];
        for (let item of data) {
          types.push(item[1]);
        }
        setTypeList(types);
      }
    };

    onValue(typeListRef, handleTypeList);

    return () => off(typeListRef, "value", handleTypeList);
  }, []);

  //Add Entry Method, Calls addEntry from DataAccess in services to push to Firebase/database
  const addEntryData = async (newEntry: Entry) => {
    console.log("In Context, adding entry");
    const addedEntry = await addEntry(newEntry);
    setEntries((prevEntries) => [...prevEntries, addedEntry]);
    console.log("Updating Entries");
    console.log("entries: ", entries.length);
    //setSelectedEntry(null);
  };

  //----------------------------------------------------------------
  //Select the relevant keywords and return the wrapped text
  function highlightKeywordsFromCollection(text: string) {
    const nbsp = String.fromCharCode(160);
    if (text?.length > 0) {
      const highlightedText = highlightKeywords(text).trim();
      const finalContent: string = `${highlightedText}${nbsp}`;
      return finalContent;
    }
    return "";
  }

  //Highlight keywords logic (English only)
  function highlightKeywords(text) {
    //Get Keywords for Matching returns an array [] of keywords
    const keys = Object.keys(keywordColors);
    const keywords = keys.sort().reverse();
    //Form a pattern that has word boundaries that will not detect partial words like quick in quickly
    const pattern = new RegExp(`\\b(${keywords.join("|")}|\\S+)\\b`, "g");
    const selectedEntryIds = new Set(); //Stores the unique Ids for selected Keywords

    const highlightedText = text.replace(pattern, (match) => {
      //If there is a match, then try to get the color and id
      const color = keywordColors[match]?.color;
      const id = keywordColors[match]?.id;
      //If the match does not result in a color, indicating that the match was not correct, then do not replace.
      if (color) {
        if (id) {
          selectedEntryIds.add(id);
        }
        const styles = `cursor-pointer underline decoration-dotted font-bold ${color}`;
        return `<span class="${styles}">${match}</span>`;
      }
      return match;
    });
    console.log("Selected Keyword Ids: ", selectedEntryIds);
    setSupportingEntryIds(selectedEntryIds);

    return highlightedText;
  }
  //----------------------------------------------------------------

  function getWrapPromptKeywords() {}

  return (
    <FormContext.Provider
      value={{
        entry,
        entries,
        typeList,
        updateEntryData,
        addEntryData,
        highlightKeywordsFromCollection,
        supportingEntryIds,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

/*
{
    character: { id: 1, color: "text-indigo-600" },
    location: { id: 2, color: "text-emerald-600" },
    lore: { id: 3, color: "text-amber-600" },
    fox: { id: 1, color: "text-indigo-600" },
    Jarn: { id: 2, color: "text-emerald-600" },
    "Jarn Smith": { id: 3, color: "text-amber-600" },
  }*/
