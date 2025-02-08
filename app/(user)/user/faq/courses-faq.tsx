"use client"

import { useState } from "react"
import { UseStore } from "../../../../state/store"
import { useQuery } from "@tanstack/react-query"
import { Courses } from "../../../api/admin/academic/student"
import { Icons } from "../../../../components/shared/Icons"
import CoursesFaqQuestion from "./courses-faq-question"


export default function CoursesFaq() 
{
  const userToken = UseStore((state) => state)
  const token: string = userToken.getUserToken()

  const [openQuestion, setOpenQuestion] = useState<boolean>(false)
  const [currentCourse, setCurrentCourse] = useState("")

  const { data, isLoading, refetch } = useQuery({ queryKey: [`student-courses`], queryFn: () => Courses(token) })

  return (
        <div  
            className=''
        > 
          <div 
            className="md:col-span-12 col-span-12 bg-green-400 d-flex bg-green-50 border-shadow drop-shadow-lg md:block h-[fit] px-3 md:px-10 py-5 mt-3 rounded-2xl -mb-24 md:mb-0"
          >
            {
              (data?.data?.length === 0) && <div className="col-span-12 h-[500px] flex justify-center items-center border border-3 border-shadow border-green-200 bg-[#f5fbf7]" style={{ marginTop: '30px', paddingTop: '20px' }}>
                  <h1 
                      className="font-bold"
                    >
                      No course created yet
                    </h1>
                  </div>
            }
            {
             (data?.data?.length > 0) && <div 
                className="col-span-12"
                >                      
                  <div 
                      className="font-bold text-xl mb-5 text-blue-700 md:mt-0"
                    >
                      FREQUENTLY ASKED QUESTIONS
                    </div> 
                    {/* <span 
                       className="col-span-12 font-bold text-red-800 text-sm -mt-3 mb-3"
                    >
                      Download Course
                    </span> */}
                  </div>
            }
            {
               (data?.data?.length > 0) 
                    && data?.data?.map((x: any, index: number) => {
                     return (
                              <div
                                key={index}
                                 onClick={
                                          () => {
                                              setCurrentCourse(x)
                                              setOpenQuestion(true)
                                          }
                                        }
                                        className="text-md text-left col-span-12 px-2 py-2 mb-5 justify-center w-full font-bold cursor-pointer 
                                                    text-black gap-2 bg-white 
                                                    ring-2 ring-blue-100 hover:bg-green-100 rounded-lg px-1 border border-solid 
                                                    border-blue-400 flex justify-between px-5"
                                        >
                                          {x?.name}
                                          <Icons iconName={'eye'} width={5} height={5} />
                                          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-4 h-4">
                                             <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                                          </svg> */}
                                </div>
                            )
                      })
            }

            <div className="h-[120px]"></div>
          
          </div>

        { 
            openQuestion && 
                <CoursesFaqQuestion 
                      currentCourse={currentCourse} 
                      openQuestion={openQuestion} 
                      onClick={
                          () => {
                            setOpenQuestion(false)
                          }
                      }
                      token={token} 
                /> 
        }
    
      </div>
  )
}
