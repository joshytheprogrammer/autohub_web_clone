import React from 'react'
import { useRouter } from 'next/navigation'
import { BsGeoAltFill } from 'react-icons/bs'
import { USAGE_PATH } from '../constant/Path'
import WishList from './WishList'
import currencyFormatter from './util/currency-formatter'
import { useQuery } from '@tanstack/react-query'
import { ProductWishList } from '../app/api/home/market/advert/Comments'
import { UseStore } from '../state/store'



type ProductDetail = 
{
    product: ActiveProduct
    refetchs: () => void
}

export default function ProductCard({ product, refetchs }: ProductDetail) 
{
    const user = UseStore((state) => state)
    const u: boolean = user.getUserToken() ? true : false
    const token: string = user.getUserToken()
    const type: string = user.getUType()

    const { data, isLoading, refetch } = useQuery({ queryKey: [`product_wish-list`], queryFn: () => ProductWishList(token, type), enabled: u })
    const router = useRouter()

    return (
              !isLoading && 
                <div 
                    className='col-span-6 md:col-span-3 lg:col-span-3 mb-5 md:mb-5 hover:rounded-md hover:p-1 hover:border-1 hover:border-green-800 border-shadow cursor-pointer'
                >
                    <div className="w-full">
                        <div 
                            className="bg-white shadow-lg hover:shadow-xl rounded-lg hover:pb-1 hover:bg-green-100"
                        >
                            <div 
                                className="border border-4 border-blue-50 h-fit rounded-t-lg bg-no-repeat bg-center bg-cover relative flex justify-center items-center"
                                >
                                <img    
                                    src={`${USAGE_PATH.PRODUCT_FACE}${product?.face_image}`} 
                                    onClick={() => 
                                      {
                                         router.push(`/product-detail/${product?.slug}`)
                                      }
                                    }
                                />
                                <div 
                                    className="text-right"
                                >
                                </div>
                                <img 
                                    src={`${USAGE_PATH.WATER_MARK}${product?.water_mark}`}
                                    className='absolute top-center w-27 h-10 hidden md:block' 
                                    onClick={() => 
                                      {
                                         router.push(`/product-detail/${product?.slug}`)
                                      }
                                    }
                                />
                                <img 
                                    src={`${USAGE_PATH.WATER_MARK}${product?.water_mark}`}
                                    className='absolute top-center w-17 h-7' 
                                    onClick={() => 
                                      {
                                        router.push(`/product-detail/${product?.slug}`)
                                      }
                                    }
                                />
                                <WishList 
                                    productId={product?.tb_id} 
                                    data={data} 
                                    onClick={() => 
                                    {
                                        refetch()
                                        refetchs()
                                    }}
                                    token={token}
                                    type={type}
                                />
                            </div>
                            <div 
                                className="d-flex gap-3 pb-5 items-start px-2 md:px-4 pt-2 border-1"
                                onClick={() => {
                                    router.push(`/product-detail/${product?.slug}`)                                    
                                }}
                            >
                                <div 
                                    className="text-[16px] md:text-[18px] lg:text-[20px] w-full text-green-600 font-bold "
                                >
                                    {product?.title}
                                </div>
                                <div className="text-[14px] md:text-[15px] lg:text-[17px] w-full text-blue-700 font-bold"
                                    >
                                    <span 
                                        className='uppercase font-bold ml-1'
                                    >
                                        { currencyFormatter(product?.price) }
                                    </span>
                                </div>
                                <div 
                                    className="flex justify-left items-center text-[12px] md:text-[13px] lg:text-[15px] w-full text-red-500"
                                >
                                    <BsGeoAltFill className='w-2 h-2 md:w-3 md:h-3' />
                                    <span 
                                        className='uppercase font-bold ml-1 md:text-[13px] text-[11px]'
                                    >
                                        {product?.country}
                                    </span>
                                    <span 
                                        className='ml-2'
                                    >
                                        {product?.state}
                                    </span>
                                </div>
                                <div 
                                    className="flex justify-between items-center text-[14px] md:text-[15px] lg:text-[16px] w-full text-red-500 mt-2"
                                >
                                    <span 
                                        className='w-6/12 md:w-4/12 whitespace-nowrap flex justify-center pb-1 hover:bg-blue-600 border-2 border-blue-200 text-black hover:text-white hover:font-bold text-[10px] md:text-[13px] rounded-lg md:px-3 px-1 py-1'
                                    >
                                        {product?.condition}
                                    </span>
                                    { (product?.mileage != '0km') &&
                                        <span 
                                            className='w-6/12 md:w-4/12 whitespace-nowrap flex justify-center pb-1 hover:bg-blue-600 ml-2 border-2 border-blue-200 text-black hover:text-white hover:font-bold text-[10px] md:text-[13px] rounded-lg md:px-3 px-1 py-1'
                                        >
                                            {product?.mileage}
                                        </span>
                                    }
                                    {   (product?.engine != 'ns') &&
                                        <span 
                                        className='w-6/12 md:w-4/12 whitespace-nowrap flex justify-center pb-1 hover:bg-blue-600 ml-2 border-2 border-blue-200 text-black hover:text-white hover:font-bold text-[10px] md:text-[13px] rounded-lg md:px-3 px-1 py-1'
                                        >
                                            { product?.engine }
                                        </span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    )
    
}
