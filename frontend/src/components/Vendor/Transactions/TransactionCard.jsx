import React from 'react'


const TransactionCard = (props) => {

    return (
        <div>

            <div class="card">
                <div className="card-header d-flex" style={{ justifyContent: "space-between" }}>

                    <h4><b>{props.vendorname}</b></h4>
                    <span>{new Date(props.timestamp).toLocaleDateString('en-IN', { timeZone: "Asia/Kolkata" })}</span>

                </div>
                <div class="card-body">
                    <h5 class="card-title">Total Amount : {props.totalamount}</h5>
                    <p class="card-text">EMI : {props.emi}</p>
                </div>
                
            </div>




        </div>
    )



}

export default TransactionCard