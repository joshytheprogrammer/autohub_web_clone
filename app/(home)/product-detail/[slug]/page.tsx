"use client"

import { useRouter } from "next/navigation"
import DOMPurify from "dompurify"
import { HiArrowLeft, HiHome, HiMiniPhoneArrowUpRight } from "react-icons/hi2"
import { useProductDetail } from "../../../hook/queries/useProductDetail"
// import { PuffLoader } from "react-spinners"
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
import Link from "next/link"


export default function ProductDetail({ params } : { params : { slug: string } }) 
{   
  const router = useRouter()
  const { data, isLoading, completed, category, featured } = useProductDetail(params?.slug)

  return (
          <>  
              {
                  (isLoading === true) && <div className="col-span-12 h-[750px] flex justify-center items-center" style={{ marginTop: '20px', paddingTop: '0px' }}
                  >
                      {/* <PuffLoader className='w-12 h-12' /> */}
                  </div>
              }              
              {/* {
                  ((isLoading === false) && ((completed === "no") || (completed === ""))) && <div className="col-span-12 h-[300px] flex justify-center items-center" style={{ marginTop: '60px', paddingTop: '0px' }}
                  >
                      <PuffLoader className='w-12 h-12' />
                  </div>
              }   */}
              {/* {
                  ((isLoading === true) && ((completed === "no") || (completed === ""))) &&  <div className="col-span-12 h-[300px] flex justify-center items-center" style={{ marginTop: '60px', paddingTop: '0px' }}
                  >
                      <h1>No Product</h1>
                  </div>
              } */}

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
                               <Image className="object-cover" src={ownACar} alt={"banner-1"} />         
                                {/* <Nice /> */}
                               <Image className="object-cover" src={swap} alt={"banner-2"} />
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
                                          <Link 
                                            href={'/'}
                                          >
                                              <HiHome 
                                                  className="mr-2 text-blue-500" 
                                              /> 
                                          </Link>
                                          {'>>'} 
                                          <span 
                                              className="font-bold ml-2 text-sm mr-3 text-green-600 cursor-pointer hover:text-red-700"
                                              onClick={() => {
                                                  router.push(`/x-x-x/${data?.['hash']}`)
                                              }}
                                          >
                                              {data?.['category']}
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
                                    className="font-bold text-[23px] md:text-[30px] text-gray-500 mt-5 mb-2"
                                >
                                   {data?.['title']}
                              </div>
                              <div 
                                  className="font-bold text-sm mt-1 flex justify-between items-center"
                                >
                                  <span className="text-blue-600 text-[14px] md:text-[14px]">{data?.['date']}</span>
                                  <span 
                                    className="text-blue-500 text-[12px] md:text-[14px] flex justify-center items-center"
                                  >
                                    {/* <p className="text-black mr-3">Comments: </p><p className='font-bold text-[14px] md:text-[16px]'>{data?.['comments_count']}</p> */}
                                  </span>
                                  <span 
                                    className="text-blue-500 text-[12px] md:text-[14px] flex justify-center items-center"
                                  >
                                    <p className="text-black mr-3">Views: </p><p className='font-bold text-[14px] md:text-[16px] text-red-500'>{data?.['views']}</p>
                                  </span>
                              </div>
                              <div 
                                className="font-bold text-md mt-2 flex justify-between items-center"
                              >
                                <section 
                                    className="text-blue-600 flex"
                                >
                                  <img src={`${USAGE_PATH.AVATAR}${data?.['passport']}`} className="rounded-full" width={70} height={70} />
                                  {/* <img src={`${data?.['passport']}`} className="rounded-full" width={70} height={70} /> */}
                                  <span className="font-bold ml-5 mt-1 md:mt-5">{data?.['firstname']} {data?.['surname']}</span>
                                </section>
                                <span 
                                    className="text-blue-500 text-sm flex justify-center items-center"
                                >
                                    <Follow vendorId={`${data?.['user_id']}`} user={data?.['user_id']!} />
                                </span>
                              </div>
                              <div 
                                  className="font-bold text-dm text-gray-500 mt-5"
                              >
                                 {/* <span className="text-gray-500">Advertiser is: </span><span className="text-red-700 font-bold">{data?.['user']['online']}</span> */}
                              </div>
                              <div 
                                  className="font-bold text-md text-gray-500 mt-5 border-shadow"
                              >
                                 <SlideShowThumbnail data={data?.['images']} imageSize={data?.['images']} waterMark={data?.['watermark']} />
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
                                      <a href={`tel:${data?.['phone']}`} className="bg-green-700 rounded-br-md rounded-tr-md w-full px-3 py-2 text-xs justify-center font-bold text-white col-span-6">
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
                                      <a href={`tel:${`+23409033333367`}`} className="bg-green-700 rounded-br-md rounded-tr-md w-full px-3 py-2 text-xs justify-center font-bold text-white col-span-6">
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
                                        {`${data?.['manufacturer']}`}
                                      </p>
                                    </div>
                                    <div 
                                        className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center"
                                    >
                                      <p>Model:</p>
                                      <p className="text-brandGreen">
                                        {`${data?.['model']}`}
                                      </p>
                                    </div>                        
                                    <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                                        <p>Trim:</p>
                                        { data?.['trim'] ? `${data?.['trim']}` : 'Not Specififed' }
                                    </div>                     
                                    <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                                        <p>Engine:</p>
                                        { data?.['engine'] ? `${data?.['engine']}` : 'Not Specififed' }
                                    </div>
                                    <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                                      <p>Colour:</p>
                                      <p className="text-brandGreen">
                                        {`${data?.['colour']}`}
                                      </p>
                                    </div>
                                    {/* Transmission */}
                                    <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                                      <p>Transmission:</p>
                                      <p className="text-brandGreen">
                                        {`${data?.['transmission']}`}
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
                                    {/* <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
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
                                  </div> */}
                                  {/* Door */}
                                  <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                                    <p>Country</p>
                                    <p className="text-brandGreen">
                                      {`${data?.['country']}`}
                                    </p>
                                  </div>
                                  <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                                    <p>State</p>
                                    <p className="text-brandGreen">
                                      {`${data?.['state']}`}
                                    </p>
                                  </div>
                                  {/* Seat */}
                                  <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                                    <p>Location:</p>
                                    <p className="text-brandGreen">
                                      {`${data?.['location']}`}
                                    </p>
                                  </div>
                                  <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                                    <p>MileAge:</p>
                                    <p className="text-brandGreen">{((data?.['mileage']) === "" || (data?.['mileage']) === undefined || (data?.['mileage']) === null) ? 'Not Specified' : `${((data?.['mileage'])/1000)}km` }</p>
                                  </div>
                                </div>
                              </div>

                              <ProductComment productId={`${data?.['product_id']}`} vendorId={`${data?.['user_id']}`} />

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
                                          <Featured key={index} product={product}  />
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


