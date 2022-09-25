import React, { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../../context/AlertContext'
import Navbar from '../NavBar/Navbar'

const KycLender = () => {

    const context = useContext(AlertContext)
    const {showAlert} = context


    const navigate = useNavigate()

    const [info, setInfo] = useState({ firstname: "", lastname: "", phonenumber: "", aadharnumber: "", pancardnumber: "", address: "" })

    const onChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const data = { firstname: info.firstname, lastname: info.lastname, phonenumber: info.phonenumber, aadharnumber: info.aadharnumber, pancardnumber: info.pancardnumber, address: info.address }
        const response = await fetch("http://localhost:5000/api/userAuth/kycLender", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify(data)
        })

        const res = await response.json()
        if(res.msg==="updated"){
            showAlert(res.msg,"success")
            navigate("/lenderprofile")
        }
        else{
            showAlert(res.msg,"danger")
        }
    }

    return (
        <div>
            <Navbar/>
            <div className='KycLender container mt-5'>
                <h1>Complete Lender Profile</h1>
                <form onSubmit={onSubmit}>
                    <div class="mb-3">
                        <label for="exampleInputUserName1" class="form-label">FirstName</label>
                        <input type="text" class="form-control" id="exampleInputUsername1" onChange={onChange} name="firstname" />
                    </div>

                    <div class="mb-3">
                        <label for="exampleInputUserName1" class="form-label">LastName</label>
                        <input type="text" class="form-control" id="exampleInputUsername1" onChange={onChange} name="lastname" />
                    </div>

                    <div class="mb-3">
                        <label for="exampleInputUserName1" class="form-label">Phone Number</label>
                        <input type="number" class="form-control" id="exampleInputUsername1" onChange={onChange} name="phonenumber" />
                    </div>

                    <div class="mb-3">
                        <label for="exampleInputUserName1" class="form-label">Aadhar Number</label>
                        <input type="number" class="form-control" id="exampleInputUsername1" onChange={onChange} name="aadharnumber" />
                    </div>

                    <div class="mb-3">
                        <label for="exampleInputUserName1" class="form-label">Pancard Number</label>
                        <input type="text" class="form-control" id="exampleInputUsername1" onChange={onChange} name="pancardnumber" />
                    </div>

                    <div class="mb-3">
                        <label for="exampleInputUserName1" class="form-label">Address</label>
                        <input type="text" class="form-control" id="exampleInputUsername1" onChange={onChange} name="address" />
                    </div>

                    <div className='btngrp d-flex'>
                        <button type="submit" class="btn btn-warning">Update Info</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default KycLender