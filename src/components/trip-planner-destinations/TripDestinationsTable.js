import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap';
import axios from "../support-components/axios";
import { Link } from 'react-router-dom';
import DestinationRow from './DestinationRow'

function TripDestinationsTable() {
  const [destinations, setDestinations] = useState([]);
  const getDestinations = () => {
    axios.get('/tripplannerdestination/').then((res) => {
      console.log(res.data)
      setDestinations(res.data);
    }).catch((err) => {
      console.log(err)
    });
  }
  React.useEffect(getDestinations, [])
  return (
    <div className="row container mt-4" >
      <h5>Planner Destinations:</h5>
      <div className="ml-3">
        <Link to={"/add-new-trip-destination"}><button className="rounded btn-dark mb-2"><i className="fa fa-plus-square mr-2" aria-hidden="true"></i>Add New Destination</button></Link>
      </div>

      {destinations.length === 0 ? (
        <div className='row container pt-5 d-block d-flex justify-content-center'>
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th className="text-center" scope="col">Name</th>
              <th className="text-center" scope="col">N coordinates</th>
              <th className="text-center" scope="col">E coordinates</th>
              <th className="text-center" scope="col">Created At</th>
              <th className="text-center" scope="col">Updated At</th>
              <th className="text-center" scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map(destination => { // using props in child component and looping
              return (
                <DestinationRow data={destination} key={destination._id} onDelete={getDestinations} />
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TripDestinationsTable
