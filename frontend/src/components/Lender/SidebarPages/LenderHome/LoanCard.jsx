import React from 'react'
import { useEffect } from 'react'
import { useState,useContext } from 'react'
import AlertContext from "../../../../context/AlertContext"


const LoanCard = (props) => {

    const [sliderval, setSliderval] = useState(0)
    const [totalamount, settotalamount] = useState(0)
    const [emi, setemi] = useState()

    const context = useContext(AlertContext)
    const {showAlert} = context

    const onAccept = async () => {
        const data = { totalamount, emi, loanid: props.loanid }
        const response = await fetch("http://localhost:5000/api/loans/updateAmountEmi", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem("token")
            },
            body:JSON.stringify(data)
        })
        const res = await response.json()
        if(res.msg==="updated!")
            showAlert(res.msg,"success")
        else
            showAlert(res.msg,"danger")
        
        
    }

    const onSliderChange = (e) => {
        setSliderval(e.target.value)
    }

    useEffect(()=>{
        settotalamount(props.amount + props.amount * (sliderval / 100))
        setemi((props.amount + props.amount * (sliderval / 100)) / props.tenure)
        // eslint-disable-next-line
    },[sliderval])

    return (
        <div>

            <div class="card">
                <div className="card-header d-flex" style={{ justifyContent: "space-between" }}>

                    <h4><b>{props.vendorname}</b></h4>
                    <span>{new Date(props.timestamp).toLocaleDateString('en-IN', { timeZone: "Asia/Kolkata" })}</span>

                </div>
                <div class="card-body">
                    <h5 class="card-title">Amount : {props.amount}</h5>
                    <p class="card-text">Tenure : {props.tenure}</p>
                </div>
                <div className="container d-flex mb-3" style={{ justifyContent: "flex-end" }}>
                    <i class="fa-solid fa-pen text-secondary" style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target={`#exampleModal${props.loanid}`} onClick={() => { localStorage.setItem("loanid", props.loanid) }} ></i>
                </div>
            </div>



            <div class="modal fade" id={`exampleModal${props.loanid}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Loan Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div>
                                <p>Amount: {props.amount}</p>
                                <p>Tenure: {props.tenure}</p>
                                <label for="customRange2" class="form-label">Rate of Interest</label><br />
                                <span>0% </span>
                                <input type="range" class="form-range w-50" min="0" max="20" value={sliderval} onChange={onSliderChange} id="customRange2" />
                                <span> 20%</span>
                                <span className='mx-3'>{sliderval}%</span>
                                <p>Total Amount ={totalamount} </p>

                                <p>EMI Amount ={emi} </p>

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={onAccept}>Accept</button>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )



}

export default LoanCard