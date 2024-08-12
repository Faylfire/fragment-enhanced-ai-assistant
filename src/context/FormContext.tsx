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

  const [entries, setEntries] = useState([]); //type Entry[]

  const [selectedEntry, setSelectedEntry] = useState({}); //type Entry

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

  useEffect(() => {
    const handleContent = (snapshot: any) => {
      console.log("onvalue called");
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.val());
        console.log(data);
        for (let item of data) {
          console.log(item[0]);
          console.log(item[1]);
        }
      }
    };

    onValue(contentRef, handleContent);

    return () => off(contentRef, "value", handleContent);
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
        selectedEntry,
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
