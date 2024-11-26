"use client"

import { useState, useEffect } from "react"
import { BeatLoader } from "react-spinners"
import Message from "../../../../components/shared/Message"
import { ChangeUserPassword } from "../../../api/auth/auth"
import { UseStore } from "../../../../state/store"


export default function ChangePassword() 
{      
      const userToken = UseStore((state) => state)
      const token: string = userToken.getUserToken()

      const PASSWORD_MESSAGE = 'Enter Password'
      const CONFIRM_PASSWORD_MESSAGE = 'Enter Confirm Password'  
      const CURRENT_PASSWORD_MESSAGE = 'Enter Current Password'  
    
      const [loading, setIsLoading] = useState<boolean>(false)
    
      const [currentPassword, setCurrentPassword] = useState<string>("")
      const [currentPasswordMessage, setCurrentPasswordMessage] = useState<string>("")
    
      const [password, setPassword] = useState<string>("")
      const [passwordMessage, setPasswordMessage] = useState<string>("")
    
      const [confirmPassword, setConfirmPassword] = useState<string>("")
      const [confirmPasswordMessage, setConfirmPasswordMessage] = useState<string>("")
      const [matchError, setMatchError] = useState<string>("")

      const [successStyle, setSuccessStyle] = useState<string>('')
      const [successMsg, setSuccessMsg] = useState<string>('')
     
      const [errMsgStyle, setErrMsgStyle] = useState<string>('')
      const [validationMessage, setValidationMessage] = useState<string>("")
    
      useEffect(() => 
      {
          setErrMsgStyle('bg-red-600 p-3 text-white font-bold rounded-md') 
          setSuccessStyle('bg-blue-600 p-3 text-white mb-3 font-bold rounded-md')   
      }, []) 
    
      const ChangePasswordForUser = async () => 
      {
          setIsLoading(true)
          const checkFields: string = allFields()
          

          if(checkFields === 'valid')
          {
             const change = ChangeUserPassword(password, confirmPassword, currentPassword, token)
             change.then((res: any) => 
             {
                setIsLoading(false) 
                if(res.status === 200)
                { 
                   setSuccessMsg(res.message)
                   setTimeout(() => {
                    setSuccessMsg("")
                   }, 10000)  
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
          if(currentPassword === ""){ setCurrentPasswordMessage(CURRENT_PASSWORD_MESSAGE); validity = 'invalid' }
          if(password === ""){ setPasswordMessage(PASSWORD_MESSAGE); validity = 'invalid' }
          if(confirmPassword === ""){ setConfirmPasswordMessage(CONFIRM_PASSWORD_MESSAGE); validity = 'invalid' }
          if(password != confirmPassword){ setMatchError("New password do not match"); validity = 'invalid' }
          return validity
      }
    
      return (
        <>
            <div 
                className='md:col-span-9 col-span-12 bg-green-400 d-flex bg-green-50 border-shadow drop-shadow-lg md:block h-[fit] px-3 md:px-10 py-5 mt-3 md:rounded-2xl -mb-24 md:mb-0'
            > 
                <h1 
                    className='font-bold'
                >
                    Get A New Password
                </h1>           
                <div  
                    className='w-full d-flex gap-10 md:mb-3 pt-4'
                > 
                    { validationMessage && <Message msg={validationMessage} status={errMsgStyle} />  }
                    { successMsg && <Message msg={successMsg} status={successStyle} />  }
                </div>
                <div 
                      className="w-12/12 pt-5 md:pb-5 d-flex items-center justify-center hover:text-white mb-20 md:mb-0"
                >
                    <div  
                        className='w-full d-flex md:flex gap-10 md:mb-3'
                    >                                          
                        <div 
                            className="mb-4 md:w-full"
                        >
                            <input  
                                    className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                    type="password" name="currentPassword" id="currentPassword" placeholder="Enter your current password" 
                                    onChange={(e: any) => 
                                    {
                                        let value: string = e.target.value
                                        setCurrentPassword(value)
                                        setCurrentPasswordMessage("")
                                    }}
                                    onBlur={(e: any) => 
                                    {
                                        let value: string = e.target.value
                                       if(value === "" || value === undefined || value === null)
                                       {
                                           setCurrentPasswordMessage(CURRENT_PASSWORD_MESSAGE)
                                        }
                                    }}
                            />
                            { currentPasswordMessage && <Message msg={currentPasswordMessage} status={errMsgStyle} /> }
                        </div>
                    </div>
                    <div  
                        className='w-full d-flex md:flex gap-10 md:mb-3'
                    >                                          
                        <div 
                            className="mb-4 md:w-full"
                        >
                            <input  
                                    className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border mb-2 border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                    type="password" name="cPassword" id="cPassword" placeholder="Enter Passowrd Again" 
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
                                            setPasswordMessage(CONFIRM_PASSWORD_MESSAGE)
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
                        className="mb-4 w-fit"
                    >   
                        <button
                                onClick={ChangePasswordForUser} 
                                className="block w-full bg-green-600 hover:bg-green-800 border-shadow text-white font-bold py-4 px-10 rounded-lg"
                        >
                            { loading ? <BeatLoader size={10} color="white" className="" /> : "Update Passward"}
                        </button>
                    </div>
                </div>
                <div className="h-[120px]"></div>
            </div>
        </>
      )
}
