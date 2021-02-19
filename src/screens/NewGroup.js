import React, { useContext, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { GlobalContext } from "../state/GlobalContext";
import { ListItem, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const NewGroup = () => {
    const navigation = useNavigation();
    const [{ users }] = useContext(GlobalContext);
    const [selectedUserIds, updateSelectedUsers] = useState([]);

    const userSelect = (id) => updateSelectedUsers([...selectedUserIds, id]);
    const removeUser = (id) =>
        updateSelectedUsers(selectedUserIds.filter((i) => i !== id));
    const onCreate = () =>
        navigation.navigate("GroupName", {
            selectedUserIds
        });

    return (
        <View style={styles.container}>
            {selectedUserIds.length > 0 && (
                <View style={styles.selectedContainer}>
                    {selectedUserIds.map((uId) => (
                        <TouchableOpacity
                            key={uId}
                            onPress={() => removeUser(uId)}
                            style={styles.selectedUser}
                        >
                            <Avatar
                                rounded
                                source={{ uri: users[uId].picUrl }}
                                size="medium"
                            >
                                <Avatar.Accessory
                                    type="material"
                                    iconProps={{
                                        name: "cancel"
                                    }}
                                />
                            </Avatar>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
            {Object.values(users)
                .filter(({ id }) => !selectedUserIds.includes(id))
                .map((user) => (
                    <ListItem
                        key={user.id}
                        onPress={() => userSelect(user.id)}
                        onClick={() => userSelect(user.id)}
                        containerStyle={styles.listItem}
                    >
                        <Avatar rounded source={{ uri: user.picUrl }} />
                        <ListItem.Content>
                            <ListItem.Title>{user.name}</ListItem.Title>
                            <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            <TouchableOpacity
                disabled={selectedUserIds.length === 0}
                style={styles.createAction}
                onPress={onCreate}
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
    listItem: {
        padding: 10
    },
    selectedContainer: {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        borderBottomColor: "#eceaea",
        borderBottomWidth: 1
    },
    selectedUser: {
        marginRight: 10
    },
    createAction: {
        backgroundColor: "rgb(0, 150, 136)",
        position: "absolute",
        bottom: 40,
        right: 40,
        padding: 15,
        borderRadius: 50
    }
});

export default NewGroup;
