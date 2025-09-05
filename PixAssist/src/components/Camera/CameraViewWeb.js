import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Alert, Text, Platform } from 'react-native';
import OverlaySystem from './OverlaySystem';
import CameraControls from './CameraControls';
import { OVERLAY_TYPES } from '../../constants/overlayStyles';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CameraViewWeb = () => {
  const [activeOverlay, setActiveOverlay] = useState(OVERLAY_TYPES.RULE_OF_THIRDS);
  const [overlayOpacity, setOverlayOpacity] = useState(0.8);
  const [overlaysVisible, setOverlaysVisible] = useState(true);
  
  // For web demo, we'll show a simulated camera preview
  const isWeb = Platform.OS === 'web';

  return (
    <View style={styles.container}>
      {/* Simulated Camera Preview for Web Demo */}
      <View style={styles.cameraPreview}>
        <View style={styles.simulatedCamera}>
          <Text style={styles.demoText}>
            📱 PixAssist Camera Demo
          </Text>
          <Text style={styles.subText}>
            Camera overlay system with 6 template types
          </Text>
          <Text style={styles.instructionText}>
            ✨ Try the controls below to see different overlays
          </Text>
        </View>
        
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
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  cameraPreview: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  simulatedCamera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
  },
  demoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  instructionText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default CameraViewWeb;