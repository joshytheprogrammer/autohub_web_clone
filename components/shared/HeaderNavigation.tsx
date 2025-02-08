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
// import SmallScreen from './SmallScreen';
import { UseStore } from '../../state/store';
import ProfilePicture from '../../app/(user)/user/adverts/control/profile-picture';
import { Logout } from '../Logout';
import SmallScreen from './SmallScreen';


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
  const token = Session.getUserToken()
  const [openLoggedOut, setOpenLoggedOut] = useState<boolean>(false)
  const [country] = useState<number>(-1) 
  const [firstname, setFirstName] = useState<string>("")
  const [surname, setSurname] = useState<string>("")
  const [member, setMember] = useState<string>("") 

  useEffect(() => 
  {
     setFirstName(Session.getFName())
     setSurname(Session.getSName())
     setMember(Session.getUType())
  }, [])

  useEffect(() => 
  {
    
  }, [country])

   
  const [isMenuOpen, setMenu] = useState<boolean>(false)
  
  
  return (
        <>
        
            <div className='bg-white shadow-lg items-center sticky top-0 z-50 h-fit'
            >
                <nav 
                    className='w-full pt-1 bg-[#27973f]'
                >
                    <section 
                        className='w-11/12 max-w-[1440px] mx-auto px-2 py-1 md:block hidden flex'
                    >
                        <ul className='flex gap-1 justify-between w-full'
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
                    <section 
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
                            <section 
                                    className='p-3 w-full mx-auto flex justify-left items-center mb-5 ml-5 -mt-20'
                            >
                                <Logo />
                            </section>
                            <section 
                                    className='p-3 d-flex -mt-10'
                            >
                                { 
                                    token && 
                                        <div 
                                            className='flex justify-left h-[fit] px-10 py-5 text-white gap-10'
                                        >
                                            <section 
                                                className='w-5/12'
                                            >
                                                {/* <img src='' className='h-[90px] w-[90px] flex justify-left rounded-full bg-blue-200 mb-3' /> */}
                                                <ProfilePicture />
                                            </section>
                                            <section 
                                                className='w-7/12 -ml-7'
                                            >   
                                                <div 
                                                    className='w-full flex justify-left font-bold text-[15px] mt-5'
                                                >
                                                    {firstname} {surname}
                                                </div>
                                                <div 
                                                    className='w-full flex justify-left font-bold text-sm uppercase border-2 border-blue-400 rounded-lg pl-1'
                                                >
                                                    {member}
                                                </div>
                                                <div 
                                                    className='w-full flex justify-left font-bold text-md'
                                                >
                                                    <HiMiniPower 
                                                            className='mr-1 text-2xl mt-2 cursor-pointer hover:text-red-600' 
                                                            onClick={() => {
                                                                setOpenLoggedOut(true)                             
                                                            }}
                                                    />
                                                </div>
                                            </section>
                                        </div>
                                }
                                {
                                    !token && <div className='h-[50px]'></div>
                                }
                                
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
                                                            className='flex px-5 py-2 bg-[#1c733d] border-2 border-green-700 hover:bg-green-900 text-white mb-1 cursor-pointer text-left text-[14px] font-bold text-[#bdbcbb] hover:text-white'
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
                                </section>
                                {/* ends here  */}
                        </div>                      
                        <div 
                                className='w-4/12'                            
                                onClick={() => {
                                setMenu(false)
                                }}
                        >    
                                            
                        </div>
                    </section>
                </div>
                {/* second header  */}
                <nav 
                    className='flex md:grid md:grid-cols-12 pb-4 md:pb-2 justify-center'
                >
                    <Logo />         
                    <div className='md:block hidden md:col-span-8'
                    >
                        <SearchBox />
                    </div>
                    <RightSide />
                    <PostAdvert />
                </nav>
             
              
                <div className='w-full md:hidden pb-2 mb-2'
                >        
                    <SmallScreen />
                </div>


                </div> 
            </div>  

            {
                openLoggedOut && <Logout onClick={
                                            () => {

                                            }
                                        } 
                                        deleteModal={openLoggedOut} 
                                        token={token} 
                                />
            }
       </> 
  )
}
