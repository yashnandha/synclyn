export interface AlertBoxProps {
  visible?: boolean;
  title?: string;
  description?: string;
  cancelTitle?: string;
  confirmTitle?: string;
  onPressConfirm?: () => void;
}

interface AlertBoxMethods {
  show: ({title, description, onPress}: paramsTypes) => void;
}

export type paramsTypes = {
  title: string;
  description?: string;
  onPress?: () => void;
  confirmTitle?: string;
  singleButton?: boolean;
};
