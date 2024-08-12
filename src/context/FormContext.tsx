import React, { createContext, useContext, useState, useEffect } from "react";
import { Entry, EntryPlusID } from "@/types/types";
import { fetchEntries, updateEntry, addEntry } from "@/services/dataAccess";
import { database } from "@/services/firebaseAPI";
import { ref, onValue, off } from "firebase/database";

const FormContext = createContext();
const collectionName = "fragmentCollection";
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

  const [selectedEntry, setSelectedEntry] = useState({}); //type Entry
  const [typeList, setTypeList] = useState([
    "character",
    "location",
    "lore",
    "guidelines",
    "tropes",
    "other",
  ]); //type string

  const updateEntryData = async (updatedEntry: Entry) => {
    await updateEntry(updatedEntry);
    setEntries((prevEntries) =>
      prevEntries.map((eachEntry) =>
        eachEntry.id === updatedEntry.id ? updatedEntry : eachEntry
      )
    );
    setSelectedEntry(null);
  };

  /*
[
  "-O42O2L3DszPyj0xBeJg",
  {
    entry: {
      alias: "Tale",
      description: "This is a story",
      notes: "",
      tags: "Story",
      title: "Story",
      type: "lore",
    },
  },
];
*/
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
    setSelectedEntry(null);
  };

  return (
    <FormContext.Provider
      value={{
        entry,
        entries,
        selectedEntry,
        typeList,
        setSelectedEntry,
        updateEntryData,
        addEntryData,
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
