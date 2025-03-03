import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMobile, faCoffee, faLock } from "@fortawesome/free-solid-svg-icons";
import cloud from '../../assets/istockphoto-499680089-612x612.jpg'

// Add icons to the library
library.add(faMobile, faCoffee, faLock);

function Otp() {
  return (
    <>
    <div className="flex w-full h-screen overflow-x-hidden">
      <div className="w-full flex items-center justify-center lg:w-1/2">
      <div className="w-full h-full overflow-hidden">
            <div className="w-full h-1/3 flex items-center justify-center bg-sky-300 bg-fixed" style={{backgroundImage: `url(${cloud})`}}>
                <h1 className="text-white text-2xl font-medium ">MEDIAZONE</h1>
            </div>
            <div className="w-full -mt-8 h-2/3 flex flex-col items-center justify-center bg-white rounded-t-3xl">
                <h1 className='text-sky-300 font-medium text-4xl -mt-30 md:mt-0 '>Welcome Back</h1>
                <h6 className='text-xs'>Enter your Details below</h6>
                <div className="w-full  mt-10 flex flex-col items-center justify-center bg-sky rounded-t-3xl">
                    <div className='w-75 border-b-1 border-sky-300'>
                        <FontAwesomeIcon icon="lock" className="text-sky-300 text-md  mr-2" />
                        <input className='w-65 focus:outline-0 p-2 font-medium text-2xl  text-center appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'  type="number" placeholder='OTP' />
                    </div>
                
                </div>
                
                <div className='flex items-center  justify-center'>
                   <button className='bg-sky-300 text-md font-medium text-white px-25 py-2 mt-5 rounded-lg'>Submit</button>
                </div>
            </div>
        </div>  
      </div> 
      <div className="hidden lg:flex h-full bg-gray-200 items-center justify-center w-1/2">
        <h1>hello</h1>
      </div>
     </div>
    </>
  )
}

export default Otp