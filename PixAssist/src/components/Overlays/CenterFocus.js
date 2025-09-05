import React from 'react';
import { View, StyleSheet } from 'react-native';
import { OVERLAY_STYLES } from '../../constants/overlayStyles';

const CenterFocus = ({ width, height, opacity = 0.9 }) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 60;

  return (
    <View style={[styles.container, { pointerEvents: 'none' }]}>
      {/* Center circle */}
      <View 
        style={[
          styles.centerCircle,
          {
            left: centerX - radius,
            top: centerY - radius,
            width: radius * 2,
            height: radius * 2,
            borderRadius: radius,
            opacity: opacity,
            borderColor: OVERLAY_STYLES.colors.focus,
            borderWidth: OVERLAY_STYLES.lineWeights.medium,
          }
        ]} 
      />
      
      {/* Crosshair lines */}
      <View 
        style={[
          styles.horizontalCrosshair,
          {
            left: centerX - 20,
            top: centerY,
            width: 40,
            opacity: opacity,
            borderColor: OVERLAY_STYLES.colors.focus,
            borderTopWidth: OVERLAY_STYLES.lineWeights.medium,
          }
        ]} 
      />
      <View 
        style={[
          styles.verticalCrosshair,
          {
            left: centerX,
            top: centerY - 20,
            height: 40,
            opacity: opacity,
            borderColor: OVERLAY_STYLES.colors.focus,
            borderLeftWidth: OVERLAY_STYLES.lineWeights.medium,
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
  centerCircle: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  horizontalCrosshair: {
    position: 'absolute',
    height: 0,
  },
  verticalCrosshair: {
    position: 'absolute',
    width: 0,
  },
});

export default CenterFocus;