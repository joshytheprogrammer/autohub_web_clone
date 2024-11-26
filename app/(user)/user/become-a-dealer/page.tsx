"use client"

import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import { UseStore } from "../../../../state/store"
import Message from "../../../../components/shared/Message"
import delay from "delay"
import { BecomeADealer } from "../../../api/auth/dealer"


export default function BecomeDealer() 
{
  const become = UseStore((state) => state)
  const token: string = become.getUserToken()

  const COMPANY_NAME_MESSAGE = 'Enter Company Name'
  const COMPANY_ADDRESS_MESSAGE = 'Enter Company Address'
  const RC_NUMBER_MESSAGE = 'Enter RC Number'

  const [loading, setLoading] = useState<boolean>(false)

  const [companyName, setCompanyName] = useState<string>(become.getCompanyName())
  const [companyNameMessage, setCompanyNameMessage] = useState<string>("")

  const [companyAddress, setCompanyAddress] = useState<string>(become.getCompanyAddress())
  const [companyAddressMessage, setCompanyAddressMessage] = useState<string>("")

  const [rcNumber, setRcNumber] = useState<string>(become.getRCNumber())
  const [rcNumberMessage, setRcNumberMessage] = useState<string>("")
 
  const [errMsgStyle, setErrMsgStyle] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>("")

  const [successStyle, setSuccessStyle] = useState<string>('')
  const [successMsg, setSuccessMsg] = useState<string>('')
 
  

  useEffect(() => 
  {
      setErrMsgStyle('bg-red-600 p-3 text-white font-bold rounded-md') 
      setSuccessStyle('bg-blue-600 p-3 text-white mb-3 font-bold rounded-md')  
  }, []) 

  
  const Become = async () => 
  {
      setLoading(true)
      await delay(2000)
      const checkFields: string = allFields()
      if(checkFields === 'valid')
      {
          const ADealer = BecomeADealer(companyName, companyAddress, rcNumber, token)          
          ADealer.then((response) => 
          {
            setLoading(false) 
            if(response.status === 200)
            { 
                  setSuccessMsg(response.message)
                  setTimeout(() => {
                     setSuccessMsg("")
                  }, 10000)  
                  return false
            } else {
                  setErrorMessage(response.message)
                  setTimeout(() => {
                    setErrorMessage("")
                  }, 10000)  
            }      
            return false
          }).then(() => {
             setLoading(false)
             return false
          })
      } else {   
          setLoading(false)
          return false
      }
  }
  

  const allFields = () =>
  {
      let validity: string = 'valid'      
      if(become.getCompanyName() === ""){ setCompanyNameMessage(COMPANY_NAME_MESSAGE); validity = 'invalid' }
      if(become.getCompanyAddress() === ""){ setCompanyAddressMessage(COMPANY_ADDRESS_MESSAGE); validity = 'invalid' }
      if(become.getRCNumber() === ""){ setRcNumberMessage(RC_NUMBER_MESSAGE); validity = 'invalid' }
      return validity
  }

  return (
            <div 
                className='md:col-span-9 col-span-12 bg-green-400 d-flex bg-green-50 border-shadow drop-shadow-lg md:block h-[fit] px-3 md:px-10 py-5 mt-3 rounded-2xl -mb-24 md:mb-0'
            > 
                <h1 
                    className='font-bold uppercase mb-5'
                >
                  Become A Dealer
                </h1>         
                <div  
                    className='w-full d-flex gap-10 md:mb-3 pt-4 mb-3'
                > 
                    { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                    { successMsg && <Message msg={successMsg} status={successStyle} />  }
                </div>
                
                <div 
                      className="w-12/12 md:pt-10 md:pb-5 d-flex items-center justify-center hover:text-white mb-20 md:mb-0"
                    >
                              <div  
                                    className='w-full d-flex md:flex gap-10 md:mb-3'
                              >                                          
                                    <div 
                                          className="mb-4 md:w-full"
                                    >
                                          <input 
                                                      defaultValue={become.getCompanyName()}
                                                      className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                      type="text" name="companyName" id="companyName" placeholder="Enter Company Name" 
                                                      onChange={(e: any) => 
                                                      {
                                                            let value: string = e.target.value
                                                            setCompanyName(value)
                                                            setCompanyNameMessage("")
                                                            become.setCompanyName(value)
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
                                    className='w-full d-flex md:flex gap-10 md:mb-3'
                              >                                          
                                    <div 
                                          className="mb-4 md:w-full"
                                    >
                                          <textarea  
                                                      defaultValue={become.getCompanyAddress()}
                                                      className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                      placeholder="Enter Company Address." rows={2}                              
                                                      onChange={(e: any) => 
                                                      {
                                                            let value: string = e.target.value
                                                            setCompanyAddress(value)
                                                            setCompanyAddressMessage("")
                                                            become.setCompanyAddress(value)
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
                                    className='w-full d-flex md:flex gap-10 md:mb-3'
                              >                                          
                                    <div 
                                          className="mb-4 w-full"
                                    >
                                        <input 
                                                defaultValue={become.getRCNumber()}
                                                inputMode="numeric"
                                                pattern="[0-9.]+"
                                                id="rcNumber" name="rcNumber" placeholder="Enter RC Number"
                                                className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"  
                                                onChange={(e: any) => 
                                                {
                                                      let value: string = e.target.value
                                                      setRcNumber(value)
                                                      setRcNumberMessage("")
                                                      become.setRCNumber(value)
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
                              <div 
                                    className="mb-4 w-fit"
                              >   
                                    <button
                                          onClick={Become} 
                                          className="block w-full bg-green-600 hover:bg-green-800 border-shadow text-white font-bold py-4 px-10 rounded-lg"
                                    >
                                    { loading ? <BeatLoader size={10} color="white" className="" /> : "Become Dealer"}
                                    </button>
                              </div>
                </div>
            </div>
  )
}
