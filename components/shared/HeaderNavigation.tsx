"use client"

import React, { useEffect, useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import { BsXCircle } from "react-icons/bs";
import clsx from 'clsx';
import Logo from './Logo'
import SearchBox from '../SearchBox';
import RightSide from '../RightSide';
import PostAdvert from '../PostAdvert';
import { AppPages } from './AppPages';
import { SubMenuItem } from './SubMenuItem';
import Link from 'next/link';
import { HiMiniPower } from 'react-icons/hi2';
import SmallScreen from './SmallScreen';
import { UseStore } from '../../state/store';
import ProfilePicture from '../../app/(user)/user/adverts/control/profile-picture';


// const marketPlate = 
// [
//     {
//        name: "dashboard",
//        url: "/user/dashboard"
//     },
//     {
//         name: "course",
//         url: "/user/course"
//     },
//     {
//         name: "time-table",
//         url: "/user/time-table"
//     },
//     {
//         name: "test",
//         url: "/user/test"
//     },
//     {
//         name: "exam",
//         url: "/user/exam"
//     },
//     {
//         name: "faq",
//         url: "/user/faq"
//     },
// ]


export default function HeaderNavigation() 
{

  const Session = UseStore((state) => state)
  const [country] = useState<number>(-1) 


  useEffect(() => 
  {
    
  }, [country])

   
  const [isMenuOpen, setMenu] = useState<boolean>(false)
  
  
  return (
      <div className='bg-white shadow-lg items-center sticky top-0 z-50 h-fit'
      >
          <nav 
              className='w-full pt-1 bg-[#27973f]'
          >
            <section 
                className='w-11/12 max-w-[1440px] mx-auto px-2 py-1 md:block hidden flex'
            >
                <ul className='flex gap-1 justify-between w-full -mb-3'
                >
                    {
                        AppPages.map((page, index) => {
                          return (
                              <SubMenuItem items={page} key={index} />
                          )
                        })
                    }  
                </ul>     
            </section>
            <section className='md:w-0/12 w-12/12 p-2 mr-5 flex justify-between relative'
            >
                <span className='flex justify-center items-center 10/12 md:absolute z-50 md:-mt-5 mt-1'
                >
                    <BsFillTelephoneInboundFill 
                        className='text-white w-16' 
                    />
                    <p className='text-white md:text-[14px] font-bold text-lg -ml-4 md:-mt-1'>+23409033333367</p>
                </span>
                <FiMenu 
                        className='text-4xl text-white cursor-pointer md:hidden' 
                        onClick={() => {
                          setMenu(true)
                        }}
                />
            </section>  
          </nav>          
          <div 
                className="max-w-[1440px] mx-auto px-8 px-3 md:p-3 z-50 -mb-2"
          > 
          <div className={
                clsx("fixed z-50 h-screen w-screen lg:hidden bg-black/50 top-0 right-0 -translate-x-full duration-500", isMenuOpen && "transition ease-out duration-500 translate-x-0")
              }
          >
              <div 
                    className='flex text-black left-0 top-0 h-screen z-50 w-12/12'
              >
                  <div 
                        className='w-8/12 pt-5 bg-green-800 border-blue-500'
                  >
                      <span className='10/12 flex justify-end pr-5'
                      >
                          <BsXCircle 
                                      className='w-10 h-10 text-white hover:text-green-300 font-bold cursor-pointer' 
                                      onClick={() => { setMenu(false) }}
                          />
                      </span>
                        {/* starts here  */}
                        <div 
                              className='p-3 w-full mx-auto flex justify-left items-center mb-5 ml-5 -mt-20'
                        >
                            <Logo />
                        </div>
                        <div 
                              className='p-3 d-flex -mt-10'
                        >
                            <div 
                                  className='flex justify-left h-[fit] px-10 py-5 text-white gap-10'
                            >
                                <div 
                                      className='w-5/12'
                                >
                                    {/* <img src='' className='h-[90px] w-[90px] flex justify-left rounded-full bg-blue-200 mb-3' /> */}
                                    <ProfilePicture />
                                </div>
                                <div 
                                      className='w-7/12 -ml-7'
                                >   
                                  <div 
                                      className='w-full flex justify-left font-bold text-[15px] mt-5'
                                  >
                                      {Session.getFName()} {Session.getSName()}
                                  </div>
                                  <div 
                                     className='w-full flex justify-left font-bold text-md uppercase'
                                  >
                                     {Session.getUType()}
                                  </div>
                                  <div 
                                      className='w-full flex justify-left font-bold text-md'
                                  >
                                      <HiMiniPower className='mr-1 text-2xl mt-2 cursor-pointer hover:text-red-600'/>
                                  </div>
                                </div>
                            </div>
                            {/* <div 
                                  className='w-full mb-2 px-2 py-1 bg-blue-800 text-white border-2 border-blue-600 rounded-md -mt-3'
                            >
                                Class Room
                            </div> */}
                            {/* <ul 
                                className='w-full'
                            >
                                {
                                  
                                    marketPlate.map((user, index) => {
                                      return (
                                          <Link 
                                                href={`${user?.url}`}
                                                key={index}
                                                onClick={() => { setMenu(false) }}
                                          > */}
                                              {/* [#bdbcbb] */}
                                              {/* <li 
                                                    className='flex px-5 py-2 bg-[#1c7311] hover:bg-green-900 uppercase mb-1 cursor-pointer text-left text-[14px] font-bold text-gray-200 hover:text-white'
                                              >                                                 */}
                                                  {/* {user?.icon}  */}
                                                  {/* {user?.name}
                                              </li>
                                          </Link>
                                      )
                                    })
                                }   
                            </ul> */}
                            {/* <div 
                                  className='w-full px-2 py-1 bg-blue-800 text-white border-2 border-blue-600 rounded-md'
                            >
                                Market Place
                            </div> */}
                            <ul className='w-full mt-2'>
                                {
                                  
                                  AppPages.map((user, index) => {
                                      return (
                                          <Link 
                                                href={`${user?.goTo}`}
                                                key={index}
                                                onClick={() => { setMenu(false) }}
                                          >
                                              <span 
                                                    className='flex px-5 py-2 bg-[#1c733d] hover:bg-green-900 text-white mb-1 cursor-pointer text-left text-[14px] font-bold text-[#bdbcbb] hover:text-white'
                                              >                                                
                                                  {user?.name}
                                              </span>
                                          </Link>
                                      )
                                    })
                                }   
                            </ul> 
                            <ul className='w-full mt-2'>
                                {
                                    <Link 
                                            href={`profile`}
                                            key={Math.random()}
                                            onClick={() => { setMenu(false) }}
                                    >
                                        <span 
                                              className='flex px-5 py-5 bg-[#1c733d] hover:bg-green-900 text-white mb-1 cursor-pointer text-left text-[14px] font-bold text-[#bdbcbb] hover:text-white'
                                        >                                                
                                            {'Profile'}
                                        </span>
                                    </Link>
                                }   
                            </ul>                    
                        </div>
                        {/* ends here  */}
                  </div>                      
                  <div 
                        className='w-4/12'                            
                        onClick={() => {
                          setMenu(false)
                        }}
                  >    
                                      
                </div>
              </div>
          </div>

              {/* second header  */}
              <nav className='flex md:grid md:grid-cols-12 md:pb-2 justify-between justify-center'
              >
                <Logo />         
                <div className='md:block hidden md:col-span-8'
                >
                  <SearchBox />
                </div>
                <RightSide />
                <PostAdvert />
              </nav>
             
              
            <div className='md:mx-2 mt-1 w-full md:flex d-flex gap-2 pb-1'
            >                
                <div className='md:hidden mb-3 md:mt-0 md:mb-0 mt-5 mb-5'
                >
                  <SmallScreen />
                </div>
            </div>
          </div> 
      </div>  
  )
}
