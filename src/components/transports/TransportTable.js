import React from 'react';
import { Link } from 'react-router-dom';
import axios from "../support-components/axios";
import {  useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const TransportTable = (props) => {
    const isAdminLoggedIn = useSelector(state => state.isLoggedIn)
	const { adminInfo } = isAdminLoggedIn
    const { _id, route, company_name, createdAt, updatedAt,fare } = props.data
    const onDelete = props.onDelete

    const deleteTransport = () => {
        axios.delete('/transports/' + props.data._id,{
            headers: {
              Authorization:`Bearer ${adminInfo.token}` //the token is a variable which holds the token
            }
           })
        .then((res) => {
            toast.success("Transport Deleted", {
                position: toast.POSITION.TOP_CENTER
              });
            onDelete()
        }).catch((error) => {
            console.log(error)
        })
    }


    return (
        <tr>
            <td>{_id}</td>
            <td>{company_name}</td>
            <td>{route.destination_from.name}</td>
            <td>{route.destination_to.name}</td>
            <td>{fare}</td>
            <td>{createdAt.substring(0,10)}</td>
            <td>{updatedAt.substring(0,10)}</td>
            <td style={{columnWidth:100}}>
                <Link className="edit-link mr-2 ml-3" to={"/editTransport/" + props.data._id}>
                    <i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
                    </Link>
                <button style={{ cursor: 'pointer', color: 'red' }} className="btn fa fa-trash fa-2x" onClick={deleteTransport} size="sm" variant="danger"></button>
            </td>
        </tr>
    );
}

export default TransportTable;
