import React from "react";
import {
    StyleSheet,
    ImageBackground,
    View,
    TouchableOpacity
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

const CameraPreview = ({ photo, onUse, onDismiss, style }) => (
    <View style={[styles.container, style]}>
        <ImageBackground
            source={{ uri: photo && photo.uri }}
            style={{
                flex: 1
            }}
        />
        <View style={styles.footer}>
            <TouchableOpacity onPress={onDismiss}>
                <AntDesign name="close" size={48} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.use} onPress={() => onUse(photo)}>
                <MaterialCommunityIcons
                    name="send-circle"
                    size={48}
                    color="#009688"
                />
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent"
    },
    footer: {
        position: "absolute",
        bottom: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%"
    }
});

export default CameraPreview;
