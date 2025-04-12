import { useEffect, useState } from "react"
import Image from 'next/image'
import { BeatLoader } from "react-spinners"
import { Modal } from "../../../../../components/modal/Modal"
import { USAGE_PATH } from "../../../../../constant/Path"
import { DeleteImage } from "../../../../api/home/market/images/product-images"
import Message from "../../../../../components/shared/Message"
import delay from "delay"


type DeleteImageProps = 
{
    onClick: () => void 
    deleteModal: boolean 
    imageId: number 
    imageProductUrl: string 
    productId: number 
    message: string
    callAgain: () => void
    userType: string
    token: string
}    

export const DeleteImageModal = ({onClick, deleteModal, message, imageId, imageProductUrl='', userType, productId, callAgain, token}: DeleteImageProps)  =>
{
     const [loading, setIsLoading] = useState<boolean>(false)
 
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
        await delay(1000)
        const DeleteProductImage = DeleteImage(imageId, productId, userType, token)
        DeleteProductImage.then((response) => 
        {
            if(response?.status === 200)
            {
                setIsLoading(false)
               setErrorMessage("")
               callAgain()
               onClick()
            } else {
                setIsLoading(false)
                setErrorMessage("Deleting product image failed")
                setTimeout(() => 
                {
                   setErrorMessage("")                                
                }, 10000)
            }
        }).then(() => {
            
        })
     }

     return (
                <Modal 
                        onClick={onClick} isOpen={deleteModal} wrapperWidth={800} margin={'320px auto 0px auto'}
                >
                        { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                        <div 
                            className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                            <h1 
                                className='w-full flex justify-center items-center uppercase mb-5 font-bold mt-3 text-red-600'
                            >
                                {message}
                            </h1>
                             {
                                 imageProductUrl && imageProductUrl !="" && 
                                   <div 
                                        className="max-w-sm rounded overflow-hidden shadow-lg m-auto"
                                   >
                                    {/* <img 
                                        className="w-full" 
                                        src={`${USAGE_PATH.PRODUCT_FACE}${imageProductUrl}`} 
                                        alt="Sunset in the mountains" 
                                    /> */}
                                    <Image src={`${USAGE_PATH.PRODUCT_FACE}${imageProductUrl}`} alt={`${imageProductUrl}`} width={200} height={200} className='w-full' /> 
                                </div>
                                }
                                <div 
                                   className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-5 mt-5"
                                >                                       
                                        <button 
                                             className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                             onClick={() => onClick() }
                                        >
                                            Cancel
                                        </button>
                                        
                                        <button 
                                             className="py-3 px-4 bg-green-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                                                onClick={() => deleteProduct()}
                                        >
                                            {       (loading === true) ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Delete Image" ) } 
                                        </button>
                                        
                                </div>
                        </div>
                </Modal>  
        );
}
