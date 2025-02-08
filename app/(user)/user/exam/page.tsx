"use client"

import { useState } from "react"
import { UseStore } from "../../../../state/store"
import { useQuery } from "@tanstack/react-query"
import { HasUserPaid } from "../../../api/admin/academic/student"
import { BeatLoader, PuffLoader } from "react-spinners"
import PaymentPage from "../PaymentPage"
import StartPage from "../StartPage"


export default function Exam() 
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
                  className="col-span-12 h-[600px] flex justify-center items-center" 
                  style={{ marginTop: '30px', paddingTop: '20px' }}
              >
                  <PuffLoader color="#1c9236" />
              </div>
          }
          {
            !isLoading && (data?.data?.payment_status === "not-paid") 
                                              && ((data?.data?.receipt === '') || (data?.data?.receipt === null) || (data?.data?.receipt === undefined)) 
                                              && (data?.plus === 'block') 
                                              && <>
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

          {  !isLoading && data?.data 
                              && (data?.data?.payment_status === "paid") 
                              && (data?.addition > 0) 
                              && <> 
                              <h1>All Courses</h1> </>  }

          {/* {  !isLoading && data?.data && (data?.data?.payment_status === "paid") && (data?.addition > 0) && <StartPage course={data?.plus?.course_id} /> } */}
          {
              !isLoading && data?.data 
                                && (data?.data?.payment_status === "paid") 
                                && ((data?.data?.receipt != '') || (data?.data?.receipt != null) || (data?.data?.receipt != undefined)) 
                                && (data?.plus === 'allow') 
                                && <> 
                                      <StartPage 
                                          goTo="/user/exam/questions"
                                          message="You are about to take a objective exam"
                                          startText="Start Your Exam Objective Questions"
                                      />
                                </>
          }
                  
          {
              !isLoading && data?.data 
                                && (data?.data?.payment_status === "not-paid") 
                                && ((data?.data?.receipt != '') || (data?.data?.receipt != null) || (data?.data?.receipt != undefined)) 
                                && (data?.plus === 'allow') 
                                && <>
                  <div 
                      className="col-span-12 bg-green-400 flex d-flex bg-green-50 border-shadow drop-shadow-lg md:block px-3 md:px-10 py-5 mt-3 rounded-2xl md: mb-0 h-[600px] justify-center item-center" 
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
                      
        </div>
        
        <div className="p-5"></div>

      </div>
  )
}
