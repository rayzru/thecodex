import React, { useCallback, useState } from 'react';

import SnackBar, { SnackBarProps } from './SnackBar';

export type OpenSnackbarType = (message: string) => void;

export const useSnackbar = () => {
  const [state, setState] = useState<SnackBarProps>();

  const openSnackbar = useCallback(
    (message: string) =>
      setState({ message, id: new Date().getTime().toString() }),
    [],
  );

  const renderSnackbar = () => {
    if (state) {
      const { message, id } = state;
      return <SnackBar message={message} id={id} />;
    }
  };

  return { renderSnackbar, openSnackbar };
};
