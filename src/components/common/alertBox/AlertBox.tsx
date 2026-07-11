import {
  View,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, { FC, forwardRef, useImperativeHandle, useState } from 'react';
import { AlertBoxMethods, AlertBoxProps } from './alertBoxProps';
import styles from './alertBox.style';

const AlertBox = forwardRef<AlertBoxMethods, AlertBoxProps>(
  (
    {
      visible = false,
      title = '',
      description = '',
      cancelTitle = 'Cancel',
      confirmTitle = 'Delete',
      onPressConfirm,
    }: AlertBoxProps,
    ref,
  ) => {
    const [visibleAlert, setVisibleAlert] = useState(visible);
    const [alertTitle, setAlertTitle] = useState(title);
    const [alertDescriptionDes, setAlertDescriptionDes] = useState(description);
    const [conTitle, setConTitle] = useState(confirmTitle);
    const [onPress, setOnPress] = useState<(() => void) | undefined>(
      onPressConfirm,
    );
    const [showSingleButton, setShowSingleButton] = useState(false);

    useImperativeHandle(ref, () => ({
      show({ title, description, onPress, confirmTitle, singleButton }) {
        setVisibleAlert(true);
        setAlertTitle(title);
        setConTitle(confirmTitle || 'Delete');
        setAlertDescriptionDes(description!);
        setOnPress(() => onPress);
        setShowSingleButton(singleButton || false)
      },
    }));

    return (
      <Modal
        visible={visibleAlert}
        style={styles.container}
        transparent={true}
        animationType={'fade'}>
        <TouchableOpacity
          style={styles.backDropped}
          onPress={() => setVisibleAlert(false)}
        />
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Text
              style={[
                styles.title,
                {
                  paddingVertical: alertDescriptionDes ? 0 : 10,
                },
              ]}>
              {alertTitle}
            </Text>
            {alertDescriptionDes && (
              <Text style={styles.description}>{alertDescriptionDes}</Text>
            )}
            <View style={styles.rowContainer}>
              {!showSingleButton && <Pressable
                onPress={() => setVisibleAlert(false)}
                style={[
                  styles.buttonStyle,
                  {
                    borderRightWidth: StyleSheet.hairlineWidth,
                    borderColor: '#ccc',
                  },
                ]}>
                <Text style={styles.cancelButtonText}>{cancelTitle}</Text>
              </Pressable>}
              <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                  setVisibleAlert(false);
                  onPress?.();
                }}>
                <Text style={styles.deleteButtonText}>{conTitle}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  },
);

export default AlertBox;
