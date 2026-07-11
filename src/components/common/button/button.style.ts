import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    button: {
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        flexDirection: 'row',
        borderRadius: 55 / 2,
        width: '100%'
    },
    primary: {
        backgroundColor: '#9A75F0', // Moody Purple
    },
    primaryDisabled: {
        backgroundColor: '#2D233F',
    },
    secondary: {
        backgroundColor: '#1E1630', // Solid dark moody background
        borderWidth: 1,
        borderColor: '#30264A',
    },
    secondaryDisabled: {
        backgroundColor: '#140E20',
        borderColor: '#1D162E',
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#FF9F9F', // Moody Peach border
    },
    outlineDisabled: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#3D2F3F',
    },
    danger: {
        backgroundColor: '#EF4444',
    },
    dangerDisabled: {
        backgroundColor: '#3F1F1F',
    },
    ghost: {
        backgroundColor: 'transparent',
        height: 'auto',
        paddingHorizontal: 0,
    },
    text: {
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    textPrimary: {
        color: '#FFFFFF',
    },
    textPrimaryDisabled: {
        color: '#6C5C85',
    },
    textSecondary: {
        color: '#FF9F9F', // Peach text
    },
    textSecondaryDisabled: {
        color: '#4A3B60',
    },
    textOutline: {
        color: '#FF9F9F',
    },
    textOutlineDisabled: {
        color: '#5C434F',
    },
    textDanger: {
        color: '#FFFFFF',
    },
    textDangerDisabled: {
        color: '#7F4F4F',
    },
    textGhost: {
        color: 'rgba(255, 255, 255, 0.4)',
        textDecorationLine: 'underline',
    },
    loader: {
        marginRight: 10,
    },
});

export default styles;
