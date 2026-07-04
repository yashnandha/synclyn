/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CameraScreen from './src/screens/cameraScreen/CameraScreen';
import Route from '@navigation/index';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <Route />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}




export default App;
