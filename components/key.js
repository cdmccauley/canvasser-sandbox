import React, { useState } from 'react'

import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    TextField,
    InputAdornment,
    DialogActions,
    Button,

} from '@material-ui/core';

import {
    Link,
    Language,
    Public,
    Security,
    VpnKey,
} from '@material-ui/icons';

export default function Key(props) {
    

    return(
        <Dialog
            fullWidth
            maxWidth={ 'xs' }
            disableBackdropClick
            disableEscapeKeyDown
            open = { !props.loggedIn }
        >
            <DialogTitle>
                Login
            </DialogTitle>
            <DialogContent>
                <TextField 
                    fullWidth 
                    margin="normal" 
                    variant="outlined" 
                    label='Canvas URL'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Public />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField 
                    fullWidth 
                    margin="normal" 
                    variant="outlined" 
                    label='API Key'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <VpnKey />
                            </InputAdornment>
                        ),
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button>
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    )
}