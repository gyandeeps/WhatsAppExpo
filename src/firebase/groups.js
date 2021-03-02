import { firebaseDb, firestore } from "./firebase";

export const createGroup = (name) =>
    firebaseDb
        .collection("groups")
        .add({
            name,
            messages: [],
            updated: firestore.FieldValue.serverTimestamp()
        })
        .then(({ id }) => id);
