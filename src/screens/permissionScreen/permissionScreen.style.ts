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
        includeFontPadding: false
    },
    highlightText: {
        color: color.peach,
    },
    subtitle: {
        fontSize: 14,
        color: color.white,
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 20,
        paddingHorizontal: 20,
        includeFontPadding: false
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
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
    },
    iconWrapper: {
        width: 45,
        height: 45,
        borderRadius: 10,
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
        includeFontPadding: false,
        color: color.textGray
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: color.white,
        marginBottom: 4,
        includeFontPadding: false
    },
    optionalLabel: {
        fontSize: 11,
        fontWeight: '400',
        color: color.textGray,
        includeFontPadding: false
    },
    cardDescription: {
        fontSize: 12,
        color: color.textGray,
        lineHeight: 16,
        includeFontPadding: false
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
        borderRadius: 20,
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
        color: color.peach,
        includeFontPadding: false
    },
    grantedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.tintGreen,
    },
    grantedText: {
        fontSize: 12,
        fontWeight: '700',
        color: color.green,
        marginLeft: 4,
        includeFontPadding: false
    },
    allowButtonCompact: {
        height: 36,
        borderRadius: 18,
        paddingHorizontal: 12,
    },
    allowButtonTextCompact: {
        fontSize: 12,
        fontWeight: '700',
        includeFontPadding: false
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
        bottom: 30
    },
    continueButton: {
        width: '100%',
        marginTop: 8,
    },
})

export default styles
