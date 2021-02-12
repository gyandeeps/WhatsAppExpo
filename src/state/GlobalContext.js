import React, { createContext, useReducer } from "react";

export const GlobalContext = createContext([{}, function () {}]);

const initialGlobalState = {
    chatItems: [
        {
            picUrl: "https://avatars.githubusercontent.com/u/5554486",
            title: "test",
            id: 1,
            subTitle:
                "random message and its a long message i guess asdkn askdas, dn lnlnl",
            dateTime: new Date("12/5/2019"),
            mute: true,
            isGroup: true
        },
        {
            picUrl: "https://avatars.githubusercontent.com/u/5554486",
            title: "jokes",
            id: 2,
            subTitle: "random jokes",
            dateTime: new Date(),
            mute: false,
            isGroup: true
        }
    ],
    chatMessages: {
        1: [
            {
                userId: 1,
                message:
                    "This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT",
                dateTime: new Date(),
                id: 1,
                sent: true,
                received: true,
                image: null
            },
            {
                userId: 3,
                message:
                    "This is a quick reply. Do you love Gifted Chat? (checkbox)",
                dateTime: new Date(),
                id: 2,
                image: null
            }
        ],
        2: [
            {
                userId: 1,
                message: "hey",
                dateTime: new Date(),
                id: 3,
                sent: true,
                received: false,
                image: null
            },
            {
                userId: 2,
                message: "i am good",
                dateTime: new Date(),
                id: 4,
                image: null
            }
        ]
    },
    users: {
        1: {
            name: "Gyandeep Singh",
            picUrl: "https://avatars.githubusercontent.com/u/5554486",
            email: "",
            id: 1
        },
        2: {
            name: "Gaurav Singh",
            picUrl: "https://avatars.githubusercontent.com/u/5594486",
            email: "",
            id: 2
        },
        3: {
            name: "Jaspreet Sahota",
            picUrl: "https://avatars.githubusercontent.com/u/5564486",
            email: "",
            id: 3
        }
    },

    loggedInUser: {
        name: "Gyandeep Singh",
        picUrl: "https://avatars.githubusercontent.com/u/5554486",
        id: 1,
        email: ""
    }
};

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

        default:
            return state;
    }
};

export const GlobalState = ({ children }) => {
    const stuff = useReducer(reducer, initialGlobalState);

    return (
        <GlobalContext.Provider value={stuff}>
            {children}
        </GlobalContext.Provider>
    );
};
