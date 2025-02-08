"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import '../../globals.css'
import Logo from '../../../components/shared/Logo'
import { HiHome } from 'react-icons/hi2'
import Message from '../../../components/shared/Message'
import { BeatLoader } from 'react-spinners'
import { ForgotPassword } from '../../api/auth/auth'


export default function Page() 
{      
      const EMAIL_MESSAGE = 'Enter Email'
    
      const [email, setEmail] = useState<string>("")
      const [emailMessage, setEmailMessage] = useState<string>("")     
      const [errMsgStyle, setErrMsgStyle] = useState<string>('')   
      const [successStyle, setSuccessStyle] = useState<string>('')
      const [successMsg, setSuccessMsg] = useState<string>('')
      const [loading, setIsLoading] = useState<boolean>(false)
      const [validationMessage, setValidationMessage] = useState<string>("")


      useEffect(() => 
      {
            setErrMsgStyle('bg-red-600 p-3 text-white font-bold rounded-md') 
            setSuccessStyle('bg-white p-3 text-blue-500 mb-3 font-bold rounded-md')            
      }, [])


      useEffect(() => {

      }, [loading])

      const Forgot = async () => 
      {
          setIsLoading(true)
          const checkFields: string = allFields()
          
          if(checkFields === 'valid')
          {
             const forgot = ForgotPassword(email)
             forgot.then((res: any) => 
             { 
                setIsLoading(false) 
                if(res.status === 200)
                { 
                   setSuccessMsg(res.message)
                   return false
                } else {
                   setValidationMessage(res.message)
                   setTimeout(() => {
                     setValidationMessage("")
                   }, 10000)  
                }      
                return false
              }).catch(() => {
                   setValidationMessage("Connection failed")
                   setIsLoading(false)
                   setTimeout(() => {
                      setValidationMessage("")
                   }, 10000)   
               })
            } else {       
                  setIsLoading(false)    
                  setValidationMessage('')       
                  setTimeout(() => {
                     setValidationMessage('')
                  }, 5000)         
            }
            return false
      }
    
    
      const allFields = () =>
      {
          let validity: string = 'valid'      
          if(email === ""){ setEmailMessage(EMAIL_MESSAGE); validity = 'invalid' }
          return validity
      }

      const SubmitData = (event: any) => 
      {
         event.preventDefault();
         Forgot()
      }
    
      return (
      <>  
            <main 
                  className="flex md:d-flex xl:flex-row h-screen bg-[#27973f]"
            >
                  <div 
                        className="w-full md:w-5/12 mx-auto my-4 d-flex items-center text-center justify-center px-3 py-5 md:p-10 mt-20 gap-5"
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
                                 className='flex text-white font-bold justify-center mb-5 uppercase  text-[14px] md:text-[18px]'
                              >
                                  Sorry! your can`t access your account, We help you get it back
                              </h3>
                        </div>
                        <div  
                              className='w-full d-flex gap-10 md:mb-3'
                        > 
                             { validationMessage && <Message msg={validationMessage} status={errMsgStyle} />  }
                             { successMsg && <Message msg={successMsg} status={successStyle} />  }
                        </div>
                        <div 
                              className="w-full md:p-10 p-3 md:px-9 md:pt-10 md:pb-5 d-flex items-center justify-center rounded-md md:rounded-xl bg-[#23913b] hover:text-white mb-20 md:mb-0 border-2 border-green-700"
                        >                              
                              
                              <form 
                                    onSubmit={SubmitData}
                              >
                                    <div  
                                          className='w-full d-flex gap-10 md:mb-3 mt-4'
                                    > 
                                          <div 
                                                className="mb-4 md:w-full"
                                          >
                                                <input  
                                                      className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                      type="email" name="email" id="email" placeholder="Enter Email" 
                                                      onChange={(e: any) => 
                                                      {
                                                            let value: string = e.target.value
                                                            
                                                            if(value === "" || value === undefined || value === null)
                                                            {
                                                                  setEmailMessage(EMAIL_MESSAGE)
                                                            } else {
                                                                  setEmail(value)
                                                                  setEmailMessage("")
                                                            }
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
                                    </div>
                                    <div  
                                          className='w-full flex justify-between md:flex gap-10 md:mb-3 mt-5'
                                    >   
                                          <button
                                                onClick={Forgot} 
                                                className="block w-full bg-green-600 hover:bg-green-800 border-shadow text-white font-bold py-4 px-1 rounded-lg ring-2 ring-green-800 ring-inset"
                                          >
                                                { loading ? <BeatLoader size={10} color="white" className="" /> : "Submit"}
                                          </button>
                                    </div>
                              </form>
                                    <div  
                                          className='w-full flex justify-between md:flex gap-10 md:mb-3 mt-10 px-5 pb-5'
                                    >                                       
                                          <div 
                                                className='d-flex justify-center text-center text-white'
                                          >
                                                <div className='hidden md:block'>Access your account</div>
                                                <div className='text-md hover:text-blue-300 font-bold'>
                                                      <Link href={'/login'}>Login</Link>
                                                </div>
                                          </div>  
                                          <div 
                                            className='text-md text-white hover:text-blue-300 font-bold text-md cursor-pointer'
                                          >
                                                <Link href={'/'}
                                                >                                
                                                      <div className='mt-1 mr-2 flex justify-center items-center'><HiHome className='mr-1 text-2xl md:mt-2'/></div>
                                                </Link>
                                          </div> 
                                          <div 
                                                className='d-flex justify-center text-center text-white'
                                          >
                                          <div className='hidden md:block'>If you do not have an account </div>
                                                <div className='text-md hover:text-blue-300 font-bold'>
                                                      <Link href={'/register'}>Create one now.</Link>
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
