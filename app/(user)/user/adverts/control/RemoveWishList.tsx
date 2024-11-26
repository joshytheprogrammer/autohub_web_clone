import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import { Modal } from "../../../../../components/modal/Modal"
import { USAGE_PATH } from "../../../../../constant/Path"
import { RemoveUserWishList } from "../../../../api/home/market/user/product"
import Message from "../../../../../components/shared/Message"


type RemoveWishListProps = 
{
    onClick: () => void 
    deleteModal: boolean 
    imageProductUrl: string 
    productId: number 
    message: string
    productName: string
    callAgain: () => void
    userType: string
    token: string
}    

export const RemoveWishList = ({onClick, deleteModal, imageProductUrl='', productId, productName, message, callAgain, userType, token}: RemoveWishListProps)  =>
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
           const removeWishList = RemoveUserWishList(productId, userType, token)
           removeWishList.then((response) => 
           {
              if(response?.status === 200)
              {
                 setIsLoading(false)
                 setErrorMessage("")
                 callAgain()
                 onClick()
              } else {
                 setIsLoading(false)
                 setErrorMessage("Removing product from wishlist failed")
                 setTimeout(() => 
                 {
                     setErrorMessage("")                                
                 }, 10000)
              }
            }).then(() => {
                
            })
        }

        return (
                <Modal onClick={onClick} isOpen={deleteModal} wrapperWidth={600} margin={'240px auto 0px auto'}>
                        <div 
                             className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                                { errorMessage && <Message msg={errorMessage} status={errMsgStyle} /> }
                                <span className='mb-5 w-full flex justify-center items-center font-bold mt-3 text-2xl text-green-600 uppercase'>{productName}</span>
                                <span className='mb-5 w-full flex justify-center items-center font-bold mt-3 text-md text-red-600 uppercase'>{message}</span>                               
                                {
                                        imageProductUrl && imageProductUrl !="" && <div className="max-w-sm rounded overflow-hidden shadow-lg m-auto">
                                                <img className="w-full" src={`${USAGE_PATH.PRODUCT_FACE}${imageProductUrl}`} alt="Sunset in the mountains" />
                                        </div>
                                }
                                <div 
                                    className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-5 mt-5"
                                >                                       
                                        <button 
                                            className="py-3 px-4 bg-blue-600 text-white font-semibold text-sm rounded-xl w-max"
                                            onClick={() => onClick() }
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                             className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-red-800"
                                                onClick={() => deleteProduct()}
                                        >
                                            {       (loading === true) ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Delete" ) } 
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
