import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import AlertContext from "../../../../context/AlertContext"
const LenderProfileForm = () => {

    const context = useContext(AlertContext)
    const {showAlert} = context

    const [info, setInfo] = useState({})

    const fetchuser = async () => {
        const response = await fetch("http://localhost:5000/api/userAuth/fetchLender", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        })

        setInfo(await response.json())

    }

    const onChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const data = { firstname: info.firstname, lastname: info.lastname, phonenumber: info.phonenumbere, aadharnumber: info.aadharnumber, pancardnumber: info.pancardnumber, address: info.address }
        const response = await fetch("http://localhost:5000/api/userAuth/kycLender", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }, body: JSON.stringify(data)
        })

        const res = await response.json()

        if(res.msg==="updated!")
            showAlert(res.msg,"success")
        else
            showAlert(res.msg,"danger")
    }

    useEffect(() => {
        fetchuser()
    }, [])

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="d-flex" style={{ justifyContent: "space-evenly" }}>
                    <div>

                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">UserName</label>
                            <input type="text" class="form-control" name="username" id="exampleInputEmail1" value={info.username} aria-describedby="emailHelp" disabled />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">First Name</label>
                            <input type="text" class="form-control" name="firstname" value={info.firstname} id="exampleInputPassword1" onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Last Name</label>
                            <input type="text" class="form-control" name="lastname" value={info.lastname} id="exampleInputPassword1" onChange={onChange} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Phone Number</label>
                            <input type="number" class="form-control" name="phonenumber" value={info.phonenumber} id="exampleInputPassword1" onChange={onChange} />
                        </div>
                    </div>
                    <div>

                        <div class="mb-3">

                            <label for="exampleInputPassword1" class="form-label">Aadhar Number</label>
                            <input type="number" class="form-control" name="aadharnumber" value={info.aadharnumber} id="exampleInputPassword1" onChange={onChange} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">PAN Card Number</label>
                            <input type="text" class="form-control" name="pancardnumber" value={info.pancardnumber} id="exampleInputPassword1" onChange={onChange} />
                        </div>
                        <div class="mb-5">
                            <label for="exampleInputPassword1" class="form-label">Address</label>
                            <input type="text" class="form-control" name="address" value={info.address} id="exampleInputPassword1" onChange={onChange} />
                        </div>
                        <button type="submit " class="btn btn-warning">Update</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LenderProfileForm