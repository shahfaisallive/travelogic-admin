import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from "../support-components/axios";
import { Link } from 'react-router-dom';

import RouteRow from "./RouteRow";

function RouteTable() {
  const [routes, setRoutes] = useState([]);
  const getRoutes = () => {
    axios.get('/routes').then((res) => {
      setRoutes(res.data);
    }).catch((err) => {
      console.log(err)
    });
  }
  useEffect(() => {
    axios.get('/routes').then((res) => {
      setRoutes(res.data);
    }).catch((err) => {
      console.log(err)
    });
  })
  return (
    <div className="row container mt-4">
      <h5>Routes</h5>
      <div className="ml-3">
        <Link to={"/add-new-route"}><button className="rounded btn-dark mb-2"><i className="fa fa-plus-square mr-2" aria-hidden="true"></i>Add New Route</button></Link>
      </div>

      {routes.length === 0 ? (
        <div className='row container pt-5 d-block d-flex justify-content-center'>
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th className="text-center" scope="col">ID </th>
              <th className="text-center" scope="col">Destination From : </th>
              <th className="text-center" scope="col">Destination To : </th>
              <th className="text-center" scope="col">Created At</th>
              <th className="text-center" scope="col">Updated At</th>
              <th className="text-center" scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {routes.map(route => { // using props in child component and looping
              return (
                <RouteRow data={route} key={route.id} onDelete={getRoutes} />
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default RouteTable
