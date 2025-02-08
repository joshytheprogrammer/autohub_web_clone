'use client'

import { useQuery } from "@tanstack/react-query"
import { UseStore } from "../../../../state/store"
import { StudentDashboard } from "../../../api/admin/academic/student"

 
 
export default function Overview()
{
  const profile = UseStore((state) => state)
  const token: string = profile.getUserToken()

  const { data, isLoading } = useQuery({ queryKey: [`student-shedule`], queryFn: () => StudentDashboard(token) })
 
  return (
      <>     
        <div 
          className="font-bold text-md mt-28 md:mt-0 col-span-12 pl-3"
        >
          Dashboard
        </div>  
        {
            <>
              <div 
                className="grid grid-cols-12 gap-3 border border-solid border-green-900 col-span-12 p-3 rounded-lg"
              >                    
                {
                  !isLoading && data && 
                      <>
                        <div 
                          className="flex justify-between text-lg font-bold bg-blue-500 p-2 md:col-span-4 col-span-12 text-white font-bold ring-2 ring-blue-100 rounded-lg space-between px-4 border border-4 border-solid border-blue-600"
                        >
                          <span>Total Course:</span>
                          <span>{data?.courses}</span>
                        </div>
                        <div 
                          className="flex justify-between text-lg font-bold bg-green-500 p-2 md:col-span-4 col-span-12 text-white font-bold ring-2 ring-green-100 rounded-lg space-between px-4 border border-4 border-solid border-green-600"
                        >
                          <span>Completed:</span>
                          <span>{data?.attempted}</span>
                        </div>
                        <div 
                          className="flex justify-between text-lg font-bold bg-red-500 p-2 md:col-span-4 col-span-12 text-white font-bold ring-2 ring-red-100 rounded-lg space-between px-4 border border-4 border-solid border-red-600"
                        >
                          <span>Remaining:</span>
                          <span>{Math.abs((data?.courses - data?.attempted))}</span>
                        </div>
                      </>
                }
              </div>

              {
                !isLoading && (data?.objective.length === 0) && <>
                    <div 
                      className="font-bold col-span-12 flex justify-center items-center mb-10 mt-20 uppercase mb-5 text-2xl"
                    >
                      No Test Taken Yet
                    </div>
                </>
              }

              {
                !isLoading && data?.objective && (data?.objective?.length > 0) && <> 
                   <div 
                      className="font-bold text-md -mb-3 md:col-span-12 col-span-12 text-green-900 mt-5 p-5 bg-gray-400 text-white rounded-md"
                    >
                      Test Results
                    </div> 
                   <div 
                    className="font-bold col-span-12 -mb-2 mt-1 uppercase text-blue-600"
                  >
                    Objective
                  </div>
                 </> 
              }   
              {
                !isLoading && data?.objective && (data?.objective?.length > 0) && data?.objective?.map((result: any, index: number) =>
                {                                  
                  return (
                      <div 
                        key={index}
                        className="flex justify-between p-2 bg-white md:col-span-4 col-span-12 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-green-900"
                      >
                        <span className="px-3 text-md">{result.name}</span>
                        <span className="hidden md:block px-3"> -- </span>
                        <span className={`${(result.taken === "yes" ? 'text-lg block' : 'hidden')} px-3`}>{ result.score }</span>
                          <span className={`${(result.taken != "yes" ? 'text-xs text- block' : 'hidden')} px-3`}>{ "Not Taken" }</span>
                        </div>
                      )
                  })  
              }
              
              <div 
                className="font-bold text-md -mb-3 md:col-span-12 col-span-12 text-green-900 mt-5 p-5 bg-gray-400 text-white rounded-md mb-2"
              >
                Exam Results
              </div>
              
              {
                !isLoading && (Number(data?.exam_objective) === 0) && 
                   <div 
                      className="flex justify-between p-2 bg-white md:col-span-6 col-span-6 text-black font-bold text-sm ring-2 ring-blue-100 rounded-lg space-between px-3 border border-solid border-green-900"
                    >
                      <span className="px-3 text-md uppercase text-blue-800">Objective</span>
                      <span className="hidden md:block px-3"> {data?.exam_objective} </span>
                   </div> 
              }
              {
                 !isLoading && (data?.exam_objective === "not-taken") && 
                    <div 
                      className="flex justify-between p-2 bg-white md:col-span-6 col-span-6 text-black font-bold text-sm ring-2 ring-blue-100 rounded-lg space-between px-3 border border-solid border-green-900"
                    >
                      <span className="px-3 text-md uppercase text-blue-800">Objective</span>
                      <span className="hidden md:block px-3"> NOT YET TAKEN </span>
                    </div> 
              }
              {
                 !isLoading && (Number(data?.exam_objective) > 0) &&
                    <div 
                      className="flex justify-between p-2 bg-white md:col-span-6 col-span-6 text-black font-bold text-sm ring-2 ring-blue-100 rounded-lg space-between px-3 border border-solid border-green-900"
                    >
                      <span className="px-3 text-md uppercase text-blue-800">Objective</span>
                      <span className="hidden md:block px-3"> {data?.exam_objective} </span>
                    </div> 
              }
              
              {/* theory  */}
              {
                !isLoading && (Number(data?.exam_theory) === 0) && 
                  <div 
                    className="flex justify-between p-2 bg-white md:col-span-6 col-span-6 text-black font-bold text-sm ring-2 ring-blue-100 rounded-lg space-between px-3 border border-solid border-green-900"
                  >
                    <span className="px-3 text-md uppercase text-blue-800">Theory</span>
                    <span className="hidden md:block px-3"> {data?.exam_theory} </span>
                  </div> 
              }
              {
                !isLoading && (data?.exam_theory === "Not Yet Marked") && 
                  <div 
                    className="flex justify-between p-2 bg-white md:col-span-6 col-span-6 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-green-900"
                  >
                    <span className="px-3 text-md uppercase text-green-800">Theory</span>
                    <span className="hidden md:block px-3"> NOT YET MARKED </span>
                  </div> 
              }
              {
                !isLoading && (data?.exam_theory === "not-taken") && 
                  <div 
                    className="flex justify-between p-2 bg-white md:col-span-6 col-span-6 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-green-900"
                  >
                    <span className="px-3 text-md uppercase text-green-800">Theory</span>
                    <span className="hidden md:block px-3"> NOT YET TAKEN </span>
                  </div> 
              }
              {
                !isLoading && (Number(data?.exam_theory) > 0) && (data?.exam_theory === "not-taken") &&
                  <div 
                    className="flex justify-between p-2 bg-white md:col-span-6 col-span-6 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-green-900"
                  >
                    <span className="px-3 text-md uppercase text-green-800">Theory</span>
                    <span className="hidden md:block px-3"> {data?.exam_theory} </span>
                  </div> 
              }
              {
                !isLoading && (Number(data?.exam_theory) > 0)  && (data?.exam_theory != "not-taken") && 
                  <div 
                    className="flex justify-between p-2 bg-white md:col-span-6 col-span-6 text-black font-bold text-sm ring-2 ring-blue-100 rounded-lg space-between px-3 border border-solid border-blue-900"
                  >
                    <span className="px-3 text-md uppercase text-green-800">Theory</span>
                    <span className="hidden md:block px-3"> { data?.exam_theory } </span>
                  </div> 
              }
              <div className="p-5"></div>
          </>
        }
      </>
  )

}