import { firebaseDb, firestore } from "./firebase";

export const createGroup = (name, users) =>
    firebaseDb
        .collection("groups")
        .add({
            name,
            users,
            updated: firestore.FieldValue.serverTimestamp()
        })
        .then(({ id }) => id);

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
            userIds: firestore.FieldValue.arrayUnion(...userIds)
        });

export const getGroupsById = (groupIds) => {
    if (groupIds.length === 0) {
        return [];
    }

    return firebaseDb
        .collection("groups")
        .where(firestore.FieldPath.documentId(), "in", groupIds)
        .get()
        .then((doc) => {
            const groups = [];
            doc.forEach((grp) => groups.push({ ...grp.data(), id: grp.id }));
            return groups;
        });
};
