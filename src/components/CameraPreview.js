import React from "react";
import {
    StyleSheet,
    ImageBackground,
    View,
    TouchableOpacity
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

const CameraPreview = ({ photo, onUse, onDismiss, style }) => (
    <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={[style, styles.container]}
    >
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
    </ImageBackground>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
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
