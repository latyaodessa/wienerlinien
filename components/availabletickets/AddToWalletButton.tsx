import * as React from "react";
import {Image, TouchableOpacity} from "react-native";
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const AddToWalletButton: React.FC = ({children}) => {

    const callback = downloadProgress => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        console.log(progress);
    };


    const downloadResumable = FileSystem.createDownloadResumable(
        'https://wl.erfolg100.com/fixed/wl_pass.pkpass',
        FileSystem.documentDirectory + 'wl_pass.pkpass',
        {},
        callback
    );

    const share = () => {

        downloadResumable.downloadAsync().then(({uri}) => {
            console.log(uri)
            Sharing.shareAsync(uri);

        })
            .catch(error => {
                console.error(error);
            });
    }

    return <TouchableOpacity style={{alignItems: "center"}} onPress={share}>
        <Image source={require('./../../assets/images/wallet.png')}
               style={{resizeMode: "contain", width: 400, height: 100}}
        />
    </TouchableOpacity>
}

export default AddToWalletButton;
