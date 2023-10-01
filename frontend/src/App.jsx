import { useState } from 'react'
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import Appusers from './Appusers'
import Profile from './Profile'
import Home from './Home'
import Addappuser from './Addappuser'
import Editappuser from './Editappuser'
import Settings from './Settings' 
import Rolemanagement from './Rolemanagement' // Import RoleManagement component
import Teammanagement from './Teammanagement' // Import TeamManagement component
import Addrole from './Addrole'
import Editrole from './Editrole'
import Addteammember from './Addteammember'
import Editteammember from './Editteammember'
import Start from './Start'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
//import Login from './Login'

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard/>}>
        <Route path='' element={<Home />}></Route>
        <Route path='/appusers' element={<Appusers />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/addappuser' element={<Addappuser />}></Route>
        <Route path='/editappuser/:id' element={<Editappuser />}></Route>

            {/* Add routes for "Role Management" and "Team Management" here */}
            <Route path='/settings/rolemanagement' element={<Rolemanagement />} />
            <Route path='/settings/teammanagement' element={<Teammanagement />} />
            <Route path='/addrole' element={<Addrole />}></Route> 
            <Route path='/editrole/:id' element={<Editrole />}></Route>
            <Route path='/addteammember' element={<Addteammember />}></Route> 
            <Route path='/editteammember/:id' element={<Editteammember />}></Route>
      </Route>
      <Route path='/start' element={<Start />}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
    </BrowserRouter>
    //<div><Login /></div>
       
  )
}

export default App
