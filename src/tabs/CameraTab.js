import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CameraTab = () => {
    return (
        <View style={styles.container}>
            <Text>CameraTab</Text>
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

export default CameraTab;
