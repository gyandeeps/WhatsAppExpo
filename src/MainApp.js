import React, { useContext, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import LoggedInApp from "./LoggedInApp";
import UnAuthApp from "./UnAuthApp";
import { GlobalContext } from "./state/GlobalContext";

const MainApp = () => {
    const [{ loggedIn }] = useContext(GlobalContext);
    // setTimeout(() => setLoggedIn(true), 1000); // For dev purpose only

    useEffect(() => {
        SplashScreen.preventAutoHideAsync();
        // just testing
        setTimeout(SplashScreen.hideAsync, 1000);
    }, []);

    return loggedIn ? <LoggedInApp /> : <UnAuthApp />;
};

export default MainApp;
