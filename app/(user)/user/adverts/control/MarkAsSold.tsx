import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import Image from 'next/image'
import { Modal } from "../../../../../components/modal/Modal"
import Message from "../../../../../components/shared/Message"
import api from "../../../../api/api"


type MarkAsSolModalProps = 
{
    onClick: () => void 
    asSoldModal: boolean 
    imageProductUrl: string 
    productId: number 
    message: string
    productName: string
    callAgain: () => void
}    

export const MarkAsSolModal = ({onClick, asSoldModal, imageProductUrl='', productId, productName, message, callAgain }: MarkAsSolModalProps)  =>
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
           let ApiUrl = '/api/users/mark-as-sold'
           await api.post(ApiUrl, { product_id: productId })
           .then((response: any) => 
            {
               if(response?.data?.status === 200)
               {
                 setIsLoading(false)
                 setErrorMessage("")
                 callAgain()
                 onClick()                      
               } else {
                 setIsLoading(false)
                 setErrorMessage("Deleting product failed")
                 setTimeout(() => 
                 {
                     setErrorMessage("")                                
                 }, 10000)                  
               }
            })
        }

        return (
                <Modal 
                   onClick={onClick} 
                   isOpen={asSoldModal} 
                   wrapperWidth={800} 
                   margin={'240px auto 0px auto'}
                >
                        { errorMessage && <Message msg={errorMessage} status={errMsgStyle} /> }
                        <div 
                             className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                                <span 
                                    className='mb-5 w-full flex justify-center items-center font-bold mt-3 text-2xl text-green-600 uppercase'
                                >
                                  {productName}
                                </span>
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
                                           <Image src={`${imageProductUrl}`}  alt={`${imageProductUrl}`} width={600} height={600} className='rounded-md' /> 
                                        </div>
                                }
                                <div 
                                    className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-5 mt-[38px]"
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
                                            {       (loading === true) ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "YES, I HAVE SOLD THIS PRODUCT" ) } 
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
