"use client"

import { useParams, useRouter } from "next/navigation"
import DOMPurify from "dompurify"
import { HiArrowLeft, HiHome, HiMiniPhoneArrowUpRight } from "react-icons/hi2"
import { ProductDetailProps, useProductDetail } from "../../../hook/queries/useProductDetail"
import { RotateLoader } from "react-spinners"
import Image from 'next/image'
import { USAGE_PATH } from "../../../../constant/Path"
import currencyFormatter from "../../../../components/util/currency-formatter"
import WebCategory from "../../../../components/category/WebCategory"
import SlideShowThumbnail from "../../../../components/SlideShowThumbnail"
import ownACar from '../../../../public/own-a-car.png'
import swap from '../../../../public/swap-car.png'
import Featured from "../../../../components/Featured"
import Follow from "../../../../components/Follow"
import ProductComment from "../../../../components/ProductComment"


export default function ProductDetail() 
{  
  const params = useParams<ProductDetailProps>()  
  const router = useRouter()
  const { data, isLoading, completed, category, featured } = useProductDetail(params?.slug)


  return (
          <>                
              {
                  ((isLoading === false) && ((completed === "no") || (completed === ""))) && <div className="col-span-12 h-[300px] flex justify-center items-center" style={{ marginTop: '60px', paddingTop: '0px' }}
                  >
                      <RotateLoader className='w-12 h-12' />
                  </div>
              }  
              {
                  ((isLoading === true) && ((completed === "no") || (completed === ""))) &&  <div className="col-span-12 h-[300px] flex justify-center items-center" style={{ marginTop: '60px', paddingTop: '0px' }}
                  >
                      <h1>No Product</h1>
                  </div>
              }

              { 
                  ((isLoading === false) && (completed === "yes")) && <div 
                      className="container mx-auto mb-20 md:mt-2"
                  >
                      <div 
                          className="grid grid-cols-12"
                      >
                          <div 
                              className="hidden md:block col-span-3 p-5"
                          >
                               {/* <img src={ownACar} alt="" className="mb-3" />  */}
                               <Image className="object-cover" src={ownACar} alt={""} />                               
                               <Image className="object-cover" src={swap} alt={""} />
                          </div>
                          <div 
                              className="col-span-12 md:col-span-6 p-5 d-flex justify-between border-shadow border-2 border-gray-100"
                          >
                              <div 
                                  className="w-full flex justify-between items-center "
                              >                                
                                  <div 
                                      className="flex justify-between items-center bg-white rounded-md cursor-pointer"
                                      onClick={() => { router.back() }}
                                  >
                                      <HiArrowLeft className="font-bold rounded-full hover:border-4 hover:border-green-300" style={{ fontSize: '30px', fontWeight: 'bolder', padding: '3px' }} />
                                  </div>
                                  <div 
                                      className="rounded-md flex justify-between items-center"
                                  >
                                      <div 
                                          className="flex justify-center items-center bg-white rounded-lg px-2"
                                        >
                                          <HiHome className="mr-2 text-blue-500" /> 
                                          {'>>'} 
                                          <span 
                                              className="font-bold ml-2 text-sm mr-3 text-green-600 cursor-pointer hover:text-red-700"
                                              onClick={() => {
                                                  router.push(`/x-x-x/${data?.['category']['hash']}`)
                                              }}
                                          >
                                              {data?.['category']['name']}
                                          </span> 
                                          {'>>'} 
                                          <span 
                                            className="font-bold ml-2 text-sm"
                                          >
                                              {data?.['title']}
                                          </span>
                                      </div>
                                  </div>
                              </div>
                              <div 
                                className="font-bold text-[30px] text-gray-500 mt-5"
                              >
                                {data?.['title']}
                              </div>
                              <div 
                                className="font-bold text-sm mt-1 flex justify-between items-center"
                              >
                                <span className="text-blue-600">Date: {data?.['created_at']}</span>
                                <span 
                                    className="text-blue-500 text-sm flex justify-center items-center"
                                >
                                  <p className="text-black mr-3">Views: </p><p className='font-bold text-lg text-red-500'>{data?.['views']}</p>
                                </span>
                              </div>
                              <div 
                                className="font-bold text-md mt-7 flex justify-between items-center"
                              >
                                <span 
                                    className="text-blue-600"
                                >
                                  <img src={`${USAGE_PATH.AVATAR}${data?.['user']['passport']}`} className="rounded-full" width={70} height={70} />
                                </span>                                
                                <Follow vendorId={`${data?.['user_id']}`} user={data?.['user_id']!} />
                                <span 
                                    className="text-blue-500 text-sm flex justify-center items-center"
                                >
                                  <p className="text-black mr-3">Comments: </p><p className='font-bold text-lg'>{data?.['comments_count']}</p>
                                </span>
                              </div>
                              <div 
                                  className="font-bold text-dm text-gray-500 mt-5"
                              >
                                 <span className="text-gray-500">Advertiser is: </span><span className="text-red-700 font-bold">{data?.['user']['online']}</span>
                              </div>
                              <div 
                                  className="font-bold text-md text-gray-500 mt-5 border-shadow"
                              >
                                 <SlideShowThumbnail data={data?.['images']} imageSize={data?.['images']} waterMark={data?.['water_mark']} />
                              </div>
                              <div 
                                  className="font-bold w-full text-dm text-gray-500 mt-2 h-fit pb-10 rounded-md border-shadow"
                              >
                                  <div 
                                      className="font-bold text-sm pt-5 pr-3 w-2/2"
                                  >
                                    Description:
                                  </div>
                                  <div 
                                    className="pt-3 pb-5 mt-2 px-3 border-2 border-blue-200 rounded-lg"
                                  >
                                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.['description']!) }} ></div>
                                  </div>
                              </div>
                              <div 
                                  className="grid md:grid-cols-12 grid-cols-12 gap-5 -mt-5 mb-2">
                                  <div 
                                      className="flex md:col-span-6 col-span-12 -mb-1 md:mb-0 w-full rounded-md"
                                  >
                                      <div className="bg-blue-500 py-3 px-4 d-flex sm:pt-5 md:px-2 md:py-2 flex justify-center item-center"> 
                                          <HiMiniPhoneArrowUpRight className="text-white" />
                                      </div>
                                      <a href={`tel:${data?.['user']['phone']}`} className="bg-green-700 rounded-br-md rounded-tr-md w-full px-3 py-2 text-xs justify-center font-bold text-white col-span-6">
                                          <span className="text-sm w-full flex justify-center text-center">Advertiser</span>
                                      </a>
                                  </div>
                                  <div 
                                      className="flex md:col-span-6 col-span-12 bg-green-700 -mb-1 md:mb-0 w-full rounded-md"
                                  >
                                      <div 
                                          className="bg-blue-500 py-3 px-4 d-flex sm:pt-5 md:px-2 md:py-2 flex justify-center item-center"
                                      > 
                                          <HiMiniPhoneArrowUpRight className="text-white" />
                                      </div>
                                      <a href={`tel:${data?.['user']['phone']}`} className="bg-green-700 rounded-br-md rounded-tr-md w-full px-3 py-2 text-xs justify-center font-bold text-white col-span-6">
                                          <span className="text-sm w-full flex justify-center text-center">For Complaint</span>
                                      </a>
                                  </div>    
                              </div>

                              <div 
                                  className="w-full rounded-xl bg-white p-[1px] min-h-[250px] h-max"
                              >
                                  <div 
                                      className="px-1 my-4 flex-col flex gap-2"
                                  >
                                    <div 
                                        className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center"
                                    >
                                      <p>Manufacturer:</p>
                                      <p className="text-brandGreen">
                                        {`${data?.['manufacturer']['name']}`}
                                      </p>
                                    </div>
                                    <div 
                                        className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center"
                                    >
                                      <p>Model:</p>
                                      <p className="text-brandGreen">
                                        {`${data?.['model']['name']}`}
                                      </p>
                                    </div>                        
                                    <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                                        <p>Trim:</p>
                                        {`${data?.['trim']['name']}`}
                                    </div>                     
                                    <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                                        <p>Trim:</p>
                                        {`${data?.['engine']['name']}`}
                                    </div>
                                    <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                                      <p>Colour:</p>
                                      <p className="text-brandGreen">
                                        {`${data?.['colour']['name']}`}
                                      </p>
                                    </div>
                                    {/* Transmission */}
                                    <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                                      <p>Transmission:</p>
                                      <p className="text-brandGreen">
                                        {`${data?.['transmission']['name']}`}
                                      </p>
                                    </div>
                                    {/* Year */}
                                    <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                                      <p>Year:</p>
                                      <p className="text-brandGreen">
                                        {`${data?.['year']}`}
                                      </p>
                                    </div>
                                    {/* Price */}
                                    <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                                      <p>Price:</p>
                                      <p className="text-brandGreen">
                                        {currencyFormatter(data?.['price'])}
                                      </p>
                                    </div>
                                    <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                                    <p>Sellable at:</p>
                                    { (data?.['min_price'] != 0) && (data?.['max_price'] != 0) ? 
                                        <>
                                          <p className="text-brandGreen">{currencyFormatter(data?.['min_price'])}</p>
                                          <p className="text-brandGreen">{currencyFormatter(data?.['max_price'])}</p>
                                        </>
                                        :
                                        <>
                                          <p className="text-brandGreen">{currencyFormatter(data?.['max_price'])}</p> 
                                        </>                          
                                    }
                                  </div>
                                  {/* Door */}
                                  <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                                    <p>Country</p>
                                    <p className="text-brandGreen">
                                      {`${data?.['country']['name']}`}
                                    </p>
                                  </div>
                                  <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                                    <p>State</p>
                                    <p className="text-brandGreen">
                                      {`${data?.['state']['name']}`}
                                    </p>
                                  </div>
                                  {/* Seat */}
                                  <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                                    <p>Location:</p>
                                    <p className="text-brandGreen">
                                      {`${data?.['address']}`}
                                    </p>
                                  </div>
                                  <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                                    <p>MileAge:</p>
                                    <p className="text-brandGreen">{((data?.['mileage']) === "" || (data?.['mileage']) === undefined || (data?.['mileage']) === null) ? 'Not Specified' : `${((data?.['mileage'])/1000)}km` }</p>
                                  </div>
                                </div>
                              </div>

                              <ProductComment productId={`${data?.['id']}`} vendorId={`${data?.['user_id']}`} userId={12} />

                              <div className="h-[10px]"></div>

                          </div>
                          <div 
                              className="hidden md:block col-span-3 p-5"
                          >
                              <div 
                                className="bg-blue-200 py-2 font-semibold px-3 rounded-md"
                              >
                                All Categories
                              </div>
                              <WebCategory data={category} />
                              <div 
                                className="bg-blue-200 py-2 font-semibold px-3 rounded-md mt-10 mb-3"
                              >
                                Featured Products
                              </div>

                              <div 
                                  className="w-full"
                              >
                                  {
                                      featured?.map((product: any, index: number) => {
                                        return (
                                          <Featured product={product}  />
                                        )
                                      })
                                  }
                              </div>



                          </div>
                      </div>
                  </div>
              }
          </>
  )
}
