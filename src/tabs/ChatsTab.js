import React, { useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import ChatList from "../components/chats/ChatList";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../state/GlobalContext";
import { MaterialIcons } from "@expo/vector-icons";

const ChatsTab = () => {
    const navigation = useNavigation();
    const [{ chatItems }] = useContext(GlobalContext);

    const onChatSelect = (id) => {
        navigation.navigate("Chat", {
            id
        });
    };
    const onNewSelect = () => navigation.navigate("NewGroup");

    return (
        <View style={styles.container}>
            <ChatList
                style={styles.chatList}
                items={chatItems}
                onChatSelect={onChatSelect}
            />
            <TouchableOpacity style={styles.newMessage} onPress={onNewSelect}>
                <MaterialIcons name="chat" size={24} color="white" />
            </TouchableOpacity>
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
    },
    newMessage: {
        backgroundColor: "rgb(0, 150, 136)",
        position: "absolute",
        bottom: 40,
        right: 40,
        padding: 15,
        borderRadius: 50
    }
});

export default ChatsTab;
