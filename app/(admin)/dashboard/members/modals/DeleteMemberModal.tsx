import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import { Modal } from "../../../../../components/modal/Modal"
// import { USAGE_PATH } from "../../../../../constant/Path"
import Message from "../../../../../components/shared/Message"


type DeleteMemberModalProps = 
{
    onClick: () => void 
    openDeleteMember: boolean 
    imageUrl: string 
    userId: number 
    message: string
    userType: string
    token: string
}    

export const DeleteMemberModal = ({onClick, openDeleteMember, message, imageUrl, userId, userType, token}: DeleteMemberModalProps)  =>
{
     const [loading] = useState<boolean>(false)
 
     const [errMsgStyle, setErrMsgStyle] = useState<string>('')
     const [errorMessage, setErrorMessage] = useState<string>("")

     useEffect(() => 
     {
        setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
        console.log({ imageUrl, userId, userType, token })
     }, []) 

     const deleteProduct = async () => 
     { 
        setErrorMessage("")
     }

     return (
                <Modal 
                    onClick={onClick} 
                    isOpen={openDeleteMember} 
                    wrapperWidth={650} 
                    margin={'100px auto 0px auto'}
                >
                        { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                <h1 className='w-full flex justify-center items-center uppercase mb-5 font-bold mt-3 text-red-600'>{message}</h1>                               
                                {
                                        // imageProductUrl && imageProductUrl !="" && <div className="max-w-sm rounded overflow-hidden shadow-lg m-auto">
                                        //         <img className="w-full" src={`${USAGE_PATH.PRODUCT_FACE}${imageProductUrl}`} alt="Sunset in the mountains" />
                                        // </div>
                                }
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
                                            {       (loading === true) ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Delete Member" ) } 
                                        </button>
                                        
                                </div>
                        </div>
                </Modal>  
        );
}
