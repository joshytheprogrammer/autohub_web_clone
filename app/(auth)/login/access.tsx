"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import '../../globals.css'
import Logo from '../../../components/shared/Logo'
import { HiHome } from 'react-icons/hi2'
import Message from '../../../components/shared/Message'
import { BeatLoader } from 'react-spinners'
import { Authenticate } from '../../api/auth/auth'
import { UseStore } from '../../../state/store'
import { profileDB } from '../../model/Product'


export default function Access({ showLogo, goTo } : { showLogo: boolean, goTo: string }) 
{
      const userData = UseStore((state) => state)
      
      const EMAIL_MESSAGE = 'Enter Email'
      const PASSWORD_MESSAGE = 'Enter Password' 
    
      const [email, setEmail] = useState<string>("")
      const [emailMessage, setEmailMessage] = useState<string>("")
    
      const [password, setPassword] = useState<string>("")
      const [passwordType, setPasswordType] = useState<string>("password")
      const [passwordMessage, setPasswordMessage] = useState<string>("")
     
      const [errMsgStyle, setErrMsgStyle] = useState<string>('')
      const [errorMessage, setErrorMessage] = useState<string>("")

      const [loading, setLoading] = useState<boolean>(false)
      
    
      useEffect(() => 
      {
         setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-2 -mt-1 px-2')
      //    setUserIsRegistered(userData.getRegistered())
         setTimeout(() => 
         {
            userData.setRegistered("")  
            // setUserIsRegistered("")           
         }, 10000)
      }, []) 

      useEffect(() => {

      }, [loading])

      // useEffect(() => {
      //    const keyDownHandler = (event: any) => {
      //       if(event?.key === "Enter")
      //       {
      //          event.preventDefault()
      //          Login()
      //       }
      //    }
      //    document.addEventListener('keydown', keyDownHandler)
      //    return () => {
      //       document.removeEventListener('keydown', keyDownHandler)
      //    }
      // }, [])

      const Login = async () => 
      {
          setLoading(true)
          const checkFields: string = allFields()
          if(checkFields === 'valid')
          { 
              userData.setRegistered("") 
              const SignUp = Authenticate(email, password)
              SignUp.then((response) => 
              {
                  if(response?.status === 200)
                  {
                     userData.setFName(response?.data?.firstname)
                     userData.setSName(response?.data?.surname)
                     userData.setPassport(response?.data?.passport)
                     userData.setUType(response?.data?.user_type)
                     userData.setUserRoles(response?.additions)
                     userData.setSideType(response?.additions[0])
                     userData.setUserToken(response?.plus)
                     profileDB.add(response?.data)
                     console.log(response?.additions)
                     if(response?.data?.user_type === 'admin')
                     {                        
                        // window.location.href = '/dashboard'
                        // return false
                        window.location.href = goTo
                     } else {
                        setTimeout(() => {
                           setLoading(false)
                           window.location.href = goTo
                        }, 400)
                     }
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
      
      const SubmitData = (event: any) => 
      {
            event.preventDefault();
            Login()
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
                          {
                             showLogo && <Logo /> 

                          }
                  </div>
                  <div 
                        className='w-full d-flex gap-10'
                  >
                        <div 
                              className='w-full'
                        >
                              <h3 
                                    className='flex text-gray-100 font-bold justify-center items-center mb-5 text-center uppercase text-[14px] md:text-[18px]'
                                    >
                                    Enter your email address/phone number and password to login.
                              </h3>
                        </div>
                        <div 
                              className="w-full md:p-10 p-3 md:px-9 md:pt-10 md:pb-5 d-flex items-center justify-center rounded-md md:rounded-xl bg-[#23913b] hover:text-white mb-20 md:mb-0 border-2 border-green-700"
                        >
                              
                              <form 
                                    onSubmit={SubmitData}
                              >
                                    <div  
                                          className='w-full d-flex gap-10 md:mb-3'
                                    > 
                                          <div  
                                                className='w-full d-flex gap-10 mb-3'
                                          > 
                                                { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                                                {/* { userIsRegistered && <Message msg={userIsRegistered} status={''} customStyle='bg-blue-600 text-white font-bold p-5 rounded-lg' />  } */}
                                          </div>
                                              <div 
                                                      className="mb-4 md:w-full"
                                                >
                                                      <input  
                                                            className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                            type="text" name="text" id="text" placeholder="Enter Email or Phone Number" 
                                                            autoComplete='off'
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
                                                      className="mb-4 md:w-full relative"
                                                >
                                                      <input  
                                                            className="w-full border font-bold rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                            type={passwordType} name="password" id="password" placeholder="Enter Password" 
                                                            autoComplete='off'
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
                                                      <div 
                                                      className="absolute inset-y-0 right-0 flex items-center pr-3 -mt-3"
                                                      >
                                                            {
                                                                  passwordType === "password" && <>

                                                                  <svg 
                                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" 
                                                                        className="h-6 w-6 cursor-pointer"
                                                                        onClick={
                                                                        () => {
                                                                              setPasswordType("text")
                                                                        }
                                                                        }
                                                                  >
                                                                        <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                                                        <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                                                        <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                                                                  </svg>
                                                                  </>
                                                            }
                                                            {
                                                                  passwordType === "text" && <>
                                                                  <svg 
                                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" 
                                                                        className="h-6 w-6 cursor-pointer"
                                                                        onClick={
                                                                        () => {
                                                                              setPasswordType("password")
                                                                        }
                                                                        }
                                                                  >
                                                                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                                        <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
                                                                  </svg>
                                                                  </>
                                                            }
                                                      
                                                      </div>
                                                      { passwordMessage && <Message msg={passwordMessage} status={errMsgStyle} /> }
                                              </div>
                                    </div>
        
                                    <div  
                                          className='w-full flex justify-between md:flex gap-10 md:mb-3 mt-5'
                                    >   
                                          <button 
                                                type='submit'
                                                className="block w-full bg-green-600 hover:bg-green-800 border-shadow text-white font-bold py-4 px-1 rounded-lg ring-2 ring-green-800 ring-inset"
                                                onClick={() => 
                                                {
                                                      Login()
                                                }}
                                          >
                                                { loading ? <BeatLoader size={10} color="white" className="" /> : "Login"}
                                          </button>
                                    </div>
                                    
                              </form>
                              <div  
                                    className='w-full flex justify-between md:flex gap-10 md:mb-3 mt-10 px-5 mb-10'
                              >   
                                 <div 
                                    className='d-flex justify-center text-center text-white'
                                 >
                                          <div className='hidden md:block'>If you do not have an account </div>
                                          <div className='text-md hover:text-blue-300 font-bold'>
                                                <Link href={'/register'} className='text-[13px] md:text-[14px] whitespace-nowrap'>Create one now.</Link>
                                          </div>
                                          </div>  
                                          <div 
                                                className='text-md text-white hover:text-blue-300 font-bold text-md'>
                                                <Link href={'/'}
                                                >                                
                                                      <div className='mt-1 mr-2 flex justify-center items-center'><HiHome className='mr-1 text-2xl md:mt-2'/></div>
                                                </Link>
                                          </div>                                    
                                          <div 
                                                className='d-flex justify-center text-center text-white'
                                          >
                                          <div className='hidden md:block'>I can remember my password again</div>
                                          <div className='text-md hover:text-blue-300 font-bold'>
                                                <Link href={'/forgot'} className='text-[13px] md:text-[14px] whitespace-nowrap'>Forgot Password</Link>
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
