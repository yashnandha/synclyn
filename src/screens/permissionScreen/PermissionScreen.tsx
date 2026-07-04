import { defaultStyles } from "@theme"
import { StatusBar, View } from "react-native"
import { Text } from "react-native"
import styles from "./permissionScreen.style"
import { CustomStatusBar } from "@components"


const PermissionScreen = () => {
    return (
        <View style={defaultStyles.container}>
            <CustomStatusBar translucent />
        </View>
    )
}

export default PermissionScreen