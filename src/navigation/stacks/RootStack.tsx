import { View } from "react-native"

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams } from "@navigation/rootStackParams";
import PermissionScreen from "@screens/permissionScreen/PermissionScreen";

const Stack = createNativeStackNavigator<RootStackParams>();
const RootStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
        </Stack.Navigator>
    )
}

export default RootStack