"use client"

import { useRouter } from "next/navigation"
import DOMPurify from "dompurify"
import { HiArrowLeft, HiHome, HiMiniPhoneArrowUpRight } from "react-icons/hi2"
import { useProductDetail } from "../../../hook/queries/useProductDetail"
// import { PuffLoader } from "react-spinners"
import Image from 'next/image'
import { MdOutlineWhatsapp } from "react-icons/md"
// import { USAGE_PATH } from "../../../../constant/Path"
import currencyFormatter from "../../../../components/util/currency-formatter"
import WebCategory from "../../../../components/category/WebCategory"
import ownACar from '../../../../public/own-a-car.png'
import swap from '../../../../public/swap-car.png'
import Featured from "../../../../components/Featured"
import Follow from "../../../../components/Follow"
import ProductComment from "../../../../components/ProductComment"
import Link from "next/link"
import { isMobile } from "react-device-detect"
import ProductCardd from "../../../../components/ProductCardd"
import SlideThumbnail from "../../../../components/SlideThumbnail"
import { useQuery } from "@tanstack/react-query"
import api from "../../../api/api"
import { PuffLoader } from "react-spinners"
import { RequestPoint } from "../../../api/endPoint"
import { useProduct } from "../../../hook/market-place/useProduct"


type displayProps = 
{
   url: string
}

export default function Display(url: displayProps) 
{
  const { ProductDetail } = useProduct()
  const router = useRouter()
  const { data, isLoading, refetch } = useQuery({ queryKey: [`get-product-detail`, url?.url], queryFn: () => ProductDetail(url?.url)})

  return (
      
          <>  
              {
                  isLoading && <div className="col-span-12 h-[750px] flex justify-center items-center" style={{ marginTop: '20px', paddingTop: '0px' }}
                  >
                      <PuffLoader className='w-12 h-12' />
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
                  !isLoading && 
                  <>
                    <div 
                        className="container mx-auto mb-10 md:mt-2"
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
                                                    router.push(`/x-x-x/${data?.data?.data?.product?.hash}`)
                                                }}
                                            >
                                                {data?.data?.data?.product?.category}
                                            </span> 
                                            {'>>'} 
                                            <span 
                                              className="font-bold ml-2 text-sm line-clamp-1"
                                            >
                                                {data?.data?.data?.product?.title}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div 
                                  className="font-bold text-[21px] md:text-[30px] text-gray-500 mt-5 mb-2"
                                >
                                    {data?.data?.data?.product?.title}
                                </div>
                                <div 
                                    className="font-bold text-sm mt-1 flex justify-between items-center"
                                  >
                                    <span className="text-blue-600 text-[14px] md:text-[14px]">{data?.data?.data?.product?.date}</span>
                                    <span 
                                      className="text-blue-500 text-[12px] md:text-[14px] flex justify-center items-center"
                                    >
                                      {/* <p className="text-black mr-3">Comments: </p><p className='font-bold text-[14px] md:text-[16px]'>{data?.['comments_count']}</p> */}
                                    </span>
                                    <span 
                                      className="text-blue-500 text-[12px] md:text-[14px] flex justify-center items-center"
                                    >
                                      <p className="text-black mr-3">Views: </p><p className='font-bold text-[14px] md:text-[16px] text-red-500'>{data?.data?.data?.product?.views}</p>
                                    </span>
                                </div>
                                <div 
                                  className="font-bold text-md mt-3 flex justify-between items-right"
                                >
                                  <section 
                                      className="text-blue-600 flex justify-center items-center"
                                  >
                                    <div 
                                      className=""
                                    >
                                        <img src={data?.data?.data?.product?.passport} className="rounded-full" width={45} height={25} />
                                    </div>
                                    <div 
                                      className="d-flex gap-10 ml-2"
                                    >
                                        <div className="w-full font-bold -mt-3 text-sm md:text-md">{data?.data?.data?.product?.firstname} {data?.data?.data?.product?.surname}</div>
                                        <div className="w-full font-bold text-sm md:text-[12px] uppercase text-black">{data?.data?.plus} </div>
                                        {/* <div className="w-full font-bold ml-2 text-center w-fit mx-3 px-5 -mt-1 text-sm md:text-md">{plus} </div> */}
                                    </div>
                                    {/* <Image src={`${USAGE_PATH.AVATAR}${data?.['passport']}`} alt={`${data?.['passport']}`} width={70} height={70} className='rounded-full' />  */}
                                    {/* <img src={`${data?.['passport']}`} className="rounded-full" width={70} height={70} /> */}
                                  </section>
                                  <section 
                                      className="text-blue-500 text-sm flex justify-center items-center"
                                  >
                                    <div 
                                      className=""
                                    >
                                        <Follow vendorId={data?.data?.data?.product?.user_id} user={data?.data?.data?.product?.user_id} />
                                    </div>                                    
                                  </section>
                                </div>
                                <div 
                                    className="font-bold text-dm text-gray-500 mt-5"
                                >
                                  {/* <span className="text-gray-500">Advertiser is: </span><span className="text-red-700 font-bold">{data?.['user']['online']}</span> */}
                                </div>
                                <div 
                                    className="font-bold text-md text-gray-500 mt-5 border-shadow"
                                >
                                  <SlideThumbnail data={data?.data?.data?.product?.images} imageSize={data?.data?.data?.product?.images} waterMark={data?.data?.data?.product?.waterMark} slug={url?.url} />
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
                                      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.data?.data?.product?.description) }} ></div>
                                    </div>
                                </div>
                                <div 
                                    className="grid md:grid-cols-12 grid-cols-12 gap-5 -mt-5 mb-2">
                                    <div 
                                        className="flex md:col-span-5 col-span-12 -mb-1 md:mb-0 w-full rounded-md"
                                    >
                                        {/* tel:+23409033333367   -  data?.data?.data?.product?.phone */}
                                        <div className="bg-green-700 py-3 px-4 d-flex sm:pt-5 md:px-2 md:py-2 flex justify-center item-center"> 
                                            <HiMiniPhoneArrowUpRight className="text-white" />
                                        </div>
                                        <a href={`tel:${data?.data?.data?.product?.phone}`} className="bg-blue-700 rounded-br-md rounded-tr-md w-full px-3 py-2 text-xs justify-center font-bold text-white col-span-6">
                                            <span className="text-sm w-full flex justify-center text-center">Call Advertiser</span>
                                        </a>
                                    </div>
                                    <div 
                                        className="flex md:col-span-5 col-span-12 bg-green-700 -mb-1 md:mb-0 w-full rounded-md"
                                    >
                                        <div 
                                            className="bg-green-700 py-3 px-4 d-flex sm:pt-5 md:px-2 md:py-2 flex justify-center item-center"
                                        > 
                                            <HiMiniPhoneArrowUpRight className="text-white" />
                                        </div>
                                        <a href={`tel:${`+23409033333367`}`} className="bg-blue-700 rounded-br-md rounded-tr-md w-full px-3 py-2 text-xs justify-center font-bold text-white col-span-6">
                                            <span className="text-sm w-full flex justify-center text-center">Contact Admin For Complaint</span>
                                        </a>
                                    </div>  
                                    {/* {data?.data?.data?.product?.phone} */}
                                    <div 
                                        className="flex justify-center cursor-pointer hover:bg-gray-100 items-center md:col-span-2 col-span-12 sm:border sm:border-gray-200 sm:border md:border-0 -mb-1 md:mb-0 w-full rounded-md"
                                        onClick={
                                          () => {
                                            let phone: any = data?.data?.data?.product?.phone
                                            // let messageIt: string = phone?.trim().substring(0, 11)
                                            console.log(phone)
                                            let convertToNumber: any = phone //`+234${data?.data?.data?.product?.phone}`  
                                            let talk: string = encodeURIComponent(convertToNumber)  
                                            if(isMobile)
                                            {
                                                window.open(`https://wa.me/${convertToNumber}?text=${talk}`)
                                            } else {        
                                              window.open(`https://web.whatsapp.com/send?phone=${convertToNumber}?text=${talk}`, "_blank")
                                            }          
                                          }
                                        }
                                    >
                                      <div 
                                          className="flex gap-5 justify-center items-center p-5 md:p-0 lg:p-0"
                                        >                                          
                                          <div className="w-fit px-7 md:hidden lg:hidden capitalize">Chat {data?.data?.plus}</div>
                                          <MdOutlineWhatsapp className="w-7 h-7 text-green-600 hover:text-green-800" />
                                      </div>
                                    </div>    
                                </div>

                                <div 
                                    className="w-full rounded-xl bg-white p-[1px] min-h-[250px] h-max"
                                >
                                    <div 
                                        className="px-1 my-4 flex-col flex gap-2"
                                    >
                                      <div 
                                          className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center shadow-md shadow-green-100"
                                      >
                                        <p>Manufacturer:</p>
                                        <p 
                                          className="text-brandGreen"
                                        >
                                           {data?.data?.data?.product?.manufacturer}
                                        </p>
                                      </div>
                                      <div 
                                          className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center shadow-md shadow-blue-100"
                                      >
                                        <p>Model:</p>
                                        <p className="text-brandGreen">
                                           {data?.data?.data?.product?.model}
                                        </p>
                                      </div>                     
                                      <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center shadow-md shadow-green-100">
                                          <p>Generation:</p>
                                          { data?.data?.data?.product?.generation ? `${data?.data?.data?.product?.generation}` : 'Not Specififed' }
                                      </div> 
                                      <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center shadow-md shadow-blue-100">
                                          <p>Series:</p>
                                          { data?.data?.data?.product?.serie ? `${data?.data?.data?.product?.serie}` : 'Not Specififed' }
                                      </div>
                                      <div 
                                          className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center shadow-md shadow-blue-100"
                                      >
                                        <p>Trim:</p>
                                        <p className="text-brandGreen">
                                          { data?.data?.data?.product?.trim ? `${data?.data?.data?.product?.trim}` : 'Not Specififed' }
                                        </p>
                                      </div>   
                                      <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center shadow-md shadow-green-100">
                                        <p>Colour:</p>
                                        <p className="text-brandGreen">
                                           {data?.data?.data?.product?.colour}
                                        </p>
                                      </div>
                                      {/* Transmission */}
                                      <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center shadow-md shadow-blue-100">
                                        <p>Transmission:</p>
                                        <p className="text-brandGreen">
                                           {data?.data?.data?.product?.transmission}
                                        </p>
                                      </div>
                                      {/* Year */}
                                      <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center shadow-md shadow-green-100">
                                        <p>Year:</p>
                                        <p className="text-brandGreen">
                                           {data?.data?.data?.product?.year}
                                        </p>
                                      </div>
                                      {/* Price */}
                                      <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center shadow-md shadow-blue-100">
                                        <p>Price:</p>
                                        <p className="text-brandGreen">
                                          { currencyFormatter(data?.data?.data?.product?.price) }
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
                                    {/* Door  #fdfdfd */}
                                    <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center shadow-md shadow-green-100">
                                      <p>Country</p>
                                      <p className="text-brandGreen">
                                        {data?.data?.data?.product?.country}
                                      </p>
                                    </div>
                                    <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center shadow-md shadow-blue-100">
                                      <p>State</p>
                                      <p className="text-brandGreen">
                                        {data?.data?.data?.product?.state}
                                      </p>
                                    </div>
                                    {/* Seat */}
                                    <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center shadow-md shadow-green-100">
                                      <p>Location:</p>
                                      <p className="text-brandGreen">
                                        {data?.data?.data?.product?.lga}
                                      </p>
                                    </div>
                                    <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center shadow-md shadow-blue-100">
                                      <p>Chasis No:</p>
                                      <p className="text-brandGreen">
                                        {data?.data?.data?.product?.chasis_no}
                                      </p>
                                    </div>
                                    <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center shadow-md shadow-green-100">
                                      <p>MileAge:</p>
                                      <p className="text-brandGreen">{((data?.data?.data?.product?.mileage) === "" || (data?.data?.data?.product?.mileage) === undefined || (data?.data?.data?.product?.mileage) === null) ? 'Not Specified' : `${((data?.data?.data?.product?.mileage)/1000)}km` }</p>
                                    </div>
                                  </div>
                                </div>
                              {
                                data?.data?.data?.specification_details?.length > 0 &&
                                <div 
                                    className='w-full pt-1 pb-5 pb-2 overflow-auto overflow-y-scroll justify-center h-[550px] px-1 md:px-3 item-center border border-b-8 border-t-8 border-gray-100 px-2'
                                >        
                                    <div 
                                        className="grid grid-cols-12 gap-2"
                                    >
                                        {
                                              data?.data?.data?.specification_details?.length > 0 && data?.data?.data?.specification_details?.map((specification : { name: string, value: string }, index: number) => 
                                              {
                                                return (
                                                        <>  
                                                            <div 
                                                                key={index}
                                                                className="mb-2 col-span-12 md:col-span-6 gap-5 border-2 border-shadow rounded-lg py-2 px-1 md:px-3 md:mb-2"
                                                            >
                                                                <span 
                                                                    className="font-bold text-blue-600 mr-3"
                                                                >
                                                                    {specification?.name}
                                                                </span>
                                                                -
                                                                <span 
                                                                    className="ml-3"
                                                                >
                                                                    {specification?.value}
                                                                </span>
                                                            </div>
                                                        </>
                                                )
                                              })
                                        }
                                    </div>
                                </div>
                              }
                                <div className="h-[20px]"></div>

                                <ProductComment productId={data?.data?.data?.product?.product_id} vendorId={data?.data?.data?.product?.user_id} onClick={ () => { refetch() }} />

                                <div className="h-[20px]"></div>

                            </div>
                            <div 
                                className="hidden md:block col-span-3 p-5"
                            >
                                <div 
                                  className="bg-blue-200 py-2 font-semibold px-3 rounded-md"
                                >
                                  All Categories
                                </div>
                                <WebCategory data={data?.data?.data?.category} />
                                <div 
                                  className="bg-blue-200 py-2 font-semibold px-3 rounded-md mt-10 mb-3"
                                >
                                  Featured Products
                                </div>

                                <div 
                                    className="w-full"
                                >
                                    {
                                        data?.data?.data?.featured?.map((product: any, index: number) => {
                                          return (
                                            <Featured key={index} product={product}  />
                                          )
                                        })
                                    }
                                </div>

                            </div>
                        </div>
                    </div>

                    <div 
                      className="w-full container mx-auto mb-10"
                    >
                        <div 
                          className="grid grid-cols-12 gap-5 mx-5 md:mx-0"
                        >
                            <p 
                                className="col-span-12 px-4 py-3 text-[12px] md:text-[13px] lg:text-[15px] font-bold border border-2 border-gray-200 rounded-xl mb-3"
                            >
                              Other posts by <span className="text-blue-600"> {data?.data?.data?.product?.firstname} {data?.data?.data?.product?.surname} </span>, the advertiser
                            </p>

                        </div>
                        <div className='container grid grid-cols-12 gap-2 md:gap-5 mt-4 px-5 md:p-0'>
                          {
                             (data?.data?.data?.product?.other_user_product?.length === 0) && <>
                                  <p 
                                      className="text-2xl text-blue-600"
                                  >
                                     No other post by user
                                  </p>
                             </>
                          }
                          {
                              
                            (data?.data?.data?.other_user_product && (data?.data?.data?.other_user_product?.length > 0)) &&
                              data?.data?.data?.other_user_product?.map((product: any, index: number) => 
                              {
                                return (
                                      <ProductCardd key={index} product={product} refetchs={() => console.log('') } />
                                  )
                                })
                          }
                        </div>
                    </div>
                    

                    <div 
                      className="w-full container mx-auto mb-20"
                    >
                        <div 
                          className="grid grid-cols-12 gap-5 px-3 md:mx-0"
                        >
                            <p 
                                className="col-span-12 px-4 py-3 text-[12px] md:text-[13px] lg:text-[15px] font-bold border border-2 border-gray-200 rounded-xl mb-3"
                            >
                              Other Advertisers
                            </p>

                        </div>
                        <div className='container grid grid-cols-12 gap-1 md:gap-5 mt-4 px-5 md:p-0'>
                          {/* {
                             (otherProduct?.length === 0) && <>
                                  <p 
                                      className="text-2xl text-blue-600"
                                  >
                                     No other post by user
                                  </p>
                             </>
                          } */}
                          { 
                            (data?.data?.data?.other_product && (data?.data?.data?.other_product?.length > 0)) &&
                              data?.data?.data?.other_product?.map((product: any, index: number) => 
                              {
                                return (
                                      <ProductCardd key={index} product={product} refetchs={() => console.log('') } />
                                  )
                                })
                          }
                        </div>
                    </div>
                  </>
              }
          </>
  )
}
