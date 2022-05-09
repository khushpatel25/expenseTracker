/* eslint-disable no-lone-blocks */
import React, { useContext, useState, useEffect } from 'react'
import { Grid, Typography, FormControl, Select, InputLabel, MenuItem, TextField, Button } from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid'
import { useSpeechContext } from '@speechly/react-client'

import useStyles from './styles'
import { ExpenseTrackerContext } from '../../../Context/context'
import { incomeCategories, expenseCategories } from '../../../constants/categories'
import formatDate from '../../../utils/formatDate'
import Snackbar from '../../Snackbar/Snackbar'

const initialState = {
    amount: "",
    category: '',
    type: 'Income',
    date: formatDate(new Date())
}

const Form = () => {

    const classes = useStyles()
    const [state, setState] = useState(initialState)
    const [open, setOpen] = useState(false)
    const { addTransaction } = useContext(ExpenseTrackerContext)
    const { segment } = useSpeechContext()

    const selectedCategories = state.type === 'Income' ? incomeCategories : expenseCategories

    const handleOnChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleOnClick = () => {

        const transaction = { ...state, amount: Number(state.amount), id: uuidv4() }

        if (state.amount && state.category && state.date && state.type) {
            addTransaction(transaction)
            setState(initialState)
            setOpen(true)
        }
    }

    useEffect(() => {

        if (segment) {
            if (segment.intent.intent === "add_expense") {
                setState({ ...state, type: "Expense" })
            } else if (segment.intent.intent === "add_income") {
                setState({ ...state, type: "Income" })
            } else if (segment.isFinal && segment.intent.intent === "create_transaction") {
                handleOnClick()
            } else if (segment.isFinal && segment.intent.intent === "cancel_transaction") {
                setState(initialState)
            }

            segment.entities.forEach((e) => {

                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`

                switch (e.type) {
                    case "amount":
                        setState({ ...state, amount: e.value })
                        break;
                    case "category":
                        if (incomeCategories.map((v) => v.type).includes(category)) {
                            setState({ ...state, type: "Income", category })
                        } else if (expenseCategories.map((v) => v.type).includes(category)) {
                            setState({ ...state, type: "Expense", category })
                        }
                        break;
                    case "date":
                        setState({ ...state, date: e.value })
                        break;
                    default:
                        break;
                }
            })
            if (segment.isFinal && state.amount && state.category && state.date && state.type) {
                handleOnClick()
            }
        }

    }, [segment])

    return (
        <Grid container spacing={2}>
            <Snackbar open={open} setOpen={setOpen} />
            <Grid item xs={12}>
                <Typography align="center" variant='subtitle2' gutterBottom>
                    {segment && segment.words.map((w) => w.value).join(' ')}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={state.type} name='type' onChange={handleOnChange}>
                        <MenuItem value='Income'>Income</MenuItem>
                        <MenuItem value='Expense'>Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={state.category} name='category' onChange={handleOnChange}>
                        {selectedCategories.map((c) => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField label='Amount' type='number' value={state.amount} name='amount' onChange={handleOnChange} fullWidth />
            </Grid>
            <Grid item xs={6}>
                <TextField label='Date' type='date' value={state.date} name='date' onChange={handleOnChange} fullWidth />
            </Grid>
            <Button className={classes.button} color='primary' variant='outlined' onClick={handleOnClick} fullWidth>Create</Button>
        </Grid>
    )
}

export default Form