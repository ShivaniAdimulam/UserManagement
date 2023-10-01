import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Editrole() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState('');
  const [access, setAccess] = useState({
    addUser: false,
    editUser: false,
    deleteUser: false,
  });
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    // Fetch role details when the component mounts
    axios
      .get(`http://localhost:4000/admin/getRoleDetails/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        const roleDetails = response.data.data;
        setRoleName(roleDetails.roleName);
        setAccess({
          addUser: roleDetails.addUser,
          editUser: roleDetails.editUser,
          deleteUser: roleDetails.deleteUser,
        });
      })
      .catch((error) => {
        console.error('Error fetching role details:', error);
      });
  }, [id, authToken]);

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
      addUser: access.addUser,
      editUser: access.editUser,
      deleteUser: access.deleteUser,
      roleId: id,
    };

    try {
      // Make an API request to edit the role based on roleId
      await axios.put('http://localhost:4000/admin/editRole', data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Handle a successful response (you can customize this part)
      console.log('Role edited successfully');

      // Redirect to a different page after editing the role (e.g., Role list page)
      navigate('/settings/rolemanagement');
    } catch (error) {
      // Handle API request errors (e.g., network error or server error)
      console.error('API Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="mb-4">Edit Role</h1>
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
              Update Role
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Editrole;
