import React, { useContext, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import LoggedInApp from "./LoggedInApp";
import UnAuthApp from "./UnAuthApp";
import { GlobalContext } from "./state/GlobalContext";
import { firebaseAuth } from "./firebase";

const MainApp = () => {
    const [{ loggedIn }, dispatch] = useContext(GlobalContext);

    useEffect(() => {
        SplashScreen.preventAutoHideAsync();

        return firebaseAuth.onAuthStateChanged((authUser) => {
            if (authUser) {
                dispatch({
                    type: "LOGIN",
                    payload: {
                        name: authUser.displayName,
                        picUrl:
                            authUser.photoURL ||
                            "https://avatars.githubusercontent.com/u/5554486",
                        id: authUser.uid,
                        email: authUser.email
                    }
                });
                SplashScreen.hideAsync();
            }
        });
    }, []);

    return loggedIn ? <LoggedInApp /> : <UnAuthApp />;
};

export default MainApp;
