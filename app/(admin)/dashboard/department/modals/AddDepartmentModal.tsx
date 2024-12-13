import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import { Modal } from "../../../../../components/modal/Modal"
// import { USAGE_PATH } from "../../../../../constant/Path"
import Message from "../../../../../components/shared/Message"


type AddDepartmentProps = 
{
    onClick: () => void 
    openDepartmentModal: boolean 
    userType: string
    token: string
}    

export const AddDepartmentModal = ({onClick, openDepartmentModal, userType, token}: AddDepartmentProps)  =>
{
     const [loading] = useState<boolean>(false)
 
     const [errMsgStyle, setErrMsgStyle] = useState<string>('')
     const [errorMessage, setErrorMessage] = useState<string>("")

     useEffect(() => 
     {
        setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
        setErrorMessage("")
        console.log({ userType, token })
     }, []) 

     const addDepartment = async () => 
     { 
     }

     return (
                <Modal 
                        onClick={onClick} isOpen={openDepartmentModal} wrapperWidth={750} margin={'100px auto 0px auto'}
                >
                        { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                {/* <h1 className='w-full flex justify-center items-center uppercase mb-5 font-bold mt-3 text-red-600'>{message}</h1> */}
                                {
                                        // imageProductUrl && imageProductUrl !="" && <div className="max-w-sm rounded overflow-hidden shadow-lg m-auto">
                                        //         <img className="w-full" src={`${USAGE_PATH.PRODUCT_FACE}${imageProductUrl}`} alt="Sunset in the mountains" />
                                        // </div>
                                }
                                <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                {/* <h1 className='w-full flex justify-center items-center uppercase mb-5 font-bold mt-3 text-red-600'>{message}</h1> */}
                                {
                                        // imageProductUrl && imageProductUrl !="" && <div className="max-w-sm rounded overflow-hidden shadow-lg m-auto">
                                        //         <img className="w-full" src={`${USAGE_PATH.PRODUCT_FACE}${imageProductUrl}`} alt="Sunset in the mountains" />
                                        // </div>
                                }
                                <div 
                                    className="mb-4 md:w-full d-flex md:flex gap-5 -mt-7"
                                >
                                    <div 
                                        className="w-full border-2 border-shadow rounded-lg mb-5 md:mb-0"
                                    >
                                        <input  
                                            className="w-full border rounded-md p-3 bg-opacity-75 rounded border border-blue-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                            type="text" name="departmentName" id="departmentName" placeholder="Enter Department Name" 
                                        />
                                    </div>
                                </div> 
                                <div 
                                    className="mb-4 md:w-full d-flex md:flex border-2 border-shadow rounded-lg mb-5 md:mb-5"
                                >
                                    <textarea  
                                        className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                        name="aboutDepartment" id="aboutDepartment" placeholder="Enter detail about department" 
                                        rows={3}
                                     >
                                     </textarea>                                          
                                </div>
                                <div 
                                   className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mt-14"
                                >                                       
                                   <button 
                                        className="p-5 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                        onClick={() => onClick() }
                                   >
                                      Cancel
                                   </button>
                                      
                                   <button 
                                       className="p-5 bg-green-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                                       onClick={() => addDepartment()}
                                   >
                                      {       (loading === true) ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Add Department" ) } 
                                   </button>                                        
                                </div>
                           </div>
                        </div>
                </Modal>  
        );
}
