import { ViewStyle, TextStyle } from 'react-native';

export interface ButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
    style?: ViewStyle | ViewStyle[];
    textStyle?: TextStyle | TextStyle[];
    loading?: boolean;
    activeOpacity?: number;
}
