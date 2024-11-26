import React from 'react'
import { useRouter } from 'next/navigation'
import { BsGeoAltFill } from 'react-icons/bs'
import { USAGE_PATH } from '../constant/Path'
import currencyFormatter from './util/currency-formatter'



export default function Featured(product: any) 
{
  const router = useRouter()

  return (
        <div 
            className='col-span-12 md:col-span-12 lg:col-span-3 mb-5 md:mb-5 hover:rounded-md hover:p-1 hover:border-1 hover:border-green-800 border-shadow cursor-pointer'
            onClick={() => 
            {
                router.push(`/product-detail/${product?.product?.slug}`)
            }
            }
        >
            <div className="w-full">
                <div 
                    className="bg-white shadow-lg hover:shadow-xl rounded-lg hover:pb-1 hover:bg-green-100"
                >
                    <div 
                        className="border border-4 border-blue-50 h-fit rounded-t-lg bg-no-repeat bg-center bg-cover relative flex justify-center items-center"
                        >
                        <img src={`${USAGE_PATH.PRODUCT_FACE}${product?.product?.face_image}`} />
                        <div 
                            className="text-right"
                        >
                        </div>
                        <img 
                                src={`${USAGE_PATH.WATER_MARK}${product?.product?.water_mark}`}
                                className='absolute top-center w-27 h-10' 
                        />
                    </div>
                    <div className="d-flex gap-3 pb-5 items-start px-2 md:px-4 pt-2 border-1">
                        <div className="text-[17px] md:text-[19px] lg:text-[20px] w-full font-bold "
                            >
                            {product?.product?.title}
                        </div>
                        <div className="text-[15px] md:text-[16px] lg:text-[18px] w-full font-bold"
                            >
                            <span 
                                className='uppercase font-bold ml-1 text-green-500'
                            >
                                { currencyFormatter(product?.product?.price) }
                            </span>
                        </div>
                        <div 
                            className="flex justify-left items-center text-[14px] md:text-[15px] lg:text-[16px] w-full text-red-500"
                        >
                            <BsGeoAltFill className='w-3 h-3' />
                            <span 
                                className='uppercase text-red-500 font-bold ml-1'
                            >
                                {product?.product?.country?.name}
                            </span>
                            <span 
                                className='ml-2 text-blue-500 font-bold'
                            >
                                {product?.product?.state?.name}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
  )
}
