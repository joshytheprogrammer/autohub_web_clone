import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import Message from "../../../../../../../components/shared/Message"
import { Modal } from "../../../../../../../components/modal/Modal";
import { RemoveState } from "../../../../../../api/admin/market/states";
import toast from "react-hot-toast";
import { productsDB } from "../../../../../../model/Product";


type DeleteStateModalProps = 
{
    onClick: () => void 
    openDeleteState: boolean 
    token: string
    data: { id: number, country_id: number, name: string, rate: number }
}    

export const DeleteStateModal = ({onClick, openDeleteState, data, token}: DeleteStateModalProps)  =>
{
     const [loading, setIsLoading] = useState<boolean>(false)
     const [id] = useState<number>(data?.id)
     const [country_id] = useState<number>(data?.country_id)
    
     const [errMsgStyle, setErrMsgStyle] = useState<string>('')
     const [errorMessage, setErrorMessage] = useState<string>("")
   
     useEffect(() => 
     {
        setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
        setErrorMessage("")
     }, []) 
   
     const removeState = async () => 
     { 
        setIsLoading(true)
        const rmvState = RemoveState(id, country_id, token)
        rmvState.then((response) => 
        {
            if(response?.status === 200)
            {
                productsDB.clear()
                productsDB.bulkAdd(response?.data)
                toast.success('Deleted', {
                    position: "top-center",
                });
                onClick()  
            } else {
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
                        onClick={onClick} isOpen={openDeleteState} wrapperWidth={650} margin={'200px auto 0px auto'}
                >
                        { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                        <div 
                           className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                                <div 
                                className="font-bold text-xl flex justify-center text-center"
                                >
                                        You are about deleting <span className="font-bold text-blue-500 mr-2 ml-2">{`${data?.name}`}</span> state
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
                                                onClick={() => removeState()}
                                        >
                                            {       (loading === true) ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Delete" ) } 
                                        </button>
                                        
                                </div>
                        </div>
                </Modal>  
        );
}
