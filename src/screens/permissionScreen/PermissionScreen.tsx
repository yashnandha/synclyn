import React from "react"
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
} from "react-native"
import { CustomStatusBar, Button } from "@components"
import SvgIndex from "@svgIndex"
import images from "@imageIndex"
import styles from "./permissionScreen.style"
import usePermissionScreen from "./usePermissionScreen"

const PermissionScreen = () => {
    const {
        permissions,
        requestCamera,
        requestMicrophone,
        requestLocation,
        requestStorage,
        isRequiredGranted,
        navigateToCamera,
    } = usePermissionScreen()

    const permissionItems = [
        {
            key: "camera",
            title: "Camera",
            description: "Capture and create photos and videos.",
            granted: permissions.camera,
            request: requestCamera,
            icon: <SvgIndex.CameraIcon color={permissions.camera ? "#4ADE80" : "#9A75F0"} width={22} height={22} />,
            style: styles.cameraIconWrapper,
        },
        {
            key: "microphone",
            title: "Microphone",
            description: "Record high-fidelity audio along with video.",
            granted: permissions.microphone,
            request: requestMicrophone,
            icon: <SvgIndex.MicIcon color={permissions.microphone ? "#4ADE80" : "#FF9F9F"} width={22} height={22} />,
            style: styles.micIconWrapper,
        },
        {
            key: "location",
            title: "Location",
            description: "Tag your moments with geographical location data.",
            granted: permissions.location,
            request: requestLocation,
            icon: <SvgIndex.LocationIcon color={permissions.location ? "#4ADE80" : "#38BDF8"} width={22} height={22} />,
            style: styles.locationIconWrapper,
            optional: true,
        },
        // {
        //     key: "storage",
        //     title: "Storage",
        //     description: "Save high quality captures to your device library.",
        //     granted: permissions.storage,
        //     request: requestStorage,
        //     icon: <SvgIndex.StorageIcon color={permissions.storage ? "#4ADE80" : "#22C55E"} width={22} height={22} />,
        //     style: styles.storageIconWrapper,
        //     optional: true,
        // },
    ]

    return (
        <View style={styles.container}>
            <CustomStatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />
            <ImageBackground source={images.permissionBg} style={styles.background} resizeMode="cover">
                <View style={styles.overlay}>
                    <SafeAreaView style={styles.safeArea}>
                        {/* Header Section */}
                        <View style={styles.header}>
                            <View style={styles.logoContainer}>
                                <SvgIndex.SynclynIcon height={40} width={90} />
                            </View>
                            <Text style={styles.title}>
                                Enable <Text style={styles.highlightText}>Permissions</Text>
                            </Text>
                            <Text style={styles.subtitle}>
                                To experience the full magic of Synclyn, we need access to some of your device's features.
                            </Text>
                        </View>

                        {/* List of Permissions */}
                        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                            {permissionItems.map((item) => (
                                <View key={item.key} style={styles.permissionCard}>
                                    <View style={[styles.iconWrapper, item.style]}>
                                        {item.icon}
                                    </View>

                                    <View style={styles.textContainer}>
                                        <Text style={styles.cardTitle}>
                                            {item.title}
                                            {item.optional && <Text style={{ fontSize: 11, fontWeight: "400", color: "rgba(255, 255, 255, 0.4)" }}> (Optional)</Text>}
                                        </Text>
                                        <Text style={styles.cardDescription}>{item.description}</Text>
                                    </View>

                                    {item.granted ? (
                                        <View style={[styles.actionButton, styles.grantedBadge, { flexDirection: "row", alignItems: "center" }]}>
                                            <SvgIndex.CheckIcon color="#4ADE80" width={14} height={14} />
                                            <Text style={[styles.grantedText, { marginLeft: 4 }]}>Active</Text>
                                        </View>
                                    ) : (
                                        <Button
                                            title="Allow"
                                            onPress={item.request}
                                            variant="secondary"
                                            style={{ height: 36, borderRadius: 10, paddingHorizontal: 12 }}
                                            textStyle={{ fontSize: 12, fontWeight: "700" }}
                                        />
                                    )}
                                </View>
                            ))}
                        </ScrollView>

                        {/* Footer / Call To Actions */}
                        <View style={styles.footer}>
                            <Button
                                title="Continue"
                                onPress={navigateToCamera}
                                disabled={!isRequiredGranted}
                                variant="primary"
                                style={styles.continueButton}
                            />
                        </View>
                    </SafeAreaView>
                </View>
            </ImageBackground>
        </View>
    )
}

export default PermissionScreen