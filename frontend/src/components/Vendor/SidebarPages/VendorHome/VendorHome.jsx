
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import AlertContext from '../../../../context/AlertContext'
import "./home.css"
import LoanCard from './LoanCard'

const VendorHome = (props) => {

  const context = useContext(AlertContext)
  const { showAlert } = context

  const [info, setInfo] = useState({ amount: 0, tenure: 0 })
  const [loans, setloans] = useState([])
  const [rerender, setrerender] = useState(0)


  const onChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  const onPost = async () => {
    setrerender(0)
    const data = { amount: info.amount, tenure: info.tenure }
    const response = await fetch("http://localhost:5000/api/loans/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify(data)
    })

    const res = await response.json()

    if (res.msg === "loan request posted!") {
      showAlert(res.msg, "success")
    }
    else {
      showAlert(res.msg, "danger")
    }
    setTimeout(() => {
      setrerender(1)
    }, 100);
  }

  const onDelete = async () => {
    const response = await fetch(`http://localhost:5000/api/loans/delete/${localStorage.getItem("loanid")}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    })

  const res = await response.json()

    if (res.msg === "Loan Request deleted!")
      showAlert(res.msg, "success")
    else
      showAlert(res.msg, "danger")
      setTimeout(() => {
        setrerender(rerender+1)
      }, 200);

  }

  const onAccept = async () => {
    const data = {loanid: localStorage.getItem("loanid") }
    const response = await fetch("http://localhost:5000/api/transactions/addTransaction", {
        method: "POST",
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


  const fetchloans = async () => {
    const response = await fetch("http://localhost:5000/api/loans/fetchuserloan", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    })

    setloans(await response.json())
  }

  useEffect(() => {
    fetchloans()

  }, [rerender])




  return (


    <div>
      <h2>{props.username}</h2>
      <div className='home d-flex' >
        <div>
          <button className="btn btn-warning " data-bs-toggle="modal" data-bs-target="#exampleModal">+ New</button>
        </div>
      </div>

      <div class="row row-cols-1 row-cols-md-3 g-4 mt-5">
        {loans.map((Element) => {
          return <div class="col" key={Element._id}>
            <LoanCard loanid={Element._id} lenderid={Element.lenderid} amount={Element.amount} tenure={Element.tenure} timestamp={Element.timestamp} totalamount={Element.totalamount} emi={Element.emi} />
          </div>
        })
        }
      </div>



      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Loan Details</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Enter Loan Amount</label>
                  <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} name="amount" />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Tenure</label>
                  <input type="number" class="form-control" id="exampleInputPassword1" onChange={onChange} name="tenure" />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onClick={onPost} data-bs-dismiss="modal" >Post</button>
            </div>
          </div>
        </div>
      </div>


      <div class="modal fade" id={`exampleModal2`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Loan Details</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Are You Sure...?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onClick={onDelete} data-bs-dismiss="modal" >Delete</button>
            </div>
          </div>
        </div>
      </div>





      <div class="modal fade" id={`exampleModal3`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Loan Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Are You Sure...?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={onAccept} data-bs-dismiss="modal" >Accept</button>
                        </div>
                    </div>
                </div>
            </div>





    </div>

  )
}

export default VendorHome