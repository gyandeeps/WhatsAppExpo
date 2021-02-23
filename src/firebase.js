import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import config from "./firebase-config";

const app =
    firebase.apps.length === 0
        ? firebase.initializeApp(config)
        : firebase.app();

export const firebaseDb = app.firestore();
export const firebaseAuth = app.auth();
export const firebaseStorage = app.storage().ref();
