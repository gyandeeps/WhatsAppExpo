import { firebaseAuth, firebaseDb, firestore } from "./firebase";

export const addUser = (id, name, email) =>
    firebaseDb.collection("users").doc(id).set({
        name,
        email,
        groups: [],
        updated: firestore.FieldValue.serverTimestamp()
    });

export const createUserWithEmailAndPassword = (email, password, name) =>
    firebaseAuth
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) =>
            user
                .updateProfile({
                    displayName: name
                })
                .then(() => ({
                    user,
                    name
                }))
        );

export const logIn = (email, password) =>
    firebaseAuth
        .signInWithEmailAndPassword(email, password)
        .catch((err) => console.error(err));

/**
 * Add users
 * @param {string} groupId
 * @param {string[]} userIds
 */
export const addToGroup = (groupId, userId) =>
    firebaseDb
        .collection("users")
        .doc(userId)
        .update({
            updated: firestore.FieldValue.serverTimestamp(),
            groups: firestore.FieldValue.arrayUnion(groupId)
        })
        .catch((err) => {
            console.error(err);
        });

export const getUserGroups = (userId) =>
    firebaseDb
        .collection("users")
        .doc(userId)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return doc.get("groups");
            } else {
                console.log("No such document!");
                return [];
            }
        });

export const getAllUser = () =>
    firebaseDb
        .collection("users")
        .get()
        .then((doc) => {
            const users = [];
            doc.forEach((usr) =>
                users.push({ ...usr.data(), id: usr.id, picUrl: "" })
            );
            return users;
        });
