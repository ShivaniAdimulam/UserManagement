import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Rolemanagement() {
  const [data, setData] = useState([])

  useEffect(()=> {
    axios.get('http://localhost:4000/admin/getRoleList')
    .then(res => {
      if(res.data.success ==true) {
        setData(res.data.data);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }, [])

 

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
             
             
            </tr>
          </thead>
          <tbody>
            {data.map((role, index) => {
              return <tr key={index}>
                  <td>{role.roleName}</td>
                  <td>{role.addUser ? 'Yes' : 'No'}</td>
                <td>{role.editUser ? 'Yes' : 'No'}</td>
                <td>{role.deleteUser ? 'Yes' : 'No'}</td>

                 
                  
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Rolemanagement