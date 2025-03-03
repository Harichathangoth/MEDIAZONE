import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import olt from '../assets/olt.jpg';
import router from '../assets/router.png';
import setbox from '../assets/setbox.jpg';
import coupler from '../assets/coupler.png';
import { tokenAuthorizationContext } from '../components/context/TokenAuth';

function Home() {
  const { isAuthorized } = useContext(tokenAuthorizationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/login');
    }
  }, [isAuthorized, navigate]); 

  if (!isAuthorized) {
    return null; 
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center p-5">
      <div className="grid grid-cols-2 w-screen h-100 gap-10">
        <div className="bg-center bg-contain bg-no-repeat" style={{ backgroundImage: `url(${setbox})` }}></div>
        <div className="bg-center bg-contain bg-no-repeat" style={{ backgroundImage: `url(${router})` }}></div>
        <div className="bg-center bg-contain bg-no-repeat" style={{ backgroundImage: `url(${coupler})` }}></div>
        <div className="bg-center bg-contain bg-no-repeat" style={{ backgroundImage: `url(${olt})` }}></div>
      </div>
    </div>
  );
}

export default Home;
