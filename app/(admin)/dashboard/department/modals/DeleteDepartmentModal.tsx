import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import { Modal } from "../../../../../components/modal/Modal"
import Message from "../../../../../components/shared/Message"
import { RemoveDepartment } from "../../../../api/admin/department"


type DeleteDepartmentProps = 
{
    onClick: () => void 
    openDepartmentModal: boolean 
    userType: string
    token: string
    data: { id: number, name: string, description: string }
}    

export const DeleteDepartmentModal = ({onClick, openDepartmentModal, userType, token, data}: DeleteDepartmentProps)  =>
{
     const [loading, setLoading] = useState<boolean>(false)
 
     const [errMsgStyle, setErrMsgStyle] = useState<string>('')
     const [errorMessage, setErrorMessage] = useState<string>("")

     useEffect(() => 
     {
        setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
        setErrorMessage("")
        console.log({ userType, token })
     }, []) 

     const deleteDepartment = async () => 
     { 
        setLoading(true)
        const addDept = RemoveDepartment(data?.id, token)
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
                        onClick={onClick} isOpen={openDepartmentModal} wrapperWidth={650} margin={'100px auto 0px auto'}
                >
                        { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                        <div 
                            className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                                <h1 
                                    className='w-full flex justify-center items-center uppercase mb-5 font-bold mt-3 text-red-600'
                                >
                                  You are about to delete <span className="font-bold text-blue-600 text-md mr-1 ml-1">({data?.name})</span> department
                                </h1>   
                                <div 
                                   className="w-full items-center gap-5 mt-2 sm:flex flex justify-center mb-2 mt-5"
                                >                                       
                                        <button 
                                             className="w-full py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                             onClick={() => onClick() }
                                        >
                                            Cancel
                                        </button>
                                        
                                        <button 
                                             className="w-full py-3 px-4 bg-green-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                                                onClick={() => deleteDepartment()}
                                        >
                                            {       (loading === true) ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Delete Department" ) } 
                                        </button>
                                        
                                </div>
                        </div>
                </Modal>  
        );
}
