# PixAssist

## Overview

PixAssist is a React Native camera application designed to help users capture better photos through live viewfinder guidance overlays. The app provides real-time composition assistance with customizable overlay templates including rule of thirds grids, center focus guides, horizon leveling, and platform-specific crop frames (square, portrait, story formats). Built with Expo and React Native Vision Camera, it targets both iOS and Android platforms with web compatibility for demonstrations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React Native with Expo SDK (~53.0.22)
- **Camera System**: Dual implementation using Expo Camera for native platforms and a web-compatible demo version for browser testing
- **Component Structure**: Modular overlay system with separate components for each guidance type (rule of thirds, center focus, horizon level, format frames)
- **State Management**: Local React state for camera controls, overlay selection, opacity, and visibility settings
- **Platform Detection**: Conditional rendering between native camera and web demo based on Platform.OS

### Camera Implementation
- **Native Platforms**: Expo Camera with full camera permissions and media library access
- **Web Platform**: Simulated camera view for demonstration purposes
- **Overlay System**: Absolute positioned View components that render over the camera preview without affecting the captured image
- **Real-time Controls**: Live adjustment of overlay opacity (30-80%), template switching, and show/hide functionality

### Overlay Architecture
- **Composition Tools**: Rule of thirds grid, center focus circle with crosshair, horizon level indicator
- **Format Frames**: Square (1:1), portrait (4:5), and story (9:16) crop guides with responsive sizing
- **Styling System**: Centralized overlay styles with consistent colors, line weights, and spacing ratios
- **Performance**: Pure View components without SVG for optimal rendering performance

### UI Components
- **CameraView**: Main camera container with permission handling and camera initialization
- **OverlaySystem**: Central overlay renderer that switches between different guidance types
- **CameraControls**: Bottom control panel with template selector, opacity slider, and visibility toggle
- **Individual Overlays**: Dedicated components for each guidance type with configurable dimensions and opacity

### Cross-Platform Compatibility
- **Native Features**: Full camera access, media library permissions, and device-specific optimizations
- **Web Fallback**: Demo interface showing overlay functionality without requiring camera hardware
- **Responsive Design**: Dynamic sizing based on screen dimensions for consistent appearance across devices

## External Dependencies

### Core Framework
- **Expo**: ~53.0.22 - Cross-platform development framework
- **React Native**: 0.79.5 - Mobile application framework
- **React**: 19.0.0 - Component library

### Camera and Media
- **expo-camera**: ~16.1.11 - Camera functionality for native platforms
- **expo-media-library**: ~17.1.7 - Media storage and permissions
- **react-native-vision-camera**: ^4.7.2 - Advanced camera capabilities (future enhancement)

### UI and Interaction
- **react-native-gesture-handler**: ~2.24.0 - Touch gesture management
- **react-native-reanimated**: ~3.17.4 - Smooth animations
- **react-native-svg**: 15.11.2 - Vector graphics support
- **react-native-vector-icons**: ^10.3.0 - Icon library

### Platform Support
- **react-native-web**: ^0.20.0 - Web platform compatibility
- **react-dom**: 19.0.0 - Web rendering support
- **@expo/metro-runtime**: ~5.0.4 - Metro bundler runtime

### Development Tools
- **@babel/core**: ^7.20.0 - JavaScript compilation