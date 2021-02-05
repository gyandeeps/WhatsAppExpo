import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ChatList = ({ style, items, onChatSelect }) => {
    return (
        <View style={StyleSheet.compose(styles.container, style)}>
            {items.map((l, i) => (
                <ListItem
                    key={l.id}
                    bottomDivider
                    onPress={() => onChatSelect(l.id)}
                    onClick={() => onChatSelect(l.id)}
                >
                    <Avatar rounded source={{ uri: l.picUrl }} />
                    <ListItem.Content>
                        <ListItem.Title>{l.title}</ListItem.Title>
                        <ListItem.Subtitle
                            style={styles.mute}
                            numberOfLines={1}
                        >
                            {l.subTitle}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    <View style={styles.access}>
                        <Text style={styles.mute}>
                            {l.dateTime.toLocaleString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true
                            })}
                        </Text>
                        {l.mute && (
                            <MaterialCommunityIcons
                                name="volume-mute"
                                size={24}
                                color="black"
                                style={styles.mute}
                            />
                        )}
                    </View>
                </ListItem>
            ))}
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
    mute: {
        color: "#0000006a"
    },
    access: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end"
    }
});

export default ChatList;
