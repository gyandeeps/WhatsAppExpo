const reducer = (state, { payload, type }) => {
    switch (type) {
        case "ADD_CHAT":
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
                loggedInUser: payload,
                loggedIn: true
            };
        case "LOG_OUT":
            return {
                ...state,
                loggedInUser: null,
                loggedIn: false
            };

        default:
            return state;
    }
};

export default reducer;
