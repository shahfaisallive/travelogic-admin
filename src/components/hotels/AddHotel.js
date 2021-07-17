import React, { useState,useEffect } from 'react';
import axios from "../support-components/axios";
import { toast } from 'react-toastify';
import {  useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';


const AddHotel = () => {
  const isAdminLoggedIn = useSelector(state => state.isLoggedIn)
	const { adminInfo } = isAdminLoggedIn
    // Setting up states
  const [title, setTitle] = useState('');
  const [destination,setDestination] = useState('')
  const [luxuryRent,setLuxuryRent] = useState('')
  const [budgetRent,setBudgetRent] = useState('')
  const [contactNumber,setContactNumber] = useState('')
  const [destinations,setDestinations] = useState([])
  const [submitSpinner, setSubmitSpinner] = useState(false);


  useEffect(()=>{
    axios.get('/tripplannerdestination/')
    .then(res => {
      console.log(res.data)
      setDestinations(res.data)
    })
    .catch(err=>console.log(err))
  },[])

  const submitHotel = (e) => {
    e.preventDefault()
    setSubmitSpinner(true)
    const hotelObject = {
      title: title,
      destination: destination,
      luxury_rent: luxuryRent,
      budget_rent:budgetRent,
      contact_number:contactNumber
    };
    console.log(hotelObject)

    axios.post('/hotels', hotelObject,{
      headers: {
        Authorization:`Bearer ${adminInfo.token}` //the token is a variable which holds the token
      }
     })
    .then(res => {
      setSubmitSpinner(false)
      toast.success("Hotel Added", {
        position: toast.POSITION.TOP_CENTER
      });
      setTitle('')
      setDestination('')
      setLuxuryRent('')
      setBudgetRent('')
      setContactNumber('')
    })
    .catch(err=>{
      setSubmitSpinner(false)
      toast.warn(err.response.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
      console.log(err)})
  }

  return (
    <div className="container add-destination-wrap">
      <div className="row">
        <h5 className="Display-1">Add new Hotel:</h5>
      </div>
      <div className="row add-destination-form-div mt-3">
        <div className="col-md-7">
          <form onSubmit={submitHotel}>
            {/* SET HOTEL NAME */}
            <div className="form-group">
              <label htmlFor="destination-title">Hotel Name</label>
              <input value={title} type="text" className="form-control" onChange={e=>{setTitle(e.target.value)}} placeholder="Hotel Title" />
            </div>

            {/* SET DESTINATION */}
            <div className="form-group">
              <label htmlFor="title-image">Destination</label><br/>
              <select value={destination} id="to" className="form-control" onChange={e=>{
                console.log('destination',e.target.value)
                setDestination(e.target.value)}} >
                <option></option>
                {destinations.map(destination => { 
                  return (
                    <option key={destination._id} value={destination._id}>{destination.name}</option>
                  )
                })}
              </select>
            </div>

            {/* SET LUXURY RENT*/}
            <div className="form-group">
              <label htmlFor="introduction">Luxury Rent</label>
              <input value={luxuryRent} type="number" min='0' className="form-control" onChange={e=>{setLuxuryRent(e.target.value)}} placeholder="Luxury Rent" />
            </div>

            {/* SET BUDGET RENT */}
            <div className="form-group">
              <label htmlFor="introduction">Budget Rent</label>
              <input value={budgetRent} type="number" min='0' className="form-control" onChange={e=>{setBudgetRent(e.target.value)}} placeholder="Budget Rent" />
            </div>

            {/* SET Contact Num */}
            <div className="form-group">
              <label htmlFor="introduction">Contact Number</label>
              <input value={contactNumber} type="text" className="form-control" onChange={e=>{setContactNumber(e.target.value)}} placeholder="Contact Number" />
            </div>
            {
              submitSpinner ?
              <Spinner animation="border" role="status" />
              :
              <button type="submit" className="btn btn-dark mb-5">Add Hotel</button>
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddHotel;
