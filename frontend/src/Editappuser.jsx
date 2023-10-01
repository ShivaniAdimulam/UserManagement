import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useNavigate,useParams  } from 'react-router-dom';


function Editappuser(){
    const [data, setData] = useState({
		firstName: '',
		lastName: '',
        email: '',
        phoneNumber: '',
		password: '',
		address: '',
        userid:''
	})
	const navigate = useNavigate()
	const authToken = localStorage.getItem('authToken');
	const {id} = useParams();

	useEffect(()=> {
		axios.get('http://localhost:4000/admin/getUserDetails/'+id,{
			headers: {
			  Authorization: `Bearer ${authToken}`,
			},
		  })
		.then(res => {
			setData({...data, firstName: res.data.data.firstName,
                lastName: res.data.data.lastName,
				email: res.data.data.email,
                phoneNumber: res.data.data.phoneNumber,
                password: res.data.data.password,
				address: res.data.data.address,
                userid:res.data.data._id

				
			})
           console.log(res.data.data._id,data.userid)
			
		})
		.catch(err =>console.log(err));
	}, [])

	const handleSubmit = (event) => {
		event.preventDefault();
		axios.post('http://localhost:4000/admin/createOrEditAppUser', data,{
			headers: {
			  Authorization: `Bearer ${authToken}`,
			},
		  })
		.then(res => {
			if(res.data.success == true) {
				navigate('/appusers')
			}
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
					onChange={e => setData({...data, firstName: e.target.value})} value={data.firstName}/>
				</div>
                <div class="col-12">
					<label for="inputName" class="form-label">Last Name</label>
					<input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
					onChange={e => setData({...data, lastName: e.target.value})} value={data.lastName}/>
				</div>
				<div class="col-12">
					<label for="inputEmail4" class="form-label">Email</label>
					<input type="email" class="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
					onChange={e => setData({...data, email: e.target.value})} value={data.email}/>
				</div>
                <div class="col-12">
					<label for="inputPhoneNumber" class="form-label">Phone Number</label>
					<input type="text" class="form-control" id="inputPhoneNumber" placeholder='Enter Phone Number' autoComplete='off'
					onChange={e => setData({...data, phoneNumber: e.target.value})} value={data.phoneNumber}/>
				</div>
				<div class="col-12">
					<label for="inputPassword4" class="form-label">Password</label>
					<input type="password" class="form-control" id="inputPassword4" placeholder='Enter Password'
					 onChange={e => setData({...data, password: e.target.value})} value={data.password}/>
				</div>
				<div class="col-12">
					<label for="inputAddress" class="form-label">Address</label>
					<input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
					onChange={e => setData({...data, address: e.target.value})} value={data.address}/>
				</div>
				<div class="col-12">
					<button type="submit" class="btn btn-primary">Update</button>
				</div>
			</form>
		</div>

	)
}

export default Editappuser