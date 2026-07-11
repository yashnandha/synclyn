import { color } from '@theme'
import { deviceWidth } from '@utility/common'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.permissionBackground,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    safeArea: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: color.permissionOverlay,
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    header: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 30,
    },
    logoContainer: {
        marginBottom: 40,
        width: deviceWidth,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: color.white,
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    highlightText: {
        color: color.permissionPeach,
    },
    subtitle: {
        fontSize: 14,
        color: color.white,
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 20,
        paddingHorizontal: 20,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    permissionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.permissionCardBackground,
        borderWidth: 1,
        borderColor: color.permissionCardBorder,
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 4,
    },
    iconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    cameraIconWrapper: {
        backgroundColor: color.permissionCameraIconBg,
        borderColor: color.permissionCameraIconBorder,
    },
    micIconWrapper: {
        backgroundColor: color.permissionMicIconBg,
        borderColor: color.permissionMicIconBorder,
    },
    locationIconWrapper: {
        backgroundColor: color.permissionLocationIconBg,
        borderColor: color.permissionLocationIconBorder,
    },
    storageIconWrapper: {
        backgroundColor: color.permissionStorageIconBg,
        borderColor: color.permissionStorageIconBorder,
    },
    textContainer: {
        flex: 1,
        marginLeft: 16,
        marginRight: 8,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: color.white,
        marginBottom: 4,
    },
    optionalLabel: {
        fontSize: 11,
        fontWeight: '400',
        color: color.permissionTextFaded,
    },
    cardDescription: {
        fontSize: 12,
        color: color.permissionTextMuted,
        lineHeight: 16,
    },
    actionContainer: {
        width: 84,
        height: 36,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    actionOverlay: {
        position: 'absolute',
        right: 0,
    },
    actionButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    allowButton: {
        backgroundColor: color.permissionAllowButtonBg,
        borderWidth: 1,
        borderColor: color.permissionAllowButtonBorder,
    },
    allowButtonText: {
        fontSize: 12,
        fontWeight: '700',
        color: color.permissionPeach,
    },
    grantedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.permissionGrantedBadgeBg,
        borderWidth: 1,
        borderColor: color.permissionGrantedBadgeBorder,
    },
    grantedText: {
        fontSize: 12,
        fontWeight: '700',
        color: color.permissionSuccess,
        marginLeft: 4,
    },
    allowButtonCompact: {
        height: 36,
        borderRadius: 10,
        paddingHorizontal: 12,
    },
    allowButtonTextCompact: {
        fontSize: 12,
        fontWeight: '700',
    },
    footer: {
        marginTop: 12,
        alignItems: 'center',
        bottom:40
    },
    continueButton: {
        width: '100%',
        marginTop: 8,
    },
    skipText: {
        fontSize: 14,
        fontWeight: '600',
        color: color.permissionTextFaded,
        marginTop: 18,
        textDecorationLine: 'underline',
    },
})

export default styles
