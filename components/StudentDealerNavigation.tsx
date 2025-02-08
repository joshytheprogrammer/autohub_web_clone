
"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { UseStore } from '../state/store'
import { useRouter } from 'next/navigation'
import { Logout } from './Logout'
import ProfilePicture from '../app/(user)/user/adverts/control/profile-picture'


type StudentNavigation = 
{
   classRoom: { url: string, name: string }[]     
   bg: string 
   hover: string
}

export default function StudentDealerNavigation({ classRoom, bg, hover  }: StudentNavigation)
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
                                                className='font-bold text-sm px-5 py-1 whitespace-nowrap rounded-lg cursor-pointer text-black mr-5 hover:text-red-600 border-b-2 border-blue-300'
                                            >
                                                {role}
                                            </span>
                                        )
                                    })
                                }
                            </span>
                            {/* <img src='' className='h-[200px] w-[200px] mx-auto rounded-full bg-blue-200 mb-3' /> */}
                            <ProfilePicture />
                            <span 
                                className='w-full flex justify-center mx-auto font-bold text-lg mb-1 -mt-2'
                            >
                                {firstname} {surname}
                            </span>
                            <span 
                                className='w-full flex justify-center mx-auto font-bold text-md uppercase text-blue-600 -mb-1'
                            >
                                {
                                    roles.map((role: string, index: number) => {
                                        return (
                                            <span 
                                                key={index}
                                                className='font-bold text-sm px-5 py-1 whitespace-nowrap rounded-lg cursor-pointer text-black mr-5 hover:text-red-600 border-2 border-green-300'
                                                onClick={
                                                    () => {
                                                        Session.setSideType(role)
                                                        router.push(`/user/dashboard`)
                                                        setPage(`/user/dashboard`)
                                                    }
                                                }
                                            >
                                               { ((role === 'member') || ( role === 'dealer') || ( role === 'admin')) ? 'Market Place' : 'Class Room' }
                                            </span>
                                        )
                                    })
                                }
                            </span>
                        </section>
                        <section 
                            className='flex justify-center items-center mx-auto border-2 border-gray-300 py-2 px-10'
                        >
                            <ul 
                                className='w-full w-[270px]'
                            >
                                {                              
                                    classRoom.map((classrm: { name: string, url: string }, index: number) => {
                                    return (
                                        <Link 
                                            href={`${classrm?.url}`} key={index}
                                            onClick={
                                                () => {
                                                    setPage(classrm?.name)
                                                    router.push(`${classrm?.url}`)                                                
                                                }
                                            }
                                        >
                                            <li 
                                                key={index} 
                                                className={`px-5 py-2 ${(page === classrm?.name) ? bg : hover} hover:bg-green-900 text-whiterounded-md mb-1 cursor-pointer rounded-lg text-center uppercase text-white font-bold hover:text-white`}
                                            >
                                                {classrm?.name}
                                            </li>
                                        </Link>
                                    )
                                    })
                                } 
                                <Link href={'/user/profile'}
                                      onClick={() => {
                                          setPage(`/classroom/profile`)
                                      }}
                                >
                                    <li 
                                        key={Math.random()} 
                                        className={`px-5 py-2 ${(page === `/classroom/profile`) ? bg : hover} hover:bg-green-900 text-whiterounded-md mb-1 cursor-pointer rounded-lg text-center uppercase text-white font-bold hover:text-white`}
                                    >
                                        {`Profile`}
                                    </li>
                                </Link> 
                                <Link href={`/user/change-password`}
                                      onClick={() => {
                                          setPage(`/classroom/change-password`)
                                      }}
                                >
                                    <li 
                                        key={Math.random()} 
                                        className={`px-5 py-2 ${(page === `/classroom/change-password`) ? bg : hover} hover:bg-green-900 text-whiterounded-md mb-1 cursor-pointer rounded-lg text-center uppercase text-white font-bold hover:text-white`}
                                    >
                                        {`Change Password`}
                                    </li>
                                </Link>
                                <Link href={`/user/change-passport`}
                                      onClick={() => {
                                          setPage(`/classroom/change-passport`)
                                      }}
                                >
                                    <li 
                                        key={Math.random()} 
                                        className={`px-5 py-2 ${(page === `/classroom/change-passport`) ? bg : hover} hover:bg-green-900 text-whiterounded-md mb-1 cursor-pointer rounded-lg text-center uppercase text-white font-bold hover:text-white`}
                                    >
                                        {`Change Profile Picture`}
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
