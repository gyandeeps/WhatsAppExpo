import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" backgroundColor="rgb(0, 150, 136)" />
            <Text>
                Home up App.js to start working on your app! HomeScreen1
            </Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default HomeScreen;
