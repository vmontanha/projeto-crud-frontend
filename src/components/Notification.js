import React from 'react';
import { SnackbarProvider } from 'notistack';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Notification = ({ children }) => {
    const notistackRef = React.createRef();

    const onClickDismiss = key => () => {
        notistackRef.current.closeSnackbar(key);
    };

    return (
        <SnackbarProvider
            maxSnack={3}
            ref={notistackRef}
            action={(key) => (
                <IconButton onClick={onClickDismiss(key)}>
                    <CloseIcon />
                </IconButton>
            )}
        >
            {children}
        </SnackbarProvider>
    );
};

export default Notification;
