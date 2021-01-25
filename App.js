import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home">
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ tabBarLabel: "Home" }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingScreen}
                    options={{ tabBarLabel: "Settings" }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app! HomeScreen</Text>
            <StatusBar style="light" />
        </View>
    );
};

const SettingScreen = () => {
    return (
        <View style={styles.container}>
            <Text>
                Open up App.js to start working on your app! SettingScreen
            </Text>
            <StatusBar style="dark" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default App;
