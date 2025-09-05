import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Platform } from 'react-native';
import CameraView from './src/components/Camera/CameraView';
import CameraViewWeb from './src/components/Camera/CameraViewWeb';

export default function App() {
  // Use web-compatible version for demo, native camera for mobile
  const CameraComponent = Platform.OS === 'web' ? CameraViewWeb : CameraView;
  
  return (
    <View style={styles.container}>
      <CameraComponent />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
