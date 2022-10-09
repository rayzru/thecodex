import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

import { OpenSnackbarType, useSnackbar } from './useSnackbar';

export interface SnackbarContextInterface {
  openSnackbar: OpenSnackbarType;
}

const initialContext: SnackbarContextInterface = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  openSnackbar: () => {},
};

export const SnackbarContext =
  createContext<SnackbarContextInterface>(initialContext);

export const useSnackbarContext = () => useContext(SnackbarContext);

const SnackbarProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { renderSnackbar, openSnackbar } = useSnackbar();
  const value = useMemo(() => ({ openSnackbar }), [openSnackbar]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      {renderSnackbar()}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
