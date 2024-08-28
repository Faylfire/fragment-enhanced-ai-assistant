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

  //NOTE: The following line for selectedEntry might not be needed
  //const [selectedEntry, setSelectedEntry] = useState({}); //type Entry

  const [typeList, setTypeList] = useState([
    "character",
    "location",
    "lore",
    "guidelines",
    "tropes",
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
    /*
    setEntries((prevEntries) =>
      prevEntries.map((eachEntry) =>
        eachEntry.id === updatedEntry.id ? updatedEntry : eachEntry
      )
    );
    */
  };

  //Subscribing to onValue change for Collection entries
  useEffect(() => {
    const handleContent = (snapshot: any) => {
      console.log("onvalue called");
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.val());
        const dataEntries: EntryPlusID[] = [];
        console.log(data);
        for (let item of data) {
          console.log(item[0]);
          console.log(item[1]);
          dataEntries.push({ id: item[0], content: item[1].content });
        }
        console.log("dataEntries: ", dataEntries);
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
        console.log(data);
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
  function highlightKeywordsFromCollection(
    text: string,
    keywordColors = {
      quick: "text-red-600",
      fox: "text-blue-600",
      "The Orb": "text-indigo-600",
      Jarn: "text-green-600",
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

  //Highlight keywords logic (English only)
  function highlightKeywords(text, keywordColors) {
    //Get Keywords for Matching returns an array [] of keywords
    const keywords = Object.keys(keywordColors);
    //Form a pattern that has word boundaries that will not detect partial words like quick in quickly
    const pattern = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
    return text.replace(pattern, (match) => {
      const color = keywordColors[match];
      const styles = `cursor-pointer underline decoration-dotted font-bold ${color}`;
      return `<span class="${styles}">${match}</span>`;
    });
  }
  //----------------------------------------------------------------

  return (
    <FormContext.Provider
      value={{
        entry,
        entries,
        typeList,
        updateEntryData,
        addEntryData,
        highlightKeywordsFromCollection,
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
