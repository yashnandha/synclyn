import React, { useEffect } from 'react'
import {
    View,
    Text,
    ScrollView,
    ImageBackground,
} from 'react-native'
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated'
import { CustomStatusBar, Button, HighlightedText } from '@components'
import SvgIndex from '@svgIndex'
import images from '@imageIndex'
import { color } from '@theme'

import { ENTRANCE, SPRING_SMOOTH } from './permissionScreen.animations'
import PermissionCard from './PermissionCard'
import styles from './permissionScreen.style'
import usePermissionScreen from './usePermissionScreen'

const PermissionScreen = () => {
    const {
        permissions,
        requestCamera,
        requestMicrophone,
        requestLocation,
        isRequiredGranted,
        navigateToCamera,
    } = usePermissionScreen()

    const continueEnabled = useSharedValue(isRequiredGranted ? 1 : 0)

    useEffect(() => {
        continueEnabled.value = withSpring(isRequiredGranted ? 1 : 0, SPRING_SMOOTH)
    }, [continueEnabled, isRequiredGranted])

    const footerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(continueEnabled.value, [0, 1], [0.55, 1]),
        transform: [
            {
                translateY: interpolate(continueEnabled.value, [0, 1], [6, 0]),
            },
        ],
    }))

    const permissionItems = [
        {
            key: 'camera',
            title: 'Camera',
            description: 'Capture and create photos and videos.',
            granted: permissions.camera,
            request: requestCamera,
            icon: (
                <SvgIndex.CameraIcon
                    color={permissions.camera ? color.permissionSuccess : color.permissionCameraIcon}
                    width={22}
                    height={22}
                />
            ),
            style: styles.cameraIconWrapper,
        },
        {
            key: 'microphone',
            title: 'Microphone',
            description: 'Record high-fidelity audio along with video.',
            granted: permissions.microphone,
            request: requestMicrophone,
            icon: (
                <SvgIndex.MicIcon
                    color={permissions.microphone ? color.permissionSuccess : color.permissionMicIcon}
                    width={22}
                    height={22}
                />
            ),
            style: styles.micIconWrapper,
        },
        {
            key: 'location',
            title: 'Location',
            description: 'Tag your moments with geographical location data.',
            granted: permissions.location,
            request: requestLocation,
            icon: (
                <SvgIndex.LocationIcon
                    color={permissions.location ? color.permissionSuccess : color.permissionLocationIcon}
                    width={22}
                    height={22}
                />
            ),
            style: styles.locationIconWrapper,
            optional: true,
        },
    ]

    return (
        <View style={styles.container}>
            <CustomStatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            <ImageBackground source={images.permissionBg} style={styles.background} resizeMode="cover">
                <View style={styles.overlay}>
                    <View style={styles.header}>
                        <Animated.View entering={ENTRANCE.logo} style={styles.logoContainer}>
                            <SvgIndex.SynclynIcon height={40} width={90} color={color.white} fill={color.white} />
                        </Animated.View>

                        <Animated.View entering={ENTRANCE.title}>
                            <HighlightedText
                                textStyle={styles.title}
                                highlights={[{
                                    style: styles.highlightText,
                                    subString: 'Permission',
                                }]}
                            >
                                Enable Permission
                            </HighlightedText>
                        </Animated.View>

                        <Animated.View entering={ENTRANCE.subtitle}>
                            <Text style={styles.subtitle}>
                                To experience the full magic of Synclyn, we need access to some of your device's features.
                            </Text>
                        </Animated.View>
                    </View>

                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {permissionItems.map((item, index) => (
                            <PermissionCard
                                key={item.key}
                                title={item.title}
                                description={item.description}
                                granted={item.granted}
                                optional={item.optional}
                                icon={item.icon}
                                iconWrapperStyle={item.style}
                                index={index}
                                onRequest={item.request}
                            />
                        ))}
                    </ScrollView>

                    <Animated.View
                        entering={ENTRANCE.footer(permissionItems.length)}
                        style={[styles.footer, footerAnimatedStyle]}
                    >
                        <Button
                            title="Continue"
                            onPress={navigateToCamera}
                            disabled={!isRequiredGranted}
                            variant="primary"
                            style={styles.continueButton}
                        />
                    </Animated.View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default PermissionScreen
