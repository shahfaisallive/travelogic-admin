import React from 'react'
import axios from "../support-components/axios";
import { toast } from 'react-toastify';


function QuestionRow(props) {
  
  const { _id,user,statement,reported,createdAt,updatedAt} = props.data
  const onDelete = props.onDelete;

  const deleteQuestion = ()=>{
    axios.delete(`/questions/${_id}`).then((res)=>{
      toast.success("Question Deleted", {
        position: toast.POSITION.TOP_CENTER
      });
      onDelete()
    }).catch((err)=>{
      console.log(err)
    });
  }
  return (
      <tr>
        <th className="text-center" scope="row">{!user ? <p className='text-secondary'>User</p> : user.name }</th>
        <td className="text-center">{statement}</td>
        <td className="text-center">{`${reported}`}</td>
        <td className="text-center">{createdAt.substring(0,10)}</td>
        <td className="text-center">{updatedAt.substring(0,10)}</td>
        <td className="d-flex justify-content-center del-btn-border">
          <button type="button" style={{ cursor: 'pointer', color: 'red' }} onClick={e=>{deleteQuestion()}} className="btn fa fa-trash fa-2x"></button>
        </td>
      </tr>
  )
}

export default QuestionRow
