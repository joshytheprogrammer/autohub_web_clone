"use client"

import { PuffLoader } from "react-spinners"
import AuthControl from "./sections/AuthControl"
import PlanControl from "./sections/PlanControl"
import Contact from "./sections/Contact"
import Address from "./sections/Address"
import Twitter from "./sections/Twitter"
import Facebook from "./sections/Facebook"
import Instagram from "./sections/Instagram"
import Tiktok from "./sections/Tiktok"
import VacancyControl from "./sections/VacancyControl"
import CareerControl from "./sections/CareerControl"
import PostComment from "./sections/PostComment"
import BlogComment from "./sections/BlogComment"
import { UseStore } from "../../../../state/store"
import { useQuery } from "@tanstack/react-query"
import { ControlSettings } from "../../../api/admin/setting"
import SliderTImer from "./sections/SliderTImer"


export default function Settings() 
{
    const userToken = UseStore((state) => state)
    const token: string = userToken.getUserToken()

    const { data, isLoading, refetch, isRefetching } = useQuery({ queryKey: [`get-settings`, token], queryFn: () => ControlSettings(token)})
      

    return (
        <div               
             className="w-full"
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
            {  
            
                  data?.data && <>                        
            
                        <div 
                              className='font-bold text-2xl text-green-600 ml-5 mb-7 mt-7'
                              >
                              Settings
                        </div> 
                        <div 
                              className="shadow-md border-2 border-gray-100 p-5 mb-3 mx-auto md:mx-5 pb-8 rounded-none overflow-hidden hover:shadow-stone-400"
                        >   
                        
                              <div 
                                    className="mb-4 md:w-full d-flex md:flex gap-5"
                              >
                                    <AuthControl option={data?.data?.auth} token={token} onClick={() => { refetch() }} />
                                    <PlanControl option={data?.data?.plan} />
                              </div>
                              
                              <div 
                                    className="mb-4 md:w-full d-flex md:flex gap-5"
                              >
                                    <Contact optionOne={data?.data?.contact_1} optionTwo={data?.data?.contact_2} />
                              </div> 

                              <div 
                                    className="mb-4 md:w-full d-flex md:flex gap-5"
                              >
                                    <Address optionOne={data?.data?.address_1} optionTwo={data?.data?.address_2} />
                              </div> 
                              
                              <div 
                                    className="mb-4 md:w-full d-flex md:flex gap-5"
                              >
                                    <Twitter handle={data?.data?.x} />
                                    <Facebook handle={data?.data?.facebook} />
                              </div> 
                              
                              <div 
                                    className="mb-4 md:w-full d-flex md:flex gap-5"
                              >
                                    <Instagram handle={data?.data?.instagram}  />
                                    <Tiktok      handle={data?.data?.tiktok}  />  
                              </div> 
                              
                              <div 
                                    className="mb-4 md:w-full d-flex md:flex gap-5"
                              >                  
                                    <VacancyControl option={data?.data?.vacancy} /> 
                                    <CareerControl option={data?.data?.career} /> 
                              </div>

                              <div 
                                    className="mb-4 md:w-full d-flex md:flex gap-5"
                              >
                                    <PostComment option={data?.data?.blog_comment} token={token} onClick={() => { refetch() }} />
                                    <BlogComment option={data?.data?.post_comment} token={token} onClick={() => { refetch() }} />
                              </div>

                              <div 
                                  className="mb-4 md:w-full d-flex md:flex gap-5"
                              >
                                  <SliderTImer value={data?.data?.timer} token={token} onClick={() => { refetch() }} />
                              </div>

                        </div>
                  </>
            }
      </div>
    )
}
