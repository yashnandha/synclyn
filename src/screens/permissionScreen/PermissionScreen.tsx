import { defaultStyles } from "@theme"
import { ScrollView, StatusBar, View } from "react-native"
import { Text } from "react-native"
import styles from "./permissionScreen.style"
import { CustomStatusBar } from "@components"




const PermissionScreen = () => {
    return (
        <View style={defaultStyles.container}>
            <CustomStatusBar />
            <ScrollView style={styles.contentContainer}>
                <Text>Synclyn</Text>
            </ScrollView>
        </View>
    )
}

export default PermissionScreen