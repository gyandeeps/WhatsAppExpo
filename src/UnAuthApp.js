import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import Login from "./components/Login";
import { GlobalContext } from "./state/GlobalContext";

const UnAuthApp = () => {
    const [_, dispatch] = useContext(GlobalContext);

    const onLogin = (email, password) => {
        dispatch({
            type: "LOGIN",
            payload: {
                name: "Gyandeep Singh",
                picUrl: "https://avatars.githubusercontent.com/u/5554486",
                id: 1,
                email
            }
        });
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
