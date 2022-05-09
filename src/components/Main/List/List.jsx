import React, { useContext, useState } from 'react'
import { List as MUIList, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton, ListItemSecondaryAction, Slide } from '@material-ui/core'
import { MoneyOff, Delete } from '@material-ui/icons'

import useStyles from './styles'
import { ExpenseTrackerContext } from '../../../Context/context'
import Snackbar from '../../Snackbar/Snackbar'

const List = () => {

    const { deleteTransaction, transactions } = useContext(ExpenseTrackerContext)
    const [open, setOpen] = useState(false)
    const [del, setDel] = useState(false)
    const classes = useStyles()

    const handleOnClick = (id) => {
        deleteTransaction(id)
        setOpen(true)
        setDel(true)
    }

    return (
        <MUIList dense={false} className={classes.list}>
            <Snackbar open={open} setOpen={setOpen} del={del} setDel={setDel} />
            {transactions.map((transaction) => (
                <Slide direction='down' in mountOnEnter unmountOnExit key={transaction.id}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={transaction.type === "Income" ? classes.avatarIncome : classes.avatarExpense}>
                                <MoneyOff />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={transaction.category} secondary={`₹${transaction.amount} ~ ${transaction.date}`} />
                        <ListItemSecondaryAction>
                            <IconButton edge='end' aria-label='delete' onClick={() => handleOnClick(transaction.id)}>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Slide>
            ))}
        </MUIList>
    )
}

export default List