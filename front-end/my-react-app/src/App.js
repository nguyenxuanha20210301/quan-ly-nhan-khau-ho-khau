// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLog from './components/UserLog';
import AdminLog from './components/AdminLog';
import Register from './components/Register';
import Fee from './components/admin_inf/Fee';
import Donation from './components/admin_inf/Donation';
import History from './components/admin_inf/History';
import Statistics from './components/admin_inf/Statistics';
import HouseholdInfo from './components/admin_inf/HouseholdInfo';
import Resident from './components/admin_inf/Resident';
import MenuBar from './components/user_inf/MenuBar';
import ResidentStatistics from './components/admin_inf/ResidentStatistics';
import AddResident from './components/admin_inf/AddResident';
import AddHouseHold from './components/admin_inf/AddHouseHold';
import CreateNewAccount from './components/admin_inf/CreateNewAccount';
const App = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route path='/admin_inf/' element={<Fee/>}/>
                <Route path='/admin_inf/resident' element={<Resident/>}/>
                <Route path='/admin_inf/residentStatistics' element={<ResidentStatistics/>}/>
                <Route path='/admin_inf/add_resident' element={<AddResident/>}/>
                <Route path='/admin_inf/donation' element={<Donation/>}/>
                <Route path='/admin_inf/history' element={<History/>}/>
                <Route path='/admin_inf/statistics' element={<Statistics/>}/>
                <Route path='/admin_inf/household_info' element={<HouseholdInfo/>}/>
                <Route path='/admin_inf/separated' element={<AddHouseHold/>}/>
                <Route path='/admin_inf/new_account' element={<CreateNewAccount/>}/>
                <Route path='/' element={<UserLog/>}/>
                <Route path='/admin_log' element={<AdminLog/>}/>
                {/* <Route path='/register' element={<Register/>}/> */}
                <Route path='/user_inf' element={<MenuBar/>}/>

           </Routes> 
        </Router>   
    </div>
  );
};

export default App;
