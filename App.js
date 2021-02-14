import "react-native-gesture-handler";
import React from "react";
import { MenuProvider } from "react-native-popup-menu";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GlobalState } from "./src/state/GlobalContext";
import MainApp from "./src/MainApp";

const App = () => (
    <SafeAreaProvider>
        <MenuProvider>
            <GlobalState>
                <MainApp />
            </GlobalState>
        </MenuProvider>
    </SafeAreaProvider>
);

export default App;
