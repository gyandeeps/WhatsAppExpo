import { firebaseDb, firestore } from "./firebase";

export const createGroup = (name) =>
    firebaseDb
        .collection("groups")
        .add({
            name,
            messages: [],
            users: [],
            updated: firestore.FieldValue.serverTimestamp()
        })
        .then(({ id }) => id);

/**
 * Add a message
 * @param {string} groupId
 * @param {{text: string, userId: string, id: string}} message
 */
export const addMessage = (groupId, message) =>
    firebaseDb
        .collection("groups")
        .doc(groupId)
        .update({
            updated: firestore.FieldValue.serverTimestamp(),
            messages: firestore.FieldValue.arrayUnion([
                {
                    ...message,
                    updated: firestore.FieldValue.serverTimestamp()
                }
            ])
        });

/**
 * Add users
 * @param {string} groupId
 * @param {string[]} userIds
 */
export const addUsers = (groupId, userIds) =>
    firebaseDb
        .collection("groups")
        .doc(groupId)
        .update({
            updated: firestore.FieldValue.serverTimestamp(),
            userIds: firestore.FieldValue.arrayUnion(userIds)
        });

export const getGroupsById = (groupIds) =>
    firebaseDb
        .collection("groups")
        .where(firestore.FieldPath.documentId(), "in", groupIds)
        .get()
        .then((doc) => {
            const groups = [];
            doc.forEach((grp) => groups.push({ ...grp.data(), id: grp.id }));
            return groups;
        });
