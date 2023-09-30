import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

function Addrole() {
  const [roleName, setRoleName] = useState('');
  const [access, setAccess] = useState({
    addUser: false,
    editUser: false,
    deleteUser: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAccess((prevAccess) => ({
      ...prevAccess,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to send to the backend
    const data = {
      roleName,
      addUser:access.addUser,
      editUser:access.editUser,
      deleteUser:access.deleteUser
    };

    try {
      // Make an API request to your backend
      const response = await axios.post('http://localhost:4000/admin/createRole', data);

      // Handle a successful response (you can customize this part)
      console.log('API Response:', response.data);

      // Clear the form fields after a successful submission
      setRoleName('');
      setAccess({
        addUser: false,
        editUser: false,
        deleteUser: false,
      });
    } catch (error) {
      // Handle API request errors (e.g., network error or server error)
      console.error('API Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="mb-4">Create Role</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="roleName" className="form-label">
                Role Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="roleName"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Access:</label>
              <div>
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="addUser"
                    checked={access.addUser}
                    onChange={handleCheckboxChange}
                  />
                  Add User
                </label>
              </div>
              <div>
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="editUser"
                    checked={access.editUser}
                    onChange={handleCheckboxChange}
                  />
                  Edit User
                </label>
              </div>
              <div>
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="deleteUser"
                    checked={access.deleteUser}
                    onChange={handleCheckboxChange}
                  />
                  Delete User
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Create Role
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addrole;
