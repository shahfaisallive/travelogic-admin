import React, { useState } from 'react';
import axios from "../support-components/axios";
import { Link } from 'react-router-dom';

import TripTable from "./TripTable";
import { Spinner } from 'react-bootstrap';

function ViewTrips() {
  const [trips, setTrips] = useState([]);
  const getTrips = () => {
    axios.get('/trips/').then((res) => {
      console.log(res.data)
      setTrips(res.data);
    }).catch((err) => {
      console.log(err)
    });
  }
  React.useEffect(getTrips, [])
  return (
    <div className="container mt-4">
      <div className="row trips-table">
        <h5>Trips and Tours:</h5>
        <div className="ml-3">
          <Link to={"/add-new-trip"}><button className="rounded btn-dark mb-2"><i className="fa fa-plus-square" aria-hidden="true"></i> Add New Trip</button></Link>
        </div>
        {trips.length === 0 ? (
          <div className='row container pt-5 d-block d-flex justify-content-center'>
            <Spinner animation="border" role="status" />
          </div>
        ) : (
          <table className="table  table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">Id</th>
                <th className="tableHeader-2" scope="col">Trip Title</th>
                <th scope="col">Display Image</th>
                <th className="tableHeader-1" scope="col">Description</th>
                <th className="" scope="col">Price</th>
                <th className="" scope="col">Rating</th>
                <th className="tableHeader-1" scope="col">Attractions</th>
                <th className="tableHeader-1" scope="col">Excludes</th>
                <th className="" scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {trips.map(trip => { // using props in child component and looping
                return (
                  <TripTable data={trip} key={trip._id} onDelete={getTrips} />
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default ViewTrips
