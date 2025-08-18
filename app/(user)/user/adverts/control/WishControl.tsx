"use client"

import { Icons } from "../../../../../components/shared/Icons"
import { useState } from "react"
import { ProductComments } from "../../../../../components/advert/ProductComments"
import { RemoveWishList } from "./RemoveWishList"


type WishListControlProps =
{
    product: ActiveProduct 
    refetch: () => void
}

export default function WishControl({product, refetch }: WishListControlProps ) 
{
    const [closeCommentDialog, setCloseCommentDialog] = useState<boolean>(false)
    const [productId, setProductId] = useState<number>(-1)     
    const [productTitle, setProductTitle] = useState<string>("") 
    const [deleteMessage, setDeleteMessage] = useState<string>("") 
    const [openDeleteProduct, setOpenDeleteProduct] = useState<boolean>(false) 
    const [imageUrl, setImageUrl] = useState<string>("")  

    return (
            <> 
                <div 
                        className="w-full flex justify-left items-center text-center gap-5 mt-1 block md:pt-2 pt-0 pr-3 pl-3 pb-2"
                    >
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
                            className="w-3/12 flex justify-center items-center"
                        >
                            <Icons iconName='eye' color="green" width={5} height={5}/>
                            <span className="text-xs ml-1">{product?.views}&nbsp;Views</span>
                        </div>
                        <div 
                            className="w-4/12 flex justify-center items-center cursor-pointer hover:border-2 hover:border-green-300 rounded-lg p-1"
                            onClick={() => {
                                setImageUrl(product?.face_image)
                                setProductId(product?.tb_id)
                                setProductTitle(product?.title)
                                setDeleteMessage(`You are about to delete this product from your wishlist`)
                                setOpenDeleteProduct(true)
                            }}
                        >
                            <Icons iconName='delete' color="red" width={4} height={4}/>
                            <span className="text-xs ml-1">Delete</span>
                        </div>
                    </div>

                    { 
                        closeCommentDialog && <ProductComments onClick={(e) => 
                            { 
                                setCloseCommentDialog(false) 
                            }
                        } closeCommentDialog={closeCommentDialog} messages={product?.comments} productName={product?.title}
                        /> 
                    }

                    { 
                        openDeleteProduct && <RemoveWishList  
                                                    imageProductUrl={imageUrl} 
                                                    productId={productId} 
                                                    message={deleteMessage} 
                                                    productName={productTitle}  
                                                    onClick={() => 
                                                        {
                                                            setOpenDeleteProduct(false)
                                                            refetch()
                                                        }
                                                    } 
                                                    deleteModal={openDeleteProduct}
                                                    callAgain={() => { } }
                        />
                    }
            </>
    )
}
