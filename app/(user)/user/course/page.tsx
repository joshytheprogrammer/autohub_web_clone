"use client"

import { useState } from "react"
import { UseStore } from "../../../../state/store"
import { useQuery } from "@tanstack/react-query"
import { HasUserPaid } from "../../../api/admin/academic/student"
import { PuffLoader } from "react-spinners"
import PaymentPage from "../PaymentPage"
import CourseDownload from "./course-download"


export default function Course() 
{
  const userToken = UseStore((state) => state)
  const token: string = userToken.getUserToken()

  const [approvalRequest, setApprovalRequest] = useState<string>("")

  const { data, isLoading, refetch } = useQuery({ queryKey: [`has-user-paid`], queryFn: () => HasUserPaid(token) })


  return (
        <div 
            className="px-3 mb-3 md:p-1 p-3"
        >
          <div
              className="grid md:grid-cols-12 grid-cols-12 gap-5"
          >
            { approvalRequest && <p className={`font-bold text-lg text-white rounded-md col-span-12 ${(approvalRequest === "") ? " " : "p-3 bg-blue-600"}`}>{approvalRequest}</p> }
            {
               isLoading && 
                  <div 
                    className="col-span-12 h-[300px] flex justify-center items-center" 
                    style={{ marginTop: '30px', paddingTop: '20px' }}
                >
                    <PuffLoader color="#1c9236" />
                </div>
            }
            {
               !isLoading && (data?.data?.payment_status === "not-paid") && <>
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
    
            {  !isLoading && data?.data && (data?.data?.payment_status === "paid") && (data?.plus === 'allow') && <CourseDownload /> }
                    
            {
                !isLoading && data?.data && (data?.data?.payment_status === "paid") && (data?.addition === 0) && <>
                    <div 
                        className="col-span-12 h-[300px] flex justify-center items-center" 
                        style={{ marginTop: '60px', paddingTop: '20px' }}
                    >
                      <h1 
                        className="font-bold text-red-500 text-2xl"
                      >
                        Awaiting Confirmation
                      </h1>
                    </div>
                  </>
            }
                        
          </div>
          
        <div className="p-5"></div>
    
    </div>
  )
}
