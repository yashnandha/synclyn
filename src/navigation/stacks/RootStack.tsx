import { View } from "react-native"

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams } from "@navigation/rootStackParams";
import PermissionScreen from "@screens/permissionScreen/PermissionScreen";
import CameraScreen from "@screens/cameraScreen/CameraScreen";

const Stack = createNativeStackNavigator<RootStackParams>();
const RootStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
            <Stack.Screen name="CameraScreen" component={CameraScreen} />
        </Stack.Navigator>
    )
}

export default RootStack