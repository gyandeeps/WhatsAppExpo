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

        default:
            return state;
    }
};

export default reducer;
