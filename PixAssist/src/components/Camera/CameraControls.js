import React from 'react';
import { View, Text, TouchableOpacity, Slider, StyleSheet } from 'react-native';
import { OVERLAY_TYPES } from '../../constants/overlayStyles';

const CameraControls = ({ 
  activeOverlay, 
  setActiveOverlay, 
  overlayOpacity, 
  setOverlayOpacity, 
  overlaysVisible, 
  setOverlaysVisible 
}) => {
  const overlayOptions = [
    { key: OVERLAY_TYPES.RULE_OF_THIRDS, label: 'Rule of Thirds' },
    { key: OVERLAY_TYPES.CENTER_FOCUS, label: 'Center Focus' },
    { key: OVERLAY_TYPES.HORIZON_LEVEL, label: 'Horizon' },
    { key: OVERLAY_TYPES.SQUARE_FRAME, label: 'Square' },
    { key: OVERLAY_TYPES.PORTRAIT_FRAME, label: 'Portrait' },
    { key: OVERLAY_TYPES.STORY_FRAME, label: 'Story' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.overlaySelector}>
        {overlayOptions.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.overlayButton,
              activeOverlay === option.key && styles.activeOverlayButton
            ]}
            onPress={() => setActiveOverlay(option.key)}
          >
            <Text style={[
              styles.overlayButtonText,
              activeOverlay === option.key && styles.activeOverlayButtonText
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.visibilityButton}
          onPress={() => setOverlaysVisible(!overlaysVisible)}
        >
          <Text style={styles.buttonText}>
            {overlaysVisible ? 'Hide' : 'Show'} Overlay
          </Text>
        </TouchableOpacity>

        {overlaysVisible && (
          <View style={styles.opacityControl}>
            <Text style={styles.opacityLabel}>Opacity: {Math.round(overlayOpacity * 100)}%</Text>
            <Slider
              style={styles.slider}
              minimumValue={0.3}
              maximumValue={0.8}
              value={overlayOpacity}
              onValueChange={setOverlayOpacity}
              thumbStyle={styles.sliderThumb}
              trackStyle={styles.sliderTrack}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    padding: 15,
  },
  overlaySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  overlayButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 8,
  },
  activeOverlayButton: {
    backgroundColor: '#007AFF',
  },
  overlayButtonText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  activeOverlayButtonText: {
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  visibilityButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  opacityControl: {
    flex: 1,
    marginLeft: 15,
  },
  opacityLabel: {
    color: 'white',
    fontSize: 12,
    marginBottom: 5,
  },
  slider: {
    height: 20,
  },
  sliderThumb: {
    backgroundColor: '#007AFF',
  },
  sliderTrack: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

export default CameraControls;