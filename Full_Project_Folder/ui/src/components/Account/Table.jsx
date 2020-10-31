import React from 'react'
import Material from 'material-table'

export const Table = () => {
    const data = [
            {transaction_number: 23423, amount = "$500.50", date = "20/10/2020", location: "ATM Berryessa"}
    ]


    const columns = [
        {
        title = 'Transaction Number', field = 'transaction_number'
        },
        {
        title = 'Amount', field = 'amount'
        },
        {
        title = 'Date', field = 'date'
        },
        {
        title = 'Location', field = 'location'
        }
    ]
    return (<div>

         <MaterialTable title = "Transaction Table"
            data = {data}
            columns = {columns}
            />
        </div>)
}
