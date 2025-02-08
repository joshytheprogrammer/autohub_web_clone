"use client"

import delay from "delay";
import { UseStore } from "../../../../../state/store"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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
  
  const COMPANY_NAME_MESSAGE = 'Enter Company Name'
  const COMPANY_ADDRESS_MESSAGE = 'Enter Company Address'
  const RC_NUMBER_MESSAGE = 'Enter RC Number'
  const FIRST_NAME_MESSAGE = 'Enter Firstname'
  const SURNAME_MESSAGE = 'Enter Surname'
//   const MIDDLENAME_MESSAGE = 'Enter Middlename'
  const EMAIL_MESSAGE = 'Enter Email'
  const PHONE_NUMBER_MESSAGE = 'Enter Phone Number'
  const PASSWORD_MESSAGE = 'Enter Password'
  const CONFIRM_PASSWORD_MESSAGE = 'Enter Confirm Password'  
  const ERROR_MESSAGE = 'Ensure all compulsory fields are attended to'

  const [loading, setLoading] = useState<boolean>(false)

  const [companyName, setCompanyName] = useState<string>("")
  const [companyNameMessage, setCompanyNameMessage] = useState<string>("")

  const [companyAddress, setCompanyAddress] = useState<string>("")
  const [companyAddressMessage, setCompanyAddressMessage] = useState<string>("")

  const [rcNumber, setRcNumber] = useState<string>("")
  const [rcNumberMessage, setRcNumberMessage] = useState<string>("")

  const [firstname, setFirstname] = useState<string>("")
  const [firstnameMessage, setFirstnameMessage] = useState<string>("")

  const [surname, setSurname] = useState<string>("")
  const [surnameMessage, setSurnameMessage] = useState<string>("")

  const [middlename, setMiddlename] = useState<string>("")
  const [middlenameMessage, setMiddlenameMessage] = useState<string>("")

  const [email, setEmail] = useState<string>("")
  const [emailMessage, setEmailMessage] = useState<string>("")

  const [phone, setPhone] = useState<string>("")
  const [phoneMessage, setPhoneMessage] = useState<string>("")

  const [password, setPassword] = useState<string>("")
  const [passwordType, setPasswordType] = useState<string>("password")
  const [confirmPasswordType, setConfirmPasswordType] = useState<string>("password")
  const [passwordMessage, setPasswordMessage] = useState<string>("")

  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState<string>("")
  const [matchError, setMatchError] = useState<string>("")
 
  const [errMsgStyle, setErrMsgStyle] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [refresh, setRefresh] = useState<boolean>(false)
  const [dom, setDom] = useState<boolean>(false)

  useEffect(() => 
  {
     setErrMsgStyle('text-sm text-white font-bold bg-red-600 rounded-lg py-2 -mt-1 px-2')
     setErrorMessage("")
     setDom(true)
  }, []) 

  useEffect(() => 
  {
      setRefresh(false)
  }, [firstname, surname, middlename, email, phone, errorMessage, refresh, companyName, companyAddress, rcNumber, middlenameMessage])

  const DealerDetail = async () => 
  {
      setLoading(true)
      await delay(2000)
      const checkFields: string = allFields()
      if(checkFields === 'valid')
      {
          advertState.setPassportFor("dealer")                      
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
  }

  const allFields = () =>
  {
      let validity: string = 'valid'      
      if(advertState.getCompanyName() === ""){ setCompanyNameMessage(COMPANY_NAME_MESSAGE); validity = 'invalid' }
      if(advertState.getCompanyAddress() === ""){ setCompanyAddressMessage(COMPANY_ADDRESS_MESSAGE); validity = 'invalid' }
      if(advertState.getRCNumber() === ""){ setRcNumberMessage(RC_NUMBER_MESSAGE); validity = 'invalid' }
      if(advertState.getFirstname() === ""){ setFirstnameMessage(FIRST_NAME_MESSAGE); validity = 'invalid' }
      if(advertState.getSurname() === ""){ setSurnameMessage(SURNAME_MESSAGE); validity = 'invalid' }
      // if(advertState.getMiddlename() === ""){ setMiddlenameMessage(MIDDLENAME_MESSAGE); validity = 'invalid' }
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
            className="w-full p-4 md:px-9 md:pt-10 md:pb-5 pb-14 d-flex items-center justify-center rounded-md md:rounded-xl bg-[#23913b] hover:text-white mb-20 md:mb-0 border-2 border-green-700"
      >
            <div  
                  className='w-full d-flex md:flex gap-10 md:mb-3'
            >                                          
                  <div 
                        className="mb-4 md:w-full"
                  >
                        <input 
                                    defaultValue={advertState.getCompanyName()}
                                    className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                    type="text" name="companyName" id="companyName" placeholder="Enter Company Name" 
                                    onChange={(e: any) => 
                                    {
                                          let value: string = e.target.value
                                          setCompanyName(value)
                                          setCompanyNameMessage("")
                                          advertState.setCompanyName(value)
                                    }}
                                    onBlur={(e: any) => 
                                    {
                                          let value: string = e.target.value
                                          if(value === "" || value === undefined || value === null)
                                          {
                                                setCompanyNameMessage(COMPANY_NAME_MESSAGE)
                                          }
                                    }}
                        />
                        { companyNameMessage && <Message msg={companyNameMessage} status={errMsgStyle} /> }
                  </div>
            </div>
            <div  
                  className='w-full d-flex md:flex gap-10 md:mb-3'
            >                                          
                  <div 
                        className="mb-4 md:w-full"
                  >
                        <textarea  
                                    defaultValue={advertState.getCompanyAddress()}
                                    className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                    placeholder="Enter Company Address." rows={2}                              
                                    onChange={(e: any) => 
                                    {
                                          let value: string = e.target.value
                                          setCompanyAddress(value)
                                          setCompanyAddressMessage("")
                                          advertState.setCompanyAddress(value)
                                    }}
                                    onBlur={(e: any) => 
                                    {
                                          let value: string = e.target.value
                                          if(value === "" || value === undefined || value === null)
                                          {
                                          setCompanyAddressMessage(COMPANY_ADDRESS_MESSAGE)
                                          }
                                    }}
                              >
                        </textarea>
                        { companyAddressMessage && <Message msg={companyAddressMessage} status={errMsgStyle} /> }
                  </div>
            </div>
            <div 
                  className='w-full d-flex md:flex gap-10 md:mb-3'
            >                                          
                  <div 
                        className="mb-4 md:w-1/2 w-2/2"
                  >
                        <input 
                              defaultValue={advertState.getRCNumber()}
                              inputMode="numeric"
                              pattern="[0-9.]+"
                              id="rcNumber" name="rcNumber" placeholder="Enter RC Number"
                              className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"  
                              onChange={(e: any) => 
                              {
                                    let value: string = e.target.value
                                    setRcNumber(value)
                                    setRcNumberMessage("")
                                    advertState.setRCNumber(value)
                              }}
                              onBlur={(e: any) => 
                              {
                                    let value: string = e.target.value
                                    if(value === "" || value === undefined || value === null)
                                    {
                                          setRcNumberMessage(RC_NUMBER_MESSAGE)
                                    }
                              }}
                        />
                        { rcNumberMessage && <Message msg={rcNumberMessage} status={errMsgStyle} /> }
                  </div>
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
            </div>
            <div 
                  className='w-full d-flex md:flex gap-10 md:mb-3'
            >           
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
                  <div 
                        className="mb-4 md:w-1/2 w-2/2"
                  >
                        <input  
                              defaultValue={advertState.getMiddlename()}
                              className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                              type="text" name="middlename" id="middlename" placeholder="Enter Middlename (Optional)" 
                              onChange={(e: any) => 
                              {
                                    let value: string = e.target.value
                                    setMiddlename(value)
                                    setMiddlenameMessage("")
                                    advertState.setMiddlename(value)
                              }}
                        />
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
                              placeholder="Enter Phone Number"
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
                        className="mb-4 md:w-full relative"
                  >
                        <input  
                              className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                              type={passwordType} name="password" id="password" placeholder="Enter Password" 
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
                        <div 
                              className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
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
                                          <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                          <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                          <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                                          </svg>
                                    </>
                              }
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
                                          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                          <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
                                          </svg>
                                    </>
                              }
                              
                        </div>
                        { passwordMessage && <Message msg={passwordMessage} status={errMsgStyle} /> }
                  </div>
                  <div 
                        className="mb-4 md:w-full relative"
                  >
                        <input  
                              className="w-full border font-bolder rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border mb-2 border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                              type={confirmPasswordType} name="cPassword" id="cPassword" placeholder="Enter Passowrd Again" 
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
                        <div 
                              className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                              {
                                    confirmPasswordType === "text" && <>

                                          <svg 
                                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" 
                                          className="h-6 w-6 cursor-pointer"
                                          onClick={
                                                () => {
                                                   setConfirmPasswordType("password")
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
                                    confirmPasswordType === "password" && <>
                                          <svg 
                                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" 
                                          className="h-6 w-6 cursor-pointer"
                                          onClick={
                                                () => {
                                                   setConfirmPasswordType("text")
                                                }
                                          }
                                          >
                                          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                          <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
                                          </svg>
                                    </>
                              }
                              
                        </div>
                        { confirmPasswordMessage && <Message msg={confirmPasswordMessage} status={errMsgStyle} /> }
                  </div>
            </div>      
            
            <div 
                  className="mb-2 -mt-6"
            >
                  { matchError && <Message msg={matchError} status={errMsgStyle} /> }
            </div>    
            <div className="md:hidden h-[20px]"></div>
            <div  
                  className='w-full flex justify-between md:flex gap-10 md:mb-3 mt-10 px-5 pb-4'
            >   
                        <HiArrowSmLeft 
                              className='w-9 h-9 md:w-11 md:h-11 bg-green-100 cursor-pointer rounded-full mt-3 text-black hover:text-green-600 p-1'
                              onClick={() => 
                              { 
                                    advertState.setDealerAgreement(0)
                                    onClick(0)
                              }} 
                        /> 
                        <button 
                              className="block w-fit bg-green-500 hover:bg-green-800 border-shadow text-white font-bold p-4 rounded-lg ring-2 ring-white ring-inset"
                              onClick={() => 
                              {
                                    DealerDetail()
                              }}
                        >
                        { loading ? <BeatLoader size={10} color="white" className="" /> : "Next"}
                        </button>
                  </div>
            </div>
   
  )
}
