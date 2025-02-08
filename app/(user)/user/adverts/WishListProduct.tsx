"use client"

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BsGeoAltFill } from "react-icons/bs"
import { PuffLoader } from "react-spinners"
import Pagination from "../../../../components/Pagination"
import currencyFormatter from "../../../../components/util/currency-formatter"
import { USAGE_PATH } from "../../../../constant/Path"
import { UseStore } from "../../../../state/store"
import { WishListProducts } from "../../../api/home/market/user/product"
import { MarkAsSolModal } from "./control/MarkAsSold"
import WishControl from "./control/WishControl"



export default function WishListProduct() 
{
    const router = useRouter()
    const userToken = UseStore((state) => state)
    const token: string = userToken.getUserToken()
    const usertype: string = userToken.getUType()

    const [currentPage, setCurrentPage] = useState(1)  
    const [perPage] = useState(10) 

    const { data, isLoading, refetch, isRefetching } = useQuery({ queryKey: [`wishlist-products-${currentPage}-${perPage}`, currentPage, perPage, token], queryFn: () => WishListProducts(Number(currentPage), Number(perPage), token, usertype)})
    
    const [openMarkAsSold, setOpenMarkAsSold] = useState<boolean>(false)
    const [porductId] = useState<number>(-1)     
    const [productTitle] = useState<string>("") 
    const [deleteMessage] = useState<string>("") 
    const [imageUrl] = useState<string>("")  

    return (
            <div 
                className='p-2'
            > 
                {
                    isLoading && !isRefetching &&  <div 
                                className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                            >
                                <PuffLoader className='w-12 h-12' color="black" />
                            </div>
                }
                {
                    isLoading && isRefetching  &&  <div 
                                className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                            >
                                <PuffLoader className='w-12 h-12' color="black" />
                            </div>
                }
                  
                {  !isLoading && (data?.data?.product_advert?.noOfPages === 0) && <>
                        <div 
                            className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                        >
                            <div 
                                className="w-full d-flex justify-center items-center"
                            >
                                <div className="w-full text-center">You have no product yet</div>
                                <div 
                                    className="w-fit mx-auto mt-5 bg-green-700 hover:bg-green-500 text-white font-bold text-md rounded-lg p-3 cursor-pointer"
                                    onClick={() => {
                                        router.push(`/user/create-advert`)
                                    }}
                                >
                                    Post Advert
                                </div>
                            </div>
                        </div>
                    </>
                }
                  
                {  !isLoading && (data?.data?.product_advert?.noOfPages > 0) && <>
                        <div 
                            className="container px-2 mr-3 border-2 border-gray-200 flex justify-between items-center mb-5"
                        >
                            <h1 
                                className='font-bold w-full p-3 uppercase'
                            >
                                My Wishlist
                            </h1>
                            <span className="flex justify-center items-center  whitespace-nowrap">Page {currentPage} of {data?.data?.product_advert?.noOfPages}</span>
                        </div>
                    </>
                }

                <div 
                    className="grid grid-cols-12 gap-5 rounded-md mb-5 gap-2 md:mx-0 mr-2"
                >
                {
                  !isLoading && (data?.data?.product_advert?.noOfPages > 0) && data?.data?.product_advert?.product.map((product: any, index: number) => 
                            {
                                return (
                                    <>
                                    <div 
                                        key={index}
                                        className="relative col-span-12 md:col-span-6 d-flex mb-3 p-1 border-2 border-green-200 bg-white"
                                    >
                                        <div 
                                            className="w-w-2/2 flex h-[190px] md:h-[235px]"
                                        >     
                                            <div 
                                                className="w-6/12"
                                            >
                                                <img src={`${USAGE_PATH.PRODUCT_FACE}${product?.face_image}`} width={300} height={300} />    
                                                <div 
                                                    className="hidden"
                                                >
                                                </div>                                          
                                            </div>                                       
                                            <div 
                                                className="w-6/12 p-5 d-flex pr-3"
                                            >
                                                <p className="text-[16px] md:text-[17px] lg:text-[18px] text-green-700 font-semibold -mt-5">{product?.title}</p>
                                                <p className="text-[15px] md:text-[15px] lg:text-[17px] text-blue-600 font-semibold md:mt-1">{ currencyFormatter(product?.price) }</p>
                                                <div 
                                                    className="flex justify-left items-center mt-1"
                                                >
                                                    <BsGeoAltFill className='w-3 h-3 text-red-600 md:mt-1 mr-1' />
                                                    <span className="md:text-[16px] text-[13px] text-red-500 font-bold">{product?.country} - </span>
                                                    <span className="text-[13px] ml-1 font-semibold"> {product?.state}</span>
                                                </div>                                                
                                                <div 
                                                        className="w-fit px-2 py-2 rounded-md cursor-pointer mt-2 flex justify-left items-center hover:bg-green-600 hover:text-white bg-white border-2 border-green-200"
                                                        onClick={() => {
                                                            console.log("")  
                                                        }}
                                                    >
                                                    <span 
                                                        className="text-xs text-center" 
                                                        onClick={() => 
                                                        {
                                                            router.push(`/user/product-preview/${product?.slug}`)
                                                        }
                                                        }
                                                    >
                                                        View Product Detail
                                                    </span>
                                                </div>                                    
                                            </div>                                        
                                        </div>
                                        <div 
                                            className="w-full -mt-20 md:-mt-0 absolute bg-white bottom-0 left-0 p-1"
                                        >
                                            <WishControl  product={product} refetch={() => {
                                                        refetch()
                                                    }} 
                                                 token={token}
                                                 usertype={usertype} 
                                            />  
                                        </div> 
                                    </div>
                                </>
                                )
                            })                        
                        }
                </div>
                
                {  !isLoading && (data?.data?.product_advert?.noOfPages > 0) && <>
                        <div 
                            className="container px-2 mr-3 border-2 border-gray-200 flex justify-between items-center mb-5"
                        >
                            <h1 
                                className='font-bold w-full p-3 uppercase'
                            >
                                Active Products
                            </h1>
                            <span className="flex justify-center items-center  whitespace-nowrap">Page {currentPage} of {data?.data?.product_advert?.noOfPages}</span>
                        </div>
                    </>
                }

            <div className="mt-14">
                { 
                    !isLoading && isRefetching && (data?.data?.product_advert?.noOfPages > 0) && 
                            <Pagination onClick={(data) => {
                                      setCurrentPage(data)
                                      setTimeout(() => {
                                          refetch()   
                                      }, 1000)
                                  } 
                              } 
                              perPageNo={perPage} 
                              currentPageNo={currentPage} 
                              noOfPages={data?.data?.product_advert?.noOfPages} 
                              hasNextPage={data?.data?.product_advert?.hasNextPage} 
                              hasPreviousPage={data?.data?.product_advert?.hasPreviousPage} 
                          />    
                }
            </div>

            <div className="mt-14">
                { 
                    !isLoading && !isRefetching && (data?.data?.product_advert?.noOfPages > 0) && 
                            <Pagination onClick={(data) => {
                                      setCurrentPage(data)
                                      setTimeout(() => {
                                          refetch()   
                                      }, 1000)
                                  } 
                              } 
                              perPageNo={perPage} 
                              currentPageNo={currentPage} 
                              noOfPages={data?.data?.product_advert?.noOfPages} 
                              hasNextPage={data?.data?.product_advert?.hasNextPage} 
                              hasPreviousPage={data?.data?.product_advert?.hasPreviousPage} 
                          />    
                }
            </div>

            
         {  openMarkAsSold &&  <MarkAsSolModal 
                        onClick={() => {
                                setOpenMarkAsSold(false)
                        } } 
                        asSoldModal={openMarkAsSold}
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


      </div>
    )
}
