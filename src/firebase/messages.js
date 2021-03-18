import { firebaseDb, firestore } from "./firebase";
/**
 * Add a message
 * @param {string} groupId
 * @param {{text: string, userId: string}} message
 */
export const createGroupMessage = (groupId) =>
    firebaseDb.collection("messages").doc(groupId).collection("messages");

/**
 * Add a message
 * @param {string} groupId
 * @param {{message: string, userId: string}} message
 */
export const addMessage = (groupId, message) =>
    firebaseDb
        .collection("messages")
        .doc(groupId)
        .collection("messages")
        .add({
            ...message,
            updated: firestore.FieldValue.serverTimestamp()
        });

export const getMessagesByGroupId = (groupId) =>
    firebaseDb
        .collection(`messages/${groupId}/messages`)
        .orderBy("updated", "desc")
        .get()
        .then((reply) => {
            const messages = [];
            reply.docs.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            return messages;
        });

export const listenForGroupMessages = (groupId, func) =>
    firebaseDb
        .collection(`messages/${groupId}/messages`)
        .orderBy("updated", "desc")
        .onSnapshot((snapshot) => {
            if (!snapshot.metadata.hasPendingWrites) {
                func(
                    snapshot
                        .docChanges()
                        .map(({ doc }) => ({ ...doc.data(), id: doc.id }))
                );
            }
        });
