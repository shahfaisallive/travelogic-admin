import React, { useEffect, useState } from 'react';
import axios from '../support-components/axios';
import HotelTable from "./HotelTable";
import Table from 'react-bootstrap/Table';
import "../support-components/TableStyle.css"
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ViewHotels = () => {
	const [hotels, setHotels] = useState([]);

	useEffect(() => {
		axios.get('/hotels')
			.then(res => {
				// console.log(res.data);
				setHotels(res.data);
			})
			.catch((error) => {
				console.log(error);
			})
	}, [])
	const getHotels= ()=>{
		axios.get('/hotels')
		.then(res => {
			// console.log(res.data);
			setHotels(res.data);
		})
		.catch((error) => {
			console.log(error);
		})
	}
	const DataTable = () => {
		return hotels.map((hotel, i) => {
			return <HotelTable onDelete={getHotels} data={hotel} key={i} />;
		});
	}

	return (
		<div className="container view-hotels-wrap">
			<div className="row hotels-table">
				<h5>Hotels:</h5>
				<div className="ml-3">
					<Link to={"/add-hotel"}><button className="rounded btn-dark mb-2"><i className="fa fa-plus-square mr-2" aria-hidden="true"></i>Add New Hotel</button></Link>
				</div>

				{hotels.length === 0 ? (
					<div className='row container pt-5 d-block d-flex justify-content-center'>
						<Spinner animation="border" role="status" />
					</div>
				) : (
					<Table striped bordered hover>
						<thead className="thead-dark">
							<tr>
								<th>Id</th>
								<th className="tableHeader-2">Hotel Name</th>
								<th className="tableHeader-3">Luxury Rent</th>
								<th className="tableHeader-3">Budget Rent</th>
								<th className="tableHeader-3">Contact Number</th>
								<th className="tableHeader-3">Created At</th>
								<th className="tableHeader-3">Updated At</th>
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

export default ViewHotels;
