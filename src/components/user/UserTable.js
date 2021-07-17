import React, { useState } from 'react'
import axios from "../support-components/axios";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


import UserRow from './UserRow'
import { Spinner } from 'react-bootstrap';

function UserTable() {
  const isAdminLoggedIn = useSelector(state => state.isLoggedIn)
  const { adminInfo } = isAdminLoggedIn
  const [users, setUsers] = useState([]);
  const getUsers = () => {
    axios.get('/users/admin/users', {
      headers: {
        Authorization: `Bearer ${adminInfo.token}` //the token is a variable which holds the token
      }
    }).then((res) => {
      console.log(res.data)
      setUsers(res.data);
    }).catch((err) => {
      console.log(err)
    });
  }
  React.useEffect(getUsers, [])
  return (
    <div className='row container'>
      <h5>Users:</h5>
      <div className="ml-3">
        <Link to="/reported-users"><button className="rounded btn-dark mb-2"><i className="fa fa-user fa-lg" aria-hidden="true"></i>  View Reported Users</button></Link>
      </div>

      {users.length === 0 ? (
        <div className='row container pt-5 d-block d-flex justify-content-center'>
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <table className="table table-striped">
          <thead className="table-dark  ">
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">Username</th>
              <th scope="col">Profile Image</th>
              <th scope="col">Email</th>
              <th scope="col">Reported</th>
              <th scope="col" className="tableHeader-4">Created At</th>
              <th scope="col" className="tableHeader-4">Updated At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => { // using props in child component and looping
              return (
                <UserRow data={user} key={user._id} onDelete={getUsers} />
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default UserTable
