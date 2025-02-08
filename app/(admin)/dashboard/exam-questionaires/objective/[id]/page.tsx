"use client"

import { useState } from "react"
import { BsHighlighter } from "react-icons/bs"
import { useQuery } from "@tanstack/react-query"
import { UseStore } from "../../../../../../state/store"
import { BeatLoader, PuffLoader } from "react-spinners"
import { ExamObjectiveQuestions } from "../../../../../api/admin/academic/exam"
import { useRouter } from "next/navigation"
import { HiArrowLeft } from "react-icons/hi2"
import { Icons } from "../../../../../../components/shared/Icons"
import { AddExamObjectiveQuestionModal } from "./modal/AddExamObjectiveQuestionModal"
import { EditExamObjectiveQuestionModal } from "./modal/EditExamObjectiveQuestionModal"
import { DeleteExamObjectiveQuestionModal } from "./modal/DeleteExamObjectiveQuestionModal"


export default function TestQuestionaire({ params } : { params : { id: string } }) 
{
    const router = useRouter()
    const userToken = UseStore((state) => state)
    const token: string = userToken.getUserToken()
    const page: number = Number(params?.id)

    const { data, isLoading, refetch, isRefetching } = useQuery({ queryKey: [`get-all-exams-theory-objectives`, token], queryFn: () => ExamObjectiveQuestions(page, token)})
      
    const [openAddQuestion, setOpenAddQuestion] = useState<boolean>(false)
    const [openEditQuestion, setOpenEditQuestion] = useState<boolean>(false)
    const [openDeleteQuestion, setOpenDeleteQuestion] = useState<boolean>(false)
      
    const [editData, setEditData] = useState<
                                                { question_id: number, question: string, option_a: string, option_b: string, option_c: string, option_d: string, answer: string, assigned_mark: string }
                                            >(
                                                { question_id: -1, question: "", option_a: "", option_b: "", option_c: "", option_d: "", answer: "", assigned_mark: "" }
                                             )

    return (
            <div 
                className="w-full"
            > 
                <div 
                className='font-bold text-2xl text-green-600 ml-5 mb-7 mt-7 flex gap-10'
                >
                    <span 
                        className="text-lg text-black"
                        >
                            All Objective Questions
                    </span>
                    <span className='mt-1 cursor-pointer' 
                            onClick={() => {
                                setOpenAddQuestion(true)
                            }}      
                    >
                        <BsHighlighter className="w-20 hover:text-blue-600" />
                    </span>
                </div> 

                <div 
                    className="container mx-auto mb-20 md:mt-2"
                >
                  <div 
                      className="w-full mx-auto mt-2 border-2 border-gray-200 border-shadow bg-white container px-5 py-2 flex justify-between items-center fixed text-lg z-4 md:rounded-xl mb-10"
                  >
                    <div 
                       className="flex justify-between items-center bg-white rounded-md cursor-pointer"
                       onClick={() => { router.back() }}
                    >
                       <HiArrowLeft className="font-bold rounded-full hover:border-4 hover:border-green-300" style={{ fontSize: '30px', fontWeight: 'bolder', padding: '3px' }} />
                        <span className="ml-2 font-bold text-blue-500 uppercase text-sm">Go Back</span>
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
                    className="w-full p-1 -mb-7 rounded-lg"
                >
                    {
                    isLoading && <div className="col-span-12 h-[500px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
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
                    
                    {  !isLoading && (data?.data?.length === 0) && <>
                            <div 
                                className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                            >
                                <div 
                                    className="w-full d-flex justify-center items-center"
                                >
                                    <div className="w-full text-center text-lg">No Question Yet</div>
                                </div>
                            </div>
                        </>
                    }
                <div className="p-1"></div>
                
                {
                    !isLoading && (data?.data?.length > 0) &&                         
                    <div 
                        className='grid grid-cols-12 gap-5 py-2 mt-5 mb-40'
                    >
                        {
                            !isLoading && (data?.data?.length > 0) && data?.data?.map((question: { question_id: number, course_id: number, question: string, option_a: string, option_b: string, option_c: string, option_d: string, answer: string, assigned_mark: string }, index: number) => {
                               return (
                                      <>
                                         <div 
                                             className="d-flex -mb-3 col-span-12 py-1 px-5"
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
                                                className="p-3 shadow-md grid grid-cols-12 bg-white border border-2 border-green-200 my-2 pb-5"
                                            >
                                                <p 
                                                    className="w-full col-span-12 font-bold text-blue-900 text-lg mb-2 py-3"
                                                >
                                                    {question['question']}
                                                </p>
                                                <div 
                                                    className="flex mt-2 md:col-span-12 col-span-12"
                                                >
                                                    <div 
                                                       className="p-1 font-bold text-blue-300"
                                                    >
                                                        (a)
                                                    </div>
                                                    <div 
                                                       className="p-1 text-lg"
                                                    >
                                                        {question['option_a']}
                                                    </div>
                                                </div>
                                                <div 
                                                    className="flex mt-2 md:col-span-12 col-span-12"
                                                >
                                                   <div 
                                                      className="p-1 font-bold text-blue-300"
                                                    >
                                                        (b)
                                                    </div>
                                                    <div 
                                                        className="p-1 text-lg"
                                                    >
                                                        {question['option_b']}
                                                    </div>
                                                </div>
                                                <div 
                                                    className="flex mt-2 md:col-span-12 col-span-12"
                                                >
                                                    <div 
                                                        className="p-1 font-bold text-blue-300"
                                                    >
                                                        (c)
                                                    </div>
                                                    <div 
                                                        className="p-1 text-lg"
                                                    >
                                                        {question['option_c']}
                                                    </div>
                                                </div>
                                                <div 
                                                    className="flex mt-2 mb- md:col-span-12 col-span-12"
                                                >
                                                    <div 
                                                        className="p-1 font-bold text-blue-300"
                                                    >
                                                        (d)
                                                    </div>
                                                    <div 
                                                        className="p-1 text-lg"
                                                    >
                                                        {question['option_d']}
                                                    </div>
                                                </div>
                                            </div>                                                
                                            <div 
                                                className="flex border border-2 p-1 mt-2 justify-between bg-green-100"
                                            >
                                                <div 
                                                    className="p-2 text-red-700 font-bold"
                                                >
                                                    Answer
                                                </div>
                                                <div 
                                                    className="p-2 font-bold text-lg text-blue-700"
                                                >
                                                    {question['answer']}
                                                </div>
                                                <div 
                                                    className="flex space-x-10 pr-5 mt-1"
                                                >
                                                    <span 
                                                        onClick={() => {
                                                            setEditData(question)
                                                            setOpenEditQuestion(true)
                                                        }}
                                                        className="cursor-pointer"
                                                    >
                                                        <Icons iconName={'edit'} width={6} height={6} />
                                                    </span>
                                                    <span 
                                                        onClick={() => {
                                                            setEditData(question)
                                                            setOpenDeleteQuestion(true)                                                                   
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
                            {/* </div> */}
                            {/* <div className="col-span-3 p-3 bg-blue-100"></div> */}
                        </div>
                }

                {
                    openAddQuestion && 
                        <AddExamObjectiveQuestionModal
                            openQuestionaire={openAddQuestion}
                            token={token}
                            onClick={
                                () => {
                                    // if(x === true) {  refetch() }        
                                    refetch()                            
                                    setOpenAddQuestion(false)
                                }
                            }
                            questionaireId={page}
                        />
                }

                {
                    openEditQuestion && 
                        <EditExamObjectiveQuestionModal
                            openQuestionaire={openEditQuestion}
                            token={token}
                            onClick={
                                () => {
                                    // if(x === true) {  refetch() }      
                                    refetch()                                                           
                                    setOpenEditQuestion(false)
                                }
                            }
                            questionaireId={page}
                            cData={editData}
                        />
                }

                {
                    openDeleteQuestion && 
                        <DeleteExamObjectiveQuestionModal
                            openQuestionaire={openDeleteQuestion}
                            token={token}
                            onClick={
                                () => {
                                    // if(x === true) {  refetch() }      
                                    refetch()                                                           
                                    setOpenDeleteQuestion(false)
                                }
                            }
                            data={editData}
                        />
                }

        </div>
    )
}


