import { useContext, useEffect } from "react";
import { getGroupsById } from "../firebase/groups";
import {
    getMessagesByGroupId,
    listenForGroupMessages
} from "../firebase/messages";
import { getUserGroups } from "../firebase/users";
import { GlobalContext } from "./GlobalContext";

export const NETWORK_STATUS = {
    IDLE: 0,
    IN_FLIGHT: 1,
    SUCCESS: 2,
    FAILED: 4
};

export const useChatItems = () => {
    const [{ chatItems, networkStatus, loggedInUser }, dispatch] = useContext(
        GlobalContext
    );

    useEffect(() => {
        if (networkStatus.groups === NETWORK_STATUS.IDLE) {
            dispatch({
                type: "REQUEST_INFLIGHT",
                payload: "groups"
            });

            getUserGroups(loggedInUser.id)
                .then((groups) => getGroupsById(groups))
                .then((groupsData) => {
                    dispatch({
                        type: "GROUPS_DATA",
                        payload: groupsData
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: "REQUEST_FAIL",
                        payload: "groups"
                    });
                    console.error(err);
                });
        }
    }, [dispatch, networkStatus.groups, loggedInUser]);

    return chatItems;
};

export const useMessages = (groupId) => {
    const [{ chatMessages }, dispatch] = useContext(GlobalContext);

    useEffect(() => {
        dispatch({
            type: "REQUEST_INFLIGHT",
            payload: "messages"
        });

        // getMessagesByGroupId(groupId)
        //     .then((messageData) => {
        //         dispatch({
        //             type: "MESSAGES_DATA",
        //             payload: {
        //                 messageData,
        //                 groupId
        //             }
        //         });
        //     })
        //     .catch((err) => {
        //         dispatch({
        //             type: "REQUEST_FAIL",
        //             payload: "messages"
        //         });
        //         console.error(err);
        //     });

        return listenForGroupMessages(groupId, (messageData) => {
            // console.log(messageData);
            dispatch({
                type: "MESSAGES_DATA",
                payload: {
                    messageData,
                    groupId
                }
            });
        });
    }, [dispatch, groupId]);

    return chatMessages;
};
