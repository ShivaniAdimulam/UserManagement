import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Rolemanagement() {
  const [data, setData] = useState([])
  const authToken = localStorage.getItem('authToken');
  useEffect(()=> {
    axios.get('http://localhost:4000/admin/getRoleList',{
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then(res => {
      if(res.data.success ==true) {
        setData(res.data.data);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }, [])

  const handleDelete = (id) => {
    const requestBody = {
        roleId: id,
        isdeleted: true,
      };
    axios.put('http://localhost:4000/admin/deleteRole',requestBody,{
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then(res => {
      if(res.data.success ==true) {
        window.location.reload(true);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }
 

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Role List</h3>
      </div>
      <Link to="/addrole" className='btn btn-success'>Add New Role</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Role Name</th>
              <th>Can add user</th>
              <th>Can edit user</th>
              <th>Can delete user</th>
              <th>Action</th>
             
            </tr>
          </thead>
          <tbody>
            {data.map((role, index) => {
              return <tr key={index}>
                  <td>{role.roleName}</td>
                  <td>{role.addUser ? 'Yes' : 'No'}</td>
                <td>{role.editUser ? 'Yes' : 'No'}</td>
                <td>{role.deleteUser ? 'Yes' : 'No'}</td>
                <td>
                    <Link to={`/editrole/`+role._id} className='btn btn-primary btn-sm me-2'>edit</Link>
                    <button onClick={e => handleDelete(role._id)} className='btn btn-sm btn-danger'>delete</button>
                  </td>
                 
                  
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Rolemanagement