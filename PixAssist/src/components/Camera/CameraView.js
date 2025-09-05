import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Alert, Text } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import OverlaySystem from './OverlaySystem';
import CameraControls from './CameraControls';
import { OVERLAY_TYPES } from '../../constants/overlayStyles';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CameraView = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [activeOverlay, setActiveOverlay] = useState(OVERLAY_TYPES.RULE_OF_THIRDS);
  const [overlayOpacity, setOverlayOpacity] = useState(0.8);
  const [overlaysVisible, setOverlaysVisible] = useState(true);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');

      const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryStatus === 'granted');
    })();
  }, []);

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log('Photo taken:', photo.uri);
        if (hasMediaLibraryPermission) {
          await MediaLibrary.saveToLibraryAsync(photo.uri);
          Alert.alert('Success', 'Photo saved to your library!');
        } else {
          Alert.alert('Permission denied', 'Cannot save photo without media library permission.');
        }
      } catch (error) {
        console.error('Error taking photo:', error);
        Alert.alert('Error', 'Could not take photo.');
      }
    }
  };

  if (hasCameraPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasCameraPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No access to camera. Please enable camera permission in settings.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ratio="16:9"
      >
        {/* Overlay System */}
        <OverlaySystem
          width={screenWidth}
          height={screenHeight}
          activeOverlay={activeOverlay}
          opacity={overlayOpacity}
          isVisible={overlaysVisible}
        />

        {/* Camera Controls */}
        <CameraControls
          activeOverlay={activeOverlay}
          setActiveOverlay={setActiveOverlay}
          opacity={overlayOpacity}
          setOpacity={setOverlayOpacity}
          isVisible={overlaysVisible}
          setIsVisible={setOverlaysVisible}
          onCapture={handleTakePhoto}
        />
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  message: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  },
});

export default CameraView;