# PixAssist Technical Addendum
**Supplements:** PixAssist React Native App PRD v1.0  
**Date:** September 5, 2025  
**Purpose:** Address technical gaps and integration requirements for chosen tech stack

## Selected Tech Stack Validation
✅ **React Native Vision Camera** - Perfect for viewfinder guidance system  
✅ **Flatlogic React Native Starter** - UI foundation with navigation/auth  
✅ **Gluestack UI** - Modern component library (NativeBase successor)  
✅ **React Native Photo Editor** - Enhancement presets and filters  
✅ **React Native Image Picker** - Gallery integration  

## Additional Required Dependencies

### Core Missing Libraries
```json
{
  "react-native-svg": "^13.0.0",
  "@react-native-async-storage/async-storage": "^1.19.0", 
  "react-native-permissions": "^3.8.0",
  "react-native-share": "^9.0.0",
  "react-native-gesture-handler": "^2.12.0",
  "react-native-reanimated": "^3.4.0",
  "react-native-haptic-feedback": "^2.0.0"
}
```

**Rationale:**
- **react-native-svg**: Required for complex overlay shapes mentioned in PRD Section 3.2
- **AsyncStorage**: Template caching system from PRD Section 3.8
- **Permissions**: Camera/gallery access management 
- **Share**: Native share sheet from PRD Section 3.10
- **Gesture Handler + Reanimated**: Crop gestures from PRD Section 3.6
- **Haptic Feedback**: User preference mentioned in PRD Section 4.4

### Image Processing Additions
```json
{
  "react-native-image-editor": "^4.0.0",
  "@react-native-community/cameraroll": "^5.0.0",
  "react-native-vector-icons": "^10.0.0"
}
```

**Rationale:**
- **Image Editor**: Smart cropping system (PRD Section 3.6) - React Native Photo Editor doesn't handle aspect-ratio cropping
- **CameraRoll**: Gallery save functionality (PRD Section 3.10)
- **Vector Icons**: UI consistency across platforms

## Integration Strategy & Conflict Resolution

### Image Processing Pipeline
**Issue**: React Native Photo Editor overlaps with smart cropping requirements

**Solution**: Complementary usage pattern
```javascript
// Step 1: Cropping & Rotation → react-native-image-editor
const croppedImage = await ImageEditor.cropImage(originalUri, {
  offset: { x: 0, y: 0 },
  size: { width: 1080, height: 1080 }, // 1:1 aspect ratio
});

// Step 2: Enhancement & Filters → react-native-photo-editor  
const enhancedImage = await PhotoEditor.open(croppedImage, {
  preset: 'social_pop'
});
```

### Gluestack + Flatlogic Integration
**Approach**: Selective component usage
- **Keep from Flatlogic**: Navigation structure, authentication flow, screen layouts
- **Replace with Gluestack**: Form components, buttons, modals, overlays
- **Custom Components**: Camera controls, template selectors (build with Gluestack primitives)

### Permission Flow Implementation
```javascript
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const requestAllPermissions = async () => {
  const permissions = Platform.select({
    ios: [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY],
    android: [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE],
  });
  
  // Request and store results in AsyncStorage user preferences
};
```

## Architecture Additions

### Hybrid Overlay Renderer
```javascript
const OverlayRenderer = ({ template, opacity, dimensions }) => {
  // Performance optimization decision
  const shouldUseNativeView = 
    template.type === 'native_view' || 
    template.complexity < 5;
    
  return shouldUseNativeView ? (
    <NativeViewOverlay template={template} opacity={opacity} {...dimensions} />
  ) : (
    <SVGOverlay template={template} opacity={opacity} {...dimensions} />
  );
};
```

### Complete Image Pipeline
```javascript
const ImagePipeline = {
  // Capture with Vision Camera
  capture: (templateMetadata) => visionCamera.takePhoto(),
  
  // Crop with Image Editor  
  crop: (uri, aspectRatio) => ImageEditor.cropImage(uri, cropData),
  
  // Enhance with Photo Editor
  enhance: (uri, preset) => PhotoEditor.open(uri, preset),
  
  // Save with CameraRoll
  save: (uri) => CameraRoll.save(uri, { type: 'photo' })
};
```

## Performance Considerations

### Memory Management
- **Large Image Handling**: Use react-native-image-editor's progressive loading for >5MB images
- **Template Caching**: AsyncStorage with 50MB limit, LRU eviction for external templates
- **SVG Optimization**: Lazy load complex SVG templates, cache rendered versions

### Platform Optimizations
- **iOS**: Leverage Gluestack's iOS-specific components for native feel
- **Android**: Use Material Design variants from Gluestack
- **Camera**: Platform-specific Vision Camera configurations for optimal performance

## Updated File Structure
```
src/
├── components/
│   ├── camera/
│   │   ├── VisionCameraView.js
│   │   ├── OverlayRenderer.js (hybrid native/SVG)
│   │   └── TemplateSelector.js (Gluestack components)
│   ├── editing/
│   │   ├── SmartCropper.js (Image Editor)
│   │   └── PhotoEnhancer.js (Photo Editor)
│   └── ui/
│       └── GluestackComponents/ (replace Flatlogic UI)
├── services/
│   ├── ImagePipeline.js
│   ├── PermissionManager.js
│   └── TemplateCache.js
└── utils/
    ├── StorageManager.js (AsyncStorage)
    └── PlatformUtils.js
```

## Testing Strategy Additions
- **Camera Integration**: Test Vision Camera + overlay performance on low-end devices
- **Image Pipeline**: Verify Image Editor + Photo Editor compatibility with various formats
- **Permission Flow**: Test permission scenarios on both platforms
- **Gluestack Integration**: Verify component compatibility with Flatlogic starter