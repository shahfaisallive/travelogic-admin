import React from 'react';
import { Link } from 'react-router-dom';
import axios from "../support-components/axios";
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

const ReviewTable = (props) => {
    const { _id, text, reported, createdAt } = props.data

    const deleteReview = () => {
        axios.delete('/reviews/' + props.data._id)
            .then((res) => {
                toast.success("Review Deleted", {
                    position: toast.POSITION.TOP_CENTER
                  });
                console.log('Review successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <tr>
            <td>{_id}</td>
            <td>{text}</td>
            <td>{reported}</td>
            <td>{createdAt.substring(0,10)}</td>
            <td>
                <Link className="edit-link mr-2 ml-3" to={"/edit-review/" + props.data._id}>
                    Edit
                </Link>
                <Button className="" onClick={deleteReview} size="sm" variant="danger">Delete</Button>
            </td>
        </tr>
    );
}

export default ReviewTable;
