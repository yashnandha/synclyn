import { StatusBarProps, StyleProp, ViewStyle } from 'react-native';

interface CustomStatusBarProps extends StatusBarProps {
    containerStyle?: StyleProp<ViewStyle>;
}