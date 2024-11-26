"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import '../../globals.css'
import Logo from '../../../components/shared/Logo'
import { HiHome } from 'react-icons/hi2'
import Message from '../../../components/shared/Message'
import { useRouter } from 'next/navigation'
import { BeatLoader } from 'react-spinners'
import { Authenticate } from '../../api/auth/auth'
import { UseStore } from '../../../state/store'
import { profileDB } from '../../model/Product'


export default function page() 
{
      const router = useRouter()
      const userData = UseStore((state) => state)
      
      const EMAIL_MESSAGE = 'Enter Email'
      const PASSWORD_MESSAGE = 'Enter Password' 
    
      const [email, setEmail] = useState<string>("")
      const [emailMessage, setEmailMessage] = useState<string>("")
    
      const [password, setPassword] = useState<string>("")
      const [passwordMessage, setPasswordMessage] = useState<string>("")
     
      const [errMsgStyle, setErrMsgStyle] = useState<string>('')
      const [errorMessage, setErrorMessage] = useState<string>("")

      const [userIsRegistered, setUserIsRegistered] = useState<string>("")
      const [loading, setLoading] = useState<boolean>(false)
      
    
      useEffect(() => 
      {
         setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
         setUserIsRegistered(userData.getRegistered())
         setTimeout(() => 
         {
            userData.setRegistered("")  
            setUserIsRegistered("")           
         }, 10000)
      }, []) 

      useEffect(() => {

      }, [loading])

      const Login = async () => 
      {
          setLoading(true)
          const checkFields: string = allFields()
          if(checkFields === 'valid')
          { 
              const SignUp = Authenticate(email, password)
              SignUp.then((response) => 
              {
                  if(response?.status === 200)
                  {
                     setLoading(false)
                     userData.setFName(response?.data?.firstname)
                     userData.setSName(response?.data?.surname)
                     userData.setPassport(response?.data?.passport)
                     userData.setUType(response?.data?.user_type)
                     userData.setUserRoles(response?.additions)
                     userData.setUserToken(response?.plus)
                     profileDB.add(response?.data)
                     router.push(`/user/adverts`)
                  } else {
                     setErrorMessage(response?.message)
                     setLoading(false)
                     setTimeout(() => 
                     {
                        setErrorMessage("")
                     }, 5000)
                     return false
                  }
              }).then(() => {
                 //  setErrorMessage("Error authenticating")
                 setLoading(false)
                 return false
              })
          } else {       
               setLoading(false) 
               setTimeout(() => 
               {
               }, 5000)
               return false
          }
      }
      
    
    
      const allFields = () =>
      {
          let validity: string = 'valid'      
          if(email === ""){ setEmailMessage(EMAIL_MESSAGE); validity = 'invalid' }
          if(password === ""){ setPasswordMessage(PASSWORD_MESSAGE); validity = 'invalid' }
          return validity
      }
    
      return (
      <>  
            <main 
                  className="flex md:d-flex xl:flex-row h-screen bg-[#27973f]"
            >
                  <div 
                        className="w-full md:w-5/12 mx-auto my-4 d-flex items-center justify-center px-3 py-5 md:p-10 mt-20 gap-5"
                  >            
                  <div 
                        className='w-full flex justify-center items-center mb-10'
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
                                    className='flex text-gray-300 font-bold justify-center mb-5 uppercase'
                                    >
                                    Login with either username or password
                              </h3>
                        </div>
                        <div 
                              className="w-full p-10 md:px-9 md:pt-10 md:pb-5 d-flex items-center justify-center rounded-md md:rounded-xl bg-[#23913b] hover:text-white mb-20 md:mb-0 border-2 border-green-700"
                        >
                                    <div  
                                          className='w-full d-flex gap-10 md:mb-3'
                                    > 
                                          <div  
                                                className='w-full d-flex gap-10 mb-3'
                                          > 
                                                { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                                                { userIsRegistered && <Message msg={userIsRegistered} status={''} customStyle='bg-blue-600 text-white font-bold p-5 rounded-lg' />  }
                                          </div>
                                          <div 
                                                className="mb-4 md:w-full"
                                          >
                                                <input  
                                                      className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                      type="email" name="email" id="email" placeholder="Enter Email" 
                                                      onChange={(e: any) => 
                                                      {
                                                            let value: string = e.target.value
                                                            setEmail(value)
                                                            setEmailMessage("")
                                                      }}
                                                      onBlur={(e: any) => 
                                                      {
                                                            let value: string = e.target.value
                                                            if(value === "" || value === undefined || value === null)
                                                            {
                                                               setEmailMessage(EMAIL_MESSAGE)
                                                            }
                                                      }}
                                                />
                                          { emailMessage && <Message msg={emailMessage} status={errMsgStyle} /> }
                                          </div>                                         
                                          <div 
                                                className="mb-4 md:w-full"
                                          >
                                                <input  
                                                      className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                      type="password" name="password" id="password" placeholder="Enter Password" 
                                                      onChange={(e: any) => 
                                                      {
                                                            let value: string = e.target.value
                                                            if(value === "" || value === undefined || value === null)
                                                            {
                                                               setPasswordMessage(PASSWORD_MESSAGE)
                                                            } else {
                                                               setPassword(value)
                                                               setPasswordMessage("")
                                                            }
                                                      }}
                                                      onBlur={(e: any) => 
                                                      {
                                                            let value: string = e.target.value
                                                            if(value === "" || value === undefined || value === null)
                                                            {
                                                               setPasswordMessage(PASSWORD_MESSAGE)
                                                            }
                                                      }}
                                                />
                                          { passwordMessage && <Message msg={passwordMessage} status={errMsgStyle} /> }
                                          </div>
                                    </div>
        
                                    <div  
                                          className='w-full flex justify-between md:flex gap-10 md:mb-3 mt-5'
                                    >   
                                          <button 
                                                className="block w-full bg-green-600 hover:bg-green-800 border-shadow text-white font-bold py-4 px-1 rounded-lg ring-2 ring-green-800 ring-inset"
                                                onClick={() => 
                                                {
                                                      Login()
                                                }}
                                          >
                                                { loading ? <BeatLoader size={10} color="white" className="" /> : "Login"}
                                          </button>
                                    </div>
                                    <div  
                                          className='w-full flex justify-between md:flex gap-10 md:mb-3 mt-10 px-5'
                                    >   
                                          <div 
                                                className='d-flex justify-center text-center text-white'
                                          >
                                          <div className=''>If you don't have an account </div>
                                          <div className='text-md hover:text-blue-300 font-bold'>
                                                <Link href={'/register'}>Create one now.</Link>
                                          </div>
                                          </div>  
                                          <div 
                                                className='text-md text-white hover:text-blue-300 font-bold text-md'>
                                                <Link href={'/'}
                                                >                                
                                                      <div className='mt-1 mr-2 flex justify-center items-center'><HiHome className='mr-1 text-2xl mt-2'/></div>
                                                </Link>
                                          </div>                                    
                                          <div 
                                                className='d-flex justify-center text-center text-white'
                                          >
                                          <div className=''>I can remember my password again</div>
                                          <div className='text-md hover:text-blue-300 font-bold'>
                                                <Link href={'/forgot'}>Forgot</Link>
                                          </div>
                                          </div>
                                    </div>
                        </div>
                        </div>
                  </div>
            </main>
      </>
      )
}
