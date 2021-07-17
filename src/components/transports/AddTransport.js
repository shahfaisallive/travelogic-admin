import React, { useState,useEffect } from 'react';
import axios from "../support-components/axios";
import { toast } from 'react-toastify';
import {  useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';


const AddTransport = () => {

  const isAdminLoggedIn = useSelector(state => state.isLoggedIn)
	const { adminInfo } = isAdminLoggedIn
    // Setting up states
  const [name, setName] = useState('');
  const [fare, setFare] = useState('');
  const [route, setRoute] = useState('');
  const [routes, setRoutes] = useState([]);
  const [submitSpinner, setSubmitSpinner] = useState(false);


  useEffect(()=>{
    axios.get('/routes/',{
      headers: {
        Authorization:`Bearer ${adminInfo.token}` //the token is a variable which holds the token
      }
     })
    .then(res => {
      setRoutes(res.data)
    })
    .catch(err=>console.log(err))
  },[])

  const submitTransport = (e) => {
    e.preventDefault()
    setSubmitSpinner(true)

    const transportObject = {
      company_name: name,
      fare:fare,
      route:route
    };

    axios.post('/transports', transportObject,{
      headers: {
        Authorization:`Bearer ${adminInfo.token}` //the token is a variable which holds the token
      }
     })
    .then(res => {
      setSubmitSpinner(false)
      toast.success("Transport Added", {
        position: toast.POSITION.TOP_CENTER
      });
      setName('')
      setFare('')
      setRoute('')
      })
    .catch(err=>{
      setSubmitSpinner(false)
      toast.warn(err.response.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
      console.log(err)
    })

  }

  return (
    <div className="container add-destination-wrap">
      <div className="row">
        <h5 className="Display-1">Add New Transport:</h5>
      </div>
      <div className="row add-destination-form-div mt-3">
        <div className="col-md-7">
          <form onSubmit={submitTransport}>
            {/* SET HOTEL NAME */}
            <div className="form-group">
              <label htmlFor="destination-title">Transport Company Name</label>
              <input value={name} type="text" className="form-control" onChange={e=>{setName(e.target.value)}} placeholder="Transport Name" />
            </div>
            <div className="form-group">
              <label htmlFor="destination-title">Fare</label>
              <input value={fare} type="number" className="form-control" onChange={e=>{setFare(e.target.value)}} placeholder="Fare" />
            </div>
            <div className="form-group">
              <label htmlFor="title-image">Route</label><br/>
              <select value={route} id="to" className="form-control" onChange={e=>setRoute(e.target.value)} >
                <option></option>
                {routes.map(route => { 
                  return (
                    <option key={route._id} value={route._id}>{route.destination_from.name} to {route.destination_to.name} </option>
                  )
                })}
              </select>
            </div>
            {
              submitSpinner ?
              <Spinner animation="border" role="status" />
              :
              <button type="submit" className="btn btn-dark mb-5">Add Transport</button>
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTransport;
