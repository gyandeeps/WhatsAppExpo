import React from "react";
import { StyleSheet, View } from "react-native";
import Login from "./components/Login";

const UnAuthApp = () => {
    const onLogin = (email, password) => {
        console.log("login", email, password);
    };
    const onSignUp = () => {
        console.log("signup");
    };

    return (
        <View style={styles.container}>
            <Login onLogin={onLogin} onSignUp={onSignUp} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#afb0a3"
    }
});

export default UnAuthApp;
