import React from 'react'
// import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { BsGeoAltFill } from 'react-icons/bs'
import { USAGE_PATH } from '../constant/Path'
import WishList from './WishList'
import currencyFormatter from './util/currency-formatter'
import { useQuery } from '@tanstack/react-query'
import { ProductWishList } from '../app/api/home/market/advert/Comments'
import { UseStore } from '../state/store'
import { useProduct } from '../app/hook/market-place/useProduct'


type ProductDetail = 
{
    product: ActiveProduct
    refetchs: () => void
}

const getUserWishList = async () => 
{
  let ApiUrl = `${process.env.URL}/api/users/wish-list`
  return await fetch(ApiUrl).then((res) => res.json())  
}

export default function ProductCard({ product, refetchs }: ProductDetail) 
{
    const { UserWishList } = useProduct()
    const user = UseStore((state) => state)
    const token: string = user.getUserToken()
    const u: boolean = user.getUserToken() ? true : false
    const type: string = user.getUType() || 'member'
    const router = useRouter()

    // const { data, isLoading, refetch } = useQuery(
    //                                                 { queryKey: [`user-wish-list`], 
    //                                                   queryFn: () => getUserWishList(),
    //                                                   enabled: u 
    //                                                 }
    //                                             )

    const { data, isLoading, refetch } = useQuery({ queryKey: [`product_wish-list`], queryFn: () => ProductWishList(token, type), enabled: u })

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
                                <div 
                                    className='w-full'
                                >
                                    <div 
                                        className='flex max-h-64 h-full'
                                    >
                                        <img    
                                            src={`${product?.face_image}`} 
                                            // src={`${product?.face_image}`} 
                                            className='object-cover'
                                            onClick={() => 
                                            {
                                                router.push(`/product-detail/${product?.slug}`)
                                            }
                                            }
                                        />
                                    </div>
                                    {/* <Image 
                                        src={`${USAGE_PATH.PRODUCT_FACE}${product?.face_image}`} 
                                        alt={`${product?.face_image}`}
                                        layout='fill'
                                        className='object-fit '
                                        onClick={() => 
                                        {
                                            router.push(`/product-detail/${product?.slug}`)
                                        }
                                        } 
                                    />  */}
                                </div>
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
                                />
                            </div>
                            <div 
                                className="d-flex gap-3 pb-5 items-start px-2 md:px-4 pt-2 border-1"
                                onClick={() => {
                                    router.push(`/product-detail/${product?.slug}`)                                    
                                }}
                            >
                                <div 
                                    className="text-[14px] md:text-[13px] lg:text-[18px] w-full text-green-600 font-bold "
                                >
                                    {product?.title}
                                </div>
                                <div className="text-[13px] md:text-[13px] lg:text-[15px] w-full text-blue-700 font-bold"
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
                                        {product?.state}
                                    </span>
                                    <span 
                                        className='ml-2'
                                    >
                                        {`${(product?.lga === "Not specified" ? "" : product?.lga  )}`}
                                    </span>
                                </div>
                                <div 
                                    className="flex justify-between items-center w-full text-red-500 mt-2 gap-1"
                                >
                                    <span 
                                        className='w-4/12 md:w-3/12 whitespace-nowrap flex justify-center pb-1 hover:bg-blue-600 border-2 border-blue-200 text-black hover:text-white hover:font-bold text-[8px] md:text-[12px] rounded-lg md:px-3 px-1 py-1'
                                    >
                                        {product?.condition}
                                    </span>                                    
                                    {   (product?.trim != 'Not specified') &&
                                        <span 
                                        className='w-6/12 md:w-6/12 whitespace-nowrap truncate flex justify-center pb-1 hover:bg-blue-600 border-2 border-blue-200 text-black hover:text-white hover:font-bold text-[8px] md:text-[13px] rounded-lg md:px-3 px-5 py-1'
                                        >
                                            { product?.trim }
                                        </span>
                                    }
                                    { (product?.mileage != '0km') &&
                                        <span 
                                            className='w-3/12 md:w-3/12 whitespace-nowrap flex justify-center pb-1 hover:bg-blue-600 border-2 border-blue-200 text-black hover:text-white hover:font-bold text-[8px] md:text-[12px] rounded-lg md:px-3 px-1 py-1'
                                        >
                                            {product?.mileage}
                                        </span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    )
    
}
