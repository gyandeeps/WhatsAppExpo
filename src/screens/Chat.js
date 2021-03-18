import { HeaderTitle } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    ImageBackground,
    Text,
    TouchableOpacity
} from "react-native";
import { GlobalContext } from "../state/GlobalContext";
import { Avatar } from "react-native-elements";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import {
    MaterialCommunityIcons,
    SimpleLineIcons,
    FontAwesome
} from "@expo/vector-icons";
import Camera from "../components/Camera";
import { useChatItems, useMessages } from "../state/hooks";
import { addMessage } from "../firebase/messages";

// https://github.com/FaridSafi/react-native-gifted-chat/issues/1875
// https://github.com/FaridSafi/react-native-gifted-chat

const renderBubble = (props) => (
    <Bubble
        {...props}
        wrapperStyle={{
            right: {
                backgroundColor: "#dcf8c6"
            },
            left: {
                backgroundColor: "white"
            }
        }}
        textStyle={{
            right: {
                color: "black",
                fontSize: 14,
                marginLeft: 5
            },
            left: {
                color: "black",
                fontSize: 14,
                marginLeft: 5
            }
        }}
        usernameStyle={{
            color: "#00000073"
        }}
        timeTextStyle={{
            right: {
                color: "#00000073"
            },
            left: {
                color: "#00000073"
            }
        }}
        bottomContainerStyle={{
            left: {
                justifyContent: "flex-end"
            }
        }}
        tickStyle={{
            color:
                props.currentMessage.received && props.currentMessage.sent
                    ? "#4fc3f7"
                    : "#00000073"
        }}
        renderCustomView={(props) => {
            if (props.currentMessage.user._id !== props.user._id) {
                return (
                    <Text style={styles.username}>
                        {props.currentMessage.user.name}
                    </Text>
                );
            }
            return null;
        }}
    />
);

const convertToGiftedChat = (message, users) => {
    const userInfo = users[message.userId];

    return {
        _id: message.id,
        text: message.message,
        createdAt: message.dateTime,
        sent: message.sent,
        received: message.received,
        user: {
            _id: userInfo.id,
            name: userInfo.name
        },
        image: message.image
    };
};

const convertFromGiftedChat = (message) => ({
    userId: message.user._id,
    message: message.text,
    dateTime: message.createdAt,
    id: message._id,
    sent: false,
    received: false,
    image: null
});

const ChatScreen = ({ route, navigation }) => {
    const { id: chatId } = route.params || { id: 2 };
    const [{ users, loggedInUser }, dispatch] = useContext(GlobalContext);
    const [messages, setMessages] = useState([]);
    const [takePic, changeTakePic] = useState(false);
    const chatItems = useChatItems();
    const chatMessages = useMessages(chatId);
    const chatItem = chatItems.find((c) => chatId === c.id);

    useEffect(() => {
        if (chatItem) {
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
        }
    }, [chatId, chatItem]);

    useEffect(() => {
        if (chatMessages[chatId]) {
            setMessages(
                chatMessages[chatId].map((message) =>
                    convertToGiftedChat(message, users)
                )
            );
        }
    }, [chatMessages, setMessages, chatId, users]);

    const addChatMessage = (message) =>
        message.forEach((m) => {
            const msg = convertFromGiftedChat(m);
            addMessage(chatId, {
                message: msg.message,
                userId: msg.userId
            }).catch((err) => {
                console.error(err);
            });
        });

    const photoCapture = (photo) => {
        dispatch({
            type: "ADD_CHAT",
            payload: {
                id: chatId,
                message: {
                    userId: loggedInUser.id,
                    message: "",
                    dateTime: new Date(),
                    id: GiftedChat.defaultProps.messageIdGenerator(),
                    sent: false,
                    received: false,
                    image: photo.uri
                }
            }
        });
        changeTakePic(false);
    };

    return (
        <View style={styles.container}>
            {takePic && (
                <View style={styles.cameraContainer}>
                    <Camera
                        onPicCapture={photoCapture}
                        onClose={() => changeTakePic(false)}
                    />
                </View>
            )}
            <ImageBackground
                style={styles.image}
                imageStyle={styles.imageTarget}
                source={{
                    uri:
                        "https://web.whatsapp.com/img/bg-chat-tile-light_04fcacde539c58cca6745483d4858c52.png"
                }}
            >
                <GiftedChat
                    messages={messages}
                    onSend={addChatMessage}
                    user={{
                        _id: loggedInUser.id,
                        name: loggedInUser.name,
                        avatar: loggedInUser.picURL
                    }}
                    renderBubble={renderBubble}
                    isTyping={false}
                    renderSend={() => null}
                    renderActions={() => (
                        <TouchableOpacity
                            onPress={() => console.log("emoji pressed")}
                        >
                            <SimpleLineIcons
                                name="emotsmile"
                                size={24}
                                color="grey"
                                style={{ marginLeft: 10 }}
                            />
                        </TouchableOpacity>
                    )}
                    renderAccessory={(props) => (
                        <Send {...props}>
                            <MaterialCommunityIcons
                                name="send-circle"
                                size={48}
                                color="#009688"
                                style={{
                                    marginTop: 5,
                                    marginBottom: 5
                                }}
                            />
                        </Send>
                    )}
                    renderSend={() => (
                        <TouchableOpacity onPress={() => changeTakePic(true)}>
                            <FontAwesome
                                name="camera"
                                size={24}
                                color="grey"
                                style={{ marginRight: 10 }}
                            />
                        </TouchableOpacity>
                    )}
                    containerStyle={styles.inputContainerStyle}
                    primaryStyle={styles.inputBoxStyle}
                    alwaysShowSend
                    scrollToBottom
                    showUserAvatar={false}
                    renderAvatar={null}
                    placeholder="Type a message"
                />
            </ImageBackground>
            <StatusBar style="light" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e5ddd5"
    },
    headerView: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    headerAvatar: {
        marginRight: 10
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    imageTarget: {
        opacity: 0.06
    },
    username: {
        color: "#ffa97a",
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 5
    },
    inputContainerStyle: {
        flexDirection: "row",
        backgroundColor: "transparent",
        borderTopWidth: 0,
        alignItems: "center"
    },
    inputBoxStyle: {
        flex: 1,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "transparent",
        borderRadius: 21,
        margin: 5,
        alignItems: "center"
    },
    cameraContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100,
        width: "100%",
        height: "100%"
    }
});

export default ChatScreen;
