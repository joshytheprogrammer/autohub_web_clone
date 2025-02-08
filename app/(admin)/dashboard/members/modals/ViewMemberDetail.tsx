import { useEffect, useState } from "react"
import { Modal } from "../../../../../components/modal/Modal"
// import { USAGE_PATH } from "../../../../../constant/Path"
// import Message from "../../../../../components/shared/Message"


type ViewMemberDetailProps = 
{
    onClick: () => void 
    openViewMember: boolean 
    imageUrl: string 
    userId: number 
    message: string
    userType: string
    token: string
}    

export const ViewMemberDetail = ({onClick, openViewMember, message, imageUrl, userId, userType, token}: ViewMemberDetailProps)  =>
{
    //  const [loading, setIsLoading] = useState<boolean>(false) 
    //  const [errMsgStyle, setErrMsgStyle] = useState<string>('')
    //  const [errorMessage, setErrorMessage] = useState<string>("")

     useEffect(() => 
     {
        // setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
        console.log({ imageUrl, userId, userType, token })
     }, []) 

    
    return (
                <Modal 
                        onClick={onClick} isOpen={openViewMember} wrapperWidth={1000} margin={'100px auto 0px auto'}
                >
                        {/* { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  } */}
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                <h1 className='w-full flex justify-center items-center uppercase mb-5 font-bold mt-3 text-red-600'>{message}</h1>                               
                                {
                                        // imageProductUrl && imageProductUrl !="" && <div className="max-w-sm rounded overflow-hidden shadow-lg m-auto">
                                        //         <img className="w-full" src={`${USAGE_PATH.PRODUCT_FACE}${imageProductUrl}`} alt="Sunset in the mountains" />
                                        // </div>
                                }
                                <div 
                                    className="mb-4 md:w-full d-flex md:flex gap-5"
                                >
                                    <div 
                                        className="w-full md:w-1/2 border-2 border-shadow rounded-lg p-5 mb-5 md:mb-0"
                                    >
                                        one
                                    </div>
                                    <div 
                                        className="w-full md:w-1/2 border-2 border-shadow rounded-lg p-5 mb-5 md:mb-0"
                                    >
                                        Two
                                    </div>
                                </div> 
                                <div 
                                    className="mb-4 md:w-full d-flex md:flex gap-5"
                                >
                                    <div 
                                        className="w-full md:w-1/2 border-2 border-shadow rounded-lg p-5 mb-5 md:mb-0"
                                    >
                                        one
                                    </div>
                                    <div 
                                        className="w-full md:w-1/2 border-2 border-shadow rounded-lg p-5 mb-5 md:mb-0"
                                    >
                                        Two
                                    </div>
                                </div> 
                                {/* <div 
                                    className="mb-4 md:w-full d-flex md:flex border-2 border-shadow rounded-lg p-5 mb-5 md:mb-5"
                                >
                                  Full  
                                </div> 
                                <div 
                                    className="mb-4 md:w-full d-flex md:flex border-2 border-shadow rounded-lg p-5 mb-5 md:mb-5"
                                >
                                  Full                                         
                                </div> 
                                <div 
                                    className="mb-4 md:w-full d-flex md:flex border-2 border-shadow rounded-lg p-5 mb-5 md:mb-5"
                                >
                                  Full                                         
                                </div>  */}
                                <div 
                                   className="items-center gap-5 mt-5 sm:flex flex justify-between mb-2 mx-0 mt-5"
                                >                                       
                                        <button 
                                             className="p-5 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                             onClick={() => onClick() }
                                        >
                                            Cancel
                                        </button>
                                        
                                </div>
                        </div>
                </Modal>  
        );
}
