import React, { useEffect, useState } from 'react';
import axios from '../support-components/axios';
import TransportTable from "./TransportTable";
import Table from 'react-bootstrap/Table';
import "../support-components/TableStyle.css"
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const ViewTransports = () => {
    const [transports, setTransports] = useState([]);

    useEffect(() => {
        axios.get('/transports')
            .then(res => {
                console.log(res.data);
                setTransports(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const getTransport = ()=>{
        axios.get('/transports')
            .then(res => {
                // console.log(res.data);
                setTransports(res.data);
            })
            .catch((error) => {
                // console.log(error);
            })
    }

    const DataTable = () => {
        return transports.map((res, i) => {
            return <TransportTable onDelete={getTransport} data={res} key={i} />;
        });
    }



    return (
        <div className="container view-transports-wrap">
            <div className="row transports-table">
                <h5>Transport services:</h5>

                <div className="ml-3">
                    <Link to={"/add-new-transport"}><button className="rounded btn-dark mb-2"><i className="fa fa-plus-square mr-2" aria-hidden="true"></i>Add New Transport</button></Link>
                </div>

                {transports.length === 0 ? (
                    <div className='row container pt-5 d-block d-flex justify-content-center'>
                        <Spinner animation="border" role="status" />
                    </div>
                ) : (
                    <Table striped bordered hover>
                        <thead className="thead-dark">
                            <tr>
                                <th>Id</th>
                                <th className="tableHeader-2">Name</th>
                                <th >From</th>
                                <th >To</th>
                                <th >Fare</th>
                                <th>Created At</th>
                                <th>Updated At</th>
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

export default ViewTransports;
