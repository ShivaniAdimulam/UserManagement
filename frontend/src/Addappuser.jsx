import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Addappuser(){
    const [data, setData] = useState({
		firstName: '',
		lastName: '',
        email: '',
        phoneNumber: '',
		password: '',
		address: '',
	})
	const navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault();
		// const formdata = new FormData();
		// formdata.append("firstName", data.firstName);
        // formdata.append("lastName", data.lastName);
		// formdata.append("email", data.email);
        // formdata.append("phoneNumber", data.phoneNumber);
		// formdata.append("password", data.password);
		// formdata.append("address", data.address);
		// console.log(formdata,"here--->")
        event.preventDefault();

    const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        address: data.address,
    };
		axios.post('http://localhost:4000/admin/createOrEditAppUser', userData)
		.then(res => {
			navigate('/appusers')
		})
		.catch(err => console.log(err));
	}
	return (
		<div className='d-flex flex-column align-items-center pt-4'>
			<h2>Add Appuser</h2>
			<form class="row g-3 w-50" onSubmit={handleSubmit}>
			<div class="col-12">
					<label for="inputName" class="form-label">First Name</label>
					<input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
					onChange={e => setData({...data, firstName: e.target.value})}/>
				</div>
                <div class="col-12">
					<label for="inputName" class="form-label">Last Name</label>
					<input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
					onChange={e => setData({...data, lastName: e.target.value})}/>
				</div>
				<div class="col-12">
					<label for="inputEmail4" class="form-label">Email</label>
					<input type="email" class="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
					onChange={e => setData({...data, email: e.target.value})}/>
				</div>
                <div class="col-12">
					<label for="inputPhoneNumber" class="form-label">Phone Number</label>
					<input type="text" class="form-control" id="inputPhoneNumber" placeholder='Enter Phone Number' autoComplete='off'
					onChange={e => setData({...data, phoneNumber: e.target.value})}/>
				</div>
				<div class="col-12">
					<label for="inputPassword4" class="form-label">Password</label>
					<input type="password" class="form-control" id="inputPassword4" placeholder='Enter Password'
					 onChange={e => setData({...data, password: e.target.value})}/>
				</div>
				<div class="col-12">
					<label for="inputAddress" class="form-label">Address</label>
					<input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
					onChange={e => setData({...data, address: e.target.value})}/>
				</div>
				<div class="col-12">
					<button type="submit" class="btn btn-primary">Create</button>
				</div>
			</form>
		</div>

	)
}

export default Addappuser