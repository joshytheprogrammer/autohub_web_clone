"use client"

import { useEffect, useState } from "react";
import Access from "../../(auth)/login/access";
import { UseStore } from "../../../state/store";
import { Authenticate } from "../../api/auth/auth";
import { profileDB } from "../../model/Product";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
import { HiHome } from "react-icons/hi2";
import Message from "../../../components/shared/Message";
import { useRouter } from "next/navigation";


export default function Portal() 
{
   const router = useRouter()
   const userData = UseStore((state) => state)

   const userToken = UseStore((state) => state)
   const token: string = userToken.getUserToken()
      
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
   const [isStudent, setIsStudent] = useState<boolean>(false)
   const [theStudent, setTheStudent] = useState<string>('')
      
    
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

   useEffect(() => 
   {
      if(userToken.getUserRoles().includes("student"))
      {
         setTheStudent('student')
         setIsStudent(true)
      } else {
         setTheStudent('')
         setIsStudent(false)
      }
   }, []) 

   useEffect(() => {

   }, [loading])

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
               setLoading(false)
               userData.setFName(response?.data?.firstname)
               userData.setSName(response?.data?.surname)
               userData.setPassport(response?.data?.passport)
               userData.setUType(response?.data?.user_type)
               userData.setUserRoles(response?.additions)
               userData.setSideType(response?.additions[0])
               userData.setUserToken(response?.plus)
               profileDB.add(response?.data)
               console.log(response?.additions)
               console.log(response?.data)
               if(response?.additions.includes('student'))
               {
                  userData.setSideType('student')
                  window.location.href = '/user/dashboard'
               } else {
                  setErrorMessage("You are not a student, apply")
                  setLoading(false)
                  setTimeout(() => 
                  {
                    setErrorMessage("")
                  }, 5000)
                  return false
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
            <div 
              className="container mx-auto mb-20 md:mt-20 md:mt-30 md:mb-40"
            >    
                <div 
                   className="col-span-12 md:flex d-flex bg-white"
                >
                  
                  {
                    !token && !isStudent && !theStudent && <>
                    <div 
                      className="md:w-8/12 w-2/2 p-5 d-flex justify-center items-center border-2 py-10 md:py-5 md:mb-0 mb-5 pb-10 shadow-md"
                    >
                      {/* <div 
                          className='container d-flex gap-10'
                      > */}
                            <div 
                                  className='w-full pt-10'
                            >
                                  <h3 
                                    className='flex font-bold text-blue-500 justify-center items-center mb-5 text-center uppercase text-[14px] md:text-[18px]'
                                  >
                                      Acess Classroom
                                  </h3>
                            </div>
                            <div 
                                  className="w-12/12 md:px-10 p-3 md:px-9 md:pb-5 d-flex items-center justify-center rounded-md md:rounded-xl hover:text-white mb-20 md:mb-0"
                            >
                                  
                                  <form 
                                        onSubmit={SubmitData}
                                  >
                                        <div  
                                              className='w-12/12 md:w-10/12 mx-auto d-flex gap-10 md:mb-3'
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
                                              className='w-9/12 md:w-10/12 mx-auto flex justify-between md:flex gap-10 md:mb-3 mt-5'
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
                            </div>
                      {/* </div> */}
                    </div>
                                          
                    <div 
                      className="md:w-4/12 w-full p-5 flex justify-center items-center border-2 py-10 md:py-0 md:mb-0 mb-40 shadow-md"
                    >
                      <div 
                        className=""
                      >
                        <h3 
                          className="font-bold text-md text-center text-green-700 mb-10 md:-mt-20"
                        >
                          Join Our Academy
                        </h3>
                        <div 
                          className="p-3 bg-blue-600 text-center border border-4 border-blue-300 hover:border-green-500 text-blue-300 hover:text-white rounded-xl cursor-pointer"
                          onClick={
                            () => {
                                router.push(`/academy`)
                            }
                          }
                        >
                            Apply
                        </div>
                      </div>
                    </div>
                    </>
                  }
                  
                  {
                    token && isStudent && theStudent &&
                    <div 
                      className="md:w-12/12 w-full p-5 flex h-[500px] justify-center items-center border-2 py-10 md:py-5 md:mb-0 mb-5 pb-10 shadow-md"
                    >
                      {/* <div 
                          className='w-full pt-10'
                      > */}
                        <button 
                            className='flex font-bold text-blue-500 justify-center px-7 py-4 bg-blue-800 hover:bg-blue-600 rounded-xl text-gray-400 hover:text-blue-400 font-bold items-center mb-5 text-center uppercase text-[14px] md:text-[18px]'
                            onClick={
                                () => {
                                  userData.setSideType('student')
                                  router.push('/user/dashboard')
                                }
                            }
                        >
                            Enter Classroom
                        </button>
                      {/* </div> */}
                    </div>
                  }
                </div>
                
            </div>
        );
}