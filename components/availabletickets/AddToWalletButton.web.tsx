import * as React from "react";
import {Image, TouchableOpacity} from "react-native";

const AddToWalletButton: React.FC = ({children}) => {
    return (<a href={require('./../../assets/wl_pass.pkpass')}> <TouchableOpacity style={{alignItems: "center"}}>
        <Image source={require('./../../assets/images/wallet.png')}
               style={{resizeMode: "contain", width: 400, height: 100}}
        />
    </TouchableOpacity></a>)
}

export default AddToWalletButton;
