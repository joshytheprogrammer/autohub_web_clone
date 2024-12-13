
"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { UseStore } from '../state/store'
import ProfilePicture from '../app/(user)/user/adverts/control/profile-picture'
import { useRouter } from 'next/navigation'
import { Logout } from './Logout'


type MemberDealerNavigation = 
{
   marketPlace: { url: string, name: string }[]   
}

export default function MemberDealerNavigation({ marketPlace }: MemberDealerNavigation) 
{
  const Session = UseStore((state) => state)
  const router = useRouter()
  const token = Session.getUserToken()
  const [openLoggedOut, setOpenLoggedOut] = useState<boolean>(false)

  const [firstname, setFirstname] = useState<string>("")
  const [surname, setSurname] = useState<string>("")
  const [userType, setUserType] = useState<string>("")
  const [page, setPage] = useState<string>("")

  useEffect(() => 
  {
      setFirstname(Session.getFName())
      setSurname(Session.getSName())
      setUserType(Session.getUType())
      setPage(page)
  }, [])

  useEffect(() => 
  {
    
  }, [page])

  
  return (
            <>
                <div 
                    className='w-3/12 d-flex border-shadow drop-shadow-lg md:block hidden rounded-2xl'
                >
                        <section 
                                className='d-flex justify-center items-center mx-auto h-[fit] px-10 pb-5 pt-2 mt-0 bg-green-50'
                        >
                            {/* <img src='' className='h-[200px] w-[200px] mx-auto rounded-full bg-blue-200 mb-3' /> */}
                            <ProfilePicture />
                            <span className='w-full flex justify-center mx-auto font-bold text-lg'>{firstname} {surname}</span>
                            <span 
                                className='w-full flex justify-center mx-auto font-bold text-md uppercase text-blue-600'
                            >
                                {userType}
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
                                                className={`px-5 py-3 ${(page === user?.name) ? 'bg-green-800' : 'bg-green-600'} hover:bg-green-900 text-whiterounded-md mb-1 cursor-pointer rounded-lg text-center uppercase text-white font-bold hover:text-white`}
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
                                        className={`px-5 py-3 ${(page === `/user/profile`) ? 'bg-green-800' : 'bg-green-600'} hover:bg-green-900 text-whiterounded-md mb-1 cursor-pointer rounded-lg text-center uppercase text-white font-bold hover:text-white`}
                                    >
                                        {`Profile`}
                                    </li>
                                </Link> 
                                { 
                                    (userType === `member`) &&
                                    <Link href={`become-a-dealer`}
                                      onClick={() => {
                                          setPage(`/user/become-a-dealer`)
                                      }}
                                    >
                                        <li 
                                            key={Math.random()} 
                                            className={`px-5 py-3 ${(page === `/user/become-a-dealer`) ? 'bg-green-800' : 'bg-green-600'} hover:bg-green-900 text-whiterounded-md mb-1 cursor-pointer rounded-lg text-center uppercase text-white font-bold hover:text-white`}
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
                                        className={`px-5 py-3 ${(page === `/user/change-password`) ? 'bg-green-800' : 'bg-green-600'} hover:bg-green-900 text-whiterounded-md mb-1 cursor-pointer rounded-lg text-center uppercase text-white font-bold hover:text-white`}
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
                                        className={`px-5 py-3 ${(page === `/user/change-passport`) ? 'bg-green-800' : 'bg-green-600'} hover:bg-green-900 text-whiterounded-md mb-1 cursor-pointer rounded-lg text-center uppercase text-white font-bold hover:text-white`}
                                    >
                                        {`Change Passport`}
                                    </li>
                                </Link>               
                                <li 
                                    key={Math.random()} 
                                    onClick={() => {
                                        setOpenLoggedOut(true)                             
                                    }}
                                    className='px-5 py-3 border-2 mt-2 border-red-300 hover:bg-red-700 text-whiterounded-md mb-5 cursor-pointer rounded-lg text-center uppercase text-red font-bold hover:text-white'
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
