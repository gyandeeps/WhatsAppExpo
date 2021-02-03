import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CallsTab = () => {
    return (
        <View style={styles.container}>
            <Text>CallsTab</Text>
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

export default CallsTab;
