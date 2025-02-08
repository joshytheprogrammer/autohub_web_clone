"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { HiOutlineUserAdd } from 'react-icons/hi';
import { HiBuildingStorefront, HiMiniBars4, HiMiniBookmarkSquare, HiMiniPower, HiOutlineUser, HiWallet } from 'react-icons/hi2';
import { UseStore } from '../state/store';
import { USAGE_PATH } from '../constant/Path';
import { Logout } from './Logout';
import { useRouter } from 'next/navigation';


export default function RightSide() 
{
    const router = useRouter()
    const userState = UseStore((state) => state)
    const token = userState.getUserToken()
    const [openLoggedOut, setOpenLoggedOut] = useState<boolean>(false)
    const [passport, setPassport] = useState<string>("")
    const [userType, setUserType] = useState<string>("")    
    const ROLES = ['admin', 'super-admin']
    const [roles, setRoles] = useState<string[]>([]) 

    useEffect(() => 
    {
       setPassport(userState.getPassport())
       setUserType(userState.getUType())
       setRoles(userState.getUserRoles())
       console.log(userState.getUserRoles())
    }, [])

    useEffect(() => 
    {
       console.log(passport)
    }, [])

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
                      token && <>
                        { (ROLES.includes(userType)) &&
                          <span 
                                onClick={
                                  () => {
                                      userState.setSideType('member')
                                      router.push(`/dashboard`)
                                  } 
                                }
                                className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 -ml-3 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none"
                          >
                            <span 
                                className="ml-2 flex justify-center items-center text-[15px]"
                            >
                              <HiWallet 
                                    className='mr-2 -ml-s5 text-green-500 mt-1 cursor-pointer hover:text-blue-600 hover:font-bold'
                              />
                              Dashboard
                            </span>
                          </span>                          
                        } 
                        <span
                              onClick={
                               () => {
                                    userState.setSideType('member')
                                    router.push(`/user/profile`)
                                } 
                              }
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
                        </span>        
                        <span 
                              onClick={
                                () => {
                                    userState.setSideType('member')
                                    router.push(`/user/adverts`)
                                 } 
                              }
                              className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 ml-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none"
                        >
                              <span 
                                  className="ml-2 flex justify-center items-center text-[15px]"
                              >
                                <HiMiniBookmarkSquare className='mr-2 -ml-5 text-green-500 mt-1 cursor-pointer hover:text-blue-600 hover:font-bold' />
                                  My Adverts
                              </span>
                        </span>
                        { 
                          (roles.includes('member')) &&  
                            <span 
                                  onClick={
                                    () => {
                                        userState.setSideType('member')
                                        router.push(`/user/become-a-dealer`)
                                    } 
                                  }
                                  className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 ml-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outspan focus:outline-none"
                            >
                                  <span 
                                      className="ml-2 flex justify-center items-center text-[15px]"
                                  >
                                    <HiMiniBars4 
                                              className='mr-2 -ml-5 text-green-500 mt-1 cursor-pointer hover:text-blue-600 hover:font-bold'
                                    />
                                      Become A Dealer
                                    </span>
                            </span>

                        }
                        <span                         
                            onClick={
                              () => {
                                  userState.setSideType('member')
                                  router.push(`/user/create-advert`)
                              } 
                            }
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
                        </span>                               
                        <span 
                             onClick={
                                () => {
                                    userState.setSideType('member')
                                    router.push(`/user/change-password`)
                                } 
                              }
                              className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 ml-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none"
                        >
                              <span 
                                  className="ml-2 flex justify-center items-center text-[15px]"
                              >
                                <HiMiniBookmarkSquare className='mr-2 -ml-5 text-green-500 mt-1 cursor-pointer hover:text-blue-600 hover:font-bold' />
                                  Change Password
                              </span>
                        </span>                              
                        <span 
                              onClick={
                                () => {
                                    userState.setSideType('member')
                                    router.push(`/user-change-passport`)
                                } 
                              }
                              className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 ml-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none"
                        >
                              <span 
                                  className="ml-2 flex justify-center items-center text-[15px]"
                              >
                                <HiMiniBookmarkSquare className='mr-2 -ml-5 text-green-500 mt-1 cursor-pointer hover:text-blue-600 hover:font-bold' />
                                  Change Passport
                              </span>
                        </span>
                        
                        { 
                          (roles.includes('student')) &&  
                            <div 
                              className='border border-gray-200 mt-2 w-[200px]'
                            >
                              <div 
                                className='bg-blue-700 p-1 text-white text-md text-center'
                              >
                                  Class Roomm
                              </div>
                              <div 
                                className='pl-5'
                              >
                                  <span 
                                        onClick={
                                           () => {
                                              userState.setSideType('student')
                                              router.push(`/user/dashboard`)
                                           } 
                                        }
                                        className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 ml-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outLink focus:outline-none"
                                  >
                                        <span 
                                            className="ml-2 flex justify-center items-center text-[15px]"
                                        >
                                          <HiMiniBars4 
                                                    className='mr-2 -ml-5 text-green-500 mt-1 cursor-pointer hover:text-blue-600 hover:font-bold'
                                          />
                                            Dashbaord
                                          </span>
                                  </span>
                                  <span 
                                        onClick={
                                           () => {
                                              userState.setSideType('student')
                                              router.push(`/user/course`)
                                           } 
                                        }
                                        className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 ml-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outspan focus:outline-none"
                                  >
                                        <span 
                                            className="ml-2 flex justify-center items-center text-[15px]"
                                        >
                                          <HiMiniBars4 
                                                    className='mr-2 -ml-5 text-green-500 mt-1 cursor-pointer hover:text-blue-600 hover:font-bold'
                                          />
                                            Courses
                                          </span>
                                  </span>
                                  <span 
                                        onClick={
                                           () => {
                                              userState.setSideType('student')
                                              router.push(`/user/time-table`)
                                           } 
                                        }
                                        className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 ml-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outspan focus:outline-none"
                                  >
                                        <span 
                                            className="ml-2 flex justify-center items-center text-[15px]"
                                        >
                                          <HiMiniBars4 
                                                    className='mr-2 -ml-5 text-green-500 mt-1 cursor-pointer hover:text-blue-600 hover:font-bold'
                                          />
                                            Time Table
                                          </span>
                                  </span>
                                  <span 
                                        onClick={
                                           () => {
                                              userState.setSideType('student')
                                              router.push(`/user/test`)
                                           } 
                                        }
                                        className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 ml-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outspan focus:outline-none"
                                  >
                                        <span 
                                            className="ml-2 flex justify-center items-center text-[15px]"
                                        >
                                          <HiMiniBars4 
                                                    className='mr-2 -ml-5 text-green-500 mt-1 cursor-pointer hover:text-blue-600 hover:font-bold'
                                          />
                                            Test
                                          </span>
                                  </span>
                                  <span 
                                        onClick={
                                           () => {
                                              userState.setSideType('student')
                                              router.push(`/user/exam`)
                                           } 
                                        }
                                        className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 ml-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outspan focus:outline-none"
                                  >
                                        <span 
                                            className="ml-2 flex justify-center items-center text-[15px]"
                                        >
                                          <HiMiniBars4 
                                                    className='mr-2 -ml-5 text-green-500 mt-1 cursor-pointer hover:text-blue-600 hover:font-bold'
                                          />
                                            Exam
                                          </span>
                                  </span>
                                  <span 
                                        onClick={
                                           () => {
                                              userState.setSideType('student')
                                              router.push(`/user/faq`)
                                           } 
                                        }
                                        className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 ml-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outspan focus:outline-none"
                                  >
                                        <span 
                                            className="ml-2 flex justify-center items-center text-[15px]"
                                        >
                                          <HiMiniBars4 
                                                    className='mr-2 -ml-5 text-green-500 mt-1 cursor-pointer hover:text-blue-600 hover:font-bold'
                                          />
                                            FAQ
                                          </span>
                                  </span>
                                </div>
                            </div>
                        }
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
                      !token && <>
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
                    { !token && <HiOutlineUser className='w-6 h-6 font-bold' /> }
                    { token && <img src={`${USAGE_PATH.AVATAR}${userState.getPassport()}`} className='rounded-full w-[80px] h-[40px]' />  }
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
