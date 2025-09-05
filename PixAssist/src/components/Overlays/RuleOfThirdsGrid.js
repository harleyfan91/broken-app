import React from 'react';
import { View, StyleSheet } from 'react-native';
import { OVERLAY_STYLES } from '../../constants/overlayStyles';

const RuleOfThirdsGrid = ({ width, height, opacity = 0.8 }) => {
  const gridSpacing = OVERLAY_STYLES.spacing.gridRatio;
  
  const horizontalLine1Y = height * gridSpacing;
  const horizontalLine2Y = height * (1 - gridSpacing);
  const verticalLine1X = width * gridSpacing;
  const verticalLine2X = width * (1 - gridSpacing);

  return (
    <View style={[styles.container, { pointerEvents: 'none' }]}>
      {/* Horizontal lines */}
      <View 
        style={[
          styles.horizontalLine,
          {
            top: horizontalLine1Y,
            width: width,
            opacity: opacity,
            borderColor: OVERLAY_STYLES.colors.primary,
            borderTopWidth: OVERLAY_STYLES.lineWeights.thin,
          }
        ]} 
      />
      <View 
        style={[
          styles.horizontalLine,
          {
            top: horizontalLine2Y,
            width: width,
            opacity: opacity,
            borderColor: OVERLAY_STYLES.colors.primary,
            borderTopWidth: OVERLAY_STYLES.lineWeights.thin,
          }
        ]} 
      />
      
      {/* Vertical lines */}
      <View 
        style={[
          styles.verticalLine,
          {
            left: verticalLine1X,
            height: height,
            opacity: opacity,
            borderColor: OVERLAY_STYLES.colors.primary,
            borderLeftWidth: OVERLAY_STYLES.lineWeights.thin,
          }
        ]} 
      />
      <View 
        style={[
          styles.verticalLine,
          {
            left: verticalLine2X,
            height: height,
            opacity: opacity,
            borderColor: OVERLAY_STYLES.colors.primary,
            borderLeftWidth: OVERLAY_STYLES.lineWeights.thin,
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
  horizontalLine: {
    position: 'absolute',
    height: 0,
  },
  verticalLine: {
    position: 'absolute',
    width: 0,
  },
});

export default RuleOfThirdsGrid;