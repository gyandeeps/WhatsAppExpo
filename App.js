import "react-native-gesture-handler";
import React, { useState } from "react";
import { MenuProvider } from "react-native-popup-menu";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GlobalState } from "./src/state/GlobalContext";
import LoggedInApp from "./src/LoggedInApp";
import UnAuthApp from "./src/UnAuthApp";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    // setTimeout(() => setLoggedIn(true), 1000); // For dev purpose only

    return (
        <SafeAreaProvider>
            <MenuProvider>
                <GlobalState>
                    {loggedIn ? <LoggedInApp /> : <UnAuthApp />}
                </GlobalState>
            </MenuProvider>
        </SafeAreaProvider>
    );
};

export default App;
