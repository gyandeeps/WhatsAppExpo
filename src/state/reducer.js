import { NETWORK_STATUS } from "./hooks";

const reducer = (state, { payload, type }) => {
    switch (type) {
        case "ADD_GROUP":
            return {
                ...state,
                chatItems: [
                    {
                        picUrl:
                            "https://avatars.githubusercontent.com/u/5554486",
                        title: payload.title,
                        id: payload.id,
                        subTitle: payload.subTitle,
                        dateTime: new Date(),
                        mute: false,
                        isGroup: true
                    },
                    ...state.chatItems
                ],
                chatMessages: {
                    ...state.chatMessages,
                    [payload.id]: []
                }
            };
        case "ADD_CHAT":
            const chatItem = state.chatItems.find(
                ({ id }) => id === payload.id
            );

            chatItem.subTitle = payload.message.message;
            return {
                ...state,
                chatMessages: {
                    ...state.chatMessages,
                    [payload.id]: [
                        payload.message,
                        ...state.chatMessages[payload.id]
                    ]
                }
            };

        case "ADD_CHAT_ITEM":
            return {
                ...state,
                chatItems: [...state.chatItems, payload]
            };

        case "ADD_USER":
            return {
                ...state,
                users: {
                    ...state.users,
                    [payload.id]: payload.user
                }
            };

        case "LOGIN":
            return {
                ...state,
                users: {
                    ...state.users,
                    [payload.id]: payload
                },
                loggedInUser: payload,
                loggedIn: true
            };

        case "LOG_OUT":
            return {
                ...state,
                loggedInUser: null,
                loggedIn: false
            };
        case "LOGGED_USER_NAME":
            return {
                ...state,
                loggedInUser: {
                    ...state.loggedInUser,
                    name: payload
                }
            };
        case "REQUEST_INFLIGHT":
            return {
                ...state,
                networkStatus: {
                    ...state.networkStatus,
                    [payload]: NETWORK_STATUS.IN_FLIGHT
                }
            };

        case "REQUEST_FAIL":
            return {
                ...state,
                networkStatus: {
                    ...state.networkStatus,
                    [payload]: NETWORK_STATUS.FAILED
                }
            };

        case "USERS_DATA":
            return {
                ...state,
                users: payload.reduce(
                    (coll, usr) => ({ ...coll, [usr.id]: usr }),
                    {}
                ),
                networkStatus: {
                    ...state.networkStatus,
                    users: NETWORK_STATUS.SUCCESS
                }
            };

        case "GROUPS_DATA":
            return {
                ...state,
                chatItems: payload.reduce((coll, groupData) => {
                    coll.push({
                        picUrl:
                            "https://avatars.githubusercontent.com/u/5554486",
                        title: groupData.name,
                        id: groupData.id,
                        subTitle: "",
                        dateTime: new Date(groupData.updated.toDate()),
                        mute: false,
                        isGroup: true
                    });

                    return coll;
                }, []),
                networkStatus: {
                    ...state.networkStatus,
                    groups: NETWORK_STATUS.SUCCESS
                }
            };

        case "MESSAGES_DATA":
            return {
                ...state,
                chatMessages: {
                    ...state.chatMessages,
                    [payload.groupId]: payload.messageData.map((msg) => ({
                        ...msg,
                        dateTime: new Date(msg.updated.toDate()),
                        sent: true,
                        received: true,
                        image: null
                    }))
                },
                networkStatus: {
                    ...state.networkStatus,
                    messages: NETWORK_STATUS.SUCCESS
                }
            };

        default:
            return state;
    }
};

export default reducer;
