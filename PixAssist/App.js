import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import CameraView from './src/components/Camera/CameraView';

export default function App() {
  return (
    <View style={styles.container}>
      <CameraView />
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
