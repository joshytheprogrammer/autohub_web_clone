import { useState } from "react"
import { Modal } from "../../../../../components/modal/Modal"
import { Activate, Deactivate } from "../../../../api/admin/market/adverts"
import toast from "react-hot-toast"


type VerifyProductModalProps = 
{
    onClick: () => void 
    openVerifyProduct: boolean 
    product: any
    token: string
}    

export const VerifyProductModal = ({onClick, openVerifyProduct, product, token}: VerifyProductModalProps)  =>
{
     const [isLoading, setIsLoading] = useState<boolean>(false)

     const DeActivateProduct = () => 
     {
        setIsLoading(true)
        const deactivateAdvert = Deactivate(product?.tb_id, token)
        deactivateAdvert.then((response) => 
        {
            if(response?.status === 200)
            {
                toast.success(response?.message, {
                  position: "top-center",
                });
                setIsLoading(false)
                onClick()
            }
        }).catch(() => {
            setIsLoading(false)
        })
     }

     const ActivateProduct = () => 
     {
        const activateAdvert = Activate(product?.tb_id, token)
        activateAdvert.then((response) => 
        {
            if(response?.status === 200)
            {
                toast.success(response?.message, {
                  position: "top-center",
                });
                setIsLoading(false)
                onClick()
            }
        }).catch(() => {
            setIsLoading(false)
        })

     }

     return (
                <Modal 
                        onClick={onClick} isOpen={openVerifyProduct} wrapperWidth={650} margin={'100px auto 0px auto'}
                >
                        { !isLoading && <>
                                <h1 
                                   className='font-bold w-full justify-center items-center flex text-lg mt-5 mb-10'
                                >
                                  {product?.title} by {product?.firstname} is currently {product?.status}
                                </h1>
                                <div 
                                    className="items-center gap-5 mt-2 sm:flex flex justify-between mx-5 mt-5 mb-5"
                                >
                                   <button  
                                       className="mt-2 px-4 py-2 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                       onClick={() =>
                                            onClick()
                                       }
                                   >
                                       CANCEL
                                   </button>
                                   <button
                                        className="mt-2 px-4 py-2 text-white hover:font-bold text-sm bg-blue-900 hover:bg-blue-600 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                        onClick={
                                                () => DeActivateProduct()
                                        }
                                   >
                                      UNPUBLISH 
                                   </button>
                                   <button
                                       className="mt-2 px-4 py-2 text-white hover:font-bold text-sm bg-green-900 hover:bg-green-600 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                       onClick={
                                                () =>  ActivateProduct() 
                                        }
                                   >
                                      PUBLISH 
                                   </button>
                                </div>
                        </>
                        }
                </Modal>  
        );
}
