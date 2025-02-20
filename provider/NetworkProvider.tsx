"use client"

import React, { useEffect, useState } from 'react';
import useNetwork from '../app/hook/network';
import { PuffLoader } from 'react-spinners';
// import Logo from '../components/shared/Logo';

const NetworkStatusProvider = ({ children }: { children: React.ReactNode }) =>
{
    const isOnline = useNetwork();
    const [goTo, setGoTo] = useState<boolean>(false)

    useEffect(() => {
      if (!isOnline) {
        console.log("Offline now");
        setGoTo(false)
      } else {
        setGoTo(true)
        console.log("Online now");
      }
    }, [isOnline]);

    useEffect(() => 
    { 
       if(goTo)
       {
          window.location.href = '/'
       }
    }, []);

    return isOnline ? children : <Offline />
}

const Offline = () => {

  return (
    <div 
      className="col-span-12 bg-green-400 flex md:d-flex bg-green-50 border-shadow drop-shadow-lg md:block px-3 md:px-10 py-5 mt-3 rounded-2xl md: mb-0 h-screen justify-center item-center" 
      style={{ marginTop: '0px', paddingTop: '50px' }}
    >
        {/* <Logo /> */}
        <div 
          className="container flex justify-center items-center ml-20 space-x-2"
          style={{ marginTop: '250px' }}
        >
            <PuffLoader color="#1c9236" />
            <h1 className='ml-16 font-bold text-md'>You are currently offline</h1>
        </div>
    </div>
  )

}

export default NetworkStatusProvider;