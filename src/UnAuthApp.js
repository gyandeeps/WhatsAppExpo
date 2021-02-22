import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { GlobalContext } from "./state/GlobalContext";

const UnAuthApp = () => {
    const [_, dispatch] = useContext(GlobalContext);
    const [showSignup, changeShowSignup] = useState(false);

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
    const onSignUp = () => changeShowSignup(true);
    const toLoginPage = () => changeShowSignup(false);

    const onSignup = (userObj) => {
        console.log(userObj);
    };

    return (
        <View style={styles.container}>
            {showSignup ? (
                <SignUp toLoginPage={toLoginPage} onSignup={onSignup} />
            ) : (
                <Login onLogin={onLogin} onSignUp={onSignUp} />
            )}
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
