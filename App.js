import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

import ExemploCamera from './exemplos/Camera';

const back = require('./assets/back.jpg')

export default function App() {
	return (

		<View style={styles.container}>
			<ImageBackground source={back} resizeMode="cover" style={styles.image}>
			<ExemploCamera />
			<StatusBar style="auto" />
			</ImageBackground>
		</View>
	);
	
	
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
});
