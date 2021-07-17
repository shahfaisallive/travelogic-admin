import React, { useEffect, useState } from 'react';
import axios from '../support-components/axios';
import BookingTable from "./BookingTable";
import Table from 'react-bootstrap/Table';
import "../support-components/TableStyle.css"
import Spinner from 'react-bootstrap/Spinner'


const ViewBookings = () => {
    const [bookings, setBookings] = useState([]);

    let getBookings = () => {
        axios.get('/bookings')
            .then(res => {
                console.log(res.data);
                setBookings(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(getBookings, [])

    const DataTable = () => {
        return bookings.map((res, i) => {
            return <BookingTable data={res} key={i} onUpdate={getBookings} />;
        });
    }



    return (
        <div className="container view-bookings-wrap">
            <div className="row bookings-table">
                <h5>Trip Bookings:</h5>

                {bookings.length === 0 ? (
                    <div className='row container pt-5 d-block d-flex justify-content-center'>
                        <Spinner animation="border" role="status" />
                    </div>
                ) : (
                    <Table striped bordered hover>
                        <thead className="thead-dark">
                            <tr>
                                <th>Id</th>
                                <th>User Id</th>
                                <th className="tableHeader-2">Trip Title</th>
                                <th className="tableHeader-2">Trip Date</th>
                                <th>Name</th>
                                <th className="tableHeader-2">Email</th>
                                <th>City</th>
                                <th className="tableHeader-2">Address</th>
                                <th>Phone No</th>
                                <th>Seats</th>
                                <th>Total Price</th>
                                <th>Payment Method</th>
                                <th>Payment Status</th>
                                <th>Booking Status</th>
                                <th>Confirm Booking</th>
                                <th className="tableHeader-4">Booking Date</th>
                                <th>Cancel Booking</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DataTable()}
                        </tbody>
                    </Table>
                )}
            </div>
        </div>
    );
}

export default ViewBookings;
