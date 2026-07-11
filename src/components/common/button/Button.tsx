import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { ButtonProps } from './buttonProps';
import styles from './button.style';

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    disabled = false,
    variant = 'primary',
    style,
    textStyle,
    loading = false,
    activeOpacity = 0.8,
}) => {
    // Determine button styling based on state and variant
    const getButtonStyle = () => {
        const baseStyle: Array<ViewStyle> = [styles.button];
        if (variant === 'primary') {
            baseStyle.push(disabled ? styles.primaryDisabled : styles.primary);
        } else if (variant === 'secondary') {
            baseStyle.push(disabled ? styles.secondaryDisabled : styles.secondary);
        } else if (variant === 'outline') {
            baseStyle.push(disabled ? styles.outlineDisabled : styles.outline);
        } else if (variant === 'danger') {
            baseStyle.push(disabled ? styles.dangerDisabled : styles.danger);
        } else if (variant === 'ghost') {
            baseStyle.push(styles.ghost);
        }

        if (style) {
            baseStyle.push(style as any);
        }
        return baseStyle;
    };

    // Determine text styling based on state and variant
    const getTextStyle = () => {
        const baseTextStyle: Array<TextStyle> = [styles.text];
        if (variant === 'primary') {
            baseTextStyle.push(disabled ? styles.textPrimaryDisabled : styles.textPrimary);
        } else if (variant === 'secondary') {
            baseTextStyle.push(disabled ? styles.textSecondaryDisabled : styles.textSecondary);
        } else if (variant === 'outline') {
            baseTextStyle.push(disabled ? styles.textOutlineDisabled : styles.textOutline);
        } else if (variant === 'danger') {
            baseTextStyle.push(disabled ? styles.textDangerDisabled : styles.textDanger);
        } else if (variant === 'ghost') {
            baseTextStyle.push(styles.textGhost);
        }

        if (textStyle) {
            baseTextStyle.push(textStyle as any);
        }
        return baseTextStyle;
    };

    return (
        <TouchableOpacity
            activeOpacity={activeOpacity}
            onPress={onPress}
            disabled={disabled || loading}
            style={getButtonStyle()}
        >
            {loading && (
                <ActivityIndicator
                    size="small"
                    color={variant === 'primary' || variant === 'danger' ? '#FFFFFF' : '#FF9F9F'}
                    style={styles.loader}
                />
            )}
            <Text style={getTextStyle()}>{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;
