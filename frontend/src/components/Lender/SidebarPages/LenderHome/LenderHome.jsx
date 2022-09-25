import React, { useEffect } from 'react'
import { useState } from 'react'
import "./home.css"
import LoanCard from './LoanCard'

const LenderHome = (props) => {


  
  const [loans, setloans] = useState([])


  
  const [rerender, setrerender] = useState(0)


  const fetchloans = async () => {
    const response = await fetch("http://localhost:5000/api/loans/fetchloans", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    })


    setloans(await response.json())

    setTimeout(
      setrerender(1)
      ,100)
  }

  useEffect(() => {
    fetchloans()
    // eslint-disable-next-line
  }, [rerender])


  return (

    <div>
      <h2>{props.username}</h2>
      <div className='home d-flex' >
        <div>
        
        </div>
      </div>

      <div class="row row-cols-1 row-cols-md-3 g-4 mt-5">
        {loans.map((Element) => {
          return <div class="col" key={Element._id}>
            <LoanCard loanid={Element._id} vendorname = {Element.vendorname} vendorid = {Element.vendorid} amount={Element.amount} tenure={Element.tenure} timestamp={Element.timestamp} />
          </div>
        })
        }
      </div>





    </div>


  )
}

export default LenderHome