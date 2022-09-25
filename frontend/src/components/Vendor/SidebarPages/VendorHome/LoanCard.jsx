import React from 'react'


const LoanCard = (props) => {

    const onAccept = async()=>{
            
            let data = {vendorcash:props.amount}
            await fetch("http://localhost:5000/api/wallet/depositVendor", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify(data)
            })
    
        
                 data = { lendercash:props.amount,lenderid:props.lenderid}
                await fetch("http://localhost:5000/api/wallet/withdrawLender", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token")
                    },
                    body: JSON.stringify(data)
                })
            
    }

    return (
        <div>

            <div class="card">
                <div className="card-header d-flex" style={{ justifyContent: "space-between" }}>
                    <span>{new Date(props.timestamp).toLocaleTimeString('en-IN', { timeZone: "Asia/Kolkata" })}</span>
                    <span>{new Date(props.timestamp).toLocaleDateString('en-IN', { timeZone: "Asia/Kolkata" })}</span>
                </div>
                <div class="card-body">
                    <h5 class="card-title">Amount : {props.amount}</h5>
                    <p class="card-text">Tenure : {props.tenure}</p>
                    {props.totalamount !== 0 && <div>
                        <p><u>Lender Offer</u></p>
                        <p class="card-text">Total Amount to paid back : {props.totalamount}</p>
                        <p class="card-text">EMI : {props.emi}</p>
                        <i class="fa-solid fa-check text-secondary mx-3" style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target={`#exampleModal3`} onClick={() => { localStorage.setItem("loanid", props.loanid);onAccept() }}></i>

                        <i class="fa-solid fa-xmark text-secondary" style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target={`#exampleModal2`} onClick={() => { localStorage.setItem("loanid", props.loanid) }} ></i>
                    </div>

                    }
                </div>
                <div className="container d-flex mb-3" style={{ justifyContent: "flex-end" }}>
                    <i class="fa-solid fa-trash text-secondary" style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target={`#exampleModal2`} onClick={() => { localStorage.setItem("loanid", props.loanid) }} ></i>
                </div>
            </div>

        </div >
    )



}

export default LoanCard