"use client"

import { useQuery } from "@tanstack/react-query"
import { UseStore } from "../../../../state/store"
import { StudentDashboard } from "../../../api/admin/academic/student"
import { PuffLoader } from "react-spinners"
import { useEffect, useState } from "react"
import Result from "./result"
import PaymentPage from "../PaymentPage"
import Marketi from "./marketi"
import { useProduct } from "../../../hook/market-place/useProduct"


export default function Dashboard() 
{
   const userToken = UseStore((state) => state)
   const { Dashboard } = useProduct()
   const [roles, setRoles] = useState<string[]>([]) 
   const [isStudent, setIsStudent] = useState<boolean>(false) 
   const [isLoaded, setIsLoaded] = useState<boolean>(false) 
  
   const [approvalRequest, setApprovalRequest] = useState<string>("")
   const rls: any = userToken.getUserRoles()
   const rols: any = 

   useEffect(() => 
   {
     setRoles(rls)
     if(roles.includes("student"))
     {
       setIsStudent(true)
     }
     setIsLoaded(true)
   }, [])

    const { data, isLoading, refetch, isRefetching } = useQuery(
                                                                    { queryKey: [`market-student-dashboard`], 
                                                                      queryFn: () => Dashboard(),
                                                                      refetchOnWindowFocus: true,
                                                                      refetchOnMount: true, 
                                                                      gcTime: 0, staleTime: 0  
                                                                    })
   if(!isLoading)
   {
      console.log(data)
   }

//    const overview: { name: string, count: number }[] = 
//     [
//         {
//             name: "Total Products",
//             count: 23,
//         },
//         {
//             name: "Total Views",
//             count: 5209,      
//         },
//         {
//             name: "Active Products",
//             count: 8,      
//         },
//         {
//             name: "Pending Products",
//             count: 4,      
//         },
//         {
//             name: "Sold Products",
//             count: 11,      
//         },
//         {
//             name: "Draft Products",
//             count: 3,      
//         },
//         {
//             name: "WishList Products",
//             count: 2,      
//         },
//         {
//             name: "Followers",
//             count: 23,      
//         }
//    ]

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
                !isLoading &&
                <div 
                    className='md:col-span-9 col-span-12 bg-green-400 d-flex bg-green-50 border-shadow drop-shadow-lg md:block h-[fit] px-3 md:px-10 py-5 mt-3 md:rounded-2xl -mb-24 md:mb-0'
                > 
                    <h1 
                        className='font-bold'
                    >
                        Dashboard
                    </h1>
                    {/* <div 
                        className="grid grid-cols-12 gap-5 mt-5"
                    >
                        {
                        overview?.map((x: {name: string, count: number}, index: number) => {
                            return (
                                <div 
                                    key={index}
                                    className="col-span-6 md:col-span-3 px-3 py-5 flex justity-between items-center bg-white rounded-lg border-shadow border-2 border-green-200"
                                >
                                    <div 
                                        className="w-10/12 text-gray-400 font-bold"
                                    > 
                                        {x?.name}
                                    </div>
                                    <div 
                                        className="w-2/12 text-blue-500"
                                    >
                                        {x?.count}
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div> */}
                    
                    <div className="h-[30px]"></div>
                    {
                        (userToken.getUserRoles().includes('member') || (userToken.getUserRoles().includes('affiliate')) || userToken.getUserRoles().includes('dealer') || userToken.getUserRoles().includes('admin') || userToken.getUserRoles().includes('super-admin')) && ((userToken.getSideType() === 'member') || (userToken.getSideType() === 'affiliate') || (userToken.getSideType() === 'admin') ||  (userToken.getSideType() === 'super-admin') || userToken.getSideType() === 'dealer') && <Marketi ads={data?.data?.additions} />
                    }
                    {
                        userToken.getUserRoles().includes('student') && (userToken.getSideType() === 'student') && <Result />
                    }
                    {
                        userToken.getUserRoles() === 'admin' && <Result />
                    }
                </div>
            }
                        
            { approvalRequest && <p className={`font-bold text-lg text-white rounded-md col-span-12 ${(approvalRequest === "") ? " " : "p-3 bg-blue-600"}`}>{approvalRequest}</p> }
            
            {
                !isLoading && (data?.data?.plus?.payment_status === "not-paid") && (userToken.getSideType() === "student")
                                                                      && ((data?.data?.plus?.receipt === '') || (data?.data?.plus?.receipt === null) || (data?.data?.plus?.receipt === undefined)) 
                                                                      && <>
                                        <PaymentPage 
                                            onClick={(e: boolean | string) => {
                                              if(e === true)
                                              {        
                                                setApprovalRequest("")
                                                refetch()
                                              } else {         
                                                refetch()   
                                                setApprovalRequest(e.toString())      
                                              }
                                            }
                                          }
                                          refetch={
                                            () => {
                                                refetch()
                                            }
                                          } 
                                        />
                                    </>
            }
            <div className="p-1"></div>
            {
              !isLoading && data?.data?.data 
                                && (data?.data?.plus?.payment_status === "not-paid") 
                                && (data?.data?.plus?.receipt) 
                                && (data?.data?.plus?.access === 'pending') 
                                &&  (userToken.getSideType() === "student") &&  <>
                  <div 
                      className="col-span-12 bg-green-400 flex d-flex bg-green-50 border-2 border-shadow drop-shadow-lg md:block px-3 md:px-10 py-5 mt-10 rounded-2xl md: mb-0 h-[600px] justify-center item-center" 
                      style={{ marginTop: '0px', paddingTop: '50px' }}
                  >
                    <h1 
                      className="font-bold text-red-500 text-2xl text-center"
                      style={{ marginTop: '200px' }}
                    >
                      Awaiting Payment Confirmation
                    </h1>
                  </div>
                </>
          }

          <div className="h-[50px]"></div>



      </>
  )
}
