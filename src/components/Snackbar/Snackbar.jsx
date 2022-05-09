import React from 'react'
import { Snackbar as Sbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import useStyles from './styles'

const Snackbar = ({ open, setOpen,del,setDel }) => {

    const classes = useStyles()

    const handleOnClose = (event,reason) => {
        if (reason === 'clickaway') return;
        setOpen(false)
    }

    return (
        <div className={classes.root}>
            <Sbar 
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            open={open} 
            autoHideDuration={3000}
            onClose={handleOnClose}>
                <Alert onClose={handleOnClose} severity={del ? "error" : "success"} elevation={6} variant='filled'>
                    {del ? "Transaction successfully deleted." : "Transaction successfully created."}
                </Alert>
            </Sbar>
        </div>
    )
}

export default Snackbar