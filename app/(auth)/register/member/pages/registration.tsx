"use client"

import delay from "delay";
import { UseStore } from "../../../../../state/store"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiArrowSmLeft } from "react-icons/hi";
import Message from "../../../../../components/shared/Message";
import { BeatLoader } from "react-spinners";

type RegistrationProp = 
{
    onClick: (currentSection: number) => void
}

export default function Registration({ onClick }: RegistrationProp) 
{
  const router = useRouter()
  const advertState = UseStore((state) => state)
  
  const FIRST_NAME_MESSAGE = 'Enter Firstname'
  const SURNAME_MESSAGE = 'Enter Surname'
  const EMAIL_MESSAGE = 'Enter Email'
  const PHONE_NUMBER_MESSAGE = 'Enter Phone Number'
  const PASSWORD_MESSAGE = 'Enter Password'
  const CONFIRM_PASSWORD_MESSAGE = 'Enter Confirm Password'  
  const ERROR_MESSAGE = 'Ensure all compulsory fields are attended to'

  const [loading, setLoading] = useState<boolean>(false)
  const [errMsg, setErrMsg] = useState<string>("")

  const [firstname, setFirstname] = useState<string>("")
  const [firstnameMessage, setFirstnameMessage] = useState<string>("")

  const [surname, setSurname] = useState<string>("")
  const [surnameMessage, setSurnameMessage] = useState<string>("")

  const [email, setEmail] = useState<string>("")
  const [emailMessage, setEmailMessage] = useState<string>("")

  const [phone, setPhone] = useState<string>("")
  const [phoneMessage, setPhoneMessage] = useState<string>("")

  const [password, setPassword] = useState<string>("")
  const [passwordMessage, setPasswordMessage] = useState<string>("")

  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState<string>("")
  const [matchError, setMatchError] = useState<string>("")
 
  const [errMsgStyle, setErrMsgStyle] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => 
  {
     setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
     setErrorMessage("")
  }, []) 

  const Detail = async () => 
  {
      setLoading(true)
      const checkFields: string = allFields()
      if(checkFields === 'valid')
      {
          advertState.setPassportFor("member")                      
          router.push(`/register/passport`)
      } else {      
          setLoading(false)  
          setErrorMessage(ERROR_MESSAGE)
          setTimeout(() => 
          {
              setErrorMessage("")
          }, 5000)
          return false
      }
      await delay(2000)
      setLoading(false)
  }


  const allFields = () =>
  {
      let validity: string = 'valid'      
      if(advertState.getFirstname() === ""){ setFirstnameMessage(FIRST_NAME_MESSAGE); validity = 'invalid' }
      if(advertState.getSurname() === ""){ setSurnameMessage(SURNAME_MESSAGE); validity = 'invalid' }
      if(advertState.getEmail() === ""){ setEmailMessage(EMAIL_MESSAGE); validity = 'invalid' }
      if(advertState.getPhone() === ""){ setPhoneMessage(PHONE_NUMBER_MESSAGE); validity = 'invalid' }
      if(password === ""){ setPasswordMessage(PASSWORD_MESSAGE); validity = 'invalid' }
      if(confirmPassword === ""){ setConfirmPasswordMessage(CONFIRM_PASSWORD_MESSAGE); validity = 'invalid' }
      if(password && confirmPassword)
      { 
        if(password != confirmPassword){ setMatchError("Password do not match"); validity = 'invalid' }
      }
      return validity
  }

  return (
      
    <div 
        className="w-full p-10 md:px-9 md:pt-10 md:pb-5 d-flex items-center justify-center rounded-md md:rounded-xl bg-[#23913b] hover:text-white mb-20 md:mb-0 border-2 border-green-700"
    >
        <div 
            className="mb-4 w-full"
        >
          { (errorMessage) && <Message msg={errorMessage} status={errMsgStyle} /> }
        </div>
        <div 
              className='w-full d-flex md:flex gap-10 md:mb-3'
        >     
              <div 
                    className="mb-4 md:w-1/2 w-2/2"
              >
                    <input  
                          defaultValue={advertState.getFirstname()}
                          className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                          type="text" name="firstname" id="firstname" placeholder="Enter firstname" 
                          onChange={(e: any) => 
                          {
                              let value: string = e.target.value
                              setFirstname(value)
                              setFirstnameMessage("")
                              advertState.setFirstname(value)
                          }}
                          onBlur={(e: any) => 
                          {
                              let value: string = e.target.value
                              if(value === "" || value === undefined || value === null)
                              {
                                  setFirstnameMessage(FIRST_NAME_MESSAGE)
                              }
                          }}
                    />
                { firstnameMessage && <Message msg={firstnameMessage} status={errMsgStyle} /> }
              </div>
              <div 
                    className="mb-4 md:w-1/2 w-2/2"
              >
                    <input  
                          defaultValue={advertState.getSurname()}
                          className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                          type="text" name="surname" id="surname" placeholder="Enter Surname"  
                          onChange={(e: any) => 
                          {
                              let value: string = e.target.value
                              setSurname(value)
                              setSurnameMessage("")
                              advertState.setSurname(value)
                          }}
                          onBlur={(e: any) => 
                          {
                              let value: string = e.target.value
                              if(value === "" || value === undefined || value === null)
                              {
                                  setSurnameMessage(SURNAME_MESSAGE)
                              }
                          }}
                    />
                { surnameMessage && <Message msg={surnameMessage} status={errMsgStyle} /> }
              </div>
        </div>
        <div  
              className='w-full d-flex md:flex gap-10 md:mb-3'
        >                                          
              <div 
                    className="mb-4 md:w-full"
              >
                    <input  
                          defaultValue={advertState.getEmail()}
                          className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                          type="email" name="email" id="email" placeholder="Enter Email" 
                          onChange={(e: any) => 
                          {
                              let value: string = e.target.value
                              setEmail(value)
                              setEmailMessage("")
                              advertState.setEmail(value)
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
                            defaultValue={advertState.getPhone()} 
                            className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                            type="text" name="phone" id="phone" 
                            onChange={(e: any) => 
                            {
                                let value: string = e.target.value
                                setPhone(value)
                                setPhoneMessage("")
                                advertState.setPhone(value)
                            }}
                            onBlur={(e: any) => 
                            {
                                let value: string = e.target.value
                                if(value === "" || value === undefined || value === null)
                                {
                                  setPhoneMessage(PHONE_NUMBER_MESSAGE)
                                }
                            }}
                    />
                { phoneMessage && <Message msg={phoneMessage} status={errMsgStyle} /> }
              </div>
        </div>
        <div  
              className='w-full d-flex md:flex gap-10 md:mb-3'
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
                              advertState.setPassword(value)
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
            className="mb-2 -mt-6"
        >
          { matchError && <Message msg={matchError} status={errMsgStyle} /> }
        </div>
        
        {/* { (errorMessage) && <Message msg={errorMessage} status={errMsgStyle} /> } */}

        <div  
              className='w-full flex justify-between items-center md:flex gap-10 md:mb-3 mt-20 md:mt-14 px-5'
        >   
              <HiArrowSmLeft 
                      className='w-11 h-11 bg-green-100 cursor-pointer rounded-full text-black hover:text-green-600 p-1'
                      onClick={() => 
                      { 
                        advertState.setMemberAgreement(0)
                        onClick(0)
                      }} 
              />     
              <div 
                  className='text-md hover:text-blue-300 font-bold text-md'
              >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke-width="1.5" stroke="" 
                       className="w-8 h-8 mt-3 hover:border-2 hover:border-green-400 cursor-pointer"
                       onClick={() => {
                          router.push('/')
                       }}
                  >
                     <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
              </div>
              <button 
                    className="block w-fit bg-green-500 hover:bg-green-800 border-shadow text-white font-bold p-4 rounded-lg ring-2 ring-white ring-inset"
                    onClick={() => 
                    {
                        Detail()
                    }}
              >
                   { loading ? <BeatLoader size={10} color="white" className="" /> : "Next"}
              </button>
        </div>
    </div>
  )
}
