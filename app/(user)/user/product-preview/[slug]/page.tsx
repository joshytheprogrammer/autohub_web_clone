"use client"

import { useRouter } from "next/navigation"
import DOMPurify from "dompurify"
import { HiArrowLeft, HiHome } from "react-icons/hi2"
import { PuffLoader } from "react-spinners"
// import SlideShowThumbnail from "../../../../../components/SlideShowThumbnail"
import currencyFormatter from "../../../../../components/util/currency-formatter"
// import { useProductDetail } from "../../../../hook/queries/useProductDetail"
import { useQuery } from "@tanstack/react-query"
// import SlideThumbnail from "../../../../../components/SlideThumbnail"


type displayProps = 
{
   url: string
}

const UseProductDetail = async (url: string) => 
{
    let endPoint = `/api/detail/`
    let ApiUrl = `${process.env.URL}${endPoint}${url}`
    return await fetch(ApiUrl).then((res) => res.json());
}

export default function ProductPreview({ params } : { params : { slug: string } }) 
{   
  const router = useRouter()
  let url: string = params?.slug
  const { data, isLoading, refetch, isRefetching } = useQuery({ queryKey: [`get-product-detail`, params?.slug], queryFn: () => UseProductDetail(url)})

  return (
          <>                
              {
                  isLoading && <div className="col-span-12 h-[750px] flex justify-center items-center" style={{ marginTop: '20px', paddingTop: '0px' }}
                  >
                      <PuffLoader className='w-12 h-12' />
                  </div>
              } 

              { 
                  !isLoading && 
                  <div 
                      className='col-span-9 bg-green-400 bg-green-50 border-shadow drop-shadow-lg md:block h-[fit] px-1 md:px-5 py-5 mt-3 md:rounded-2xl -mb-24 md:mb-0'
                  > 
                      <div 
                        className="grid grid-cols-12 flex gap-5"
                      >
                          <div 
                              className="md:col-span-8 col-span-12 md:px-0 px-2"
                          >
                            <div 
                                className="flex justify-between items-center "
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
                                            {data?.['data']['product']['category']}
                                        </span> 
                                          {'>>'} 
                                        <span 
                                            className="font-bold ml-2 text-sm"
                                        >
                                            {data?.['data']['product']['title']}
                                        </span>
                                      </div>
                                  </div>
                                </div>  
                                <div 
                                    className="font-bold text-[23px] md:text-[30px] text-gray-500 mt-5 mb-2"
                                >
                                    {data?.['data']['product']['title']}
                                </div>
                                <div 
                                  className="font-bold text-sm mt-1 flex justify-between items-center"
                                >
                                  <span className="text-blue-600 text-[12px] md:text-[14px]">{data?.['created_at']}</span>
                                  <span 
                                    className="text-blue-500 text-[12px] md:text-[14px] flex justify-center items-center"
                                  >
                                    <p className="text-black mr-3">Comments: </p><p className='font-bold text-[16px] md:text-[17px]'>{data?.['data']['product']['comments_count']}</p>
                                  </span>
                                  <span 
                                    className="text-blue-500 text-[12px] md:text-[14px] flex justify-center items-center"
                                  >
                                    <p className="text-black mr-3">Views: </p><p className='font-bold text-[14px] md:text-[16px] text-red-500'>{data?.['data']['product']['views']}</p>
                                  </span>
                                </div>
                                <div 
                                    className="font-bold text-md text-gray-500 mt-5 border-shadow"
                                >
                                   {/* <SlideShowThumbnail data={data?.['images']} imageSize={data?.['images']} waterMark={data?.['watermark']} slug="" /> */}
                                    {/* <SlideThumbnail data={data?.['data']['product']['images']} imageSize={data?.['data']['product']['images']} waterMark={data?.['data']['product']['watermark']} slug={url} /> */}
                                </div>  

                          </div>
                          <div 
                              className="md:col-span-4 col-span-12 md:px-1 -mt-20 md:mt-0"
                          >
                          <div 
                              className="px-2 my-4 flex-col flex gap-2 "
                          >
                            <h1 className="font-bold text-md bg-blue-700 text-white rounded-lg pl-2 py-2">Product Detail</h1>
                            <div 
                                className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center"
                            >
                              <p>Manufacturer:</p>
                              <p 
                                className="text-brandGreen"
                              >
                                  {data?.['data']['product']['manufacturer']}
                              </p>
                            </div>
                            <div 
                                className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center"
                            >
                              <p>Model:</p>
                              <p 
                                className="text-brandGreen"
                              >
                                {data?.['data']['product']['model']}
                              </p>
                            </div>                     
                            <div 
                              className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center"
                            >
                              <p>Generation:</p>
                                { data?.['data']['product']['generation'] ? `${data?.['data']['product']['generation']}` : 'Not Specififed' }
                            </div> 
                            <div 
                              className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center"
                            >
                               <p>Series:</p>
                               { data?.['data']['product']['serie'] ? `${data?.['data']['product']['serie']}` : 'Not Specififed' }
                            </div>
                            <div 
                              className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center"
                            >
                              <p>Trim:</p>
                              <p className="text-brandGreen">
                                {data?.['data']['product']['trim']}
                              </p>
                            </div>                      
                            {/* <div 
                              className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center"
                            >
                              <p>Engine:</p>
                              { data?.['engine'] ? `${data?.['engine']}` : 'Not Specififed' }
                            </div> */}
                            <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                              <p>Colour:</p>
                              <p className="text-brandGreen">
                                {data?.['data']['product']['colour']}
                              </p>
                            </div>
                            {/* Transmission */}
                            <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                              <p>Transmission:</p>
                              <p className="text-brandGreen">
                                {data?.['data']['product']['transmission']}
                              </p>
                            </div>
                            {/* Year */}
                            <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                              <p>Year:</p>
                              <p className="text-brandGreen">
                                {data?.['data']['product']['year']}
                              </p>
                            </div>
                            {/* Price */}
                            <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                              <p>Price:</p>
                              <p className="text-brandGreen">
                                  { currencyFormatter(data?.['data']['product']['price']) }
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
                                {`${data?.['data']['product']['country']}`}
                            </p>
                          </div>
                          <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                            <p>State</p>
                            <p className="text-brandGreen">
                              {`${data?.['data']['product']['state']}`}
                            </p>
                          </div>
                          {/* Seat */}
                          <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                            <p>Location:</p>
                            <p className="text-brandGreen">
                              {`${data?.['data']['product']['lga']}`}
                            </p>
                          </div>
                          <div 
                            className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center"
                          >
                            <p>Chasis No:</p>
                            <p className="text-brandGreen">
                              {`${data?.['data']['product']['chasis_no']}`}
                            </p>
                          </div>                          
                          <div className="bg-[#ebf2fb] h-10 w-full flex justify-between px-4 items-center">
                            <p>MileAge:</p>
                            <p className="text-brandGreen">{((data?.['data']['product']['mileage']) === "" || (data?.['data']['product']['mileage']) === undefined || (data?.['data']['product']['mileage']) === null) ? 'Not Specified' : `${((data?.['data']['product']['mileage'])/1000)}km` }</p>
                          </div>
                          </div>
                            
                          </div>
                      </div>

                      <div 
                        className="w-full d-flex gap-5"
                      >  
                          <div 
                            className="font-bold w-full text-dm text-gray-500 mt-2 h-fit pb-10 rounded-md border-shadow px-2 md:px-0"
                          >
                            <div 
                              className="font-bold text-sm pt-5 pr-3 w-2/2"
                            >
                              <h1 className="font-bold text-md bg-blue-700 text-white rounded-lg pl-2 py-2">Description</h1>
                            </div>
                           <div 
                              className="pt-3 pb-5 mt-2 px-3 border-2 border-blue-200 rounded-lg"
                           >
                             <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.['data']['product']['description']!) }} ></div>
                           </div>
                          </div> 

                          <div>
                            {
                                data?.['data']['specification_details']?.length > 0 &&
                                  <div 
                                      className='grid grid-cols-12 gap-5 pt-1 pb-5 pb-2 overflow-auto overflow-y-scroll justify-center h-[550px] px-1 md:px-3 item-center border border-b-8 border-t-8 border-gray-100 px-2'
                                  >        
                                    {
                                      data?.['data']['specification_details']?.length > 0 && data?.['data']['specification_details']?.map((specification : { name: string, value: string }, index: number) => 
                                      {
                                          return (
                                                  <>  
                                                    <div 
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
                              }
                            </div>
                      </div>
                        
                </div>
              }
          </>
  )
}
