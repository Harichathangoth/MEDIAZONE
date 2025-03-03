import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMobile, faLock } from "@fortawesome/free-solid-svg-icons";
import cloud from '../../assets/istockphoto-499680089-612x612.jpg';
import { loginAPI } from '../../services/allAPI';
import { tokenAuthorizationContext } from '../context/TokenAuth';


// Add icons to the library
library.add(faMobile, faLock);

function Login() {

  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthorizationContext)
  const navigate = useNavigate();
  const [operatorData, setOperatorData] = useState({ phone: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Entering handleLogin...");
      const { phone, password } = operatorData;

      if (!phone || !password) {
        alert("Please fill in all fields.");
        return;
      }

      const result = await loginAPI(operatorData);
      console.log(result.data.operator);

      if (result.status === 200) {
        sessionStorage.setItem("existingOperator", JSON.stringify(result.data.operator));
        sessionStorage.setItem("token", result.data.token);
        setIsAuthorized(true);
        setOperatorData({ phone: "", password: "" });
        navigate('/');
      } else {
        alert(result.response?.data || "Login failed");
        console.log(result);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in.");
    }
  };

  return (
    <div className="flex w-full h-screen overflow-x-hidden">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="w-full h-full overflow-hidden">
          <div 
            className="w-full h-1/3 flex items-center justify-center bg-sky-300 bg-fixed" 
            style={{ backgroundImage: `url(${cloud})` }}
          >
            <h1 className="text-white text-2xl font-medium">MEDIAZONE</h1>
          </div>

          <div className="w-full -mt-8 h-2/3 flex flex-col items-center justify-center bg-white rounded-t-3xl">
            <h1 className="text-sky-300 font-medium text-4xl md:mt-0">Welcome Back</h1>
            <h6 className="text-xs mt-2">Enter your details below</h6>

            <div className="w-full ml-10 mt-10 flex flex-col items-center justify-center">
              <div className="w-75 border-b border-sky-300">
                <FontAwesomeIcon icon="mobile" className="text-sky-300 text-md mr-2" />
                <input 
                  className="w-4/5 focus:outline-0 p-2 font-medium" 
                  maxLength={10}
                  value={operatorData.phone} 
                  onChange={e => setOperatorData({ ...operatorData, phone: e.target.value })} 
                  type="text" 
                  placeholder="Enter Your Number" 
                />
              </div>

              <div className="w-75 border-b border-sky-300 mt-4">
                <FontAwesomeIcon icon="lock" className="text-sky-300 text-md mr-2" />
                <input 
                  className="focus:outline-0 w-4/5 p-1 text-md" 
                  value={operatorData.password} 
                  onChange={e => setOperatorData({ ...operatorData, password: e.target.value })} 
                  type="password" 
                  placeholder="Password" 
                />
              </div>
            </div>

            <div className="w-full mt-5 flex justify-end">
              <Link to={'/forgot'}>
                <button className="text-md mr-10 text-sky-500">Forgot Password?</button>
              </Link>
            </div>

            <div>
              <button 
                className="bg-sky-300 text-md font-medium text-white px-20 py-2 mt-4 rounded-lg"
                onClick={handleLogin}
              >
                SIGN IN
              </button>
            </div>
          </div>
        </div>
      </div> 

      <div className="hidden lg:flex h-full bg-gray-200 items-center justify-center w-1/2">
        <h1>Hello</h1>
      </div>
    </div>
  );
}

export default Login;
