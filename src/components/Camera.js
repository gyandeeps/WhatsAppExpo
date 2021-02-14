import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Platform,
    Dimensions
} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { Entypo, Ionicons, AntDesign } from "@expo/vector-icons";
import CameraPreview from "./CameraPreview";
import Modal from "modal-react-native-web";
import { Overlay } from "react-native-elements";

const CameraComp = ({ onPicCapture, onClose }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const camera = useRef(null);
    const [photo, setPhoto] = useState(null);
    const [cameraReady, setCameraReady] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <Text>permission null</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const capturePic = async () => {
        if (camera.current && cameraReady) {
            camera.current
                .takePictureAsync()
                .then(setPhoto)
                .catch((e) => console.error(e));
        }
    };

    return (
        <Overlay
            isVisible
            {...(Platform.OS === "web" ? { ModalComponent: Modal } : null)}
            overlayStyle={styles.container}
            fullScreen
        >
            {!cameraReady && (
                <ActivityIndicator style={styles.loading} size="large" />
            )}
            {photo && (
                <CameraPreview
                    photo={photo}
                    onUse={onPicCapture}
                    onDismiss={() => setPhoto(null)}
                    style={[
                        styles.cameraPreview,
                        {
                            height:
                                Dimensions.get("window").height -
                                (Platform.OS !== "web" ? 20 : 0),
                            width: Dimensions.get("window").width
                        }
                    ]}
                />
            )}
            <Camera
                style={styles.camera}
                type={type}
                ratio="16:9"
                ref={camera}
                onCameraReady={() => setCameraReady(true)}
            >
                {onClose && (
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose}>
                            <AntDesign name="close" size={48} color="white" />
                        </TouchableOpacity>
                    </View>
                )}
                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={capturePic}
                        disabled={!cameraReady}
                    >
                        <Entypo name="circle" size={48} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.cameraReverse}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}
                        disabled={!cameraReady}
                    >
                        <Ionicons
                            name="camera-reverse"
                            size={48}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </Camera>
        </Overlay>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "grey",
        padding: 0
    },
    camera: {
        flex: 1,
        backgroundColor: "#777373"
    },
    footer: {
        position: "absolute",
        bottom: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%"
    },
    header: {
        position: "absolute",
        top: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "100%"
    },
    cameraReverse: {
        position: "absolute",
        right: 30
    },
    loading: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        zIndex: 1
    },
    cameraPreview: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 5
    }
});

export default CameraComp;
