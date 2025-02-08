"use client"

import { useRouter } from "next/navigation";
import '../../../globals.css'
import './passport.css'
import Logo from '../../../../components/shared/Logo'
import { HiArrowSmLeft } from 'react-icons/hi'
import SingleImageUpload from '../../../../components/shared/SingleImageUpload'
import { UseStore } from '../../../../state/store';
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import delay from 'delay';
import { AutoHubSignUp } from "../../../api/auth/auth";
import Message from "../../../../components/shared/Message";
import React from "react";


export default function Page() 
{
   const router = useRouter()
   const advertState = UseStore((state) => state)

   const isClient = () => typeof window !== 'undefined';

   const [loading, setLoading] = useState<boolean>(false)
   const [passport, setPassport] = useState<string>("")    
   const [userIsRegistered, setUserIsRegistered] = useState<string>("")

   const [errMsgStyle, setErrMsgStyle] = useState<string>('')
   const [errorMessage, setErrorMessage] = useState<string>("")
   const [dom, setDom] = useState<boolean>(false)
   
   if (isClient()) {
      document.body.addEventListener('keypress', (ev: any) => 
      {
         Register()
      })
   }
    
   useEffect(() => 
   {
      setErrMsgStyle('text-sm text-white font-bold bg-red-600 rounded-lg py-2 -mt-1 px-2')
      setErrorMessage("")
      setDom(true)
   }, [])    


   const Register = async () => 
   {                   
      setLoading(true)
      await delay(1000)
      if(!passport)
      {
        setErrorMessage("Kindly, upload passport")
        setLoading(false)
        setTimeout(() => 
        {
          setErrorMessage("")
        }, 10000)    
        return        
      }
      let data: Member | Dealer
      if(advertState.getPassportFor() === "member")
      {
            data = {
                  firstname: advertState.getFirstname(),
                  surname: advertState.getSurname(),
                  phone: advertState.getPhone(),
                  email: advertState.getEmail(),
                  password: advertState.getPassword(),
                  passport: passport,
                  type: 'member',
                  url: 'signup-member'
            }
      } else {
            data = {
                  company_name: advertState.getCompanyName(),
                  company_address: advertState.getCompanyAddress(),
                  rc_number: advertState.getRCNumber(),
                  firstname: advertState.getFirstname(),
                  surname: advertState.getSurname(),
                  middlename: advertState.getMiddlename(),
                  phone: advertState.getPhone(),
                  email: advertState.getEmail(),
                  password: advertState.getPassword(),
                  passport: passport,
                  type: 'dealer',
                  url: 'signup-dealer'
            }
      }
      const SignUp = AutoHubSignUp(data)
      SignUp.then((response) => 
      {
          if(response?.status === 200)
          {
              advertState.setCompanyName(""),
              advertState.setCompanyAddress(""),
              advertState.setRCNumber(""),
              advertState.setFirstname(""),
              advertState.setSurname(""),
              advertState.setMiddlename(""),
              advertState.setPhone(""),
              advertState.setEmail(""),
              advertState.setPassword("")
              advertState.setMemberAgreement(0)
              advertState.setRegistered(response?.message)
              setUserIsRegistered(response?.message) 
              setTimeout(() => 
                { 
                  setUserIsRegistered(response?.message) 
                  setLoading(false)
                  router.push(`/login`)                  
                }, 2000
              )
          } else {
              setErrorMessage(response?.message)
              setLoading(false)
              setTimeout(() => 
              {
                  setErrorMessage("")
              }, 10000)
              return false
          }
      }).then(() => {
          return false
      })
   }

  return (
    <>  
        { dom &&
            <main 
                  className="flex md:d-flex xl:flex-row h-screen bg-[#27973f]"
            >
                  <div 
                        className="w-full md:w-5/12 mx-auto my-4 d-flex items-center justify-center px-3 py-5 md:p-10 mt-10 gap-5"
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
                                    className='flex text-white font-bold justify-center mb-5 uppercase'
                                    >
                                    Upload Profile Picture
                              </h3>
                        </div>
                        <div 
                              className="w-full py-10 px-10 md:px-9 md:pt-10 md:pb-5 d-flex items-center justify-center rounded-md md:rounded-xl bg-[#23913b] hover:text-white mb-20 md:mb-0 border-2 border-green-700"
                        >
                              
                                    <div  
                                          className='w-full d-flex gap-10 md:mb-3 justify-center items-center text-center'
                                    > 
                                          { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                                          { userIsRegistered && <Message msg={userIsRegistered} status={''} customStyle='bg-blue-600 text-white font-bold p-5 rounded-lg' />  }
                                    </div>
                                    <div  
                                          className='w-full d-flex gap-10 md:mb-3'
                                    > 
                                          <SingleImageUpload width={6} ICloudColour='text-white' space="w-7/12 md:w-4/12 rounded-md" onClick={(photo) => 
                                                {
                                                      setPassport(photo)
                                                }
                                          }  
                                    
                                    />
                                    </div>
                                    {/* <div  
                                          className='w-full flex justify-between md:flex gap-10 md:mb-3 mt-5'
                                    >   
                                          <button 
                                                      className="block w-full bg-green-600 hover:bg-green-800 border-shadow text-white font-bold py-4 px-1 rounded-lg ring-2 ring-green-800 ring-inset"
                                          >
                                                Change
                                          </button>
                                    </div> */}
                                    <div  
                                          className='w-full flex justify-between md:flex gap-10 md:mb-3 mt-20 px-1'
                                    >  
                                    <HiArrowSmLeft 
                                          className='w-11 h-11 bg-green-100 cursor-pointer rounded-full text-black hover:text-green-600 p-1'                        
                                          onClick={() => 
                                                {
                                                if(advertState.getPassportFor() === "member")
                                                {
                                                      router.push(`/register/member`) 
                                                } 
                                                if(advertState.getPassportFor() === "dealer")
                                                {
                                                      router.push(`/register/dealer`) 
                                                }                                              
                                                }} 
                                    /> 
                                    <button
                                       type="submit"
                                       disabled={(passport === "") ? true : false} 
                                       className={`${(passport === "") ? 'bg-gray-500' : 'bg-gren-500 hover:bg-green-800'} block w-fit border-shadow text-white font-bold p-4 rounded-lg ring-2 ring-white ring-inset`}
                                       onClick={Register}
                                    >
                                       { loading ? <BeatLoader size={10} color="white" className="" /> : "Register"}
                                    </button>
                                </div>
                          <div/>
                        </div>
                     </div>
                  </div>
            </main>
        }
    </>
  )
}
