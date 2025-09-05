import React from 'react';
import { View, Text, TouchableOpacity, Slider, StyleSheet } from 'react-native';
import { OVERLAY_TYPES } from '../../constants/overlayStyles';

const CameraControls = ({
  activeOverlay,
  setActiveOverlay,
  overlayOpacity,
  setOverlayOpacity,
  overlaysVisible,
  setOverlaysVisible,
  onCapture
}) => {
  const overlayOptions = [
    { key: OVERLAY_TYPES.RULE_OF_THIRDS, label: 'Rule of Thirds' },
    { key: OVERLAY_TYPES.CENTER_FOCUS, label: 'Center Focus' },
    { key: OVERLAY_TYPES.HORIZON_LEVEL, label: 'Horizon Level' },
    { key: OVERLAY_TYPES.FORMAT_SQUARE, label: 'Square (1:1)' },
    { key: OVERLAY_TYPES.FORMAT_PORTRAIT, label: 'Portrait (4:5)' },
    { key: OVERLAY_TYPES.FORMAT_STORY, label: 'Story (9:16)' }
  ];

  return (
    <View style={styles.container}>
      {/* Template Selector */}
      <View style={styles.templateRow}>
        <Text style={styles.label}>Template:</Text>
        <View style={styles.templateButtons}>
          {overlayOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.templateButton,
                activeOverlay === option.key && styles.activeTemplate
              ]}
              onPress={() => setActiveOverlay(option.key)}
            >
              <Text style={[
                styles.templateText,
                activeOverlay === option.key && styles.activeTemplateText
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Opacity Control */}
      <View style={styles.controlRow}>
        <Text style={styles.label}>Opacity: {Math.round(overlayOpacity * 100)}%</Text>
        <Slider
          style={styles.slider}
          minimumValue={0.3}
          maximumValue={0.8}
          value={overlayOpacity}
          onValueChange={setOverlayOpacity}
          minimumTrackTintColor="#007AFF"
          maximumTrackTintColor="#CCCCCC"
          thumbTintColor="#007AFF"
        />
      </View>

      {/* Control Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.controlButton, styles.toggleButton]}
          onPress={() => setOverlaysVisible(!overlaysVisible)}
        >
          <Text style={styles.controlButtonText}>
            {overlaysVisible ? 'Hide Overlays' : 'Show Overlays'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.captureButton]}
          onPress={onCapture}
        >
          <Text style={styles.controlButtonText}>Capture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    paddingBottom: 40,
  },
  templateRow: {
    marginBottom: 15,
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  templateButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  templateButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeTemplate: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  templateText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  activeTemplateText: {
    fontWeight: '600',
  },
  controlRow: {
    marginBottom: 15,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  controlButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  captureButton: {
    backgroundColor: '#007AFF',
  },
  controlButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CameraControls;