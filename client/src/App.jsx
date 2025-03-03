import { Routes, Route } from 'react-router-dom';
import './App.css';
import ForgotPassword from './components/login/ForgotPassword';
import Otp from './components/login/Otp';
import Home from './pages/Home';
import BroadbandDetails from './components/broadbandUser/BroadbandDetails';
import AddUser from './components/broadbandUser/AddUser';
import Login from './components/login/Login';
import TokenAuth from './components/context/TokenAuth'; 

function App() {
 

  return (
    <TokenAuth>
      <Routes>
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/forgot/otp" element={<Otp />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addbroadbanduser" element={<AddUser />} />
        <Route path="/user/broadbanddetails" element={<BroadbandDetails />} />
      </Routes>
    </TokenAuth>
  );
}

export default App;
