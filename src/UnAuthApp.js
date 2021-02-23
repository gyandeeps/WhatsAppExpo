import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { firebaseAuth } from "./firebase";

const UnAuthApp = () => {
    const [showSignup, changeShowSignup] = useState(false);

    const onLogin = (email, password) =>
        firebaseAuth
            .signInWithEmailAndPassword(email, password)
            .catch((err) => console.error(err));

    const onSignUp = ({ email, password, name }) =>
        firebaseAuth
            .createUserWithEmailAndPassword(email, password)
            .then(
                ({ user }) =>
                    user.updateProfile({
                        displayName: name
                    })

                // TODO - add the name to our global state
            )
            .catch((err) => console.error(err));

    const toLoginPage = () => changeShowSignup(false);
    const goToSignUp = () => changeShowSignup(true);

    return (
        <View style={styles.container}>
            {showSignup ? (
                <SignUp toLoginPage={toLoginPage} onSignUp={onSignUp} />
            ) : (
                <Login onLogin={onLogin} goToSignUp={goToSignUp} />
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
