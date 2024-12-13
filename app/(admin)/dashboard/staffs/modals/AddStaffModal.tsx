import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import { Modal } from "../../../../../components/modal/Modal"
import Message from "../../../../../components/shared/Message"


type AddMemberModalProp = 
{
    onClick: () => void 
    openAddMember: boolean 
    token: string
}    

export const AddStaffModal = ({onClick, openAddMember, token}: AddMemberModalProp)  =>
{
    const STAFF_NAME_MESSAGE = 'Enter Staff Name'

    const [loading] = useState<boolean>(false)
    const [errMsgStyle, setErrMsgStyle] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>("")

    useEffect(() => 
    {
       setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
       setErrorMessage("")
       console.log({ token })
    }, []) 

    const deleteProduct = async () => 
    { 
    }

     return (
                <Modal 
                        onClick={onClick} isOpen={openAddMember} wrapperWidth={1000} margin={'100px auto 0px auto'}
                >
                        { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                        <div 
                            className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                                <div 
                                    className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                                >
                                <div 
                                    className="mb-4 md:w-full d-flex md:flex gap-5"
                                >
                                    <div 
                                        className="w-full md:w-1/2 border-2 border-shadow rounded-lg mb-5 md:mb-0"
                                    >
                                        <input  
                                            className="w-full border rounded-md p-3 bg-opacity-75 rounded border border-blue-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                            type="text" name="firstname" id="firstname" placeholder="Enter Firstname" 
                                            onChange={(e: any) => 
                                            {
                                                  let value: string = e.target.value
                                                //   setCompanyName(value)
                                                //   setCompanyNameMessage("")
                                                //   profile.setCompanyName(value)
                                            }}
                                            onBlur={(e: any) => 
                                            {
                                                  let value: string = e.target.value
                                                  if(value === "" || value === undefined || value === null)
                                                  {
                                                        // setCompanyNameMessage(COMPANY_NAME_MESSAGE)
                                                  }
                                            }}
                                        />
                                        {/* { companyNameMessage && <Message msg={companyNameMessage} status={'text-red-600 -mt-1 font-bold rounded-md'} /> } */}
                                    </div>
                                    <div 
                                        className="w-full md:w-1/2 border-2 border-shadow rounded-lg mb-5 md:mb-0"
                                    >
                                        <input  
                                            className="w-full border rounded-md p-3 bg-opacity-75 rounded border border-blue-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                            type="text" name="surname" id="surname" placeholder="Enter Surname" 
                                        />
                                    </div>
                                </div> 
                                <div 
                                    className="mb-4 md:w-full d-flex md:flex gap-5"
                                >
                                    <div 
                                        className="w-full md:w-1/2 border-2 border-shadow rounded-lg mb-5 md:mb-0"
                                    >
                                        <input  
                                           className="w-full border rounded-md p-3 bg-opacity-75 rounded border border-blue-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                           type="text" name="phone" id="phone" placeholder="Enter phone" 
                                        />
                                    </div>
                                    <div 
                                        className="w-full md:w-1/2 border-2 border-shadow rounded-lg mb-5 md:mb-0"
                                    >
                                        <input  
                                            className="w-full border rounded-md p-3 bg-opacity-75 rounded border border-blue-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                            type="email" name="email" id="email" placeholder="Enter Email" 
                                        />
                                    </div>
                                </div> 
                                {/* <div 
                                    className="mb-4 md:w-full d-flex md:flex border-2 border-shadow rounded-lg mb-5 md:mb-5"
                                >
                                   <input  
                                       className="w-full border rounded-md p-3 bg-opacity-75 rounded border border-blue-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                       type="text" name="rcNumber" id="rcNumber" placeholder="Enter RC Number" 
                                   /> 
                                </div> 
                                <div 
                                    className="mb-4 md:w-full d-flex md:flex border-2 border-shadow rounded-lg mb-5 md:mb-5"
                                >
                                   <textarea  
                                      className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                      name="password" id="password" placeholder="Enter Category Description" 
                                      rows={3}
                                   >
                                   </textarea>                                         
                                </div> 
                                <div 
                                    className="mb-4 md:w-full d-flex md:flex border-2 border-shadow rounded-lg mb-5 md:mb-5"
                                >
                                    <textarea  
                                        className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                        name="password" id="password" placeholder="Enter Category Description" 
                                        rows={3}
                                     >
                                     </textarea>                                          
                                </div>  */}
                                <div 
                                   className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mt-20"
                                >                                       
                                   <button 
                                        className="p-5 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                        onClick={() => onClick() }
                                   >
                                      Cancel
                                   </button>
                                      
                                   <button 
                                       className="p-5 bg-green-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                                       onClick={() => deleteProduct()}
                                   >
                                      {       (loading === true) ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Add Staff" ) } 
                                   </button>                                        
                                </div>
                           </div>
                        </div>
                </Modal>  
        );
}
