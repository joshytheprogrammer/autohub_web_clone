"use client"

import Link from 'next/link';
import React, { useState } from 'react'
import { HiOutlineUserAdd } from 'react-icons/hi';
import { HiBuildingStorefront, HiMiniBars4, HiMiniBookmarkSquare, HiMiniPower, HiOutlineUser, HiWallet } from 'react-icons/hi2';
import { UseStore } from '../state/store';
import { USAGE_PATH } from '../constant/Path';
import { Logout } from './Logout';


export default function RightSide() 
{
    const userState = UseStore((state) => state)
    const token = userState.getUserToken()
    const [openLoggedOut, setOpenLoggedOut] = useState<boolean>(false)

    const dropdownHandler = () => 
    {
       let single = document.getElementById("user")!;
       single.classList.toggle("hidden");
    }
  

  return (    
        <div 
            className="ml-6 relative col-span-1 z-40 md:mt-0 mt-1 md:-mb-0 -mb-2 px-2"
        >
              <button 
                      aria-label="dropdown" 
                      className="focus:outline-none border-b-2 border-transparent focus:border-indigo-700 py-3  focus:text-indigo-700 text-gray-600 hover:text-indigo-700 flex items-center relative" 
                      onClick={() => dropdownHandler()}
              >
                <ul 
                    className="p-2 w-40 border-r bg-white absolute rounded right-0 shadow top-0 mt-16 hidden px-5" 
                    id='user'
                    style={{ width: 'max-content' }}
                >   
                  {    
                      userState.getUserToken() && <>
                        <Link href={`/user/profile`} 
                              className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 ml-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none"
                        >
                          <span 
                              className="ml-2 flex justify-center items-center text-[15px]"
                          >
                            <HiWallet 
                                  className='mr-2 -ml-5 text-green-500 mt-1 cursor-pointer hover:text-blue-600 hover:font-bold'
                            />
                            Profile
                          </span>
                        </Link>        
                        <Link 
                              href={`/user/adverts`} 
                              className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 ml-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none"
                        >
                              <span 
                                  className="ml-2 flex justify-center items-center text-[15px]"
                              >
                                <HiMiniBookmarkSquare className='mr-2 -ml-5 text-green-500 mt-1 cursor-pointer hover:text-blue-600 hover:font-bold' />
                                  My Adverts
                              </span>
                        </Link>
                        <Link 
                              href={`/user/dashboard`} 
                              className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 ml-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outLink focus:outline-none"
                        >
                              <span 
                                  className="ml-2 flex justify-center items-center text-[15px]"
                              >
                                <HiMiniBars4 
                                          className='mr-2 -ml-5 text-green-500 mt-1 cursor-pointer hover:text-blue-600 hover:font-bold'
                                />
                                  Become A Dealer
                                </span>
                        </Link>
                        <Link 
                          href={`/user/create-advert`} 
                          className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 ml-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none"
                      >
                          <span 
                              className="ml-2 flex justify-center items-center text-[15px]"
                          >
                            <HiBuildingStorefront 
                                            className='mr-2 -ml-5 text-green-500 mt-1 cursor-pointer hover:text-blue-600 hover:font-bold'
                            />
                                Create Advert
                          </span>
                        </Link>
                        <Link 
                          href={`/user/become-a-dealer`} 
                          className="cursor-pointer text-sm leading-3 tracking-normal mt-2 py-2 ml-2 flex items-center focus:text-indigo-700 focus:outline-none"
                      >
                          <span 
                              className="ml-2 flex justify-center items-center text-[15px]"
                          >
                            <HiBuildingStorefront 
                                            className='mr-2 -ml-5 text-green-500 mt-1 cursor-pointer hover:text-blue-600 hover:font-bold'
                            />
                                Become A Dealer
                          </span>
                        </Link>
                        <Link 
                            href={`#`} 
                            onClick={() => {
                                setOpenLoggedOut(true)                             
                            }}
                            className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 ml-2 hover:text-red-600 flex items-center focus:text-indigo-700 focus:outline-none"
                        >
                            <span 
                                  className="ml-2 flex justify-center items-center text-[15px] hover:text-blue-600 hover:font-bold"
                            >
                              <HiMiniPower 
                                        className='mr-2 -ml-5 text-red-600 mt-1 cursor-pointer'
                              />
                                Logout
                            </span>
                        </Link>
                    </>
                  }
                  {    
                      !userState.getUserToken() && <>
                        <Link 
                            href={`/login`} 
                            className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 ml-2 hover:text-red-600 flex items-center focus:text-indigo-700 focus:outline-none"
                        >
                            <span 
                                  className="ml-2 flex justify-center items-center text-[15px] hover:text-blue-600 hover:font-bold"
                            >
                              <HiOutlineUser className='w-5 h-5 text-green-500 mr-2 -ml-5' />
                                Login
                            </span>
                        </Link>
                        <Link 
                            href={`/register`} 
                            className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 ml-2 hover:text-red-600 flex items-center focus:text-indigo-700 focus:outline-none"
                        >
                            <span 
                                  className="ml-2 flex justify-center items-center text-[17px] hover:text-blue-600 hover:font-bold"
                            >
                              <HiOutlineUserAdd className='w-5 h-5 text-green-500 mr-2 -ml-5' />
                                Register
                            </span>
                        </Link>
                      </>
                  }
                </ul>
                <div 
                    className="cursor-pointer flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
                >         
                    { !userState.getPassport() && <HiOutlineUser className='w-6 h-6 font-bold' /> }
                    { userState.getPassport() && <img src={`${USAGE_PATH.AVATAR}${userState.getPassport()}`} width={50}  className='rounded-full' />  }
                </div>
                <div 
                    className="ml-2 "
                >
                  <svg className="icon icon-tabler icon-tabler-chevron-down cursor-pointer" width="20" height="20" viewBox="0 0 24 24" 
                       strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z"></path>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </button>

              {
                 openLoggedOut && <Logout onClick={
                                              () => {

                                            }
                                          } 
                                          deleteModal={openLoggedOut} 
                                          token={token} 
                                  />
              }
            </div>
  )
}
