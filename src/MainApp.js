import React, { useContext, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import LoggedInApp from "./LoggedInApp";
import UnAuthApp from "./UnAuthApp";
import { GlobalContext } from "./state/GlobalContext";

const MainApp = () => {
    const [{ loggedIn }, dispatch] = useContext(GlobalContext);

    useEffect(() => {
        // SplashScreen.preventAutoHideAsync();
        // just testing
        // setTimeout(() => {
        // SplashScreen.hideAsync();
        // dispatch({
        //     type: "LOGIN",
        //     payload: {
        //         name: "Gyandeep Singh",
        //         picUrl: "https://avatars.githubusercontent.com/u/5554486",
        //         id: 1,
        //         email: "asd"
        //     }
        // });
        // }, 100);
    }, []);

    return loggedIn ? <LoggedInApp /> : <UnAuthApp />;
};

export default MainApp;
