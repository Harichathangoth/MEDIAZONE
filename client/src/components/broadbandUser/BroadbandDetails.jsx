import React, { useState } from 'react'


function userDetails() {

    const [userDetails, setUerDetails] = useState({
        opticallayer:"",port:"",opticalsignal:"",livesignal:"",bendedsignal:"",
        brand:"",model:"",macaddress:"",wifissid:"",wifipassword:"",frequency:""
    })

    const handleAddDetails = async (e) => {
        e.preventDefault()
        console.log(userDetails)
    }

  return (
    <>
        <div className='grid w-screen h-screen grid-cols-1 grid-rows-14 p-10'>
            <div className='grid grid-cols-2 row-span-6   place-items-center'>
                <div className='col-span-2 w-full pl-10 xl:pl-40'>
                    <h1 className='text-2xl text-sky-300 font-medium'>Signal</h1>
                </div>
                <form action="">
                    <div className=''>
                    <select
                        value={ userDetails.opticallayer }
                        onChange={e => setUerDetails({...userDetails,opticallayer:e.target.value})}
                        className="border-b-2 border-sky-300 outline-0 p-2 w-full  "
                    >
                        <option value="" disabled>Optical Layer</option>
                        <option value="blue">Blue</option>
                        <option value="Green">Green</option>
                        <option value="orange">Orange</option>
                        <option value="natural">Natural</option>
                        <option value="yellow">Yellow</option>
                    </select>
                    </div>       
                    <div className=''>
                        {/* Emty Div */}
                    </div>
                    <div className='px-5'>
                        <input
                        value={userDetails.port}
                        className="w-full border-b-2 border-sky-300 focus:outline-0 p-2 font-medium text-md"
                        onChange={e => setUerDetails({...userDetails,port:e.target.value})}
                        type="text"
                        placeholder="Port"
                        />
                    </div>
                    <div className='px-5'>
                        <input
                        value={ userDetails.opticalsignal }
                        className="w-full border-b-2 border-sky-300 focus:outline-0 p-2 font-medium text-md"
                        onChange={e => setUerDetails({...userDetails,opticalsignal:e.target.value})}
                        type="text"
                        placeholder="Optical Signal"
                        />
                    </div>
                    <div className='px-5'>
                        <input
                        value={ userDetails.livesignal }
                        className="w-full border-b-2 border-sky-300 focus:outline-0 p-2 font-medium text-md"
                        onChange={e => setUerDetails({...userDetails,livesignal:e.target.value})}
                        type="text"
                        placeholder="Live Signal"
                        />
                    </div>
                    <div className='px-5'>
                        <input
                        value={ userDetails.bendedsignal }
                        className="w-full border-b-2 border-sky-300 focus:outline-0 p-2 font-medium text-md"
                        onChange={e => setUerDetails({...userDetails,bendedsignal:e.target.value})}
                        type="text"
                        placeholder="Bended Signal"
                        />
                    </div>
                </form>
            </div>
            <div className=' grid grid-cols-2 row-span-6  place-items-center'>
                <div className=' col-span-2 w-full pl-10 xl:pl-40'>
                    <h1 className='text-2xl text-sky-300 font-medium'>Modem</h1>
                </div>
                <div className='pr-5'>
                        <select
                            value={ userDetails.brand }
                            onChange={e => setUerDetails({...userDetails,brand:e.target.value})}
                            className="border-b-2 border-sky-300 outline-0 p-2 w-full  "
                        >
                            <option value="" disabled>Brand</option>
                            <option value="netlink">Netlink</option>
                            <option value="secureye">Secureye</option>
                            <option value="Dlink">Dlink</option>
                            <option value="genexis">Genexis</option>
                            <option value="scopus ">scopus</option>
                        </select>
                </div>
                    <div className=''>
                        <select
                            value={ userDetails.macaddress }
                            onChange={e => setUerDetails({...userDetails,macaddress:e.target.value})}
                            className="border-b-2 border-sky-300 outline-0 p-2 w-full  "
                        >
                            <option value="" disabled>Model</option>
                            <option value="keralavision">Kerala Vision</option>
                            <option value="bsnl">BSNL</option>
                            <option value="fiberzone">Fiberzone</option>
                            <option value="aliance">Aliance</option>
                        </select>
                    </div>
                    <div className='px-5'>
                        <input
                        value={ userDetails.macaddress }
                        className="w-full border-b-2 border-sky-300 focus:outline-0 p-2 font-medium text-md"
                        onChange={e => setUerDetails({...userDetails,model:e.target.value})}
                        type="text"
                        placeholder="Mac Address"
                        />
                    </div>
                    <div className='px-5'>
                        <input
                        value={ userDetails.wifissid }
                        className="w-full border-b-2 border-sky-300 focus:outline-0 p-2 font-medium text-md"
                        onChange={e => setUerDetails({...userDetails,wifissid:e.target.value})}
                        type="text"
                        placeholder="Wifi SSID"
                        />
                    </div>
                    <div className='px-5'>
                        <input
                        value={ userDetails.wifipassword }
                        className="w-full border-b-2 border-sky-300 focus:outline-0 p-2 font-medium text-md"
                        onChange={e => setUerDetails({...userDetails,wifipassword:e.target.value})}
                        type="text"
                        placeholder="Wifi Password"
                        />
                    </div>
                    <div className='px-5'>
                        <input
                        value={ userDetails.frequency }
                        className="w-full border-b-2 border-sky-300 focus:outline-0 p-2 font-medium text-md"
                        onChange={e => setUerDetails({...userDetails,frequency:e.target.value})}
                        type="text"
                        placeholder="Frequency"
                        />
                    </div>
            </div>
            <div className="grid justify-between place-items-end grid-cols-2 row-span-2 pb-5  xl:px-100">
                        <button className="bg-gray-300 text-md font-medium text-white px-10 py-2  rounded-lg ">
                            Cancel
                        </button>
                        <button 
                        className="bg-sky-300 text-md font-medium text-white px-10 py-2 rounded-lg"
                        onClick={handleAddDetails}
                        >
                            Submit
                        </button>
            </div>
        </div>
    </>
  )
}

export default userDetails
