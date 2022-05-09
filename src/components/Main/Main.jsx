import React, { useContext } from 'react'
import { Grid, Card, CardHeader, CardContent, Typography, Divider } from '@material-ui/core'

import useStyles from './styles'
import Form from './Form/Form'
import List from './List/List'
import InfoCard from '../InfoCard'
import { ExpenseTrackerContext } from '../../Context/context'

const Main = () => {

    const classes = useStyles()
    const { bal } = useContext(ExpenseTrackerContext)

    return (
        <Card className={classes.root}>
            <CardHeader title="Expense Tracker" subheader="Powered by Speechly" />
            <CardContent className={classes.cardContent}>
                <Typography align="center" variant="h5">Total balance ₹{bal}</Typography>
                <Typography variant='subtitle1' style={{ lineHeight: '1.5rem', marginTop: '20px', textAlign: 'center', padding: '0 20px' }}>
                    <InfoCard />
                </Typography>
                <Divider className={classes.divider} />
                <Form />
            </CardContent>
            <CardContent className={classes.cardContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <List />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Main