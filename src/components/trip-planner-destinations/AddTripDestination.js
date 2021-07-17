import React, { useState } from 'react';
import axios from "../support-components/axios";
import { toast } from 'react-toastify';
import {  useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';

const AddTripDestination = () => {
  const isAdminLoggedIn = useSelector(state => state.isLoggedIn)
	const { adminInfo } = isAdminLoggedIn
    // Setting up states
  const [name, setName] = useState('');
  const [north, setNorth] = useState('');
  const [east, setEast] = useState('');
  const [submitSpinner, setSubmitSpinner] = useState(false);

  const submitDestination = (e) => {
    e.preventDefault()
    setSubmitSpinner(true)
    var data = {
      name:name,
      north_coordinate:north,
      east_coordinate:east
    }
    axios.post('/tripplannerdestination/',data,{
      headers: {
        Authorization:`Bearer ${adminInfo.token}` //the token is a variable which holds the token
      }
     })
    .then(res =>{
      setSubmitSpinner(false)
      toast.success("Trip Planner Destination Added", {
        position: toast.POSITION.TOP_CENTER
      });

      setName('')
      setNorth('')
      setEast('')
    })
    .catch(err=>{
      console.log(err)
      toast.warn(err.response.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
      setSubmitSpinner(false)
    })
  }

  return (
    <div className="container add-destination-wrap">
      <div className="row">
        <h5 className="Display-1">Add Trip Planner Destination</h5>
      </div>
      <div className="row add-destination-form-div mt-3">
        <div className="col-md-7">
          <form onSubmit={submitDestination}>
            {/* SET DESTINATION NAME */}
            <div className="form-group">
              <label htmlFor="destination-title">Trip Planner Destination Name</label>
              <input value={name} type="text" className="form-control" onChange={e=>{setName(e.target.value)}} placeholder="Name" />
            </div>
            <div className="form-group">
              <label htmlFor="destination-title">North Coordinates</label>
              <input value={north} type="text" pattern='^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,4})?))$' className="form-control" onChange={e=>{setNorth(e.target.value)}} placeholder="North Coordinates" />
            </div>
            <div className="form-group">
              <label htmlFor="destination-title">East Coordinates</label>
              <input value={east} type="text" pattern='^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,4})?))$' className="form-control" onChange={e=>{setEast(e.target.value)}} placeholder="East Coordinates" />
            </div>
            {
              submitSpinner ?
              <Spinner animation="border" role="status" />
              :
              <button type="submit" className="btn btn-dark mb-5">Add Destination</button>
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTripDestination;
