import React, { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../../context/AlertContext'
import Navbar from '../NavBar/Navbar'

const LenderSignIn = () => {

    const navigate = useNavigate()

    const context = useContext(AlertContext)
    const { showAlert } = context

    const [info, setinfo] = useState({ username: "", password: "" })


    const onChange = (e) => {
        setinfo({ ...info, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const data = { username: info.username, password: info.password }
        const response = await fetch("http://localhost:5000/api/userAuth/lenderSignUp", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const res = await response.json()
        if (res.msg === "User Created Successfully!") {
            showAlert(res.msg, "success")
            navigate("/lenderlogin")
        }
        else{
            showAlert(res.msg,"danger")
        }
    }

    return (
        <div>
            <Navbar />
            <div className='LenderSignIn container mt-5'>
                <h1>Welcome! Signup as a Lender</h1>
                <form onSubmit={onSubmit}>
                    <div class="mb-3">
                        <label for="exampleInputUserName1" class="form-label">UserName</label>
                        <input type="text" class="form-control" id="exampleInputUsername1" onChange={onChange} name="username" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" onChange={onChange} name="password" />
                    </div>
                    <button type="submit" class="btn btn-warning">Sign In</button>

                </form>
            </div>
        </div>
    )
}

export default LenderSignIn