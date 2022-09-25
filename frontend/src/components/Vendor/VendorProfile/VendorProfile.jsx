import React from 'react'
import Profileform from '../SidebarPages/UpdateProfile/VendorProfileform'
import "./vendorprofile.css"
import { useEffect } from 'react'
import { useState } from 'react'
import VendorHome from '../SidebarPages/VendorHome/VendorHome'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AlertContext from '../../../context/AlertContext'
import VendorTransactions from '../Transactions/VendorTransactions'




const VendorProfile = () => {

    const navigate = useNavigate()
    const context = useContext(AlertContext)
    const { showAlert } = context

    const [cash, setcash] = useState(0)
    
    const [userdetail, setuserdetail] = useState("")

    const onChange = (e)=>{
        setcash(e.target.value)
    }
    const fetchVendor = async () => {
        const response = await fetch("http://localhost:5000/api/userAuth/fetchVendor", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        })

        setuserdetail(await response.json())

    }
    const onSubmitDeposit = async (e) => {
        e.preventDefault()
        const data = {vendorcash:parseInt(cash)}
        await fetch("http://localhost:5000/api/wallet/depositVendor", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify(data)
        })

    }
        const onSubmitWithdraw = async (e) => {
            e.preventDefault()
            const data = { vendorcash:parseInt(cash)}
            await fetch("http://localhost:5000/api/wallet/withdrawVendor", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify(data)
            })
        }
        
    useEffect(() => {
        fetchVendor()
        // eslint-disable-next-line
    }, [])

    return (

        <div className='vendorprof'>
            <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel2">Withdraw</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <input type="number" onChange={onChange} min='0' max="100000" placeholder="0" />
                                <button type="button"  onClick={onSubmitWithdraw} class="btn btn-primary">Withdraw</button>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>
            {
                userdetail.firstname ? "" : navigate("/vendorkyc")
            }
            <div className='header bg-warning d-grid gap-2 d-md-flex justify-content-md-end'>
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-success dropdown-toggle me-md-2 my-2" data-bs-toggle="dropdown" aria-expanded="false">
                            Wallet {userdetail.vendorcash}
                        </button>
                        <ul class="dropdown-menu bg-success">
                            <li class="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal1">Deposit</li>
                            <li class="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal2" >Withdraw</li>
                        </ul>
                    </div>
                </div>
            <div class="d-flex">
                <div class="nav flex-column align-items-center nav-pills me-3 " id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <i class="fa-solid fa-id-badge fa-4x w-25 mb-4"></i>
                    <button class="nav-link " id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</button>
                    <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</button>
                    <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-transactions" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Transactions</button>
                    <button class="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-logout" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false" onClick={() => { localStorage.removeItem("token"); navigate("/"); showAlert("logged out successfully!", "success") }}>Logout</button>
                </div>
                <div class="tab-content w-75 mt-5" id="v-pills-tabContent">
                    <div class="tab-pane fade" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabindex="0">
                        <VendorHome username={userdetail.username} />
                    </div>
                    <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabindex="0">
                        <Profileform />
                    </div>
                    <div class="tab-pane fade" id="v-pills-transactions" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabindex="0">
                        <VendorTransactions/>
                    </div>

                </div>
            </div>
            <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel1">Deposit</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                            <input type="number" onChange={onChange} minvalue='0' maxvalue="100000" placeholder="0" />
                            <button type="button"  onClick={onSubmitDeposit}class="btn btn-primary">Deposit</button>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default VendorProfile