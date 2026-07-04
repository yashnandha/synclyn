import { color } from '@theme';
import React, { memo } from 'react';
import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomStatusBarProps } from './customStatusBarProps';

const CustomStatusBar: React.FC<CustomStatusBarProps> = ({
    barStyle = 'dark-content',
    backgroundColor = color.white,
    containerStyle,
    ...props
}) => {
    const insets = useSafeAreaInsets();
    return (
        <View
            style={[
                {
                    height: props?.translucent ? 0 : insets.top,
                    backgroundColor: props?.translucent ? 'transparent' : backgroundColor,
                },
                containerStyle,
            ]}
        >
            <StatusBar
                animated={true}
                backgroundColor={props?.translucent ? 'transparent' : backgroundColor}
                barStyle={barStyle}
                {...props}
            />
        </View>
    );
};

export default memo(CustomStatusBar);