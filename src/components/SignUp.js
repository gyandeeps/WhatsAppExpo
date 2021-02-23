import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground
} from "react-native";

const SignUp = ({ toLoginPage, onSignUp }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const isDisabled = email.length < 5 || password.length < 5 || name < 5;
    const sign = () => onSignUp({ email, password, name });

    return (
        <ImageBackground
            style={styles.container}
            imageStyle={styles.imageTarget}
            source={{
                uri:
                    "https://web.whatsapp.com/img/bg-chat-tile-light_04fcacde539c58cca6745483d4858c52.png"
            }}
        >
            <TextInput
                key="Name"
                placeholder="Name"
                placeholderTextColor="grey"
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                autoCompleteType="name"
                autoFocus
                textContentType="name"
            />
            <TextInput
                key="Email"
                placeholder="Email"
                placeholderTextColor="grey"
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                autoCompleteType="email"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
            />
            <TextInput
                key="Password"
                placeholder="Password"
                placeholderTextColor="grey"
                style={styles.textInput}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCompleteType="password"
                autoCorrect={false}
                textContentType="newPassword"
                passwordRules="minlength: 5;"
                onSubmitEditing={sign}
            />
            <TouchableOpacity
                style={StyleSheet.compose([
                    styles.button,
                    isDisabled && styles.buttonDisabled
                ])}
                onPress={sign}
                activeOpacity={0.5}
                disabled={isDisabled}
            >
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={toLoginPage}
                activeOpacity={0.5}
            >
                <Text style={styles.buttonText}>Login Page</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4aa79ea3",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    imageTarget: {
        opacity: 0.3
    },
    textInput: {
        fontSize: 18,
        height: 45,
        width: 250,
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 15,
        padding: 5,
        margin: 5,
        color: "black",
        backgroundColor: "#ece9e9"
    },
    button: {
        fontSize: 18,
        height: 45,
        width: 250,
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 15,
        padding: 5,
        margin: 5,
        color: "white",
        backgroundColor: "#1c8c81",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontSize: 18,
        color: "white",
        fontWeight: "700"
    },
    buttonDisabled: {
        backgroundColor: "grey"
    }
});

export default SignUp;
