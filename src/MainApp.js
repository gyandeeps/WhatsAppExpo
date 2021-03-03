import React, { useContext, useEffect } from "react";
// import * as SplashScreen from "expo-splash-screen";
import LoggedInApp from "./LoggedInApp";
import UnAuthApp from "./UnAuthApp";
import { GlobalContext } from "./state/GlobalContext";
import { firebaseAuth } from "./firebase/firebase";
import { getAllUser } from "./firebase/users";

const MainApp = () => {
    const [{ loggedIn }, dispatch] = useContext(GlobalContext);

    useEffect(() => {
        // SplashScreen.preventAutoHideAsync();

        return firebaseAuth.onAuthStateChanged((authUser) => {
            if (authUser) {
                getAllUser().then((users) => {
                    dispatch({
                        type: "USERS_DATA",
                        payload: users
                    });
                });
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
                // setTimeout(SplashScreen.hideAsync, 1000);
            }
        });
    }, []);

    return loggedIn ? <LoggedInApp /> : <UnAuthApp />;
};

export default MainApp;
