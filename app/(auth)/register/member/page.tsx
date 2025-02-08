"use client"

import React, { useEffect, useState } from 'react'
import '../../../globals.css'
import Logo from '../../../../components/shared/Logo'
import Registration from './pages/registration'
import { UseStore } from '../../../../state/store'
import { Agreement } from './pages/agreement'


export default function Page() 
{
      const adverState = UseStore((state) => state)
      const [section, setSection] = useState<number>(adverState.getMemberAgreement())

      useEffect(() => {

      }, [section])
    
      return (
                  <section 
                        className="flex md:d-flex xl:flex-row h-screen bg-[#27973f]"
                  >  
                        <div 
                              className="w-full md:w-6/12 mx-auto my-4 d-flex items-center justify-center px-3 py-5 md:p-10 mt-5 md:mt-20 gap-5"
                        >            
                              <div 
                                    className='w-full flex justify-center items-center mb-10'
                                    >
                                    <Logo /> 
                              </div>
                              <section 
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
                              </section>
                        </div>
                  </section>
            )
}
