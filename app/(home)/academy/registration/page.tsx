"use client"

import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import Image from "next/image"
import swapCar from '../../../../public/swap-car.png'
import Link from "next/link"
import { UserInfo } from "../../../api/home/home"
import { UseStore } from "../../../../state/store"
import Message from "../../../../components/shared/Message"
import { ExistingUserStudent, NewStudent } from "../../../api/admin/academic/student"
import { Logout } from "../../../../components/Logout"
import delay from "delay"
import { profileDB } from "../../../model/Product"
import { Router } from "lucide-react"
import router from "next/router"


export default function MACEOSRegistration() 
{  
  const profile = UseStore((state) => state)
  const token: string = profile.getUserToken()
  
  const { data, isLoading } = useQuery({ queryKey: [`user-info`], queryFn: () => UserInfo(token)})
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  
  const FIRST_NAME_MESSAGE = "Enter Firstname"
  const [firstname, setFirstName] = useState<string>("")
  // const [firstnameMessage, setFirstNameMessage] = useState<string>("")
  const [firstnameError, setFirstNameError] = useState<string>("")
  
  const SURNAME_MESSAGE =  "Enter Surname"
  const [surname, setSurname] = useState<string>("")
  // const [surnameMessage, setSurnameMessage] = useState<string>("")
  const [surnameError, setSurnameError] = useState<string>("")
  
  const MIDDLE_NAME_MESSAGE = "Enter Middlename"
  const [middlename, setMiddlename] = useState<string>("")
  // const [middleNameMessage, setMiddleNameMessage] = useState<string>("")
  const [middleNameError, setMiddleNameError] = useState<string>("")
  
  const EMAIL_MESSAGE = "Enter Email"
  const [email, setEmail] = useState<string>("")  
  // const [emailMessage, setEmailMessage] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")

  const PHONE_NUMBER_MESSAGE = "Enter Phone"
  const [phone, setPhone] = useState<string>("")  
  // const [phoneMessage, setPhoneMessage] = useState<string>("")
  const [phoneError, setPhoneError] = useState<string>("")

  const COMPANY_NAME_MESSAGE = "Enter Company Name"
  const [companyName, setCompanyName] = useState<string>("")  
  // const [companyMessage, setCompanyMessage] = useState<string>("")
  const [companyNameError, setCompanyError] = useState<string>("")

  const HOME_ADDRESS_MESSAGE = "Enter Home or Office Address"
  const [homeAddress, setHomeAddress] = useState<string>("") 
  // const [homeAddressMessage, setHomeAddressMessage] = useState<string>("") 
  const [homeAddressError, setHomeAddressError] = useState<string>("")
  
  const SPECIALIZATION_MESSAGE = "What is your specialization (e.g Electrician, Welder)"
  const [specialization, setSpecialization] = useState<string>("")
  // const [specializationMessage, setSpecializationMessage] = useState<string>("")
  const [specializationError, setSpecializationError] = useState<string>("")

  const YEARS_IN_MESSAGE = "Tell us your years of experience"
  const [yearsIn, setYearsIn] = useState<string | number>("")    
  // const [yearsInMessage, setYearsInMessage] = useState<string>("")
  const [yearsInError, setYearsInError] = useState<string>("")

  const REGION_MESSAGE = "What region are you from"
  const [region, setRegion] = useState<string>("")  
  // const [regionMessage, setRegionMessage] = useState<string>("")  
  const [regionError, setRegionError] = useState<string>("")

  const CITY_MESSAGE = "Enter your city"
  const [city, setCity] = useState<string>("")  
  // const [citMessage, setCityMessage] = useState<string>("")
  const [cityError, setCityError] = useState<string>("")
  
  const DOB_MESSAGE = "Enter Date of Birth"
  const [dob, setDob] = useState<string | Date>("")  
  // const [dobMessage, setDobMessage] = useState<string>("")
  const [dobError, setDobError] = useState<string>("")

  const GENDER_MESSAGE = "What gender are you"
  const [gender, setGender] = useState<number | string>("")  
  // const [genderMessage, setGenderMessage] = useState<string>("")
  const [genderError, setGenderError] = useState<string>("")

  const QUALIFICATION_MESSAGE = "Qhat is your qualification"
  const [qualification, setQualification] = useState<string>("")  
  // const [qualificationMessage, setQualificationMessage] = useState<string>("")
  const [qualificationError, setQualificationError] = useState<string>("")

  const PASSWORD_MESSAGE = "Enter password"
  const [password, setPassword] = useState<string>("")  
  // const [passwordMessage, setPasswordMessage] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")

  const CONFIRM_PASSWORD_MESSAGE = "Enter your password again"
  const PASSWORD_MATCH = "Password do not match"
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [passwordType, setPasswordType] = useState<string>("password")
  const [confirmPasswordType, setConfirmPasswordType] = useState<string>("password")
  // const [confirmPasswordMessage, setConfirmPasswordMessage] = useState<string>("")
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("")
  
  const AGREE = "kindly agree to continue"
  const [agree, setAgree] = useState<boolean>(false)
  const [agreeError, setAgreeError] = useState<string>("")

  // const [passwordIsVisible, setPasswordIsVisible] = useState(false);  
  const [error, setError] = useState<string>("");
  const [errMsgStyle, setErrMsgStyle] = useState<string>('')
  const [success, setSuccess] = useState<string>("");
  const [successMsgStyle, setSuccessMsgStyle] = useState<string>('')
  const [openLoggedOut, setOpenLoggedOut] = useState<boolean>(false) 
  
  useEffect(() => 
  {
     setErrMsgStyle('text-md text-red-600 font-bold')
     setSuccessMsgStyle('bg-blue-600 p-3 text-white mb-3 font-bold rounded-md')
     setError("")
  }, [])  


  useEffect(() => 
  {
  }, [firstname, middlename, surname, phone, email, companyName, homeAddress, specialization, yearsIn, region, city, dob, gender, qualification, password, confirmPassword, agree])


  const register = async () => 
  {
     setIsSubmitting(true)
     await delay(2000)
    //  setIsSubmitting(false)
    //  return
     const checkFields: string = allFields()
     if(checkFields === 'valid')
     {
        console.log(data)
        if(!token)
        {
            setIsSubmitting(true)
            const data = { firstname, middlename, surname, phone, email, companyName,  company_address: homeAddress, specialization, yearsIn, region, city, dob, gender, qualification, password }
            const newStudent = NewStudent(data, token)
            newStudent.then((response: any) => 
            {
                if(response?.status === 200)
                {
                  profile.setFName(response?.data?.firstname)
                  profile.setSName(response?.data?.surname)
                  profile.setPassport(response?.data?.passport)
                  profile.setUType(response?.data?.user_type)
                  profile.setUserRoles(response?.additions)
                  profile.setSideType(response?.additions[0])
                  profile.setUserToken(response?.plus)
                  profileDB.add(response?.data)
                   setSuccess(response?.message)
                   setTimeout(() => 
                   {
                      setIsSubmitting(false)                      
                      setSuccess("")
                      profile.setSideType('student')
                      router.push('/class-door')
                   }, 2000)
                } else {
                    setError(response?.message)
                    setTimeout(() => 
                    {
                      setIsSubmitting(false)
                      setError("")
                    }, 5000)
                }
            }).catch(() => {

            })
       } else {

          const data = { middlename: middlename, companyName, company_address: homeAddress, specialization, yearsIn, region, city, dob, gender, qualification, password }
          const existingStu = ExistingUserStudent(data, token)
          existingStu.then((response: any) => 
          {
              if(response?.status === 200)
              {
                profile.setFName(response?.data?.firstname)
                profile.setSName(response?.data?.surname)
                profile.setPassport(response?.data?.passport)
                profile.setUType(response?.data?.user_type)
                profile.setUserRoles(response?.additions)
                profile.setSideType(response?.additions[0])
                profile.setUserToken(response?.plus)
                profileDB.add(response?.data)
                 setSuccess(response?.message)
                 setTimeout(() => 
                 {
                    setIsSubmitting(false)                      
                    setSuccess("")
                    profile.setSideType('student')
                    router.push('/class-door')
                 }, 2000)              
              } else {
                  setError(response?.message)
                  setTimeout(() => 
                  {
                    setIsSubmitting(false)
                    setError("")
                  }, 10000)
              }
          }).catch(() => {

          })
       }
        setIsSubmitting(false)
        return false
     } else {      
        setIsSubmitting(false)
        // setError("Attend to all field")
        setTimeout(() => 
        {
            setError("")
        }, 10000)
        return false
     }
  }

  const allFields = () => 
  {
     let validity: string = 'valid'
     if(!token)
     {
        if(firstname === ""){ setFirstNameError(FIRST_NAME_MESSAGE); validity = 'invalid' }
        if(middlename === ""){ setMiddleNameError(MIDDLE_NAME_MESSAGE); validity = 'invalid' }
        if(surname === ""){ setSurnameError(SURNAME_MESSAGE); validity = 'invalid' }
        if(phone === ""){ setPhoneError(PHONE_NUMBER_MESSAGE); validity = 'invalid' }
        if(email === ""){ setEmailError(EMAIL_MESSAGE); validity = 'invalid' }
        if(password === ""){ setPasswordError(PASSWORD_MESSAGE); validity = 'invalid' }
        if(confirmPassword === ""){ setConfirmPasswordError(CONFIRM_PASSWORD_MESSAGE); validity = 'invalid' }
        if(password !== confirmPassword)
        {
            setPasswordError(PASSWORD_MATCH); validity = 'invalid'
            setConfirmPasswordError(PASSWORD_MATCH); validity = 'invalid'
        }
     }     
     if(companyName === ""){ setCompanyError(COMPANY_NAME_MESSAGE); validity = 'invalid' }
     if(homeAddress === ""){ setHomeAddressError(HOME_ADDRESS_MESSAGE); validity = 'invalid' }
     if(specialization === ""){ setSpecializationError(SPECIALIZATION_MESSAGE); validity = 'invalid' }
     if(yearsIn === ""){ setYearsInError(SPECIALIZATION_MESSAGE); validity = 'invalid' }
     if(region === ""){ setRegionError(SPECIALIZATION_MESSAGE); validity = 'invalid' }
     if(city === ""){ setCityError(CITY_MESSAGE); validity = 'invalid' }
     if(dob === ""){ setDobError(CITY_MESSAGE); validity = 'invalid' }
     if(gender === -1){ setGenderError(GENDER_MESSAGE); validity = 'invalid' }
     if(qualification  === ""){ setQualificationError(QUALIFICATION_MESSAGE); validity = 'invalid' }
     if(agree === false){ setAgreeError(AGREE); validity = 'invalid' } else { setAgreeError("") }
     return validity
     
  }

  return (
      <>
          {
              isLoading && <div 
                                className="col-span-12 h-[700px] flex justify-center items-center" 
                                style={{ marginTop: '30px', paddingTop: '20px' }}
                           >
                  <BeatLoader color="#1c9236" />
              </div>
          }
          
          <div 
             className='container md:grid md:grid-cols-12 justify-center mt-2 md:mt-7 mb-4 mx-auto'
          > 
            {
              !isLoading && data && 
               <>
                 <div 
                    className="col-span-9 rounded shadow-xl item-center p-6 rounded shadow-xl"
                  >
                    <div 
                      className="w-full flex p-1 text-sm justify-left items-center md:mx-7"
                    >
                      <Link 
                          className="font-bold flex justify-center items-center" href={'/academy'}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 font-bold">
                            <path fill-rule="evenodd" d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clip-rule="evenodd" />
                            <path fill-rule="evenodd" d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clip-rule="evenodd" />
                        </svg>
                        &nbsp;Back
                      </Link>
                    </div>
                    <div 
                      className="items-center"
                    >
                        <h1 
                          className="font-bold uppercase mb-5 mr-10 w-full text-blue-900 md:mx-7 mx-2" 
                          style={{fontSize: "30px"}}
                        >
                          
                        </h1>
                        <h4 
                          className="w-full font-bold text-green-700 mt-3 md:mx-7 mx-2" 
                          style={{fontSize: "16px"}}
                        >
                          Application Form - Start Registration
                        </h4>

                        <div 
                          className="w-full mt-5"
                        >                         
                          <div 
                            className="flex flex-wrap -m-2 mt-2 mb-2 md:mx-6"
                          >
                            { error && <Message msg={error} status={errMsgStyle} /> } 
                            { success && <Message msg={success} status={successMsgStyle} /> } 
                            <div 
                              className="p-2 md:w-1/2 w-full"
                            >
                              <span 
                                className="w-full font-bold text-sm"
                              >
                                Firstname
                              </span>
                              <input
                                defaultValue={data?.data?.firstname}  
                                name="firstname" placeholder="Enter Your Firstname" 
                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                onChange={(e: any) => 
                                  {
                                        let value: string = e.target.value
                                        setFirstName(value)
                                        setFirstNameError("")
                                        profile.setFirstname(value)
                                  }}
                                  onBlur={(e: any) => 
                                  {
                                        let value: string = e.target.value
                                        if(value === "" || value === undefined || value === null)
                                        {
                                              setFirstNameError(FIRST_NAME_MESSAGE)
                                        }
                                  }
                                }
                              />
                              { firstnameError && <Message msg={firstnameError} status={errMsgStyle} /> }
                            </div>
                            <div 
                              className="p-2 md:w-1/2 w-full"
                            >
                              <span 
                                className="w-full font-bold text-sm"
                              >
                                Surname
                              </span>
                              <input 
                                    type="text" id="surname" 
                                    defaultValue={data?.data?.surname}  
                                    name="surname" placeholder="Enter Your Lastname" 
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                    onChange={(e: any) => 
                                    {
                                          let value: string = e.target.value
                                          setSurname(value)
                                          setSurnameError("")
                                          profile.setSurname(value)
                                    }}
                                    onBlur={(e: any) => 
                                    {
                                          let value: string = e.target.value
                                          if(value === "" || value === undefined || value === null)
                                          {
                                                setSurnameError(SURNAME_MESSAGE)
                                          }
                                    }
                                  }
                              />
                              { surnameError && <Message msg={surnameError} status={errMsgStyle} /> }
                            </div>
                          </div>
                          
                          <div 
                            className="flex flex-wrap -m-2 mt-2 mb-1 md:mx-5"
                          >
                            <div 
                              className="p-2 md:w-1/2 w-full"
                            >
                              <span 
                                className="w-full font-bold text-sm"
                              >
                                Middlename
                              </span>
                              <input 
                                  type="text" id="middlename" 
                                  defaultValue={data?.data?.middlename} 
                                  name="middlename" 
                                  placeholder="Enter Your Middlename" 
                                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out" 
                                  onChange={(e: any) => 
                                    {
                                          let value: string = e.target.value
                                          setMiddlename(value)
                                          setMiddleNameError("")
                                          profile.setMiddlename(value)
                                    }}
                                    onBlur={(e: any) => 
                                    {
                                          let value: string = e.target.value
                                          if(value === "" || value === undefined || value === null)
                                          {
                                                setMiddleNameError(MIDDLE_NAME_MESSAGE)
                                          }
                                    }
                                  }
                              />
                              { middleNameError && <Message msg={middleNameError} status={errMsgStyle} /> }
                            </div>
                            <div 
                              className="p-2 md:w-1/2 w-full"
                            >
                              <span 
                                className="w-full font-bold text-sm"
                              >
                                Phone Number
                              </span>
                              <input 
                                type="text" id="phoneno" 
                                defaultValue={data?.data?.phone} 
                                name="phone" placeholder="Enter Your phone Number" 
                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out" 
                                onChange={(e: any) => 
                                  {
                                        let value: string = e.target.value
                                        setPhone(value)
                                        setPhoneError("")
                                        profile.setPhone(value)
                                  }}
                                  onBlur={(e: any) => 
                                  {
                                        let value: string = e.target.value
                                        if(value === "" || value === undefined || value === null)
                                        {
                                            setPhoneError(PHONE_NUMBER_MESSAGE)
                                        }
                                  }
                                }
                            />
                              { phoneError && <Message msg={phoneError} status={errMsgStyle} /> }
                            </div>
                          </div>

                          <div 
                            className="flex flex-wrap -m-2 mt-2 mb-1 md:mx-5"
                          >
                            <div 
                              className="p-2 md:w-1/2 w-full"
                            >
                              <span 
                                className="w-full font-bold text-sm"
                              >
                                Email
                              </span>
                              <input 
                                  disabled={(token) ? true : false }  
                                  type="email" id="email" defaultValue={data?.data?.email}  name="email" placeholder="Enter Your Email" 
                                  className={`${(token) ? 'bg-green-300' : ''} w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} 
                                  onChange={(e: any) => 
                                    {
                                          let value: string = e.target.value
                                          setEmail(value)
                                          setEmailError("")
                                          profile.setEmail(value)
                                    }}
                                    onBlur={(e: any) => 
                                    {
                                          let value: string = e.target.value
                                          if(value === "" || value === undefined || value === null)
                                          {
                                                setEmailError(EMAIL_MESSAGE)
                                          }
                                    }
                                  }
                              />   
                              { emailError && <Message msg={emailError} status={errMsgStyle} /> }                               
                              </div>
                              <div 
                                className="p-2 md:w-1/2 w-full"
                              >
                                  <span 
                                    className="w-full font-bold text-sm"
                                  >
                                    Company Name
                                  </span>
                                  <input
                                     type="text" id="companyName" defaultValue={''}  
                                     name="companyName" placeholder="Enter Your Company Name" 
                                     className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                     onChange={(e: any) => 
                                      {
                                            let value: string = e.target.value
                                            setCompanyName(value)
                                            setCompanyError("")
                                            profile.setCompanyName(value)
                                      }}
                                      onBlur={(e: any) => 
                                      {
                                            let value: string = e.target.value
                                            if(value === "" || value === undefined || value === null)
                                            {
                                               setCompanyError(COMPANY_NAME_MESSAGE)
                                            }
                                      }
                                    }
                                />
                              { companyNameError && <Message msg={companyNameError} status={errMsgStyle} /> }
                              </div>
                          </div>

                          <div 
                            className="flex flex-wrap -m-2 mt-2 mb-2 md:mx-5"
                          >
                            <div 
                              className="p-2 w-full"
                            >
                              <span 
                                className="w-full font-bold text-sm"
                              >
                                Home or Office Address
                              </span>                                                        
                              <textarea
                                defaultValue={''} 
                                className="shadow form-textarea block w-full border rounded w-full 
                                  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                rows={2} 
                                placeholder="Enter Description"
                                onChange={(e: any) => 
                                  {
                                        let value: string = e.target.value
                                        setHomeAddress(value)
                                        setHomeAddressError("")
                                        profile.setHomeAddress(value)
                                  }}
                                  onBlur={(e: any) => 
                                  {
                                        let value: string = e.target.value
                                        if(value === "" || value === undefined || value === null)
                                        {
                                          setHomeAddressError(HOME_ADDRESS_MESSAGE)
                                        }
                                  }
                                }
                             >
                             </textarea>
                             { homeAddressError && <Message msg={homeAddressError} status={errMsgStyle} /> }
                            </div>
                          </div>
                          <div 
                            className="flex flex-wrap -m-2 mt-2 mb-2 md:mx-5"
                          >
                            <div 
                              className="p-2 md:w-1/2 w-full"
                            >
                              <span 
                                className="w-full font-bold text-sm"
                              >
                                Specialization in Automobile
                              </span>
                              <input 
                                  type="text" id="specialization" defaultValue={''}  
                                  name="specialization" placeholder="Let us know your specialization" 
                                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                  onChange={(e: any) => 
                                    {
                                          let value: string = e.target.value
                                          setSpecialization(value)
                                          setSpecializationError("")
                                          profile.setSpecialization(value)
                                    }}
                                    onBlur={(e: any) => 
                                    {
                                          let value: string = e.target.value
                                          if(value === "" || value === undefined || value === null)
                                          {
                                             setSpecialization(SPECIALIZATION_MESSAGE)
                                          }
                                    }
                                  }
                              />
                              { specializationError && <Message msg={specializationError} status={errMsgStyle} /> }
                            </div>
                            <div 
                              className="p-2 md:w-1/2 w-full"
                            >
                              <span 
                                className="w-full font-bold text-sm"
                              >
                                Years in Automobile Business
                              </span>
                              <input 
                                  type="number" id="yearsIn" 
                                  defaultValue={''} name="yearsIn" 
                                  placeholder="Enter Your of Experience" 
                                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out" 
                                  onChange={(e: any) => 
                                    {
                                          let value: string = e.target.value
                                          setYearsIn(value)
                                          setYearsInError("")
                                          profile.setYearsIn(value)
                                    }}
                                    onBlur={(e: any) => 
                                    {
                                          let value: string = e.target.value
                                          if(value === "" || value === undefined || value === null)
                                          {
                                             setYearsInError(YEARS_IN_MESSAGE)
                                          }
                                    }
                                  }
                              />
                              { yearsInError && <Message msg={yearsInError} status={errMsgStyle} /> }
                            </div>
                          </div> 

                          <div 
                            className="flex flex-wrap -m-2 mt-2 mb-2 md:mx-5"
                          >
                            <div 
                              className="md:w-1/2 w-full relative px-2"
                            >
                              <span 
                                className="w-full font-bold text-sm"
                              >
                                State / Province / Region
                              </span>
                              <input 
                                  type="text" id="region" 
                                  defaultValue={''} 
                                  name="region"  placeholder="Enter Your State / Province / Region"
                                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out" 
                                  onChange={(e: any) => 
                                    {
                                          let value: string = e.target.value
                                          setRegion(value)
                                          setRegionError("")
                                          profile.setRegion(value)
                                    }}
                                    onBlur={(e: any) => 
                                    {
                                          let value: string = e.target.value
                                          if(value === "" || value === undefined || value === null)
                                          {
                                            setRegionError(REGION_MESSAGE)
                                          }
                                    }
                                  }
                              />
                              { regionError && <Message msg={regionError} status={errMsgStyle} /> }
                              </div>
                              <div 
                                className="p-2 md:w-1/2 w-full -mt-2"
                              >
                                <span 
                                  className="w-full font-bold text-sm"
                                >
                                  City
                                </span>
                                <input 
                                    type="text" id="city" defaultValue={''}  
                                    name="city" placeholder="Enter Your City" 
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                    onChange={(e: any) => 
                                      {
                                            let value: string = e.target.value
                                            setCity(value)
                                            setCityError("")
                                            profile.setCity(value)
                                      }}
                                      onBlur={(e: any) => 
                                      {
                                            let value: string = e.target.value
                                            if(value === "" || value === undefined || value === null)
                                            {
                                              setCityError(CITY_MESSAGE)
                                            }
                                      }
                                    }
                                />
                              { cityError && <Message msg={cityError} status={errMsgStyle} /> }
                              </div>
                            </div>

                            <div 
                              className="flex flex-wrap -m-2 mt-2 mb-2 md:mx-5"
                            >
                              <div 
                                className="p-2 md:w-1/2 w-full"
                              >
                                <span 
                                  className="w-full font-bold text-sm"
                                >
                                  Date of Birth
                                </span>
                                <input 
                                    type="date" id="birth" 
                                    defaultValue={''} name="birth" 
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out" 
                                    onChange={(e: any) => 
                                      {
                                            let value: string = e.target.value
                                            setDob(value)
                                            setDobError("")
                                            profile.setDob(value)
                                      }}
                                      onBlur={(e: any) => 
                                      {
                                            let value: string = e.target.value
                                            if(value === "" || value === undefined || value === null)
                                            {
                                                  setDobError(DOB_MESSAGE)
                                            }
                                      }
                                    }
                                />
                              { dobError && <Message msg={dobError} status={errMsgStyle} /> }
                              </div>
                              <div 
                                className=" md:w-1/2 w-full p-2 relative"
                              >
                                <span 
                                  className="w-full font-bold text-sm"
                                >
                                  Gender <strong className="text-red-500"></strong>
                                </span> 
                                <select        
                                  className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                  onChange={(e: any) => 
                                    {
                                          let value: string = e.target.value
                                          setGender(value)
                                          setGenderError("")
                                          profile.setGender(value)
                                    }}
                                    onBlur={(e: any) => 
                                    {
                                          let value: string = e.target.value
                                          if(value === "" || value === undefined || value === null)
                                          {
                                            setGenderError(GENDER_MESSAGE)
                                          }
                                    }
                                  }
                                >
                                  <option value={''}> - What Gender are you? -  </option>
                                  <option value={1}> Male  </option>
                                  <option value={2}> Female  </option>
                                </select>
                                <div 
                                  className="pointer-events-none mr-3 absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5"
                                >
                                  <svg 
                                    className="fill-current h-4 w-4" 
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                  </svg>
                                </div>
                              </div>
                              { genderError && <Message msg={genderError} status={errMsgStyle} /> }
                            </div>

                            <div 
                              className="flex flex-wrap -m-2 mt-2 mb-5 md:mx-5"
                            >
                              <div 
                                className="p-2 w-full"
                              >
                                <span 
                                  className="w-full font-bold text-sm"
                                >
                                  Academic Qualification
                                </span>
                                <input 
                                  type="text" id="academic" defaultValue={''}  
                                  name="academic" placeholder="Enter Your Qualification" 
                                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                  onChange={(e: any) => 
                                    {
                                          let value: string = e.target.value
                                          setQualification(value)
                                          setQualificationError("")
                                          profile.setQualification(value)
                                    }}
                                    onBlur={(e: any) => 
                                    {
                                          let value: string = e.target.value
                                          if(value === "" || value === undefined || value === null)
                                          {
                                            setQualificationError(COMPANY_NAME_MESSAGE)
                                          }
                                    }
                                  }
                              />
                              { qualificationError && <Message msg={qualificationError} status={errMsgStyle} /> }
                              </div>
                            </div>

                            {  (data == "anonymous") &&                                      
                                 <div 
                                    className="flex flex-wrap -m-2 mb-2 md:mx-5"
                                  >
                                    <div 
                                      className="p-2 md:w-1/2 w-full relative"
                                    >
                                      <span 
                                        className="w-full font-bold text-sm"
                                      >
                                        Password
                                      </span>
                                      <input 
                                        type={passwordType} id="password" defaultValue={''}  
                                        name="password" placeholder="Enter Your Password" 
                                        className="w-full font-bold text-lg bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                        onChange={(e: any) => 
                                          {
                                                let value: string = e.target.value
                                                setPassword(value)
                                                setPasswordError("")
                                          }}
                                          onBlur={(e: any) => 
                                          {
                                                let value: string = e.target.value
                                                if(value === "" || value === undefined || value === null)
                                                {
                                                  setPasswordError(PASSWORD_MESSAGE)
                                                }
                                          }
                                        }
                                    />
                                    <div 
                                          className="absolute inset-y-0 right-0 flex items-center pr-3 mt-6 mr-1"
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
                                    { passwordError && <Message msg={passwordError} status={errMsgStyle} /> }
                                    </div>
                                    <div 
                                      className="p-2 md:w-1/2 w-full relative"
                                    >
                                      <span 
                                          className="w-full font-bold text-sm"
                                      >
                                        Confirm Password
                                      </span>
                                      <input 
                                          type={confirmPasswordType} id="confirm_password" 
                                          defaultValue={''}  name="confirm_password" 
                                          placeholder="Re-Enter Password" 
                                          className="w-full font-bold bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                          onChange={(e: any) => 
                                            {
                                                  let value: string = e.target.value
                                                  setConfirmPassword(value)
                                                  setConfirmPasswordError("")
                                            }}
                                            onBlur={(e: any) => 
                                            {
                                                  let value: string = e.target.value
                                                  if(value === "" || value === undefined || value === null)
                                                  {
                                                     setConfirmPasswordError(CONFIRM_PASSWORD_MESSAGE)
                                                  }
                                            }
                                          }
                                      />
                                      <div 
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 mt-6 mr-1"
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
                                      { confirmPasswordError && <Message msg={confirmPasswordError} status={errMsgStyle} /> }
                                    </div>
                                  </div>
                          }

                        <div 
                          className="w-full p-2"
                        >
                          <div 
                            className="flex flex-wrap -m-2 mb-1 mt-2 md:mx-5 border-dashed border-2 border-gray-300"
                          >
                            <div 
                              className="w-2/2 p-2 flex justify-item item-center"
                            >
                              <input type="checkbox" className="form-checkbox checked:bg-green-500 h-6 w-6 cursor-pointer" 
                                     checked={agree} 
                                     onClick={
                                       () => {
                                          setAgree(!agree)
                                       }
                                     }
                              />
                              {/* <input 
                                type="checkbox"        
                                className="peer relative appearance-none w-7 h-7 border border-red-400 border-4 cursor-pointer checked:bg-pink-600" id="circular-checkbox"
                              /> */}
                              <label
                                  className="ms-2 text-sm font-medium font-bold mt-1"
                              >
                                I agree to the <span className="font-bold text-green-700 cursor-pointer">Terms & Conditions</span>
                              </label>
                            </div>
                            { !agree && agreeError && <Message msg={agreeError} status={errMsgStyle} /> }
                          </div>  
                        </div>
                        
                        <div 
                            className="flex flex-wrap -m-2 mb-20 mt-5 md:mx-5 mx-2"
                          >
                          { error && <Message msg={error} status={errMsgStyle} /> }  
                          { success && <Message msg={success} status={successMsgStyle} /> } 
                          <button
                                type="submit"
                                disabled={isSubmitting}
                                onClick={
                                    () => {
                                      register()
                                    }
                                }
                                  className="peer relative appearance-none text-md text-white px-3 py-3 cursor-pointer bg-green-800 hover:bg-green-600 hover:font-bold rounded-md"
                          >
                            { isSubmitting ? <BeatLoader size={10} color="#fff" /> : "Submit" }
                          </button>
                        </div>
                      </div>

                    </div> 
                  </div>

                 <div 
                    className="col-span-3"
                 >
                    <Image 
                        className="object-cover" 
                        src={swapCar} alt={""} 
                    /> 
                 </div> 
               </>
            }
          </div>

          {
              openLoggedOut && 
                  <Logout onClick={
                      () => {
                          }
                    } 
                  deleteModal={openLoggedOut} 
                  token={token} 
                />
          }

      </>
  );
}
