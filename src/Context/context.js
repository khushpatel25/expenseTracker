import React,{useReducer,createContext} from 'react';

import contextReducer from './contextReducer';

const initialState= JSON.parse(localStorage.getItem('transactions')) || []

export const ExpenseTrackerContext = createContext(initialState)

export const Provider = ({children}) => {

    const [transactions, dispatch] = useReducer(contextReducer, initialState)

    // Action Creators
    const deleteTransaction = (id) => dispatch({type: 'DELETE_TRANSACTION',payload: id})
    const addTransaction = (transaction) => dispatch({type: 'ADD_TRANSACTION',payload: transaction})

    const bal = transactions.reduce((acc,curVal) => {
        return (curVal.type === "Expense" ? acc - curVal.amount : acc + curVal.amount)
    },0)

    return(
    <ExpenseTrackerContext.Provider value={{
        deleteTransaction,
        addTransaction,
        transactions,
        bal
    }}>
        {children}
    </ExpenseTrackerContext.Provider>
    )
}