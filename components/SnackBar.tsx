import * as React from "react";
import {Snackbar} from "react-native-paper";
import {useTheme} from "@react-navigation/native";
import {AlertContext} from "../context/AlertContext";

const SnackBar = () => {
    const {alertState, dispatchAlert} = React.useContext(AlertContext);
    const {colors} = useTheme();

    const [alertSyle, setAlertStyle] = React.useState({
        backgroundColor: colors.notification
    });

    React.useEffect(() => {
        switch (alertState.alertType) {
            case "info":
                setAlertStyle({
                    backgroundColor: "#66cfff"
                });
                break;
            case "error":
                setAlertStyle({
                    backgroundColor: "red"
                });
                break;
            case "success":
                setAlertStyle({
                    backgroundColor: "#69f0ae"
                });
                break;
            default:
                setAlertStyle({
                    backgroundColor: "black"
                });
                break;
        }
    }, [alertState]);

    const closeMe = () => {
        dispatchAlert({type: "close"});
    };

    return (
        <>
            {typeof alertState.open === "boolean" && (
                <Snackbar
                    style={alertSyle}
                    visible={alertState.open}
                    onDismiss={() => closeMe()}

                >
                    {alertState.message}
                </Snackbar>
            )}
        </>
    );
};

export default SnackBar;
