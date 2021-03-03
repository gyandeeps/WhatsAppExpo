import { useContext } from "react";
import { getGroupsById } from "../firebase/groups";
import { getUserGroups } from "../firebase/users";
import { GlobalContext } from "./GlobalContext";

export const NETWORK_STATUS = {
    IDLE: 0,
    IN_FLIGHT: 1,
    SUCCESS: 2,
    FAILED: 4
};

export const useChatItems = () => {
    const [{ chatItems, networkStatus, loggedInUser }, dispatch] = useContext(
        GlobalContext
    );

    useEffect(() => {
        if (networkStatus.groups === NETWORK_STATUS.IDLE) {
            dispatch({
                type: "REQUEST_INFLIGHT",
                payload: "groups"
            });

            getUserGroups(loggedInUser.id)
                .then((groups) => getGroupsById(groups))
                .then((groupsData) => {
                    dispatch({
                        type: "GROUPS_DATA",
                        payload: groupsData
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [dispatch, networkStatus.groups, loggedInUser]);

    return chatItems;
};
