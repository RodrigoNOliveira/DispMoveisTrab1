import { Camera, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import IconButton from '../components/IconButton';
import ExemploLocation from './Location';
import ExemploSharing from './Sharing';

const { width, height } = Dimensions.get('window');

export default function ExemploCamera() {
    // Define se usará a câmera frontal ou traseira
    const [tipoCamera, setTipoCamera] = useState(CameraType.back);
    // Permissão do usuário para usar a Câmera
    const [permissao, solicitaPermissao] = Camera.useCameraPermissions();
    // Armazena a foto tirada
    const [foto, setFoto] = useState(null);

    const camera = useRef();

    if (!permissao) {
        // Permissão da Câmera ainda está sendo carregada
        return <View />;
    }

    if (!permissao.granted) {
        // Permissão da Câmera não foi concedida
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>Nós precisamos de sua permissão para abrir a camera</Text>
                <Button onPress={solicitaPermissao} title="Conceder permissão" />
            </View>
        );
    }

    function mudarTipoCamera() {
        setTipoCamera(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    async function tirarFoto() {
        
        const fotoTirada = await camera.current.takePictureAsync();
        setFoto(fotoTirada);

    }

    function limpaFoto() {
        setFoto(null);
    }

    if ( foto !== null ) {
        return (
            <View style={styles.container}>
                <View style={styles.photoContainer} >
                    <TouchableOpacity onPress={limpaFoto}>
                    <Image source={{ uri: foto.uri }} style={styles.pic} width={((width/foto.width) * foto.width)-40} height={height-200}/> 
                    </TouchableOpacity>
                </View>
                <View style={styles.itens}>
                    <ExemploLocation style={styles.local}/>
                    <ExemploSharing foto={foto} style={styles.compartilhar}/> 
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.teste}>
            <Camera ref={camera} style={styles.camera} type={tipoCamera} />
            </View> 
            <View style={styles.buttonContainer}>
                <IconButton name="refresh" onPress={mudarTipoCamera} />
                <IconButton name="camera"  onPress={tirarFoto}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: width -20,
        margin:40, 
        padding: 2,
    },
    camera: {
        flex: 1,
        
        
    },
    teste:{
        height: height-200,
        borderWidth: 10,
        borderRadius: 20,
        borderColor: 'gray'
    },
    pic:{
        borderWidth: 8,
        borderRadius: 20,
        borderColor: 'gray'
        
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        
    },
    photoContainer: {
        flex: 1,
        width: width,
        padding: 4

    },
    photo: {
        
    }, 
    itens:{
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'center',
        alignItems: 'flex-end'
        

    }
});
