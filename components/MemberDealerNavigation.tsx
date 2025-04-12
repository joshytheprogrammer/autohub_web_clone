
"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { UseStore } from '../state/store'
import ProfilePicture from '../app/(user)/user/adverts/control/profile-picture'
import { useRouter } from 'next/navigation'
import { Logout } from './Logout'
import { Switch } from './Switch'


type MemberDealerNavigation = 
{
   marketPlace: { url: string, name: string }[]   
   bg: string 
   hover: string
}

export default function MemberDealerNavigation({ marketPlace, bg, hover }: MemberDealerNavigation) 
{
  const Session = UseStore((state) => state)
  const router = useRouter()
  const token = Session.getUserToken()
  const [openLoggedOut, setOpenLoggedOut] = useState<boolean>(false)

  const [firstname, setFirstname] = useState<string>("")
  const [surname, setSurname] = useState<string>("")
  const [userType, setUserType] = useState<string>("")
  const [page, setPage] = useState<string>("")  
  const [roles, setRoles] = useState<string[]>([]) 
  const [switchUserType, setSwitchUserType] = useState<boolean>(false)
  const [current, setCurrent] = useState<string>("")

  useEffect(() => 
  {
      setFirstname(Session.getFName())
      setSurname(Session.getSName())
      setUserType(Session.getUType())
      setPage(page)
      setRoles(Session.getUserRoles())
  }, [])

  useEffect(() => 
  {
    
  }, [page])

  useEffect(() => 
  {
    //  router.push(`/user/dashboard`) 
  }, [userType])

  
  return (
            <>
                <div 
                    className='w-3/12 d-flex border-shadow drop-shadow-lg md:block hidden rounded-2xl'
                >
                        <section 
                                className='d-flex justify-center items-center mx-auto h-[fit] px-10 pb-5 pt-2 mt-0 bg-green-50'
                        >
                            <span 
                                className='w-full flex justify-center mx-auto font-bold text-md uppercase text-blue-600'
                            >
                                {
                                    roles.map((role: string, index: number) => {
                                        return (
                                            <span 
                                                key={index}
                                                className='font-bold text-sm px-5 py-1 whitespace-nowrap rounded-lg cursor-pointer text-black mr-5 hover:text-red-600 border-b-2 border-green-300'
                                            >
                                                {role} - {' Fine - Hello'}
                                            </span>
                                        )
                                    })
                                }
                            </span>
                            {/* <img src='' className='h-[200px] w-[200px] mx-auto rounded-full bg-blue-200 mb-3' /> */}
                            <div 
                                className='d-flex justify-center item-center'
                            >
                                <ProfilePicture />
                                <span 
                                    className='w-full flex justify-center mx-auto font-bold text-lg mb-3 -ml-7'
                                >
                                    {firstname} {surname}
                                </span>
                            </div>
                            <span 
                                className='w-full flex justify-center mx-auto font-bold text-md uppercase text-blue-600 -mb-1'
                            >
                                {
                                    roles.map((role: string, index: number) => {
                                        return (
                                            <span 
                                                key={index}
                                                className={`font-bold text-sm px-5 py-1 whitespace-nowrap rounded-lg ${(role === 'student') ? 'cursor-pointer' : ''} text-black mr-5 hover:text-red-600 border-2 border-green-300`}
                                                onClick={
                                                    () => {
                                                        if(role === "student")
                                                        {
                                                            setCurrent(role)
                                                            // router.push(`/user/dashboard`)
                                                            setPage(`/user/dashboard`)
                                                            setSwitchUserType(true)
                                                            setCurrent(role)
                                                        }
                                                        // const allow: string[] = ['MEMBER', 'DEALER', 'ADMIN']
                                                        // if(roles.length > 1 && ((allow.includes(current))))
                                                        // {
                                                        //     setSwitchUserType(false)
                                                        // } 
                                                        // if(roles.length > 1 && current === "STUDENT")
                                                        // {
                                                        //     setSwitchUserType(true)
                                                        // }    
                                                    }
                                                }
                                            >
                                               { ((role === 'member') || ( role === 'dealer') || ( role === 'admin')  || ( role === 'super-admin')) ? 'Market Place' : 'Class Room' }
                                            </span>
                                        )
                                    })
                                }
                            </span>
                        </section>
                        <section 
                                className='d-flex justify-center items-center mx-auto'
                        >
                            <ul 
                                className='w-full mt-2'
                            >
                                {                              
                                    marketPlace.map((user, index: number) => {
                                    return (
                                        <Link href={`${user?.url}`} key={index}
                                              onClick={() => {
                                                setPage(user?.name)
                                                router.push(`${user?.url}`)                                                
                                              }}
                                        >
                                            <li 
                                                key={index} 
                                                className={`px-5 py-2 ${(page === user?.name) ? bg : hover} hover:bg-green-900 text-whiterounded-md mb-1 cursor-pointer rounded-lg text-center uppercase text-white font-bold hover:text-white`}
                                            >
                                                {user?.name}
                                            </li>
                                        </Link>
                                    )
                                    })
                                }   
                                {/* {                              
                                classRoom.map((user, index) => {
                                    return (
                                        <Link href={`${user?.url}`} key={index}
                                        >
                                            <li 
                                                    key={index} 
                                                    className='px-5 py-3 bg-blue-600 hover:bg-blue-800 text-whiterounded-md mb-1 cursor-pointer rounded-lg text-center uppercase text-white font-bold hover:text-white'
                                            >
                                                {user?.name}
                                            </li>
                                        </Link>
                                    )
                                })
                                } */}
                                <Link href={'profile'}
                                      onClick={() => {
                                          setPage(`/user/profile`)
                                      }}
                                >
                                    <li 
                                        key={Math.random()} 
                                        className={`px-5 py-2 ${(page === `/user/profile`) ? bg : hover} hover:bg-green-900 text-whiterounded-md mb-1 cursor-pointer rounded-lg text-center uppercase text-white font-bold hover:text-white`}
                                    >
                                        {`Profile`}
                                    </li>
                                </Link> 
                                { 
                                    (roles.includes('member')) && 
                                    <Link href={`become-a-dealer`}
                                      onClick={() => {
                                          setPage(`/user/become-a-dealer`)
                                      }}
                                    >
                                        <li 
                                            key={Math.random()} 
                                            className={`px-5 py-2 ${(page === `/user/become-a-dealer`) ? bg : hover} hover:bg-green-900 text-whiterounded-md mb-1 cursor-pointer rounded-lg text-center uppercase text-white font-bold hover:text-white`}
                                        >
                                            {`Become a Dealer`}
                                        </li>
                                    </Link> 
                                }
                                <Link href={`change-password`}
                                      onClick={() => {
                                          setPage(`/user/change-password`)
                                      }}
                                >
                                    <li 
                                        key={Math.random()} 
                                        className={`px-5 py-2 ${(page === `/user/change-password`) ? bg : hover} hover:bg-green-900 text-whiterounded-md mb-1 cursor-pointer rounded-lg text-center uppercase text-white font-bold hover:text-white`}
                                    >
                                        {`Change Password`}
                                    </li>
                                </Link>
                                <Link href={`change-passport`}
                                      onClick={() => {
                                          setPage(`/user/change-passport`)
                                      }}
                                >
                                    <li 
                                        key={Math.random()} 
                                        className={`px-5 py-2 ${(page === `/user/change-passport`) ? bg : hover} hover:bg-green-900 text-whiterounded-md mb-1 cursor-pointer rounded-lg text-center uppercase text-white font-bold hover:text-white`}
                                    >
                                        {`Change Passport`}
                                    </li>
                                </Link>               
                                <li 
                                    key={Math.random()} 
                                    onClick={() => {
                                        setOpenLoggedOut(true)                             
                                    }}
                                    className='px-5 py-2 border-2 mt-2 border-red-300 hover:bg-red-700 text-whiterounded-md mb-5 cursor-pointer rounded-lg text-center uppercase text-red font-bold hover:text-white'
                                >
                                Logout
                                </li>
                            </ul>                    
                        </section>
                    </div>
                    {
                        switchUserType && <Switch 
                                            onClick={() => {
                                                setSwitchUserType(false)
                                            } } 
                                            switchDialog={switchUserType} 
                                            p1='You are about to leave market place' 
                                            p2="Do you want to visit the classroom"
                                            color="blue"
                                            current={current}
                                            where={'Class Room'}
                                        />
                    }

                    {
                        openLoggedOut && 
                                <Logout 
                                    onClick={
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
