import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import ChatList from "../components/chats/ChatList";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../state/GlobalContext";

const ChatsTab = () => {
    const navigation = useNavigation();
    const [{ chatItems }] = useContext(GlobalContext);

    const onChatSelect = (id) => {
        navigation.navigate("Chat", {
            id
        });
    };

    return (
        <View style={styles.container}>
            <ChatList
                style={styles.chatList}
                items={chatItems}
                onChatSelect={onChatSelect}
            />
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
