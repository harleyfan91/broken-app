import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Slider } from 'react-native';
import { OVERLAY_TYPES } from '../../constants/overlayStyles';

const CameraControls = ({ 
  activeOverlay, 
  setActiveOverlay, 
  opacity, 
  setOpacity, 
  isVisible, 
  setIsVisible 
}) => {
  const overlayOptions = [
    { key: OVERLAY_TYPES.RULE_OF_THIRDS, label: 'Grid' },
    { key: OVERLAY_TYPES.CENTER_FOCUS, label: 'Focus' },
    { key: OVERLAY_TYPES.HORIZON_LEVEL, label: 'Level' },
    { key: OVERLAY_TYPES.SQUARE_1_1, label: '1:1' },
    { key: OVERLAY_TYPES.PORTRAIT_4_5, label: '4:5' },
    { key: OVERLAY_TYPES.STORY_9_16, label: '9:16' },
  ];

  return (
    <View style={styles.container}>
      {/* Overlay Toggle */}
      <TouchableOpacity 
        style={[styles.toggleButton, { backgroundColor: isVisible ? '#007AFF' : '#666' }]}
        onPress={() => setIsVisible(!isVisible)}
      >
        <Text style={styles.toggleButtonText}>
          {isVisible ? 'Hide' : 'Show'}
        </Text>
      </TouchableOpacity>

      {/* Template Selector */}
      <View style={styles.templateSelector}>
        {overlayOptions.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.templateButton,
              { backgroundColor: activeOverlay === option.key ? '#007AFF' : '#333' }
            ]}
            onPress={() => setActiveOverlay(option.key)}
          >
            <Text style={styles.templateButtonText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Opacity Slider */}
      {isVisible && (
        <View style={styles.opacityControl}>
          <Text style={styles.opacityLabel}>Opacity: {Math.round(opacity * 100)}%</Text>
          <Slider
            style={styles.slider}
            minimumValue={0.3}
            maximumValue={1.0}
            value={opacity}
            onValueChange={setOpacity}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#666"
            thumbStyle={styles.sliderThumb}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 15,
    padding: 15,
    zIndex: 20,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 15,
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  templateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  templateButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    minWidth: 45,
    alignItems: 'center',
  },
  templateButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  opacityControl: {
    alignItems: 'center',
  },
  opacityLabel: {
    color: 'white',
    fontSize: 14,
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 30,
  },
  sliderThumb: {
    backgroundColor: '#007AFF',
    width: 20,
    height: 20,
  },
});

export default CameraControls;