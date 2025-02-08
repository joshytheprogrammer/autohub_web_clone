"use client"

import { useQuery } from "@tanstack/react-query"
import { UseStore } from "../../../../state/store"
import { StudentDashboard } from "../../../api/admin/academic/student"
import { PuffLoader } from "react-spinners"
import { useEffect, useState } from "react"
import Result from "./result"
import PaymentPage from "../PaymentPage"


export default function Dashboard() 
{
   const userToken = UseStore((state) => state)
   const token: string = userToken.getUserToken() 
   const [roles, setRoles] = useState<string[]>([]) 
   const [isStudent, setIsStudent] = useState<boolean>(false) 
   const [isLoaded, setIsLoaded] = useState<boolean>(false) 
  
   const [approvalRequest, setApprovalRequest] = useState<string>("")
 

   useEffect(() => 
   {
     setRoles(userToken.getUserRoles())
     console.log(roles)
     if(roles.includes("student"))
     {
       setIsStudent(true)
     }
     setIsLoaded(true)
   }, [])

   const { data, isLoading, refetch } = useQuery({ queryKey: [`user-summary`], queryFn: () => StudentDashboard(token) })

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
                        userToken.getUserRoles().includes('student') && <Result />
                    }
                </div>
            }

            
            { approvalRequest && <p className={`font-bold text-lg text-white rounded-md col-span-12 ${(approvalRequest === "") ? " " : "p-3 bg-blue-600"}`}>{approvalRequest}</p> }

        
            {
               !isLoading && (data?.plus?.payment_status === "not-paid") && <>
                  <PaymentPage 
                      onClick={(e: boolean | string) => {
                                if(e === true)
                                {          
                                  setApprovalRequest("")
                                  refetch()
                                } else {            
                                  setApprovalRequest(e.toString())      
                                }
                              }
                            }
                            refetch={
                                () => {
                                   refetch()
                                }
                            } 
                            token={token}
                          />
                      </>
            }

            <div className="h-[50px]"></div>



          </>
  )
}
