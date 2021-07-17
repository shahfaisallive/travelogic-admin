import React, { Component } from 'react';
import axios from "../support-components/axios";
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

const BookingTable = (props) => {
    const { _id, user, title, name, email, city, address, phoneNo, seats, paymentMethod, totalPrice, isPaid, booking_status, startDate, endDate, createdAt } = props.data
    const onUpdate = props.getBookings

    const deleteBooking = () => {
        axios.delete('/bookings/' + props.data._id)
            .then((res) => {
                toast.success("Booking Deleted", {
                    position: toast.POSITION.TOP_CENTER
                });
                onUpdate()
            }).catch((error) => {
                console.log(error)
            })
    }

    const confirmBooking = () => {
        axios.put(`/bookings/${props.data._id}/confirm`)
            .then((res) => {
                toast.success("Booking Updated", {
                    position: toast.POSITION.TOP_CENTER
                });
                onUpdate()
            }).catch((error) => {
                console.log(error)
            })
    }

    const cancelBooking = () => {
        axios.put(`/bookings/${props.data._id}/cancel`)
            .then((res) => {
                toast.success("Booking Cancelled", {
                    position: toast.POSITION.TOP_CENTER
                });
                onUpdate()
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <tr>
            <td>{_id}</td>
            <td>{user}</td>
            <td style={{ fontWeight: 'bold' }}>{title}</td>
            {startDate && endDate ? (
                <td>{`${startDate.substring(0, 10)} - ${endDate.substring(0, 10)}`}</td>
            ) : (
                <td></td>
            )}
            <td>{name}</td>
            <td>{email}</td>
            <td>{city}</td>
            <td>{address}</td>
            <td>{phoneNo}</td>
            <td>{seats}</td>
            <td>{totalPrice}</td>
            <td>{isPaid ? <p style={{ fontWeight: 'bold' }}>{paymentMethod}</p> : <p style={{ fontWeight: 'bold' }}>Not Paid</p>}</td>
            <td>{isPaid ? <p style={{ color: 'green' }}><b>Paid</b></p> : <p style={{ color: 'red' }}>Pending</p>}</td>
            <td>
                {booking_status === 'confirmed' ? <strong style={{ color: 'green' }}>Confirmed</strong> :
                    booking_status === 'pending' ? (
                        <strong style={{ color: 'red' }}>Pending</strong>) :
                        booking_status === 'cancelled' ? <strong style={{ color: 'red' }}>Cancelled</strong> :
                            <strong>NULL</strong>}
            </td>
            <td>
                {booking_status === 'confirmed' || booking_status === 'cancelled' ? <Button className="disabled" style={{ pointerEvents: 'none' }} size="sm" variant="success">Confirm</Button> :
                    <Button onClick={confirmBooking} size="sm" variant="success">Confirm</Button>}
            </td>
            <td>{createdAt.substring(0, 10)}</td>
            <td>
                {booking_status === 'cancelled' ? <Button className="disabled" style={{ pointerEvents: 'none' }} size="sm" variant="danger">Cancel</Button> :
                    <Button onClick={cancelBooking} size="sm" variant="danger">Cancel</Button>}
            </td>
            <td>
                <i className='btn fa fa-trash fa-2x' onClick={deleteBooking} style={{ cursor: 'pointer', color: 'red' }}></i>
            </td>
        </tr>
    );
}

export default BookingTable;
