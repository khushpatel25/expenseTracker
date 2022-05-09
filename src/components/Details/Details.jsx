import React from 'react'
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core'
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, registerables } from "chart.js";

import useTransactions from '../../useTransactions'
import useStyles from './styles'

const Details = ({ title }) => {

    const classes = useStyles()
    const { chartData, total } = useTransactions(title)
    Chart.register(ArcElement);
    Chart.register(...registerables);

    return (
        <Card className={title === 'Income' ? classes.income : classes.expense}>
            <CardHeader title={title} />
            <CardContent >
                <Typography variant='h5'>₹{total}</Typography>
                <Doughnut data={chartData} />
            </CardContent>
        </Card>
    )
}

export default Details