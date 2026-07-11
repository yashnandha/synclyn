import { defaultStyles } from "@theme"
import { ScrollView, StatusBar, View } from "react-native"
import { Text } from "react-native"
import styles from "./permissionScreen.style"
import { CustomStatusBar } from "@components"
import SvgIndex from "@svgIndex"




const PermissionScreen = () => {
    return (
        <View style={defaultStyles.container}>
            <CustomStatusBar />
            <ScrollView style={styles.contentContainer}>
                <SvgIndex.SynclynIcon height={60} width={100} />
            </ScrollView>
        </View>
    )
}

export default PermissionScreen