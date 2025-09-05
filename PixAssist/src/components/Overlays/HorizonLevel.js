import React from 'react';
import { View, StyleSheet } from 'react-native';
import { OVERLAY_STYLES } from '../../constants/overlayStyles';

const HorizonLevel = ({ width, height, opacity = 0.8 }) => {
  const centerY = height / 2;

  return (
    <View style={[styles.container, { pointerEvents: 'none' }]}>
      {/* Horizon line */}
      <View 
        style={[
          styles.horizonLine,
          {
            top: centerY,
            width: width,
            opacity: opacity,
            borderColor: OVERLAY_STYLES.colors.primary,
            borderTopWidth: OVERLAY_STYLES.lineWeights.medium,
          }
        ]} 
      />
      
      {/* Center reference markers */}
      <View 
        style={[
          styles.centerMarker,
          {
            left: width / 2 - 15,
            top: centerY - 10,
            width: 30,
            height: 20,
            opacity: opacity,
            borderColor: OVERLAY_STYLES.colors.primary,
            borderWidth: OVERLAY_STYLES.lineWeights.thin,
          }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  horizonLine: {
    position: 'absolute',
    height: 0,
  },
  centerMarker: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});

export default HorizonLevel;