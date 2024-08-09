import { initializeApp } from 'firebase/app'
import {ref, push, onValue, remove, update, set} from 'firebase/database'
import  getFirebase from "./firebaseAPI.js"



const database = getFirebase('user','pass')
const collectionName = "fragmentCollection";
const typeListRef = ref(database, `${collectionName}/typeList`);
const contentRef = ref(database, `${collectionName}/content`);

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

export function addCollectionEntry(){

    //This section may be refactored into a Context.tsx file
    const wordSet = new Set([
      "character",
      "location",
      "article",
      "video",
      "podcast",
      "image"]);
    const sortedTypeList = [...wordSet].sort();
    //-------------------------------------------------------

    set(typeListRef, sortedTypeList)
    
    //For testing purposes
    console.log("add types completed")
    onValue(typeListRef, (snapshot) => {

        if (snapshot.exists()){
            const types = Object.entries(snapshot.val())
            console.log(types)
            for (let type of types){
                console.log("type: " + type[1])
            }
        }else {
            console.log("No types found")
        }

    });

}