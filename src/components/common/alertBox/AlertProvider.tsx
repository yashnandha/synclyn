import React, { createRef, FC } from 'react';
import AlertBox from './AlertBox';
import { AlertBoxMethods, paramsTypes } from './alertBoxProps';

const alertBoxRef = createRef<AlertBoxMethods>();

const Alert = {
  show: (params: paramsTypes) => {
    alertBoxRef.current?.show(params);
  },
};

export const AlertProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <AlertBox ref={alertBoxRef} />
    </>
  );
};

export default Alert;
