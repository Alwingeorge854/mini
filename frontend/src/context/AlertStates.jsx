import React, { useState } from 'react'
import AlertContext from './AlertContext'

const AlertStates = (props) => {

    const [show, setShow] = useState(false)
    const [alert, setAlert] = useState({ msg: "", type: "" })


    const showAlert = (msg, type) => {
        setShow(true)
        setAlert({ msg, type })
        setTimeout(() => {
            setShow(false)
        }, 1500)
    }


    return (
        <AlertContext.Provider value={{showAlert,alert,show}}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertStates