import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AlertContext from '../../context/AlertContext'
import Navbar from '../NavBar/Navbar'

const LenderLogin = () => {

    const context = useContext(AlertContext)
    const {showAlert} = context

    const navigate = useNavigate()

    const [info, setinfo] = useState({ username: "", password: "" })


    const onChange = (e) => {
        setinfo({...info, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const data = { username: info.username, password: info.password }
        const response = await fetch("http://localhost:5000/api/userAuth/lenderLogin", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const res = await response.json()
        if (res.token) {
            showAlert("Logged in Successfully!","success")
            localStorage.setItem("token", res.token)
            navigate("/lenderprofile")
        }
        else{
            showAlert(res.msg,"danger")
        }
    }


    return (
        <div>
            <Navbar />
            <div className='LenderLogin container mt-5'>
                <h1>Welcome! Login as a Lender</h1>
                <form onSubmit={onSubmit}>
                    <div class="mb-3">
                        <label for="exampleInputUserName1" class="form-label">UserName</label>
                        <input type="text" class="form-control" id="exampleInputUsername1" onChange={onChange} name="username" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" onChange={onChange} name="password" />
                    </div>
                    <div className='btngrp d-flex' style={{justifyContent:"space-between"}}>
                        <button type="submit" class="btn btn-warning">Login</button>
                        <span>New to this website..?<Link to="/lendersignin" >Create Account</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LenderLogin