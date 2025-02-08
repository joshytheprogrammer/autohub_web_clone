import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import Message from "../../../../../../components/shared/Message"
import { Modal } from "../../../../../../components/modal/Modal"
import toast from "react-hot-toast"
import { RemoveCondition } from "../../../../../api/admin/market/condition"


type DeleteConditionModalProps = 
{
    onClick: () => void 
    openDeleteCondition: boolean 
    data: { id: number, name: string }
    token: string
}    

export const DeleteConditionProduct = ({onClick, openDeleteCondition, data, token}: DeleteConditionModalProps)  =>
{
     const [loading, setIsLoading] = useState<boolean>(false)
     const [id] = useState<number>(data?.id)
 
     const [errMsgStyle, setErrMsgStyle] = useState<string>('')
     const [errorMessage, setErrorMessage] = useState<string>("")

     useEffect(() => 
     {
        setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
        setErrorMessage("")
     }, []) 

     const deleteProduct = async () => 
     { 
        setIsLoading(true)
        const removeCondition = RemoveCondition(id, token)
        removeCondition.then((response) => 
        {
            if(response?.status === 200)
            {
                setIsLoading(false)
                toast.success('Deleted', {
                    position: "top-center",
                });
                onClick()  
            } else {
               setIsLoading(false)
               setErrorMessage(response?.message)
               setTimeout(() => 
               {
                  setErrorMessage("")
               }, 5000)
            }
        }).then(() => {

        })
     }

     return (
                <Modal 
                        onClick={onClick} isOpen={openDeleteCondition} wrapperWidth={650} margin={'200px auto 0px auto'}
                >
                        { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                        <div 
                            className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                                <div 
                                    className="font-bold text-xl flex justify-center text-center"
                                    >
                                    You are about deleting <span className="font-bold text-blue-500 mr-2 ml-2">{`${data?.name}`}</span> condition
                                </div>
                                <div 
                                   className="w-full items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mt-5"
                                >                                       
                                        <button 
                                             className="w-1/2 py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                             onClick={() => onClick() }
                                        >
                                            Cancel
                                        </button>
                                        
                                        <button 
                                             className="w-1/2 py-3 px-4 bg-green-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                                                onClick={() => deleteProduct()}
                                        >
                                            {       (loading === true) ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Delete" ) } 
                                        </button>
                                        
                                </div>
                        </div>
                </Modal>  
        );
}
