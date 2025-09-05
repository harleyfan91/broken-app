import React from 'react';
import { View, StyleSheet } from 'react-native';
import RuleOfThirdsGrid from '../Overlays/RuleOfThirdsGrid';
import CenterFocus from '../Overlays/CenterFocus';
import HorizonLevel from '../Overlays/HorizonLevel';
import FormatFrames from '../Overlays/FormatFrames';
import { OVERLAY_TYPES } from '../../constants/overlayStyles';

const OverlaySystem = ({ 
  width, 
  height, 
  activeOverlay, 
  opacity = 0.8, 
  isVisible = true 
}) => {
  if (!isVisible) return null;

  const renderOverlay = () => {
    switch (activeOverlay) {
      case OVERLAY_TYPES.RULE_OF_THIRDS:
        return <RuleOfThirdsGrid width={width} height={height} opacity={opacity} />;
      case OVERLAY_TYPES.CENTER_FOCUS:
        return <CenterFocus width={width} height={height} opacity={opacity} />;
      case OVERLAY_TYPES.HORIZON_LEVEL:
        return <HorizonLevel width={width} height={height} opacity={opacity} />;
      case OVERLAY_TYPES.SQUARE_1_1:
        return <FormatFrames width={width} height={height} format="square_1_1" opacity={opacity} />;
      case OVERLAY_TYPES.PORTRAIT_4_5:
        return <FormatFrames width={width} height={height} format="portrait_4_5" opacity={opacity} />;
      case OVERLAY_TYPES.STORY_9_16:
        return <FormatFrames width={width} height={height} format="story_9_16" opacity={opacity} />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { pointerEvents: 'none' }]}>
      {renderOverlay()}
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
    zIndex: 10,
  },
});

export default OverlaySystem;