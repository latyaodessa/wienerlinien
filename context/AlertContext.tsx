import * as React from "react";

const initialState = {
    type: "close",
    open: false,
    alertType: "info",
    message: ""
};

export const AlertContext = React.createContext<Partial<{
    alertState: any;
    dispatchAlert: any
}>>({});

const reducer = (state, action) => {
    switch (action.type) {
        case "close":
            return {
                ...initialState
            };
        case "open":
            return {
                open: true,
                alertType: action.alertType,
                message: action.message
            };
        default:
            throw new Error();
    }
};

export const AlertProvider: React.FC<any> = ({children}) => {
    const [alertState, dispatchAlert] = React.useReducer(reducer, initialState);
    return (
        <AlertContext.Provider
            value={{
                alertState,
                dispatchAlert
            }}>
            {children}
        </AlertContext.Provider>
    );
};
