import React from 'react'
import { toast } from 'react-toastify';
import axios from "../support-components/axios";

function RouteRow(props) {
  
  const { _id,destination_to,destination_from,createdAt,updatedAt} = props.data
  const onDelete = props.onDelete;

  const deleteRoute = ()=>{
    axios.delete(`/routes/${_id}`).then((res)=>{
      console.log(res.data)
      onDelete()
      toast.success("Route Deleted", {
        position: toast.POSITION.TOP_CENTER
      });
    }).catch((err)=>{
      console.log(err)
    });
  }

  return (
    <tr>
      <th className="text-center" scope="row">{_id}</th>
      <td className="text-center">{destination_from.name}</td>
      <td className="text-center">{destination_to.name}</td>
      <td className="text-center">{createdAt.substring(0, 10)}</td>
      <td className="text-center">{updatedAt.substring(0, 10)}</td>
      <td className="d-flex justify-content-center del-btn-border"><button style={{ cursor: 'pointer', color: 'red' }} className="btn fa fa-trash fa-2x" onClick={deleteRoute} size="sm" variant="danger"></button></td>
    </tr>
  )
}

export default RouteRow
