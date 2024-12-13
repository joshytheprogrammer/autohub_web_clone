import { useState } from "react"
import { BeatLoader } from "react-spinners"
import { Modal } from "../../../../../components/modal/Modal"
import { RemoveProduct } from "../../../../api/admin/market/adverts"
import toast from "react-hot-toast"


type DeleteAdvertModalProps = 
{
    onClick: () => void 
    openDeleteProduct: boolean 
    product: any
    token: string
}    

export const DeleteAdvertModal = ({onClick, openDeleteProduct, product, token}: DeleteAdvertModalProps)  =>
{
     const [loading, setIsLoading] = useState<boolean>(false)

     const deleteProduct = async () => 
     { 
        setIsLoading(true)
        const deleteAdvert = RemoveProduct(product?.tb_id, token)
        deleteAdvert.then((response) => 
        {
            if(response?.status === 200)
            {
                setIsLoading(false)
                toast.success(response?.message, {
                  position: "top-center",
                });
                onClick()
            }
        }).catch(() => {
            setIsLoading(false)
        })
     }

     return (
                <Modal 
                        onClick={onClick} isOpen={openDeleteProduct} wrapperWidth={650} margin={'200px auto 0px auto'}
                >
                        <div 
                             className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                                <h1 
                                   className='w-full flex justify-center items-center uppercase mb-10 text-2xl font-bold mt-3 text-blue-600'
                                >
                                  {product?.title}
                                </h1>
                                <div 
                                   className="w-full items-center gap-5 mt-2 sm:flex flex justify-center mb-2 mt-5"
                                >                                       
                                        <button 
                                             className="w-full py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl"
                                             onClick={() => onClick() }
                                        >
                                            Cancel
                                        </button>
                                        
                                        <button 
                                             className="w-full py-3 px-4 bg-green-600 text-white font-semibold text-sm rounded-xl hover:bg-green-800"
                                                onClick={() => deleteProduct()}
                                        >
                                            {       (loading === true) ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Delete Product" ) } 
                                        </button>
                                        
                                </div>
                        </div>
                </Modal>  
        );
}
