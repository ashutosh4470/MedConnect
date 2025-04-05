// components/SnackbarWrapper.jsx
'use client';

import { SnackbarProvider } from 'notistack';

export default function SnackbarWrapper({ children }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      {children}
    </SnackbarProvider>
  );
}
