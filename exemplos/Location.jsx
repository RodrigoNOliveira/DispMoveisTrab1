import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Device from 'expo-device';
import IconButton from '../components/IconButton';
import * as Location from 'expo-location';

export default function ExemploLocation() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);


    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permissão para acessar a localização foi negada');
                return;
            }

            // Peganod a localização a de onde foi tirado a foto
            let _location = await Location.getCurrentPositionAsync({});
            setLocation(_location);

            
        })();
    }, []);
           
    

    const handlePress = () => {
        Alert.alert('Localização de onde foi tirada a foto:\nLatitude: ' + location?.coords.latitude + '\nLongitude: ' + location?.coords.longitude)
              };

    if ( errorMsg ) {
        return (
            <View style={styles.container}>
                <Text style={[styles.paragraph, { fontWeight: 'bold', color: '#ff0000' }]}>{errorMsg}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <IconButton name="info"  onPress={handlePress}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderStyle: 'solid',
        borderColor: 'red'
    },
    paragraph: {
        fontSize: 14,
        textAlign: 'center',
    },
});
