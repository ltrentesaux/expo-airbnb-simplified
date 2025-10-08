import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useRef, useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';

export default function PermissionsScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
    const [photo, setPhoto] = useState(null);
    const cameraRef = useRef(null);

    async function takePicture() {
        if (cameraRef.current) {
            const picture = await cameraRef.current.takePictureAsync();
            setPhoto(picture);
        }
    }

    async function savePicture() {
        if (photo) {
            try {
                await MediaLibrary.saveToLibraryAsync(photo.uri);
                Alert.alert('Photo enregistrée', 'La photo a été sauvegardée dans votre galerie.');
            } catch (error) {
                Alert.alert('Erreur', 'Impossible de sauvegarder la photo.');
            }
        }
    }

    if (!permission) return <View />;

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Besoin d'accès à la caméra !</Text>
                <Button onPress={requestPermission} title="Autoriser" />
            </View>
        );
    }

    if (!mediaLibraryPermission) {
        requestMediaLibraryPermission();
        return <View />;
    }

    if (!mediaLibraryPermission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Besoin d'accès à la galerie pour enregistrer la photo.</Text>
                <Button onPress={requestMediaLibraryPermission} title="Autoriser" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Aperçu de la caméra</Text>
            <View style={styles.cameraContainer}>
                {photo ? (
                    <Image source={{ uri: photo.uri }} style={styles.previewImage} />
                ) : (
                    <CameraView style={styles.camera} ref={cameraRef} facing="back" />
                )}
            </View>
            {photo ? (
                <View style={styles.buttonContainer}>
                    <Button title="Camera" onPress={() => setPhoto(null)} />
                    <Button title="Télécharger" onPress={savePicture} />
                </View>
            ) : (
                <Button title="Prendre une photo" onPress={takePicture} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
    },
    text: {
        marginBottom: 10,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    cameraContainer: {
        width: '80%',
        maxWidth: 750,
        aspectRatio: 3 / 4,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 20,
    },
    camera: {
        flex: 1,
    },
    previewImage: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
    },
});
