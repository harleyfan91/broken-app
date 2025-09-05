# PixAssist React Native App – Product Requirements Document (PRD)

**Last updated:** September 5, 2025  
**Product Name:** PixAssist (React Native Mobile App MVP)  
**Version:** 1.0 (MVP – Native viewfinder guidance + basic enhancement + smart cropping)  
**Target Audience:** Anyone who needs better photos for their online presence – business owners, marketplace sellers, social media users, content creators, and photographers  
**Platforms:** iOS App Store, Google Play Store

## 1) Purpose & Goals

Create a native mobile application that helps users capture better photos through live viewfinder guidance overlays and basic image enhancement. The app provides real-time composition assistance with native camera performance without requiring photography expertise or expensive equipment.

- **Mobile-first native design:** iOS and Android apps with platform-specific optimizations
- **MVP focuses on:** Live viewfinder guidance + basic photo enhancement with presets + smart cropping
- **Guidance approach:** Native overlay components visible only during capture (nothing burns into final photo)
- **Content strategy:** Hybrid approach with core templates bundled + expanded library via external source
- **Performance priority:** Native camera performance with instant guidance feedback and smooth UI

## 2) Target Use Cases & Subject Types

### 2.1 Food & Drink Photography
**Common needs:** Product shots for menus, social media, delivery apps, and promotional materials.
**Viewfinder guidance:**
- Product focus circles for beverages, plates, pastries
- Flat lay grids for ingredient spreads and table settings  
- Angle guides for appetizing food photography
- Menu readability frames for signage/boards
- Bar/counter composition helpers

### 2.2 Products & Retail
**Common needs:** E-commerce listings, social media posts, catalog photography, and inventory documentation.
**Viewfinder guidance:**
- Clean product isolation circles and frames
- 45-degree angle helpers for dimensional items
- Flat lay grids for collections or product comparisons
- Size reference scales for listing consistency
- Background separation guides for clean product shots

### 2.3 People & Portraits  
**Common needs:** Professional headshots, before/after transformations, team photos, and social content.
**Viewfinder guidance:**
- Face framing with eye-line positioning guides
- Head-and-shoulders composition templates
- Group arrangement helpers with proper spacing
- Before/after positioning for service transformations
- Action/movement framing for dynamic shots

### 2.4 Interiors & Spaces
**Common needs:** Real estate listings, venue showcases, office spaces, and interior design portfolios.
**Viewfinder guidance:**
- Room corner guides to prevent keystone distortion
- Vertical alignment rails for architectural elements
- Door/window framing helpers for proper perspective
- Furniture arrangement composition aids
- Lighting zone optimization for room features

### 2.5 Exteriors & Buildings
**Common needs:** Property listings, business storefronts, construction documentation, and location showcases.
**Viewfinder guidance:**
- Building center frames with vertical correction
- Architectural perspective guides for proper angles
- Horizon leveling for landscape and property shots
- Sign/signage legibility zones for business exteriors
- Vehicle/property documentation templates

### 2.6 Services & Work
**Common needs:** Process documentation, before/after comparisons, workspace shots, and service demonstrations.
**Viewfinder guidance:**
- Before/after alignment guides for transformation documentation
- Tool/equipment positioning helpers for workspace shots
- Work area documentation frames for process photos
- Step-by-step composition aids for tutorials
- Detail/close-up focusing circles for precision work

## 3) MVP Feature Set (Phase 1)

### 3.1 Live Viewfinder Guidance System
- **Function:** Real-time native overlay components visible only during photo capture
- **Tech Approach:** react-native-vision-camera + positioned native Views + react-native-svg for complex shapes
- **Key principle:** Guidance overlays are NOT burned into the final photo
- **Overlay types:** Composition grids, framing guides, alignment rails, focus circles
- **Implementation:** Hybrid approach using native Views for basic shapes + SVG for complex designs
- **Controls:** Category selection, template picker, opacity adjustment (30-80%), quick toggle
- **Performance:** <50ms overlay rendering with native camera, no frame drops

### 3.2 Native Overlay Design System
**Consistent Visual Standards:**
```javascript
const OVERLAY_STYLES = {
  colors: {
    primary: 'rgba(255, 255, 255, 0.8)',
    subtle: 'rgba(255, 255, 255, 0.6)',
    focus: 'rgba(255, 255, 0, 0.9)',
    highContrast: 'rgba(255, 255, 255, 1.0)',
  },
  lineWeights: {
    thin: 1,      // Grid lines, subtle guides
    medium: 1.5,  // Standard overlay lines
    thick: 2,     // Focus frames, important boundaries
    bold: 3,      // Scan frames, critical guides
  },
  spacing: {
    gridRatio: 0.33333,  // Rule of thirds
    focusMargin: 60,     // Distance from screen edges
    cornerLength: 30,    // Corner bracket length
  }
};
```

**Implementation Strategy:**
- **Basic shapes** (grids, circles, rectangles): Pure React Native Views for optimal performance
- **Complex shapes** (custom paths, curves): React Native SVG with matching style constants
- **Consistent styling** across both approaches using shared design constants

### 3.3 Subject-Based Template Categories
**Six primary categories organized by what users are photographing:**
- **Food & Drink:** Product focus, flat lay grids, angle guides, menu frames
- **Products & Retail:** Isolation guides, dimensional helpers, collection grids, scale references
- **People & Portraits:** Face framing, group spacing, transformation alignment, action guides
- **Interiors & Spaces:** Room corners, vertical rails, door framing, lighting zones  
- **Exteriors & Buildings:** Building frames, perspective guides, horizon level, signage zones
- **Services & Work:** Process documentation, equipment positioning, detail focusing, step guides

**Template count per category:** 8-12 core templates bundled, 15-25 additional via external source

### 3.4 Universal Tools (Available Across All Categories)
**Composition Basics:**
- Rule of thirds grid (native Views)
- Center focus guide (native Views)
- Diagonal composition lines (SVG)
- Leading lines helper (SVG)

**Platform Format Overlays:**
- Square (1:1) for Instagram posts
- Portrait (4:5) for Instagram feed
- Story (9:16) for Instagram/TikTok Stories
- Landscape (16:9) for Facebook covers/YouTube
- Standard (3:2) for general photography

**Technical Helpers:**
- Horizon level indicator
- Vertical alignment rails
- Edge safety margins for platform cropping

### 3.5 Hybrid Content Delivery System
**Core Templates (Bundled in App):**
- 15-20 essential templates across all categories
- Always available, works offline
- Fast loading, cached locally in AsyncStorage
- Covers 80% of common use cases
- Native View implementations for performance

**Extended Template Library (External Source):**
- 60+ additional specialized templates
- Fetched on app startup with fallback
- Cached in AsyncStorage after first load
- Seasonal/trending content updates
- A/B testing capability for new designs
- Mix of native View and SVG implementations

### 3.6 Smart Cropping System
**Function:** Fixed-aspect ratio cropping with composition-aware controls for platform-optimized outputs using native image processing.

**Supported Aspect Ratios:**
- **Original** (no crop) - maintains source image dimensions
- **1:1 Square** - Instagram posts, profile photos
- **4:5 Portrait** - Instagram feed optimization
- **9:16 Story/Reel** - Instagram/TikTok Stories, vertical video
- **16:9 Landscape** - Facebook covers, YouTube thumbnails, presentations

**Cropping Behavior & Controls:**
- **Crop Mode:** Fixed-aspect center crop with gesture-controlled zoom and pan
- **Zoom Control:** Pinch-to-zoom gesture from 100% (fit-to-frame) to 300% (3x zoom)
- **Pan Control:** Touch/drag gestures to reposition within the crop frame
- **Rotation:** 90° step rotation with haptic feedback (0°, 90°, 180°, 270°)
- **Template Overlay Support:** Composition guides remain visible during cropping
- **Non-Destructive:** Original image preserved; crop settings can be modified within edit session

**Technical Implementation:**
- **Native Image Processing:** Using react-native-image-editor or expo-image-manipulator
- **EXIF Normalization:** Auto-correct image orientation on load
- **Preview Optimization:** Downscale to ≤2048px on longest side for interactive UI
- **Full-Resolution Processing:** Process at original resolution only during export
- **Gesture Integration:** Native pan and pinch gesture recognizers
- **Memory Management:** Progressive loading for large images (>5MB)

**Performance Targets:**
- **Preview Decode:** <300ms on mid-tier mobile devices (improved from web)
- **Crop Application:** <1.5s for 12MP images (improved from web)
- **Gesture Response:** <16ms for zoom/pan adjustments (60fps)
- **Memory Usage:** <100MB total during crop operations

### 3.7 Basic Image Enhancement with Presets
**Manual Controls:**
- Brightness, contrast, saturation sliders with native UI components
- Rotation (90-degree increments) - integrated with cropping rotation
- Native image processing, <2s performance (improved from web)

**Hybrid Preset System:**
**Core Presets (Bundled):**
- Bright & Clean (brightness +15, contrast +10, saturation +5)
- Social Pop (brightness +5, contrast +15, saturation +20)
- Natural & Balanced (brightness +8, contrast +8, saturation 0)
- Soft & Warm (brightness +10, contrast +5, saturation +10, warmth +15)

**Extended Presets (External Source):**
- Subject-specific presets (food-appetizing, portrait-smooth, product-crisp)
- Seasonal/trending filter styles
- Community-contributed presets
- Platform-optimized presets (Instagram-ready, marketplace-neutral)

### 3.8 Template & Preset Management
```javascript
// Hybrid loading strategy for React Native
const loadContent = async () => {
  // Always available core content
  const coreTemplates = require('./data/core-templates.json');
  const corePresets = require('./data/core-presets.json');
  
  try {
    // Fetch enhanced content from external source
    const response = await fetch('/api/content', {
      headers: { 'Cache-Control': 'max-age=3600' }
    });
    
    if (response.ok) {
      const externalContent = await response.json();
      
      // Cache in AsyncStorage
      await AsyncStorage.setItem('external_content', JSON.stringify(externalContent));
      
      return {
        templates: { ...coreTemplates, ...externalContent.templates },
        presets: { ...corePresets, ...externalContent.presets }
      };
    }
  } catch (error) {
    // Fallback to cached external content
    try {
      const cachedContent = await AsyncStorage.getItem('external_content');
      if (cachedContent) {
        const parsed = JSON.parse(cachedContent);
        return {
          templates: { ...coreTemplates, ...parsed.templates },
          presets: { ...corePresets, ...parsed.presets }
        };
      }
    } catch (cacheError) {
      console.log('Using offline content only');
    }
  }
  
  return { templates: coreTemplates, presets: corePresets };
};
```

### 3.9 Image Upload Alternative
- **Function:** Apply guidance templates to existing photos as reference overlay from device gallery
- **Tech Approach:** react-native-image-picker with template overlay system
- **Support:** JPEG, PNG, HEIC up to 20MB (increased mobile limit)
- **Use case:** Composition analysis, cropping, and basic enhancement of existing photos
- **Native Gallery Integration:** Direct access to Photos app with proper permissions

### 3.10 Enhanced Library & Export
- **Function:** Save enhanced photos to device gallery and export in multiple formats
- **Formats:** JPEG (optimized), PNG (when needed), HEIC (iOS)
- **Sizes:** Original, Square (1:1), Instagram (4:5), Story (9:16), Landscape (16:9)
- **Gallery Integration:** Native save to Photos/Gallery with proper metadata
- **Sharing:** Native share sheet integration for direct app sharing
- **Storage:** AsyncStorage with thumbnail generation and template usage tracking

## 4) Technical Architecture

### 4.1 Core Framework & Library Stack

**Core Framework**
```json
{
  "react-native": "^0.72.0",
  "react": "^18.2.0",
  "typescript": "^5.1.0"
}
```

**Camera & Media**
```json
{
  "react-native-vision-camera": "^3.0.0",
  "react-native-image-picker": "^5.0.0",
  "react-native-image-editor": "^4.0.0",
  "@react-native-async-storage/async-storage": "^1.19.0"
}
```

**UI & Graphics**
```json
{
  "react-native-elements": "^3.4.3",
  "react-native-vector-icons": "^10.0.0",
  "react-native-svg": "^13.0.0",
  "react-native-gesture-handler": "^2.12.0",
  "react-native-reanimated": "^3.4.0"
}
```

**Platform Integration**
```json
{
  "react-native-permissions": "^3.8.0",
  "react-native-share": "^9.0.0",
  "@react-native-community/cameraroll": "^5.0.0"
}
```

**State Management**
- React Context + useState (no external library needed)
- AsyncStorage for persistence

**Development Tools**
```json
{
  "@react-native-community/eslint-config": "^3.0.0",
  "prettier": "^3.0.0",
  "flipper-plugin-react-native-performance": "^0.2.0"
}
```

### 4.2 Native Overlay Implementation

**Template Structure for React Native**
```javascript
// Core template structure optimized for native performance
{
  "id": "product_focus_circle",
  "name": "Product Focus Circle",
  "category": "products_retail",
  "type": "native_view", // "native_view" or "svg"
  "component": "CircleOverlay", // Component name for native views
  "svg_path": "<path d='...' />", // For SVG-based templates
  "description": "Center your product within the circle for clean isolation",
  "best_for": ["single_products", "jewelry", "electronics", "accessories"],
  "aspect_ratios": ["1:1", "4:5"],
  "opacity_range": [30, 80],
  "style_constants": {
    "line_weight": "medium",
    "color": "primary"
  },
  "usage_count": 0,
  "source": "core"
}
```

**Native View Overlay Component**
```javascript
import { OVERLAY_STYLES } from '../constants/overlayStyles';

const RuleOfThirdsGrid = ({ opacity, screenWidth, screenHeight }) => {
  const styles = StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: screenWidth,
      height: screenHeight,
      pointerEvents: 'none',
    },
    verticalLine: {
      position: 'absolute',
      width: OVERLAY_STYLES.lineWeights.medium,
      backgroundColor: OVERLAY_STYLES.getColor(OVERLAY_STYLES.colors.primary, opacity),
      top: 0,
      bottom: 0,
    },
    horizontalLine: {
      position: 'absolute',
      height: OVERLAY_STYLES.lineWeights.medium,
      backgroundColor: OVERLAY_STYLES.getColor(OVERLAY_STYLES.colors.primary, opacity),
      left: 0,
      right: 0,
    },
  });

  return (
    <View style={styles.overlay}>
      <View style={[styles.verticalLine, { left: screenWidth * OVERLAY_STYLES.spacing.gridRatio }]} />
      <View style={[styles.verticalLine, { left: screenWidth * (OVERLAY_STYLES.spacing.gridRatio * 2) }]} />
      <View style={[styles.horizontalLine, { top: screenHeight * OVERLAY_STYLES.spacing.gridRatio }]} />
      <View style={[styles.horizontalLine, { top: screenHeight * (OVERLAY_STYLES.spacing.gridRatio * 2) }]} />
    </View>
  );
};
```

**SVG Overlay Component**
```javascript
import Svg, { Path, Circle, Line } from 'react-native-svg';
import { OVERLAY_STYLES } from '../constants/overlayStyles';

const CustomSVGOverlay = ({ opacity, screenWidth, screenHeight, template }) => {
  const strokeColor = OVERLAY_STYLES.getColor(OVERLAY_STYLES.colors.primary, opacity);
  const strokeWidth = OVERLAY_STYLES.lineWeights[template.style_constants.line_weight];
  
  return (
    <Svg 
      width={screenWidth} 
      height={screenHeight} 
      style={{ position: 'absolute' }}
      pointerEvents="none"
    >
      <Path
        d={template.svg_path}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
};
```

### 4.3 Camera Integration Architecture

**Main Camera Component**
```javascript
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';

const CameraScreen = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [overlayOpacity, setOverlayOpacity] = useState(0.6);
  
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      
      {/* Template Overlay System */}
      <TemplateOverlay
        template={activeTemplate}
        opacity={overlayOpacity}
        screenWidth={screenWidth}
        screenHeight={screenHeight}
      />
      
      {/* Camera Controls */}
      <CameraControls
        onTemplateChange={setActiveTemplate}
        onOpacityChange={setOverlayOpacity}
      />
    </View>
  );
};
```

### 4.4 Storage Schema (AsyncStorage)

**Updated Storage Structure**
```javascript
// AsyncStorage keys and structure
const STORAGE_KEYS = {
  USER_PREFERENCES: '@pixassist:user_preferences',
  CONTENT_CACHE: '@pixassist:content_cache',
  USAGE_ANALYTICS: '@pixassist:usage_analytics',
  SAVED_PHOTOS: '@pixassist:saved_photos',
};

// User preferences structure
{
  "version": "1.0",
  "favorite_category": "food_drink",
  "favorite_templates": ["product_focus_circle", "rule_of_thirds"],
  "favorite_presets": ["food_appetizing", "social_pop"],
  "default_opacity": 60,
  "preferred_export_formats": ["original", "square"],
  "camera_permissions_granted": true,
  "gallery_permissions_granted": true,
  "haptic_feedback_enabled": true,
  "default_crop_aspect": "square",
  "crop_template_overlay": true
}
```

## 5) Platform-Specific Considerations

### 5.1 iOS Implementation
- **Camera Permissions:** NSCameraUsageDescription in Info.plist
- **Gallery Access:** NSPhotoLibraryUsageDescription for saving/loading photos
- **Design Guidelines:** iOS Human Interface Guidelines compliance
- **Performance:** Metal rendering optimization where available
- **Integration:** Native Photos app integration for seamless workflow

### 5.2 Android Implementation
- **Permissions:** Camera, storage permissions with proper runtime handling
- **Scoped Storage:** Android 10+ compatibility for photo management
- **Material Design:** Android design guidelines compliance
- **Performance:** OpenGL ES optimization for overlay rendering
- **Integration:** Android Gallery integration with proper media scanning

### 5.3 Cross-Platform Optimization
- **Consistent UI:** React Native Elements provides platform-appropriate styling
- **Performance Parity:** Native modules ensure equivalent performance on both platforms
- **Feature Parity:** All features available on both iOS and Android
- **Testing Strategy:** Platform-specific testing for camera and gallery integration

## 6) Performance Targets (Updated for Native)

### 6.1 Camera Performance
- **App Launch:** <2s cold start to camera ready
- **Template Switching:** <50ms overlay change with smooth animation
- **Photo Capture:** <1s from tap to preview (excluding processing)
- **Overlay Rendering:** 60fps maintained during camera operation
- **Memory Usage:** <150MB during active camera use

### 6.2 Image Processing Performance
- **Crop Application:** <1s for 12MP images (50% improvement over web)
- **Enhancement Processing:** <1.5s for preset application
- **Gallery Save:** <2s for full-resolution image save
- **Gesture Response:** <16ms for real-time crop adjustments
- **Export Multiple Formats:** <3s for all format generation

### 6.3 Content Loading
- **Core Templates:** Available immediately (bundled with app)
- **External Content:** <3s fetch with offline fallback
- **Template Caching:** Persistent across app sessions
- **Offline Mode:** 100% functionality with core content

## 7) Success Metrics

### 7.1 Technical Performance
- **Native Camera Quality:** Users rate photo quality ≥4.5/5
- **App Store Ratings:** Maintain ≥4.2 rating across both platforms
- **Crash Rate:** <0.1% crash rate during camera operations
- **Template Responsiveness:** <50ms template switching time
- **Memory Efficiency:** No memory warnings during typical usage

### 7.2 User Engagement  
- **Template Adoption:** ≥70% of users try templates from ≥3 categories
- **Native Workflow:** ≥80% prefer in-app camera vs import workflow
- **Cross-Platform Consistency:** Feature usage parity between iOS/Android
- **Enhancement Usage:** ≥60% apply presets or manual adjustments
- **Gallery Integration:** ≥75% save enhanced photos to device gallery

### 7.3 Content & Features
- **Overlay Performance:** Native View overlays show ≥20% better performance vs SVG
- **Crop Utilization:** ≥70% use smart cropping with platform-specific ratios
- **Multi-Format Export:** ≥40% export photos in multiple formats
- **Offline Resilience:** <5% feature degradation when offline

## 8) Out of Scope (Phase 1 MVP)

### 8.1 Advanced Native Features Deferred
- **AI-Powered Features:** Automatic subject detection, smart crop suggestions
- **Video Capture:** Template overlays for video recording
- **Advanced Camera Features:** Manual focus, exposure controls, RAW capture
- **Cloud Sync:** User accounts and cross-device synchronization
- **Social Integration:** Direct posting to social platforms
- **Collaborative Features:** Team template sharing, business accounts

### 8.2 Platform-Specific Advanced Features
- **iOS:** LivePhoto support, Camera Control API (iPhone 16)
- **Android:** Camera2 API advanced features, computational photography
- **Augmented Reality:** AR-based composition guides
- **Machine Learning:** On-device subject recognition and optimization

---

This React Native PRD maintains the core vision of PixAssist while leveraging native mobile capabilities for superior camera performance, gesture-based interactions, and platform-integrated workflows. The hybrid approach of native Views + SVG overlays ensures both performance optimization and design flexibility.