import React from 'react'
import { toast } from 'react-toastify';
import axios, { userImagePath } from "../support-components/axios";


function UserRow(props) {
  const { _id,updatedAt,createdAt,name,reported, email, display_image_name} = props.data
  const onDelete = props.onDelete;
  const deleteUser = ()=>{
    axios.delete(`/users/${_id}`).then((res)=>{
      console.log(res.data)
      toast.success("User Deleted", {
        position: toast.POSITION.TOP_CENTER
      });
      onDelete()
    }).catch((err)=>{
      console.log(err)
    });
  }
  return (
    <tr>
      <th className="text-center">{_id}</th>
      <td className="text-center" >{name}</td>
      <td className="text-center" >{<a rel="noreferrer" href={`${userImagePath}/${display_image_name}`} target="_blank"><img alt='loading' src={`${userImagePath}/${display_image_name}`} width='70px' /></a>}</td>
      <td className="text-center" >{email}</td>
      <td className="text-center">{`${reported}`}</td>
      <td className="text-center">{createdAt.substring(0,10)}</td>
      <td className="text-center">{updatedAt.substring(0,10)}</td>
      <td className="d-flex justify-content-center del-btn-border">
        <button type="button" style={{ cursor: 'pointer', color: 'red' }} onClick=
        {e=>{deleteUser()}} className="btn fa fa-trash fa-2x"></button>
      </td>
    </tr>
  )
}

export default UserRow
