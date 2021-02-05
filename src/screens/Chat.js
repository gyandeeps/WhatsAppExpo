import { HeaderTitle } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalContext } from "../state/GlobalContext";
import { Avatar } from "react-native-elements";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

// https://github.com/FaridSafi/react-native-gifted-chat/issues/1875
// https://github.com/FaridSafi/react-native-gifted-chat

const renderBubble = (props) => (
    <Bubble
        {...props}
        wrapperStyle={{
            right: {
                backgroundColor: "grey"
            },
            left: { backgroundColor: "green" }
        }}
        textStyle={{ right: { color: "#fff" } }}
    />
);

const messages = [
    {
        _id: 1,
        text: "This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT",
        createdAt: new Date(),

        user: {
            _id: 2,
            name: "React Native"
        }
    },
    {
        _id: 2,
        text: "This is a quick reply. Do you love Gifted Chat? (checkbox)",
        createdAt: new Date(),

        user: {
            _id: 1,
            name: "Gyandeep Singh"
        },
        received: true
    }
];

const ChatScreen = ({ route, navigation }) => {
    const { id } = route.params || { id: 1 };
    const [{ chatItems, chatMessages, users, loggedInUser }] = useContext(
        GlobalContext
    );
    const chatItem = chatItems.find((c) => id === c.id);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: ({ children, ...props }) => (
                <View style={styles.headerView}>
                    <Avatar
                        containerStyle={styles.headerAvatar}
                        rounded
                        source={{ uri: chatItem.picUrl }}
                    />
                    <HeaderTitle {...props}>{chatItem.title}</HeaderTitle>
                </View>
            ),
            title: chatItem.title
        });
    }, [id]);

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={() => console.log("send")}
                // user={{
                //     id: user.id,
                //     name: user.name,
                //     avatar: user.picURL
                // }}
                renderBubble={renderBubble}
                placeholder="Type your message here..."
                isTyping={false}
                // renderSend={renderSend}
                alwaysShowSend
                scrollToBottom
                // scrollToBottomComponent={scrollToBottomComponent}
                // renderSystemMessage={renderSystemMessage}
            />
            <StatusBar style="light" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    headerView: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    headerAvatar: {
        marginRight: 10
    }
});

export default ChatScreen;
