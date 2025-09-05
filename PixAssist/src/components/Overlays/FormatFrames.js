import React from 'react';
import { View, StyleSheet } from 'react-native';
import { OVERLAY_STYLES } from '../../constants/overlayStyles';

const FormatFrames = ({ width, height, format, opacity = 0.8 }) => {
  const getFrameDimensions = (format, screenWidth, screenHeight) => {
    let frameWidth, frameHeight;
    
    switch (format) {
      case 'square_1_1':
        // 1:1 square
        frameWidth = Math.min(screenWidth, screenHeight) * 0.9;
        frameHeight = frameWidth;
        break;
      case 'portrait_4_5':
        // 4:5 portrait (Instagram feed)
        frameWidth = screenWidth * 0.9;
        frameHeight = (frameWidth * 5) / 4;
        if (frameHeight > screenHeight * 0.9) {
          frameHeight = screenHeight * 0.9;
          frameWidth = (frameHeight * 4) / 5;
        }
        break;
      case 'story_9_16':
        // 9:16 story format
        frameHeight = screenHeight * 0.9;
        frameWidth = (frameHeight * 9) / 16;
        if (frameWidth > screenWidth * 0.9) {
          frameWidth = screenWidth * 0.9;
          frameHeight = (frameWidth * 16) / 9;
        }
        break;
      default:
        return null;
    }
    
    return {
      width: frameWidth,
      height: frameHeight,
      left: (screenWidth - frameWidth) / 2,
      top: (screenHeight - frameHeight) / 2,
    };
  };

  const frameDimensions = getFrameDimensions(format, width, height);
  
  if (!frameDimensions) return null;

  return (
    <View style={[styles.container, { pointerEvents: 'none' }]}>
      {/* Semi-transparent overlay outside frame */}
      <View style={[styles.overlay, { opacity: opacity * 0.3 }]}>
        {/* Top overlay */}
        <View style={[styles.overlaySection, { height: frameDimensions.top, width: width, backgroundColor: 'black' }]} />
        
        {/* Middle section with left and right overlays */}
        <View style={[styles.middleSection, { height: frameDimensions.height }]}>
          <View style={[styles.overlaySection, { width: frameDimensions.left, height: frameDimensions.height, backgroundColor: 'black' }]} />
          <View style={[styles.frameArea, { width: frameDimensions.width, height: frameDimensions.height }]} />
          <View style={[styles.overlaySection, { width: width - frameDimensions.left - frameDimensions.width, height: frameDimensions.height, backgroundColor: 'black' }]} />
        </View>
        
        {/* Bottom overlay */}
        <View style={[styles.overlaySection, { height: height - frameDimensions.top - frameDimensions.height, width: width, backgroundColor: 'black' }]} />
      </View>
      
      {/* Frame border */}
      <View 
        style={[
          styles.frameBorder,
          {
            left: frameDimensions.left,
            top: frameDimensions.top,
            width: frameDimensions.width,
            height: frameDimensions.height,
            opacity: opacity,
            borderColor: OVERLAY_STYLES.colors.focus,
            borderWidth: OVERLAY_STYLES.lineWeights.thick,
          }
        ]} 
      />
      
      {/* Corner markers */}
      {[
        { left: frameDimensions.left - 5, top: frameDimensions.top - 5 },
        { left: frameDimensions.left + frameDimensions.width - 25, top: frameDimensions.top - 5 },
        { left: frameDimensions.left - 5, top: frameDimensions.top + frameDimensions.height - 25 },
        { left: frameDimensions.left + frameDimensions.width - 25, top: frameDimensions.top + frameDimensions.height - 25 },
      ].map((corner, index) => (
        <View 
          key={index}
          style={[
            styles.cornerMarker,
            {
              left: corner.left,
              top: corner.top,
              opacity: opacity,
              borderColor: OVERLAY_STYLES.colors.focus,
              borderWidth: OVERLAY_STYLES.lineWeights.thick,
            }
          ]} 
        />
      ))}
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlaySection: {
    backgroundColor: 'black',
  },
  middleSection: {
    flexDirection: 'row',
  },
  frameArea: {
    backgroundColor: 'transparent',
  },
  frameBorder: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  cornerMarker: {
    position: 'absolute',
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
  },
});

export default FormatFrames;