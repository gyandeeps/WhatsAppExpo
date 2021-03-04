import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { GlobalContext } from "../state/GlobalContext";
import { Avatar, Input } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { createGroup } from "../firebase/groups";
import { createGroupMessage } from "../firebase/messages";
import { addToGroup } from "../firebase/users";

const GroupName = ({ route, navigation }) => {
    const { selectedUserIds } = route.params;
    const [{ users }, dispatch] = useContext(GlobalContext);
    const [title, setTitle] = useState("");
    const createRef = useRef(null);
    const [height, setHeight] = useState(0);

    const onCreate = () => {
        createGroup(title, selectedUserIds).then((groupId) => {
            createGroupMessage(groupId);
            selectedUserIds.map((userId) => addToGroup(groupId, userId));
            dispatch({
                type: "ADD_GROUP",
                payload: {
                    id: groupId,
                    title,
                    subTitle: ""
                }
            });
            navigation.navigate("ChatHome");
        });
    };

    useLayoutEffect(() => {
        if (height > 0) {
            createRef.current.setNativeProps({
                top: height - 25
            });
        }
    }, [height]);

    return (
        <View style={styles.container}>
            <View
                style={styles.title}
                onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
            >
                <Input
                    containerStyle={styles.inputContainer}
                    placeholder="Group Name"
                    onChangeText={setTitle}
                    value={title}
                />
                <Text style={styles.mute}>Provide a group subject</Text>
            </View>
            <View style={styles.users}>
                {selectedUserIds.map((id) => (
                    <Avatar
                        key={id}
                        containerStyle={styles.selectedUser}
                        rounded
                        source={{ uri: users[id].picUrl }}
                        size="medium"
                    />
                ))}
            </View>
            <TouchableOpacity
                disabled={title.length === 0}
                style={styles.createAction}
                onPress={onCreate}
                ref={createRef}
            >
                <AntDesign name="arrowright" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    title: {
        borderBottomColor: "#eceaea",
        borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 15
    },
    users: {
        padding: 5,
        backgroundColor: "#fbf7f7",
        flex: 1,
        display: "flex",
        flexDirection: "row",
        paddingTop: 20,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15
    },
    selectedUser: {
        marginRight: 10
    },
    createAction: {
        backgroundColor: "rgb(0, 150, 136)",
        position: "absolute",
        top: 68,
        right: 40,
        padding: 12,
        borderRadius: 50
    },
    mute: {
        color: "grey"
    },
    inputContainer: {
        paddingLeft: 0,
        paddingRight: 0
    }
});

export default GroupName;
