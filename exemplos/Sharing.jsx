import { useState } from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import IconButton from '../components/IconButton';
import * as ImageManipulator from "expo-image-manipulator";
import * as Sharing from 'expo-sharing';

const { width, height } = Dimensions.get('window');

export default function ExemploSharing({foto}) {

    async function compartilhar() {
        if ( !foto )
            return;

        const imageProc = await ImageManipulator.manipulateAsync(foto.uri);
        await Sharing.shareAsync(imageProc.uri);
    }


    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <IconButton name="share-square-o" onPress={compartilhar} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: width,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    photoContainer: {
        flex: 3, 
        justifyContent: 'center', 
        alignItems: 'center', 
    }
});
