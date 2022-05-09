import React from 'react'

const isIncome = Math.round(Math.random())

const InfoCard = () => {
  return (
    <div style={{ textAlign: 'center', padding: '0 10%' }}>
      Try saying: <br />
      Add {isIncome ? "Income " : "Expense "}
      of {isIncome ? "₹1000 " : "₹500 "}
      in category {isIncome ? "Salary " : "Food "}
      for {isIncome ? "Monday " : "Sunday "}
    </div>
  )
}

export default InfoCard