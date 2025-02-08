"use client"

import React, { useEffect, useState } from 'react'
import '../../../globals.css'
import Logo from '../../../../components/shared/Logo'
import Agreement from './pages/agreement'
import Registration from './pages/registration'
import { UseStore } from '../../../../state/store'


export default function Page() 
{
      const adverState = UseStore((state) => state)
      const [section, setSection] = useState<number>(-1)

      useEffect(() => 
      {
         setSection(adverState.getDealerAgreement())  
      }, [])

      useEffect(() => 
      {
         setSection(adverState.getDealerAgreement())  
      }, [adverState])
    
      return (
      <>  
            <div 
                  className="w-full md:w-6/12 mx-auto my-4 d-flex items-center  justify-center px-3 py-5 md:p-10 -mt-10 md:-mt-1 mt-20 gap-5"
            >            
                  <div 
                        className='w-full flex justify-center items-center mb-10 -mt-16 md:mt-1'
                  >
                        <Logo /> 
                  </div>
                  <div 
                        className='w-full d-flex gap-10'
                  >
                        <div 
                              className='w-full'
                        >
                              <h3 
                                    className='flex text-white font-bold justify-center mb-5 uppercase  text-[14px] md:text-[18px]'
                              >
                                    Signup to start selling and buying
                              </h3>
                        </div>

                        {
                              (section === 0) && <Agreement onClick={
                                    (current: number) => 
                                    {
                                          setSection(current)
                                    }
                              } />
                        }

                        {
                              (section === 1) && <Registration onClick={
                                    (current: number) => 
                                    {
                                          setSection(current)
                                    }
                              } />
                        }
                              </div>
            </div>
      </>
      )
}
