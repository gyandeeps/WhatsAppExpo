import React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import ChatList from "../components/chats/ChatList";

const ChatsTab = () => {
    const [chatItems] = useState([
        {
            picUrl: "https://avatars.githubusercontent.com/u/5554486",
            title: "test",
            id: 1,
            subTitle:
                "random message and its a long message i guess asdkn askdas, dn lnlnl",
            dateTime: new Date("12/5/2019"),
            mute: true
        },
        {
            picUrl: "https://avatars.githubusercontent.com/u/5554486",
            title: "jokes",
            id: 2,
            subTitle: "random jokes",
            dateTime: new Date(),
            mute: false
        }
    ]);

    return (
        <View style={styles.container}>
            <ChatList style={styles.chatList} items={chatItems} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#afb0a3"
    },
    chatList: {
        padding: 0
    }
});

export default ChatsTab;
