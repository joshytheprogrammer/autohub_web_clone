import React from 'react'
import { useRouter } from 'next/navigation'
import { BsGeoAltFill } from 'react-icons/bs'
import { USAGE_PATH } from '../constant/Path'
import WishList from './WishList'
import currencyFormatter from './util/currency-formatter'
import { useQuery } from '@tanstack/react-query'
import { ProductWishList } from '../app/api/home/market/advert/Comments'
import toast from "react-hot-toast"
import { UseStore } from '../state/store'



type ProductDetail = 
{
    product: ActiveProduct
}

export default function ProductCard({ product }: ProductDetail) 
{
    const user = UseStore((state) => state)
    const u: boolean = user.getUserToken() ? true : false
    const token: string = user.getUserToken()
    const type: string = user.getUType()

    const { data, refetch } = useQuery({ queryKey: [`product_wish-list`], queryFn: () => ProductWishList(token, type), enabled: u })
    const router = useRouter()

    return (
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
                                    className='absolute top-center w-27 h-10' 
                            />
                            <WishList 
                                productId={product?.tb_id} 
                                data={data} 
                                onClick={() => 
                                {
                                    refetch()
                                }}
                                token={token}
                                type={type}
                            />
                        </div>
                        <div className="d-flex gap-3 pb-5 items-start px-2 md:px-4 pt-2 border-1">
                            <div className="text-[17px] md:text-[19px] lg:text-[20px] w-full text-green-600 font-bold "
                                >
                                {product?.title}
                            </div>
                            <div className="text-[20px] md:text-[17px] lg:text-[20px] w-full text-blue-700 font-bold"
                                >
                                <span 
                                    className='uppercase font-bold ml-1'
                                >
                                    { currencyFormatter(product?.price) }
                                </span>
                            </div>
                            <div 
                                className="flex justify-left items-center text-[14px] md:text-[15px] lg:text-[16px] w-full text-red-500"
                            >
                                <BsGeoAltFill className='w-3 h-3' />
                                <span 
                                    className='uppercase font-bold ml-1'
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
                                    className='w-4/12 flex justify-center pb-1 hover:bg-blue-600 ml-1 border-2 border-blue-200 text-black hover:text-white hover:font-bold text-[12px] md:text-[13px] rounded-lg md:px-3 px-2 px-1 py-1'
                                >
                                    {product?.condition}
                                </span>
                                { (product?.mileage != '0km') &&
                                    <span 
                                        className='w-4/12 flex justify-center pb-1 hover:bg-blue-600 ml-2 border-2 border-blue-200 text-black hover:text-white hover:font-bold text-[12px] md:text-[13px] rounded-lg md:px-3 px-2 px-1 py-1'
                                    >
                                        {product?.mileage}
                                    </span>
                                }
                                {   (product?.engine != 'ns') &&
                                    <span 
                                    className='w-4/12 flex justify-center pb-1 hover:bg-blue-600 ml-2 border-2 border-blue-200 text-black hover:text-white hover:font-bold text-[12px] md:text-[13px] rounded-lg md:px-3 px-2 px-1 py-1'
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
