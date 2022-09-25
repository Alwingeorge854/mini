import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../NavBar/Navbar'
import "./mainpage.css"

const MainPage = () => {
    return (
        <div className='MainPage'>
            <Navbar />
            <div className='bgimg'>
                <div className='description d-flex'>
                    <h1>Lender Vendor Management System</h1>
                    <p>Empower and support small scale vendors</p>
                    ALL-IN-ONE platform for Micro-loans

                    <div className='mt-3'>
                        <Link to="/lenderlogin"><button className='btn btn-warning mx-2 btn-lg'>Lender</button></Link>
                        <Link to="/vendorlogin"><button className='btn btn-warning mx-2 btn-lg'>Vendor</button></Link>
                    </div>
                </div>

            </div>
            <div className='abot'>
                <h1>About</h1>
                <h4>The sokevmmfemksdmfsdnfjmnsfm,dn</h4>
            </div>
            <div className='footer bg-warning mx-2 mt-2'>
                <span>Contact Us</span><br/>
                <p>Email: lvms_customersupport@gmail.com</p>
                <p>Phone Number:862594122</p>
            </div>
        </div>
    )
}

export default MainPage