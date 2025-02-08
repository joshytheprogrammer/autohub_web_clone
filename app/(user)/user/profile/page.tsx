"use client"

import delay from "delay"
import { useState, useEffect } from "react"
import Message from "../../../../components/shared/Message"
import { UseStore } from "../../../../state/store"
import { BeatLoader } from "react-spinners"
import { UserDetail, UserProfile } from "../../../api/auth/profile"
import { useQuery } from "@tanstack/react-query"


export default function Profile() 
{
      const profile = UseStore((state) => state)
      const token: string = profile.getUserToken()
      const usertype: string = profile.getUType()
      
      let url: string = ''
      url = `${usertype}/profile`
      const { data, isLoading } = useQuery({ queryKey: [`user-profile-${url}`, url], queryFn: () => UserDetail(url, token) })

      const COMPANY_NAME_MESSAGE = 'Enter Company Name'
      const COMPANY_ADDRESS_MESSAGE = 'Enter Company Address'
      const RC_NUMBER_MESSAGE = 'Enter RC Number'
      const FIRST_NAME_MESSAGE = 'Enter Firstname'
      const SURNAME_MESSAGE = 'Enter Surname'
    //   const MIDDLENAME_MESSAGE = 'Enter Middlename'
      const EMAIL_MESSAGE = 'Enter Email'
      const PHONE_NUMBER_MESSAGE = 'Enter Phone Number'
      // const PASSWORD_MESSAGE = 'Enter Password'
      // const CONFIRM_PASSWORD_MESSAGE = 'Enter Confirm Password'  
      // const ERROR_MESSAGE = 'Ensure all compulsory fields are attended to'
    
      const [loading, setLoading] = useState<boolean>(false)
    
      const [companyName, setCompanyName] = useState<string>('')
      const [companyNameMessage, setCompanyNameMessage] = useState<string>("")
    
      const [companyAddress, setCompanyAddress] = useState<string>('')
      const [companyAddressMessage, setCompanyAddressMessage] = useState<string>("")
    
      const [rcNumber, setRcNumber] = useState<string>('')
      const [rcNumberMessage, setRcNumberMessage] = useState<string>("")
    
      const [firstname, setFirstname] = useState<string>('')
      const [firstnameMessage, setFirstnameMessage] = useState<string>("")
    
      const [surname, setSurname] = useState<string>('')
      const [surnameMessage, setSurnameMessage] = useState<string>("")
    
      const [middlename, setMiddlename] = useState<string>(']')
      const [middlenameMessage, setMiddlenameMessage] = useState<string>("")
    
      const [email, setEmail] = useState<string>('')
      const [emailMessage, setEmailMessage] = useState<string>("")
    
      const [phone, setPhone] = useState<string>('')
      const [phoneMessage, setPhoneMessage] = useState<string>("")
     
      const [errMsgStyle, setErrMsgStyle] = useState<string>('')
      const [errorMessage, setErrorMessage] = useState<string>("")

      const [successStyle, setSuccessStyle] = useState<string>('')
      const [successMsg, setSuccessMsg] = useState<string>('')

      const [refresh, setRefresh] = useState<boolean>(false)

    
      useEffect(() => 
      {
         setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
         setSuccessStyle('bg-blue-600 p-3 text-white mb-3 font-bold rounded-md')  
         setErrorMessage("")
      }, []) 

      useEffect(() => 
      {
            
      }, [email]) 

      useEffect(() => 
      {
            setRefresh(false)
      }, [firstname, surname, middlename, email, phone, errorMessage, refresh, companyName, companyAddress, rcNumber, middlenameMessage])

      const UpdateProfile = async (type: string) => 
      {
            setLoading(true)
            await delay(2000)
            
            let user: Member | Dealer
            if(type === 'dealer')
            {
               user = {
                    company_name: (companyAddress === "") ? data?.data?.dealers?.company_name : companyAddress,
                    company_address: (companyAddress === "") ? data?.data?.dealers?.company_address : companyAddress,
                    rc_number: (rcNumber === "") ? data?.data?.dealers?.rc_number : rcNumber,
                    firstname: (firstname === "") ? data?.data?.firstname : firstname,
                    surname: (surname === "") ? data?.data?.surname : surname,
                    middlename: (middlename === "") ? data?.data?.midddlename : middlename,
                    phone: (phone === "") ? data?.data?.phone : phone,
                    email: (email === "") ? data?.data?.email : email,
                    url: 'dealer/update-profile'
                  }
            } else {
                  user = 
                  {
                        firstname: (firstname === "") ? data?.data?.firstname : firstname,
                        surname: (surname === "") ? data?.data?.surname : surname,
                        middlename: (middlename === "") ? data?.data?.midddlename : middlename,
                        phone: (phone === "") ? data?.data?.phone : phone,
                        email: (email === "") ? data?.data?.email : email,
                        url: 'member/update-profile'
                   }                        
            }
            // alert(email)
            // setLoading(false)
            // return
            const updateProfile = UserProfile(user, token)
            updateProfile.then((response) => 
            {
                  if(response?.status === 200)
                  {
                     setLoading(false)
                     setSuccessMsg(response?.message)
                     setTimeout(() => 
                     {
                        setSuccessMsg("")
                     }, 5000)
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
            })
      }

      return (
            <div 
               className='md:col-span-9 col-span-12 bg-green-400 d-flex bg-green-50 border-shadow drop-shadow-lg md:block h-[fit] px-3 md:px-10 py-5 mt-3 rounded-2xl -mb-24 md:mb-0'
            > 
                  {
                        isLoading &&  <div 
                                          className="flex md:d-flex xl:flex-row h-[500px] justify-center items-center"
                                    >
                                          { isLoading && <BeatLoader className='w-20 h-20' color="black" /> }
                                    </div>
                  }
                  { !isLoading && <>
                        <h1 
                              className='font-bold uppercase mb-5 mx-3 md:mx-0 -mb-10 md:-mb-0'
                        >
                              Profile
                        </h1>      
                        <div  
                              className='w-full d-flex gap-10 md:mb-3 pt-4 mb-3 mt-10 md:mt-0'
                        > 
                              { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                              { successMsg && <Message msg={successMsg} status={successStyle} />  }
                        </div>
                        <div 
                              className="w-12/12 md:pt-10 md:pb-5 d-flex items-center justify-center hover:text-white mb-7 md:-mt-10 md:mb-0"
                        >
                        {
                              !isLoading && (data?.plus === 'dealer') && <>
                                    <div  
                                          className='w-full d-flex md:flex md:mb-3 px-2 md:px-0'
                                    >                                          
                                          <div 
                                                className="w-full"
                                                      >
                                                            <label className="font-semibold text-sm text-black">Company Name</label>
                                                            <input 
                                                                        defaultValue={data?.data?.dealers?.company_name}
                                                                        className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                                        type="text" name="companyName" id="companyName" placeholder="Enter Company Name" 
                                                                        onChange={(e: any) => 
                                                                        {
                                                                              let value: string = e.target.value
                                                                              setCompanyName(value)
                                                                              setCompanyNameMessage("")
                                                                              profile.setCompanyName(value)
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
                                                            { companyNameMessage && <Message msg={companyNameMessage} status={'text-red-600 -mt-1 font-bold rounded-md'} /> }
                                                      </div>
                                    </div>
                                    <div  
                                                      className='w-full d-flex md:flex md:mb-3 px-2 md:px-0'
                                                >                                          
                                                      <div 
                                                            className="w-full"
                                                      >
                                                            <label className="font-semibold text-sm text-black">Company Address</label>
                                                            <textarea  
                                                                        defaultValue={data?.data?.dealers?.company_address}
                                                                        className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                                        placeholder="Enter Company Address." rows={2}                              
                                                                        onChange={(e: any) => 
                                                                        {
                                                                              let value: string = e.target.value
                                                                              setCompanyAddress(value)
                                                                              setCompanyAddressMessage("")
                                                                              profile.setCompanyAddress(value)
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
                                                            { companyAddressMessage && <Message msg={companyAddressMessage} status={'text-red-600 -mt-1 font-bold rounded-md'} /> }
                                                      </div>
                                    </div>
                                    <div 
                                                      className='w-full d-flex md:flex md:mb-3 px-2 md:px-0 gap-5'
                                                >                                          
                                                      <div 
                                                            className="w-full mb-3 md:mb-0"
                                                      >
                                                            <label className="font-semibold text-sm text-black">RC Number</label>
                                                            <input 
                                                                  defaultValue={data?.data?.dealers?.company_address}
                                                                  inputMode="numeric"
                                                                  pattern="[0-9.]+"
                                                                  id="rcNumber" name="rcNumber" placeholder="Enter RC Number"
                                                                  className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"  
                                                                  onChange={(e: any) => 
                                                                  {
                                                                        let value: string = e.target.value
                                                                        setRcNumber(value)
                                                                        setRcNumberMessage("")
                                                                        profile.setRCNumber(value)
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
                                                            { rcNumberMessage && <Message msg={rcNumberMessage} status={'text-red-600 -mt-1 font-bold rounded-md'} /> }
                                                      </div>
                                    </div>
                              </>
                        }
                              <div 
                                                className='w-full d-flex md:flex md:mb-3 px-2 md:px-0 gap-5'
                                          >
                                    
                              <div 
                                                      className="w-full mb-3 md:mb-0"
                                                >
                                                      <label className="font-semibold text-sm text-black">Firstname</label>
                                                      <input  
                                                            defaultValue={data?.data?.firstname}
                                                            className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                            type="text" name="firstname" id="firstname" placeholder="Enter firstname" 
                                                            onChange={(e: any) => 
                                                            {
                                                                  let value: string = e.target.value
                                                                  setFirstname(value)
                                                                  setFirstnameMessage("")
                                                                  profile.setFirstname(value)
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
                                                { firstnameMessage && <Message msg={firstnameMessage} status={'text-red-600 -mt-1 font-bold rounded-md'} /> }
                                                </div>
                              </div>
                              <div 
                                                className='w-full d-flex md:flex md:mb-3 px-2 md:px-0 mb-5 gap-5'
                                          >          
                                                <div 
                                                      className="md:w-1/2 w-2/2 mb-3 md:mb-0"
                                                >
                                                      <label className="font-semibold text-sm text-black">Middlename</label>
                                                      <input  
                                                            defaultValue={data?.data?.middlename}
                                                            className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                            type="text" name="middlename" id="middlename" placeholder="Enter Middlename (Optional)" 
                                                            onChange={(e: any) => 
                                                            {
                                                                  let value: string = e.target.value
                                                                  setMiddlename(value)
                                                                  setMiddlenameMessage("")
                                                                  profile.setMiddlename(value)
                                                            }}
                                                      />
                                                </div> 
                                                <div 
                                                      className="md:w-1/2 w-2/2 mb-3 md:mb-0"
                                                >
                                                      <label className="font-semibold text-sm text-black">Surname</label>
                                                      <input  
                                                            defaultValue={data?.data?.surname}
                                                            className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                            type="text" name="surname" id="surname" placeholder="Enter Surname"  
                                                            onChange={(e: any) => 
                                                            {
                                                                  let value: string = e.target.value
                                                                  setSurname(value)
                                                                  setSurnameMessage("")
                                                                  profile.setSurname(value)
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
                                                { surnameMessage && <Message msg={surnameMessage} status={'text-red-600 -mt-1 font-bold rounded-md'} /> }
                                                </div>
                              </div>
                              <div  
                                                className='w-full d-flex md:flex md:mb-3 px-2 md:px-0 gap-5'
                                          >                                          
                                                <div 
                                                      className="md:w-1/2 w-2/2 mb-3 md:mb-0"
                                                >
                                                      <label className="font-semibold text-sm text-black">Email</label>
                                                      <input  
                                                            defaultValue={data?.data?.email}
                                                            className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                            type="email" name="email" id="email" placeholder="Enter Email" 
                                                            onChange={(e: any) => 
                                                            {
                                                                  let value: string = e.target.value
                                                                  setEmail(value)
                                                                  setEmailMessage("")
                                                                  profile.setEmail(value)
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
                                                { emailMessage && <Message msg={emailMessage} status={'text-red-600 -mt-1 font-bold rounded-md'} /> }
                                                </div>
                                                <div 
                                                      className="md:w-1/2 w-2/2 mb-3 md:mb-0"
                                                >
                                                      <label className="font-semibold text-sm text-black">Phone Number</label>
                                                      <input  
                                                            defaultValue={data?.data?.phone}
                                                            className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                            type="text" name="phone" id="phone" 
                                                            onChange={(e: any) => 
                                                            {
                                                                  let value: string = e.target.value
                                                                  setPhone(value)
                                                                  setPhoneMessage("")
                                                                  profile.setPhone(value)
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
                                                { phoneMessage && <Message msg={phoneMessage} status={'text-red-600 -mt-1 font-bold rounded-md'} /> }
                                                </div>
                              </div>
                        </div>     
                        <div  
                              className='w-full d-flex gap-10 md:mb-3 pt-4 mb-3 -mt-10 md:-mt-10'
                        > 
                              { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                              { successMsg && <Message msg={successMsg} status={successStyle} />  }
                        </div>
                        <div 
                        className=" w-fit px-2 md:px-0"
                        >   
                        <button
                              onClick={() => {
                                    UpdateProfile(data?.plus)
                              }} 
                              className="block w-full bg-green-600 hover:bg-green-800 border-shadow text-white font-bold py-4 px-10 rounded-lg"
                        >
                              { loading ? <BeatLoader size={10} color="white" className="" /> : "Update Profile"}
                        </button>
                        </div>
                  </>
                  }
                  <div className="h-[60px]"></div>
            </div>
      )
}
