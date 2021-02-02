import React from "react";
import { StyleSheet } from "react-native";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger
} from "react-native-popup-menu";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SettingsMenu = () => {
    return (
        <Menu style={styles.container}>
            <MenuTrigger>
                <MaterialCommunityIcons
                    name="dots-vertical"
                    size={24}
                    color="white"
                />
            </MenuTrigger>
            <MenuOptions>
                <MenuOption
                    customStyles={{ optionWrapper: styles.menuOption }}
                    onSelect={() => console.log(`New Group`)}
                    text="New Group"
                />
                <MenuOption
                    customStyles={{ optionWrapper: styles.menuOption }}
                    onSelect={() => console.log(`New Broadcast`)}
                    text="New Broadcast"
                />
                <MenuOption
                    customStyles={{ optionWrapper: styles.menuOption }}
                    onSelect={() => console.log(`Starred messages`)}
                    text="Starred messages"
                />
                <MenuOption
                    customStyles={{ optionWrapper: styles.menuOption }}
                    onSelect={() => console.log(`Settings`)}
                    text="Settings"
                />
            </MenuOptions>
        </Menu>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center"
    },
    menuOption: {
        padding: 12
    }
});

export default SettingsMenu;
