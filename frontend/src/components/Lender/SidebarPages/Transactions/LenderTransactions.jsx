import React, { useEffect } from 'react'
import { useState } from 'react'
import TransactionCard from './TransactionCard'

const LenderTransactions = () => {


    const [transactions, setTransactions] = useState([])

    const fetchtransactions = async() => {
        const response = await fetch("http://localhost:5000/api/transactions/fetchLenderTransactions",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem("token")
            }
        })

        setTransactions(await response.json())
      
    
    }

    useEffect(() => {
        fetchtransactions()
    }, [])
    
    return (
        <div>
            <div class="row row-cols-1 row-cols-md-3 g-4 mt-5">
                {transactions.map((Element) => {
                    return <div class="col" key={Element._id}>
                        <TransactionCard vendorname={Element.vendorname} totalamount={Element.totalamount} emi={Element.emi} timestamp={Element.timestamp} />
                    </div>
                })
                }
            </div>

        </div>
    )
}

export default LenderTransactions