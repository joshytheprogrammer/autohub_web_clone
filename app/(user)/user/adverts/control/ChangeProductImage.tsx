import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { PuffLoader, ScaleLoader } from "react-spinners"
import { Modal } from "../../../../../components/modal/Modal"
import Message from "../../../../../components/shared/Message"
import { USAGE_PATH } from "../../../../../constant/Path"
import { UseStore } from "../../../../../state/store"
import { FaceImage, Images } from "../../../../api/home/market/images/product-images"
import { AddProductImage } from "./AddProductImage"
import { DeleteImageModal } from "./DeleteModal"


type ChangeProductImageProps = 
{
    onClick: (x: boolean) => void 
    imageModal: boolean 
    imageId: number 
    imageUrl: string 
    mode: string 
    productId: number 
    title: string
   callAgain: () => void
}

export const ChangeProductImage = ({onClick, imageModal, imageId, imageUrl, mode='view', productId, title, callAgain}: ChangeProductImageProps)  =>
{
        
        const user = UseStore((state) => state)
        const token: string = user.getUserToken()
        const usertype: string = user.getUType()

        const { data, isLoading, refetch } = useQuery({ queryKey: [`product-images-${imageId}`, imageId], queryFn: () => Images(Number(imageId), usertype, token) })
       
        const [ imageOpenModal, setImageOpenModal] = useState(false)   
        const [deleteOpenModal, setDeleteModal] = useState(false)
        const [imageIdImage, setImageIdImage] = useState<number>(-1) 
        const [productToDeleteMessage, setProductToDeleteMessage] = useState("")
        const [userProductId] = useState(productId)
        const [imageProductUrl, setImageProductUrl] = useState(imageUrl)
 
        const [errMsgStyle, setErrMsgStyle] = useState<string>('')
        const [errorMessage, setErrorMessage] = useState<string>("")
        const [facingImage, setFacingImage] = useState<boolean>(false)

        useEffect(() => 
        {
           setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
           setErrorMessage("")
        }, []) 

        // useEffect(() => {
        //     if(imageOpenModal === false)
        //     {
        //         getImages()
        //     }
        // }, [imageOpenModal, deleteOpenModal])


        const setImageFaceAdvert = async (image: { id: number, product_id: number}) => 
        { 
            const ProductFaceImage = FaceImage(image.id, image.product_id, usertype, token)
            ProductFaceImage.then((response) => 
            {
                setFacingImage(true)
                if(response?.status === 200)
                {
                   setFacingImage(false)
                   setErrorMessage("")
                   callAgain()
                   refetch()
                } else {
                   setFacingImage(false)
                   setErrorMessage("Setting product image failed")
                   setTimeout(() => 
                   {
                       setErrorMessage("")                                
                   }, 10000)
                }
            }).then(() => {
                
            })
        }

        return (
                <>
                        <Modal onClick={onClick} isOpen={imageModal} wrapperWidth={1300} margin={'230px auto 0px auto'} color='green'>
                           <div 
                               className="flex justify-center items-center"
                           >
                               { facingImage && <ScaleLoader height={30} color="red" className='font-bold' /> }
                           </div>
                           { errorMessage && <Message msg={errorMessage} status={errMsgStyle} /> }
                            <div className="grid md:grid-cols-12 grid-cols-12 gap-5 mt-5 mb-5 flex border-shadow border-b-2 border-gray-200 pb-3">
                                  <h1 className='font-bold text-xl md:mb-5 mb-2 md:col-span-10 col-span-12'>{title}</h1>
                                        {
                                                (mode != 'view') && 
                                                <button className='md:col-span-2 col-span-12 cursor-pointer rounded-lg text-sm p-3 bg-green-800 hover:bg-blue-900 text-white' onClick={() => { 
                                                        setImageOpenModal(true)
                                                }}>Add Image</button>
                                        }
                                </div>
                                {
                                        isLoading &&  <div 
                                                        className="flex md:d-flex xl:flex-row h-[300px] justify-center items-center mt-20"
                                                >
                                                        <PuffLoader className='w-12 h-12 -mt-20' color="black" />
                                                </div>
                                }       
                                { 
                                    !isLoading && data?.data &&
                                        <div className="grid md:grid-cols-12 grid-cols-12 gap-5 mt-5 justify-center item-center overflow-y-auto xm:overflow-y-scroll justify-center item-center h-[400px] px-5">
                                                {
                                                        data?.data &&
                                                        (data?.data?.length > 0) &&
                                                        data?.data?.map((image: { image_url: string, cover_page: number, product_id: number, id: number, face_image: number }, index: number) => {
                                                                let selected = (image.face_image === 1) ?  `border border-10 border-green-400 p-1 bg-blue-200 h-auto` : `border-2 border-md border-shadow`
                                                                let faceAdvert = (image.cover_page === 0) ?  `p-3 flex justify-between` : `p-3 flex justify-between`
                                                                return (
                                                                        <>
                                                                           <div className={`relative d-flex col-span-12 md:col-span-3 rounded-lg shadow-md px-2 pb-3 h-fit ${((selected) ? selected : '')}`} key={index}>
                                                                                <img src={`${USAGE_PATH.PRODUCT_FACE}${image.image_url}`} alt="product images" className={''} />
                                                                                <div className={`${faceAdvert}`}>
                                                                                        {
                                                                                                (mode != 'view') && 
                                                                                                <span className={"absolute bottom-0 left-0 p-1 hover:border-4 hover:bg-green-100 rounded-full"} onClick={() => { 
                                                                                                               setImageIdImage(image?.id)
                                                                                                               setProductToDeleteMessage(`You are about to delete an image associated to product`)
                                                                                                               setImageProductUrl(image.image_url)
                                                                                                               setDeleteModal(true)
                                                                                                        }}
                                                                                                >
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-5 h-5 md:w-10 md:h-5 my-2 cursor-pointer">
                                                                                                                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                                                                                        </svg>
                                                                                                </span>
                                                                                        }
                                                                                        {
                                                                                                (mode != 'view') && 
                                                                                                <span className="absolute bottom-0 right-0 rounded-sm right-0 border-green-900 rounded-md delete cursor-pointer" onClick={() => { 
                                                                                                                setImageFaceAdvert(image)
                                                                                                        }}
                                                                                                >
                                                                                                        <div 
                                                                                                        className="p-2 bg-blue-700 text-white hover:font-bold hover:bg-green-800 hover:border-4 border-4 hover:rounded-md border-blue-200 rounded-md" 
                                                                                                        style={{ fontSize: "11px" }}
                                                                                                        >
                                                                                                               Make as Main Image
                                                                                                        </div>
                                                                                                </span>
                                                                                        }
                                                                                </div>
                                                                           </div> 
                                                                        </> 
                                                                       )
                                                                })        
                                                }
                                        </div>
                                }
                                {/* } */}
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-left mb-2 mx-5 mt-2 -ml-1 border-shadow border-t-2 border-gray-200 pt-3">
                                        <button  
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                                onClick={() =>
                                                        onClick(imageModal)
                                                }
                                                >
                                                Close
                                        </button>
                                </div>
                        </Modal>
                        
                        
                        {
                                deleteOpenModal  && <DeleteImageModal 
                                        onClick={() => {
                                            onClick(false)
                                            setDeleteModal(false)
                                        }}
                                        deleteModal={deleteOpenModal}
                                        imageProductUrl={imageProductUrl}
                                        message={productToDeleteMessage}
                                        imageId={imageIdImage}
                                        productId={productId}
                                        callAgain={() => {
                                                refetch()
                                        } }
                                        userType={usertype}
                                        token={token}
                                />
                        }

                        {
                                imageOpenModal && <AddProductImage 
                                                        onClick={
                                                            () => {
                                                                refetch()
                                                                setImageOpenModal(false) 
                                                            }
                                                        } 
                                                        imageModal={imageOpenModal} 
                                                        productId={productId} 
                                                        adverProductId={userProductId} 
                                                        userType={usertype}
                                                        token={token}
                                />
                        }
                </> 
        );
}
