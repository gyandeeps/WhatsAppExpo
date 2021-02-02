import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
    createStackNavigator,
    HeaderBackButton
} from "@react-navigation/stack";
import HomeScreen from "./src/screens/Home";
import ChatHomeScreen from "./src/screens/ChatHome";
import SettingsScreen from "./src/screens/Settings";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Platform } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import SettingsMenu from "./src/components/SettingsMenu";

const Stack = createStackNavigator();

const App = () => (
    <MenuProvider>
        <NavigationContainer>
            <Stack.Navigator
                headerMode="screen"
                initialRouteName="ChatHome"
                screenOptions={{
                    cardOverlayEnabled: false,
                    headerTitleAlign: "left",
                    headerStyle: {
                        backgroundColor: "rgb(0, 150, 136)",
                        borderBottomWidth: 0
                    },
                    headerTitleStyle: {
                        color: "white"
                    },
                    headerStatusBarHeight: Platform.OS === "web" ? 0 : 50
                }}
            >
                <Stack.Screen
                    name="ChatHome"
                    component={ChatHomeScreen}
                    options={{
                        title: "Chat",
                        headerRight: () => (
                            <View style={styles.headerRight}>
                                <Ionicons
                                    name="md-search-sharp"
                                    size={24}
                                    color="white"
                                    onPress={() => {}}
                                    style={styles.icons}
                                />
                                <SettingsMenu />
                            </View>
                        )
                    }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: "Home"
                    }}
                />
                <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        title: "Settings",
                        headerLeft: (props) => (
                            <HeaderBackButton
                                {...props}
                                onPress={() => {
                                    // Do something
                                }}
                            />
                        )
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    </MenuProvider>
);

const styles = StyleSheet.create({
    headerRight: {
        display: "flex",
        flexDirection: "row",
        width: 75,
        justifyContent: "space-between",
        paddingLeft: 5,
        paddingRight: 5
    },
    icons: {
        padding: 5
    }
});

export default App;
