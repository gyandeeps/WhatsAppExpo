import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { FontAwesome } from "@expo/vector-icons";

const customRoutes = (name) => () => (
    <View style={styles.scene}>
        <Text>{name}</Text>
    </View>
);

const initialLayout = { width: Dimensions.get("window").width };

const renderTabBar = (props) => (
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: "white" }}
        style={{
            backgroundColor: "rgb(0, 150, 136)",
            height: 50
        }}
        renderIcon={({ route, color }) => route.icon && route.icon(color)}
        renderLabel={({ route, color }) => (
            <Text style={{ color, fontWeight: "700" }}>{route.title}</Text>
        )}
    />
);

const renderScene = SceneMap({
    camera: customRoutes("camera"),
    chats: customRoutes("chats"),
    status: customRoutes("status"),
    calls: customRoutes("calls")
});

const ChatHomeScreen = () => {
    const [index, setIndex] = useState(1);
    const [routes] = useState([
        {
            key: "camera",
            icon: (color) => (
                <FontAwesome name="camera" size={24} color={color} />
            )
        },
        { key: "chats", title: "CHATS" },
        { key: "status", title: "STATUS" },
        { key: "calls", title: "CALLS" }
    ]);

    return (
        <View style={styles.container}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={renderTabBar}
            />
            <StatusBar style="light" backgroundColor="rgb(0, 150, 136)" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scene: {
        flex: 1,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#afb0a3"
    }
});

export default ChatHomeScreen;
