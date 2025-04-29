"use client"

import React, { useState } from 'react'
import '../../../globals.css'
import Logo from '../../../../components/shared/Logo'
import { UseStore } from '../../../../state/store'
import { Agreement } from './pages/agreement'
// import Registration from './registration'
import dynamic from 'next/dynamic'
import { AgreementRegister } from '../../../api/home/cms'
import { PuffLoader } from 'react-spinners'
import { useQuery } from '@tanstack/react-query'


const Registration = dynamic(
      () => import('./pages/registration'),
      {
            ssr: false
      }
)


export default function Page() 
{
      const adverState = UseStore((state) => state)
      const [section, setSection] = useState<number>(adverState.getMemberAgreement())
      
      const { data, isLoading, } = useQuery({ queryKey: [`agreement-register`], queryFn: () => AgreementRegister()})
      
    
      return (

            <>
                  
                  {
                     isLoading && <div 
                               className='w-full d-flex gap-10'
                           >
                             <div 
                                 className="col-span-12 h-[300px] flex justify-center items-center" style={{ marginTop: '20px', paddingTop: '0px' }}
                              >
                                 <PuffLoader className='w-12 h-12' />
                              </div>
                          </div>
                  }

                  {
                        !isLoading && data?.data && <>
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
                                                (section === 0) && <Agreement data={data?.data} onClick={
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
                  }
            </>
      )
}
