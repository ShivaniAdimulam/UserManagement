import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Editteammember() {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    roleId: '',
    memberid: '',
  });
  const [roleNames, setRoleNames] = useState([]); // State to store role names
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    // Fetch role names from the getRoleList API
    axios.get('http://localhost:4000/admin/getRoleList')
      .then((res) => {
        if (res.data.success === true) {
        //   const roles = res.data.data.map((role) => role.roleName);
        //   setRoleNames(roles);
        const roles = res.data.data.map((role) => ({
            _id: role._id, // Store the _id of the role
            roleName: role.roleName,
          }));
          setRoleNames(roles);
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:4000/admin/getMemberDetails/${id}`)
      .then((res) => {
        setData({
          ...data,
          firstName: res.data.data.firstName,
          lastName: res.data.data.lastName,
          email: res.data.data.email,
          phoneNumber: res.data.data.phoneNumber,
          password: res.data.data.password,
          roleId: res.data.data.roleId.roleName,
          memberid: res.data.data._id,
        });
        console.log(res.data.data._id, data.memberid);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4000/admin/createOrEditTeamMember', data)
      .then((res) => {
        if (res.data.success === true) {
          navigate('/settings/teammanagement');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Edit TeamMember</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Enter Name"
            autoComplete="off"
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
            value={data.firstName}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Enter Name"
            autoComplete="off"
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
            value={data.lastName}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            placeholder="Enter Email"
            autoComplete="off"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            value={data.email}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputPhoneNumber" className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="inputPhoneNumber"
            placeholder="Enter Phone Number"
            autoComplete="off"
            onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
            value={data.phoneNumber}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputPassword4" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword4"
            placeholder="Enter Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            value={data.password}
          />
        </div>
        <div className="col-12">
  <label htmlFor="inputRole" className="form-label">Role</label>
  <select
    className="form-select"
    id="inputRole"
    onChange={(e) => {
      const selectedRoleId = e.target.value;
      // Find the role object that matches the selectedRoleId
      const selectedRole = roleNames.find((role) => role._id === selectedRoleId);
      console.log("selectedRole",selectedRole)
      setData({ ...data, roleId: selectedRole._id });
    }}
    value={data.role}
  >
    <option value="">Select Role</option>
    {roleNames.map((role) => (
      <option key={role._id} value={role._id}>
        {role.roleName}
      </option>
    ))}
  </select>
</div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
  );
}

export default Editteammember;
