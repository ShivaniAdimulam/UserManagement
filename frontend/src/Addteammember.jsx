import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Addteammember(){
    const [data, setData] = useState({
		firstName: '',
		lastName: '',
        email: '',
        phoneNumber: '',
		password: '',
		roleId: '',
	})

    const [roles, setRoles] = useState([]);
	const navigate = useNavigate()
    useEffect(() => {
        // Fetch the list of roles from your API
        axios.get('http://localhost:4000/admin/getRoleList')
          .then((response) => {
            console.log(response.data.data,"itsss")
            if (Array.isArray(response.data.data)) {
                // const roleNames = response.data.data.map((role) => role.roleName);
                // setRoles(roleNames);

                const roleNames = response.data.data.map((role) => ({
                    _id: role._id, // Store the _id of the role
                    roleName: role.roleName,
                  }));
                  setRoles(roleNames);
              } else {
                console.error('API Error: Response data is not an array');
              }
        
          })
          .catch((error) => {
            console.error('API Error:', error);
          });
      }, []);
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
        roleId: data.roleId,
    };
		axios.post('http://localhost:4000/admin/createOrEditTeamMember', userData)
		.then(res => {
			navigate('/settings/teammanagement')
		})
		.catch(err => console.log(err));
	}
	return (
		<div className='d-flex flex-column align-items-center pt-4'>
			<h2>Add TeamMember</h2>
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
				<div className="col-12">
  <label htmlFor="inputRole" className="form-label">Role</label>
  <select
    className="form-select"
    id="inputRole"
    value={data.role} // Use the _id of the selected role, not roleName
    onChange={(e) => setData({ ...data, roleId: e.target.value })}
  >
    <option value="">Select Role</option>
    {roles.map((role) => (
      <option key={role._id} value={role._id}> {/* Use role._id as the value */}
        {role.roleName}
      </option>
    ))}
  </select>
</div>

				<div class="col-12">
					<button type="submit" class="btn btn-primary">Create</button>
				</div>
			</form>
		</div>

	)
}

export default Addteammember