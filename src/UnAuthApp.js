import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import {
    addUser,
    createUserWithEmailAndPassword,
    logIn
} from "./firebase/users";
import { GlobalContext } from "./state/GlobalContext";

const UnAuthApp = () => {
    const [showSignup, changeShowSignup] = useState(false);
    const [_, dispatch] = useContext(GlobalContext);

    const onSignUp = ({ email, password, name }) =>
        createUserWithEmailAndPassword(email, password, name)
            .then(({ displayName, user }) => {
                dispatch({
                    type: "LOGGED_USER_NAME",
                    payload: displayName
                });

                return addUser(user.uid, displayName, email);
            })
            .catch((err) => console.error(err));

    const toLoginPage = () => changeShowSignup(false);
    const goToSignUp = () => changeShowSignup(true);

    return (
        <View style={styles.container}>
            {showSignup ? (
                <SignUp toLoginPage={toLoginPage} onSignUp={onSignUp} />
            ) : (
                <Login onLogin={logIn} goToSignUp={goToSignUp} />
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
