"use client"

import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { BeatLoader } from "react-spinners"
import { DeleteExamTheoryQuestionModal } from "./modal/DeleteExamTheoryQuestionModal"
import { EditExamQuestionModal } from "./modal/EditExamQuestionModal"
import { Icons } from "../../../../../../components/shared/Icons"
import { useRouter } from "next/navigation"
import { UseStore } from "../../../../../../state/store"
import { AddExamTheoryQuestionModal } from "./modal/AddExamTheoryQuestionModal"
import { ExamTheoryQuestions } from "../../../../../api/admin/academic/exam"
import { BsHighlighter } from "react-icons/bs"
import { HiArrowLeft } from "react-icons/hi2"


export default function TheoryQuestion({ params } : { params : { id: string } })
{
   const router = useRouter()
   const userToken = UseStore((state) => state)
   const token: string = userToken.getUserToken()
   const page: number = Number(params?.id)

   const { data, isLoading, refetch } = useQuery({ queryKey: [`get-all-exams-theory-questions`, token], queryFn: () => ExamTheoryQuestions(page, token)})

   const [openAddTheoryQuestion, setOpenAddTheoryQuestion] = useState<boolean>(false)
   const [openEditTheoryQuestion, setOpenEditTheoryQuestion] = useState<boolean>(false)
   const [openDeleteTheoryQuestion, setOpenDeleteTheoryQuestion] = useState<boolean>(false)
      
   const [editData, setEditData] = useState<
                                               { question_id: number, questionaireId: number, question: string, assigned_mark: string }
                                           >(
                                               { question_id: -1, questionaireId: -1, question: "", assigned_mark: "" }  
                                            )
   
   
   return ( 
           <>
             <div 
                className="w-full"
             >
                <div 
                   className='font-bold text-2xl text-green-600 ml-5 mb-7 mt-7 flex gap-10'
                >
                    <span 
                        className="text-lg text-black"
                    >
                       All Theory Questions
                    </span>
                    <span 
                       className='mt-1 cursor-pointer' 
                       onClick={() => {
                          setOpenAddTheoryQuestion(true)
                       }}      
                    >
                       <BsHighlighter className="w-20 hover:text-blue-600" />
                    </span>
                </div> 
                
                <div 
                    className="container mx-auto mb-2 md:mt-2"
                >
                   <div 
                      className="w-full mx-auto mt-2 border-2 border-gray-200 border-shadow bg-white container px-5 py-2 flex justify-between items-center fixed text-lg z-4 md:rounded-xl mb-10"
                   >
                      <div 
                         className="flex justify-between items-center bg-white rounded-md cursor-pointer"
                         onClick={() => { router.back() }}
                      >
                        <HiArrowLeft className="font-bold rounded-full hover:border-4 hover:border-green-300" style={{ fontSize: '30px', fontWeight: 'bolder', padding: '3px' }} />
                        <span 
                            className="ml-2 font-bold text-blue-500 uppercase text-sm"
                        >
                          Go Back
                        </span>
                      </div>
                      <div 
                         className="rounded-md flex justify-between items-center"
                      >
                         <div 
                            className="flex justify-center items-center bg-white rounded-lg px-2"
                         >
                            {/* <HiHome className="mr-2 text-blue-500" /> {'>>'} <span className="font-bold ml-2 text-sm">Category Name</span> */}
                         </div>
                      </div>
                    </div>
                </div>

                <div 
                  className="w-full p-5 mb-10 rounded-lg"
                >
                  {
                    isLoading && <div 
                                    className="col-span-12 h-[500px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}
                                >
                        <BeatLoader color="#1c9236" />
                      </div>
                  }
                  {
                      !isLoading && (data?.data?.length === 0) && <div className="col-span-12 h-[500px] flex justify-center items-center border border-3 border-shadow border-green-200 bg-[#f5fbf7]" style={{ marginTop: '30px', paddingTop: '20px' }}>
                        <h1 
                          className="font-bold"
                        >
                            No question created yet
                          </h1>
                      </div>
                  }
                </div>

                <div 
                   className='grid grid-cols-12 gap-5 py-2 mt-5 mb-40 px-5'
                >
                    {
                       !isLoading && (data?.data?.length > 0) && data?.data?.map((question: { question_id: number, questionaireId: number, question: string, assigned_mark: string }, index: number) => {
                           return (
                                    <>
                                        <div
                                            key={index} 
                                            className="d-flex -mb-3 col-span-12 py-1 border border-2 border-green-200 mb-2"
                                        >                                            
                                          <div 
                                              className="flex border border-2 p-1 mt-2 justify-between bg-green-100"
                                          >
                                              <div 
                                                  className="p-2 text-blue-700 font-bold"
                                              >
                                                  Question: {((data?.data?.length) - index)}
                                              </div>
                                              <div 
                                                  className="p-2 font-bold text-lg pr-5"
                                              >
                                                  Assigned Mark: {question['assigned_mark']}
                                              </div>
                                          </div>
                                           <div 
                                             className="p-3 grid grid-cols-12 bg-white my-2 pb-5"
                                           >
                                           <p 
                                             className="w-full col-span-12 font-bold text-blue-900 text-lg mb-2 py-3"
                                           >
                                             {question['question']}
                                           </p>
                                           {/* <p 
                                             className="w-full col-span-12 font-bold text-blue-900 text-lg mb-2 py-1 -mt-3"
                                            >
                                              <span 
                                                 className="text-sm text-red-600"
                                              >
                                                Mark Assigned Question:
                                              </span> 
                                                   {question['assigned_mark']}
                                            </p> */}
                                        </div>                                                                 
                                        <div 
                                           className="flex px-3 justify-left pb-3 -mt-5"
                                        >
                                            <div 
                                              className="flex space-x-5"
                                            >
                                               <span 
                                                    onClick={() => {
                                                      setEditData(question)
                                                      setOpenEditTheoryQuestion(true)
                                                    }}
                                                    className="cursor-pointer"
                                                >
                                                   <Icons iconName={'edit'} width={6} height={6} />
                                                </span>
                                                <span 
                                                   onClick={() => {
                                                     setEditData(question)
                                                     setOpenDeleteTheoryQuestion(true)                                                                    
                                                   }}
                                                    className="cursor-pointer"
                                                >
                                                   <Icons iconName={'delete'} color="red" width={6} height={6} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>


             </div>


            {
                openAddTheoryQuestion && 
                    <AddExamTheoryQuestionModal
                        onClick={
                            () => {     
                              refetch()                                                           
                              setOpenAddTheoryQuestion(false)                              
                            }
                        }      
                        openQuestionaire={openAddTheoryQuestion} 
                        token={token} 
                        questionaireId={page}                    
                    />
            }

            {
                openEditTheoryQuestion && 
                    <EditExamQuestionModal  
                        onClick={
                            () => {
                              refetch()                                                           
                              setOpenEditTheoryQuestion(false)                                 
                            }
                        }      
                        openQuestionaire={openEditTheoryQuestion} 
                        token={token} 
                        questionaireId={page} 
                        cData={editData}                    
                    />
            }

            {
                openDeleteTheoryQuestion && 
                    <DeleteExamTheoryQuestionModal 
                        openQuestionaire={openDeleteTheoryQuestion} 
                        onClick={
                            () => {
                              refetch()                                                           
                              setOpenDeleteTheoryQuestion(false)                              
                            }
                        }        
                        token={token} 
                        data={editData}                    
                  />
            }

                                                    
        </>
  )
}