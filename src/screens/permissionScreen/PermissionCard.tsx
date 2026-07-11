import React, { useEffect } from 'react'
import { Text, View, StyleProp, ViewStyle } from 'react-native'
import Animated, {
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated'
import { Button } from '@components'
import SvgIndex from '@svgIndex'
import { color } from '@theme'

import { CARD_LAYOUT, ENTRANCE, SPRING_SMOOTH } from './permissionScreen.animations'
import styles from './permissionScreen.style'

const CARD_BORDER = '#281D3B'
const GRANTED_BORDER = '#1B4734'

type PermissionCardProps = {
    title: string
    description: string
    granted: boolean
    optional?: boolean
    icon: React.ReactNode
    iconWrapperStyle: StyleProp<ViewStyle>
    index: number
    onRequest: () => void
}

const PermissionCard = ({
    title,
    description,
    granted,
    optional,
    icon,
    iconWrapperStyle,
    index,
    onRequest,
}: PermissionCardProps) => {
    const grantedProgress = useSharedValue(granted ? 1 : 0)

    useEffect(() => {
        grantedProgress.value = withSpring(granted ? 1 : 0, SPRING_SMOOTH)
    }, [granted, grantedProgress])

    const cardAnimatedStyle = useAnimatedStyle(() => ({
        borderColor: interpolateColor(
            grantedProgress.value,
            [0, 1],
            [CARD_BORDER, GRANTED_BORDER],
        ),
        transform: [
            {
                scale: interpolate(grantedProgress.value, [0, 0.5, 1], [1, 1.012, 1]),
            },
        ],
    }))

    const iconAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: interpolate(grantedProgress.value, [0, 1], [1, 1.04]),
            },
        ],
    }))

    const grantedBadgeStyle = useAnimatedStyle(() => ({
        opacity: grantedProgress.value,
        transform: [
            {
                scale: interpolate(grantedProgress.value, [0, 1], [0.82, 1]),
            },
            {
                translateX: interpolate(grantedProgress.value, [0, 1], [10, 0]),
            },
        ],
    }))

    const allowButtonStyle = useAnimatedStyle(() => ({
        opacity: 1 - grantedProgress.value,
        transform: [
            {
                scale: interpolate(grantedProgress.value, [0, 1], [1, 0.88]),
            },
            {
                translateX: interpolate(grantedProgress.value, [0, 1], [0, -8]),
            },
        ],
    }))

    return (
        <Animated.View
            layout={CARD_LAYOUT}
            entering={ENTRANCE.card(index)}
            style={[styles.permissionCard, cardAnimatedStyle]}
        >
            <Animated.View style={[styles.iconWrapper, iconWrapperStyle, iconAnimatedStyle]}>
                {icon}
            </Animated.View>

            <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>
                    {title}
                    {optional && <Text style={styles.optionalLabel}> (Optional)</Text>}
                </Text>
                <Text style={styles.cardDescription}>{description}</Text>
            </View>

            <View style={styles.actionContainer}>
                <Animated.View
                    pointerEvents={granted ? 'auto' : 'none'}
                    style={[styles.actionOverlay, styles.actionButton, styles.grantedBadge, grantedBadgeStyle]}
                >
                    <SvgIndex.CheckIcon color={color.permissionSuccess} width={14} height={14} />
                    <Text style={styles.grantedText}>Active</Text>
                </Animated.View>

                <Animated.View
                    pointerEvents={granted ? 'none' : 'auto'}
                    style={[styles.actionOverlay, allowButtonStyle]}
                >
                    <Button
                        title="Allow"
                        onPress={onRequest}
                        variant="secondary"
                        style={styles.allowButtonCompact}
                        textStyle={styles.allowButtonTextCompact}
                    />
                </Animated.View>
            </View>
        </Animated.View>
    )
}

export default PermissionCard
