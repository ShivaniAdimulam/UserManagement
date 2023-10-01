import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Addappuser() {
  const [error, setError] = useState('');
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    address: '',
  });
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');

  const validateEmail = (email) => {
    // Regular expression for a valid email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Regular expression for a 10-digit phone number
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validatePassword = (password) => {
    // Simple password strength check (minimum 6 characters)
   // return password.length >= 6;
   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
   return passwordRegex.test(password);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate email
    if (!validateEmail(data.email)) {
      setError('Invalid email address format.');
      return;
    }

	// Validate phone number
    if (!validatePhoneNumber(data.phoneNumber)) {
		setError('Invalid phone number. Please enter a 10-digit phone number.');
		return;
	  }
	  
    // Validate password
    if (!validatePassword(data.password)) {
      setError('Password should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.');
      return;
    }

	

    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
      address: data.address,
    };

    axios
      .post('http://localhost:4000/admin/createOrEditAppUser', userData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          navigate('/appusers');
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Add Appuser</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Enter Name"
            autoComplete="off"
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Enter Name"
            autoComplete="off"
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            placeholder="Enter Email"
            autoComplete="off"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputPhoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="inputPhoneNumber"
            placeholder="Enter Phone Number"
            autoComplete="off"
            onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword4"
            placeholder="Enter Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
            autoComplete="off"
            onChange={(e) => setData({ ...data, address: e.target.value })}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default Addappuser;
