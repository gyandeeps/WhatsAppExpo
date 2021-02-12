import React from "react";
import { StyleSheet, View } from "react-native";
import Camera from "../components/Camera";

const CameraTab = ({ active }) => {
    return (
        <View style={styles.container}>
            {active && <Camera onPicCapture={(data) => console.log(data)} />}
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
