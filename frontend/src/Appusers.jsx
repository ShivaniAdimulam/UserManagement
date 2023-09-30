import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Appusers() {
  const [data, setData] = useState([])

  useEffect(()=> {
    axios.get('http://localhost:4000/admin/getUserList')
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
        id: id,
        isdeleted: true,
      };
    axios.put('http://localhost:4000/admin/deleteAppUser',requestBody)
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
        <h3>AppUsers List</h3>
      </div>
      <Link to="/addappuser" className='btn btn-success'>Add User</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Address</th>
              <th>PhoneNumber</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => {
              return <tr key={index}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.address}</td>
                  <td>{employee.phoneNumber}</td>
                  <td>
                    <Link to={`/editappuser/`+employee._id} className='btn btn-primary btn-sm me-2'>edit</Link>
                    <button onClick={e => handleDelete(employee._id)} className='btn btn-sm btn-danger'>delete</button>
                  </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Appusers