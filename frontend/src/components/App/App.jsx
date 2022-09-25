import React, { useContext } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import MainPage from '../MainPage/MainPage'
import "./app.css"
import LenderSignIn from '../Lender/LenderSignIn'
import VendorSignIn from '../Vendor/VendorSignIn'
import LenderLogin from '../Lender/LenderLogin'
import VendorLogin from '../Vendor/VendorLogin'
import KycLender from '../Lender/KycLender'
import KycVendor from '../Vendor/KycVendor'

import Alert from '../Alert/Alert'
import AlertContext from '../../context/AlertContext'
import VendorProfile from '../Vendor/VendorProfile/VendorProfile'
import LendorProfile from '../Lender/LenderProfile/LenderProfile'

const App = () => {
  
  const context = useContext(AlertContext)
  const {show,alert} = context
  
  return (
    <div className='App'>

      {show&&<Alert alert={alert}/>}
        <Router>
            <Routes>

                <Route path="/" element={<MainPage/>} />
                
                <Route path="/lenderlogin" element={<LenderLogin/>} />
                <Route path="/lendersignin" element={<LenderSignIn/>} />
                <Route path="/lenderkyc" element={<KycLender/>} />
                <Route path="/lenderprofile" element={<LendorProfile/>} />


                <Route path="/vendorlogin" element={<VendorLogin/>} />
                <Route path="/vendorsignin" element={<VendorSignIn/>} />
                <Route path="/vendorkyc" element={<KycVendor/>}/>
                <Route path="/vendorprofile" element={<VendorProfile/>} />


            </Routes>
        </Router>
    </div>
  )
}

export default App