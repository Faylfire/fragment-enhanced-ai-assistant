import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Storing the database URL in localStorage
function storeFirebaseURL(url: string): void {
  localStorage.setItem("fea-firebaseurl", JSON.stringify(url));
  console.log("Database URL stored in localStorage");
}

// Retrieving the database URL from localStorage
function getFirebaseURL(): string {
  const url = JSON.parse(localStorage.getItem("fea-firebaseurl"));
  if (url) {
    console.log("Retrieved database URL from LocalStorage");
    return url;
  } else {
    console.log("No database URL found in localStorage");
    return "";
  }
}

/*
export default function getFirebase(username?:string, password?:string){

    //Get your own Firebase URL from localStorage
    let firebaseURL = getFirebaseURL()

    if (firebaseURL === "") {
        firebaseURL = import.meta.env.VITE_FIREBASE_URL
        storeFirebaseURL(firebaseURL)
    }


    //initialize Connection to Firebase
    const firebaseConfig = {
        databaseURL: firebaseURL,
    }   

    const app = initializeApp(firebaseConfig)
    const database = getDatabase(app)

    console.log(firebaseConfig, database)
    return database
} */

let firebaseURL = getFirebaseURL();

if (firebaseURL === "") {
  firebaseURL = import.meta.env.VITE_FIREBASE_URL;
  storeFirebaseURL(firebaseURL);
}

//initialize Connection to Firebase
const firebaseConfig = {
  databaseURL: firebaseURL,
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
