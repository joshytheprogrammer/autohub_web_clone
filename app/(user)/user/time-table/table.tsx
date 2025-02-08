'use client'

import { useQuery } from "@tanstack/react-query"
import { UseStore } from "../../../../state/store"
import { TimeTable } from "../../../api/admin/academic/student"
import { PuffLoader } from "react-spinners"

  
export default function Table()
{
  const profile = UseStore((state) => state)
  const token: string = profile.getUserToken()

  const { data, isLoading } = useQuery({ queryKey: [`student-shedule`], queryFn: () => TimeTable(token) })
  
  return (
        <>
            {
              isLoading && 
                <div 
                  className="col-span-12 h-[600px] flex justify-center items-center" 
                  style={{ marginTop: '30px', paddingTop: '20px' }}
                >
                  <PuffLoader color="#1c9236" />
                </div>
           }
           {
             !isLoading && (data?.data?.length > 0) && 
                <div 
                  className="col-span-12 px-2"
                >                      
                  <div 
                    className="font-bold text-xl mb-5 text-blue-700 md:mt-0"
                  >
                    TIME TABLE
                  </div> 
                  <div 
                    className="w-12/12 flex -ml-3 border border-2 border-gray-200 bg-green-800 text-white font-bold pb-2"
                  >
                    <span 
                      className="w-4/12 p-2 mt-2 text-sm font-bold"
                    >
                      Blue Stripe: On-Going
                    </span> 
                    <span 
                      className="w-4/12 p-2 mt-2 text-sm font-bold"
                    >
                      Green Stripe: Completed
                    </span> 
                    <span 
                      className="w-4/12 p-2 mt-2 text-sm font-bold"
                    >
                      White Stripe: Pending
                    </span> 
                  </div>
                </div>
            }
            {
              !isLoading && (data?.data?.length > 0) && data?.data?.map((x: any, index: number) => {
                let current = (x.test === 1) ? "bg-blue-100" : (x.status === "done") ? "bg-green-100" : ""
                return (
                    <div 
                      key={index}
                      className={`${current} col-span-12 p-5 border border-1 border-shadow border-blue-200 gap-5`}
                    >
                      <div 
                        className="w-full d-flex md:-mb-7"
                      >
                        <div 
                          className="w-12/12 flex"
                        >
                          <span 
                             className="font-bold text-md font-bold text-green-700"
                          >
                            <span 
                               className="text-md font-bold mr-5 text-black"
                            >
                              Course:
                              </span>{x?.name}
                          </span>
                        </div>
                        <div 
                          className="w-12/12 flex -ml-2"
                        >
                          <div 
                            className="w-12/12 md:w-4/12 flex md:d-flex mb-5 md:mb-3 justify-center"
                          >
                            <span 
                              className="w-4/12 py-2 ml-1 mt-2 text-red-600 text-sm font-bold"
                            >
                              Starts On:
                            </span>
                            <span 
                              className="w-8/12 py-2 ml-1 mt-2"
                            >
                              {x?.start_date}
                            </span>                                                          
                          </div>
                          <div 
                            className="w-12/12 md:w-3/12 flex md:d-flex mb-5 md:mb-3"
                          >
                            <span 
                                className="w-4/12 py-2 ml-1 mt-2 text-red-600 text-sm font-bold"
                            >
                              Ends On:
                            </span>
                            <span 
                              className="w-8/12 py-2 ml-1 mt-2"
                            >
                              {x?.end_date}
                            </span>                                                          
                          </div>
                          <div 
                            className="w-12/12 md:w-5/12 flex md:d-flex mb-5 md:mb-3"
                          >
                            <span 
                              className="w-12/12 py-2 ml-1 mt-2 text-red-600 text-md font-bold"
                            >
                              Paper: <span 
                                          className="text-black ml-3 font-normal"
                                        >
                                          {x?.test_date}
                                        </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              {
                (data?.data?.length > 0) && <>
                  <div 
                     className="col-span-12 p-5 border border-4 border-shadow border-blue-200 gap-5"
                  >
                    <div 
                      className="w-full flex"
                    >                        
                      <div 
                        className="w-5/12 text-green-700 font-bold text-md uppercase"
                      >
                        Your exam date falls between
                      </div>
                      <div 
                        className="w-2/12 text-black font-bold text-lg"
                      >
                        { data?.additions }
                      </div>
                      <div 
                        className="w-1/12 text-red-600 font-bold text-lg"
                      >
                        and
                      </div>
                      <div 
                        className="w-2/12 text-black font-bold text-lg"
                      >
                        { data?.plus }
                      </div>
                    </div>
                  </div>
                </>
              }

              <div className="p-5"></div>
          </>
  )

}