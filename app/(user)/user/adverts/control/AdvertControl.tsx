"use client"

import { HiPhotograph } from "react-icons/hi"
import { Icons } from "../../../../../components/shared/Icons"
import { ProductComments } from "../../../../../components/advert/ProductComments"
import { useState } from "react"
import { ChangeProductImage } from "./ChangeProductImage"
import { DeleteProductModal } from "./DeleteProductModal"
import { PreLoadingModal } from "../../edit-advert/preloading"


type ActiveProductProps =
{
    product: ActiveProduct 
    refetch: () => void
    token: string
    usertype: string
}

export default function AdvertControl({ product, refetch, token, usertype }: ActiveProductProps) 
{    
    const [closeCommentDialog, setCloseCommentDialog] = useState<boolean>(false)
    const [openProductImages, setOpenProductImages] = useState<boolean>(false)
    const [porductId, setProductId] = useState<number>(-1)     
    const [slug, setSlug] = useState<string>("")     
    const [productTitle, setProductTitle] = useState<string>("") 
    const [deleteMessage, setDeleteMessage] = useState<string>("") 
    const [openDeleteProduct, setOpenDeleteProduct] = useState<boolean>(false) 
    const [imageUrl, setImageUrl] = useState<string>("")  
    const [preload, setPreload] = useState<boolean>(false)  
    const [mode, setMode] = useState<string>("")
    
    return (
            <> 
                <div 
                    className="w-full flex justify-left items-center text-center gap-5 mt-1 block md:pt-2 pt-0 pr-1 pl-1 pb-2"
                >
                    <div 
                        className="w-2/12 flex justify-center items-center cursor-pointer hover:border-2 hover:border-green-300 rounded-lg p-1"
                        onClick={() => {
                            setProductId(product?.tb_id)
                            setProductTitle(product?.title)
                            setOpenProductImages(true)
                        }}
                    >
                        <HiPhotograph className="w-6 h-6" />
                        <span className="text-xs ml-1 font-bold cursor-pointer text-green-600">{product?.images_count}&nbsp;Images</span>
                    </div>
                    <div 
                        className="w-3/12 flex justify-center items-center cursor-pointer hover:border-2 hover:border-green-300 rounded-lg p-1"
                        onClick={() => {
                            setMode('UA')
                            setSlug(product?.slug)
                            setPreload(true)
                        }}
                    >
                        <Icons iconName='edit' color="blue" width={4} height={4}/>
                        <span className="text-xs ml-1">Edit</span>
                    </div>
                    <div 
                        className="w-4/12 flex justify-center items-center cursor-pointer hover:border-2 hover:border-green-300 rounded-lg p-1"
                        onClick={() => {
                            setCloseCommentDialog(true)
                        }}
                    >
                        <Icons iconName='comment' color="red" width={4} height={4}/>
                        <span className="text-xs ml-1">{product?.comments_count}&nbsp;Comments</span>
                    </div>
                    <div 
                        className="w-2/12 flex justify-center items-center"
                    >
                        <Icons iconName='eye' color="green" width={5} height={5}/>
                        <span className="text-xs ml-1">{product?.views}&nbsp;Views</span>
                    </div>
                    <div 
                        className="w-1/12 flex justify-center items-center cursor-pointer hover:border-2 hover:border-green-300 rounded-lg p-1"
                        onClick={() => {
                            setImageUrl(product?.face_image)
                            setProductId(product?.tb_id)
                            setProductTitle(product?.title)
                            setDeleteMessage(`You are about to delete this product`)
                            setOpenDeleteProduct(true)
                        }}
                    >
                        <Icons iconName='delete' color="red" width={4} height={4}/>
                        <span className="text-xs ml-1"></span>
                    </div>
                    {/* <div 
                        className="w-8/12 flex justify-center items-center"
                    >
                        <HiX className="w-5 h-5" />
                        <span className="text-xs ml-1">Mark as Sold</span>
                    </div> */}
                </div>


                { closeCommentDialog && <ProductComments onClick={(e) => 
                    { 
                        setCloseCommentDialog(false) 
                    }
                    } closeCommentDialog={closeCommentDialog} messages={product?.comments} productName={product?.title} /> 
                }

                { 
                    openDeleteProduct && <DeleteProductModal 
                        onClick={() => {
                                setOpenDeleteProduct(false)
                        } } 
                        deleteModal={openDeleteProduct}
                        message={deleteMessage}
                        productName={productTitle} 
                        imageProductUrl={imageUrl} 
                        productId={porductId} 
                        callAgain={
                          () => {
                            refetch()
                          }
                        } 
                        userType={usertype}      
                        token={token}          
                    /> 
                }

                {
                    openProductImages &&
                    <ChangeProductImage 
                                onClick={() => {
                                    refetch()
                                    setOpenProductImages(false)
                                } } 
                                imageModal={openProductImages} 
                                imageId={porductId} 
                                imageUrl={""} 
                                mode={""} 
                                title={productTitle}
                                productId={porductId} 
                                callAgain={() => {
                                     refetch()
                                    }
                                } 
                    />
                }

                {
                    preload && <PreLoadingModal onClick={() => {
                                           setPreload(false)
                                        }} 
                                        preLoadModal={preload} 
                                        slug={slug}
                                        mode={mode}
                                />
                }
            </>
    )

}
