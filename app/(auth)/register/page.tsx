"use client"

import Link from 'next/link'
import React from 'react'
import { HiHome } from "react-icons/hi"
import '../../globals.css'
import Logo from '../../../components/shared/Logo'


export default function Page() 
{
      
    return (
    <>  
        <div 
              className="flex md:d-flex xl:flex-row h-screen bg-[#27973f]"
        >
            <div 
                  className="w-full md:w-6/12 mx-auto my-4 d-flex items-center justify-center p-10 md:-mt-30 mt-16 gap-5"
            >            
                <div 
                      className='w-full flex justify-center items-center mb-20'
                  >
                      <Logo /> 
                </div>
                <div 
                      className='w-full d-flex md:flex gap-10'
                >
                    <div 
                          className="md:w-1/2 w-full"
                    >
                      <Link className='font-bold ml-2' href={'/register/member'}
                      >
                        <div 
                              className="border-2 border-green-200 h-[200px] flex md:flex items-center justify-center rounded-xl cursor-pointer bg-green-100 hover:bg-[#23913b] hover:text-white"
                        >
                            <div 
                                  className='d-flex justify-center items-center mx-5'
                            >        
                                  <div 
                                      className='w-full mx-auto flex justify-center items-center'
                                  >                                            
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={.5} stroke="currentColor" className="w-20 h-20">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                  </div>
                                  <div className='w-full flex justify-center text-md font-bold ml-2x text-center mt-3 px-5'
                                  >                         
                                      Register here if you want to sell or buy
                                  </div> 
                            </div>
                        </div>
                      </Link>
                    </div>
                    <div 
                          className="md:w-1/2 w-full"
                    >
                      <Link className='font-bold ml-2' href={'/register/dealer'}
                      >
                        <div 
                              className="border-2 border-green-200 h-[200px] flex md:flex items-center justify-center rounded-xl cursor-pointer bg-green-100 hover:bg-[#23913b] hover:text-white"
                        >
                          <div 
                                className='d-flex justify-center items-center mx-5'
                          >        
                                <div 
                                    className='w-full mx-auto flex justify-center items-center'
                                >                                            
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={.5} stroke="currentColor" className="w-20 h-20">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                  </svg>
                                </div>
                                <div className='w-full flex justify-center text-md font-bold ml-2x text-center mt-3 px-5'
                                >                         
                                    Register here if you want to become an Affiliate Dealer with Autohub Nigeria
                                </div> 
                          </div>
                        </div>
                      </Link>
                    </div>
                </div>
                <div  
                      className='w-full flex justify-center text-center items-center md:flex gap-10 md:mb-3 mt-40 px-5'
                >    
                  <div className='text-md text-white hover:text-blue-300 font-bold text-md'>
                        <Link href={'/'}
                        >                                
                              <div className='mt-1 mr-2 flex justify-center items-center'><HiHome className='mr-1'/>Home</div>
                        </Link>
                  </div>
                  <div className='text-md text-white hover:text-blue-300 font-bold text-md'>
                      <Link href={'/login'}
                      >                                
                          <div className='mt-1 mr-2 flex justify-center items-center'>Login</div>
                      </Link>
                  </div>
                </div>
            </div>
        </div>
    </>
  )
}
