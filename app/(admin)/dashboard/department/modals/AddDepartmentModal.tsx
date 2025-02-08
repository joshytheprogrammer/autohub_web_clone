import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import { Modal } from "../../../../../components/modal/Modal"
import Message from "../../../../../components/shared/Message"
import { AddDepartment } from "../../../../api/admin/department"


type AddDepartmentProps = 
{
    onClick: () => void 
    openDepartmentModal: boolean 
    userType: string
    token: string
}    

export const AddDepartmentModal = ({onClick, openDepartmentModal, userType, token}: AddDepartmentProps)  =>
{
     const [loading, setLoading] = useState<boolean>(false)
 
     const [errMsgStyle, setErrMsgStyle] = useState<string>('')
     const [errorMessage, setErrorMessage] = useState<string>("")
     const [name, setName] = useState<string>("")
     const [description, setDescription] = useState<string>("")

     useEffect(() => 
     {
        setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
        console.log({userType})
     }, []) 

     const addDepartment = async () => 
     { 
         setLoading(true)
         const addDept = AddDepartment(name, description, token)
         addDept.then((response) => 
         {
            if(response?.status === 200)
            {
                setLoading(false)
                onClick()                
            } else {
                setErrorMessage(response?.message)
                setTimeout(() => 
                {
                    setErrorMessage("")
                }, 3000)
                setLoading(false)                
            }
         }).catch(() => {

         })
     }

     return (
                <Modal 
                        onClick={onClick} isOpen={openDepartmentModal} wrapperWidth={750} margin={'100px auto 0px auto'}
                >
                        { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                        <div 
                            className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                                <div 
                                    className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                                >
                                <div 
                                    className="mb-4 md:w-full d-flex md:flex gap-5 mt-3"
                                >
                                    <div 
                                        className="w-full border-2 border-shadow rounded-lg mb-5 md:mb-0"
                                    >
                                        <input  
                                            className="w-full border rounded-md p-3 bg-opacity-75 rounded border border-blue-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                            type="text" name="departmentName" id="departmentName" placeholder="Enter Department Name" 
                                            onChange={(e) => {
                                                setName(e.target.value)
                                            }}
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
                                        onChange={(e) => {
                                            setDescription(e.target.value)
                                        }}
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
                                      {       (loading === true) ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Add" ) } 
                                   </button>                                        
                                </div>
                           </div>
                        </div>
                </Modal>  
        );
}
