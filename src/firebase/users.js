import { firebaseAuth, firebaseDb } from "./firebase";

export const addUser = (id, name, email) =>
    firebaseDb.collection("users").doc(id).set({
        name,
        email,
        groups: {}
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
