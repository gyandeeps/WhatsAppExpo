import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground
} from "react-native";

const Login = ({ onLogin, goToSignUp, message }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const isDisabled = email.length < 5 || password.length < 5;
    const login = () => onLogin(email, password);

    return (
        <ImageBackground
            style={styles.container}
            imageStyle={styles.imageTarget}
            source={{
                uri:
                    "https://web.whatsapp.com/img/bg-chat-tile-light_04fcacde539c58cca6745483d4858c52.png"
            }}
        >
            {message && <Text>{message}</Text>}
            <TextInput
                key="Email"
                placeholder="Email"
                placeholderTextColor="grey"
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                autoCompleteType="email"
                autoCorrect={false}
                autoFocus
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
                textContentType="password"
            />
            <TouchableOpacity
                style={StyleSheet.compose([
                    styles.button,
                    isDisabled && styles.buttonDisabled
                ])}
                onPress={login}
                activeOpacity={0.5}
                disabled={isDisabled}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={goToSignUp}
                activeOpacity={0.5}
            >
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(0, 150, 136)",
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
        backgroundColor: "#0a675e",
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

export default Login;
