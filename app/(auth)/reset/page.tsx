"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import '../../globals.css'
import Logo from '../../../components/shared/Logo'
import { useRouter, useSearchParams } from 'next/navigation'
import Message from '../../../components/shared/Message'
import { BeatLoader } from 'react-spinners'
import { HiHome } from 'react-icons/hi2'
import { NewPassword } from '../../api/auth/auth'


export default function Page() 
{
      const params = useSearchParams()
      const router = useRouter()

      const searchParams = params.get('kurtyhdfneurtwx')!
      
      const PASSWORD_MESSAGE = 'Enter Password'
      const CONFIRM_PASSWORD_MESSAGE = 'Enter Confirm Password'  
    
      const [loading, setIsLoading] = useState<boolean>(false)
    
      const [password, setPassword] = useState<string>("")
      const [passwordMessage, setPasswordMessage] = useState<string>("")
    
      const [confirmPassword, setConfirmPassword] = useState<string>("")
      const [confirmPasswordMessage, setConfirmPasswordMessage] = useState<string>("")
      const [matchError, setMatchError] = useState<string>("")
     
      const [errMsgStyle, setErrMsgStyle] = useState<string>('')
      const [validationMessage, setValidationMessage] = useState<string>("")
    
      useEffect(() => 
      {
          setErrMsgStyle('text-sm text-white font-bold bg-red-600 rounded-lg py-2 -mt-1 px-2')
      }, []) 
    
      const ResetPassword = async () => 
      {
          setIsLoading(true)
          const checkFields: string = allFields()
          

          if(checkFields === 'valid')
          {
             const forgot = NewPassword(password, confirmPassword, searchParams)
             forgot.then((res: any) => 
             {
                setIsLoading(false) 
                if(res.status === 200)
                { 
                   setIsLoading(false)
                   router.replace(`/login`)
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
      
      
      const SubmitData = (event: any) => 
      {
         event.preventDefault();
         ResetPassword()
      }
    
      const allFields = () =>
      {
          let validity: string = 'valid'      
          if(password === ""){ setPasswordMessage(PASSWORD_MESSAGE); validity = 'invalid' }
          if(confirmPassword === ""){ setConfirmPasswordMessage(CONFIRM_PASSWORD_MESSAGE); validity = 'invalid' }
          if(password != confirmPassword){ setMatchError("Password do not match"); validity = 'invalid' }
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
                        className='w-full'
                  >
                        <h3 
                              className='flex text-white font-bold justify-center mb-5 uppercase'
                              >
                              You can now change your password
                        </h3>
                  </div>            
                  <div  
                        className='w-full d-flex gap-10 md:mb-3'
                  > 
                        { validationMessage && <Message msg={validationMessage} status={errMsgStyle} />  }
                  </div>
                  <div 
                        className='w-full d-flex gap-10'
                  >
                        <div 
                              className="w-full p-4 md:px-9 md:pt-10 md:pb-5 pb-14 d-flex items-center justify-center rounded-md md:rounded-xl bg-[#23913b] hover:text-white mb-20 md:mb-0 border-2 border-green-700"
                        >
                              
                              <form 
                                    onSubmit={SubmitData}
                              >
                                    <div  
                                          className='w-full d-flex gap-10 md:mb-3 mt-5'
                                    > 
                                          <div 
                                                className="mb-4 md:w-full"
                                          >
                                                <input  
                                                      className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                      type="password" name="password" id="password" placeholder="Enter Password" 
                                                      onChange={(e: any) => 
                                                      {
                                                            let value: string = e.target.value
                                                            setPassword(value)
                                                            setPasswordMessage("")
                                                            setMatchError("")
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
                                          <div 
                                                className="mb-4 md:w-full"
                                          >
                                                <input  
                                                      className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border mb-2 border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                      type="password" name="cPassword" id="cPassword" placeholder="Enter Passowrd Again" 
                                                      onChange={(e: any) => 
                                                      {
                                                            let value: string = e.target.value
                                                            setConfirmPassword(value)
                                                            setConfirmPasswordMessage("")
                                                            setMatchError("")
                                                      }}
                                                      onBlur={(e: any) => 
                                                      {
                                                            let value: string = e.target.value
                                                            if(value === "" || value === undefined || value === null)
                                                            {
                                                            setConfirmPasswordMessage(CONFIRM_PASSWORD_MESSAGE)
                                                            }
                                                      }}
                                                />
                                          { confirmPasswordMessage && <Message msg={confirmPasswordMessage} status={errMsgStyle} /> }
                                          </div>
                                    </div>        
                                    <div 
                                          className="mb-2 mt-5"
                                    >
                                          { matchError && <Message msg={matchError} status={errMsgStyle} /> }
                                    </div>
                                    <div  
                                          className='w-full flex justify-between md:flex gap-10 md:mb-3 mt-5'
                                    >   
                                          <button
                                                onClick={ResetPassword} 
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
                                          <div className='text-md text-white hover:text-blue-300 font-bold text-md'>
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
