"use client"

import { useState } from "react"
import { BsHighlighter } from "react-icons/bs"
import { AddExamObjectiveQuestionaireModal } from "./obj-modal/AddExamObjectiveQuestionaireModal"
import { UseStore } from "../../../../state/store"
import { EditExamObjectiveQuestionaireModal } from "./obj-modal/EditExamObjectiveQuestionaireModal"
import { DeleteExamObjectiveQuestionaireModal } from "./obj-modal/DeleteExamObjectiveQuestionaireModal"
import { AddExamTheoryQuestionaireModal } from "./theory-modal/AddExamTheoryQuestionaireModal"
import { DeleteExamTheoryQuestionaireModal } from "./theory-modal/DeleteExamTheoryQuestionaireModal"
import { EditExamTheoryQuestionaireModal } from "./theory-modal/EditExamTheoryQuestionaireModal"
import { useQuery } from "@tanstack/react-query"
import { ExamQuestionaires } from "../../../api/admin/academic/exam"
import { useRouter } from "next/navigation"


export default function ExamQuestionaire() 
{
    const router = useRouter()
    const userToken = UseStore((state) => state)
    const token: string = userToken.getUserToken()

    const { data, isLoading, refetch } = useQuery({ queryKey: [`get-all-exams-questionaires`, token], queryFn: () => ExamQuestionaires(token)})

    const [openAddObjectiveQuestioanire, setOpenAddObjectiveQuestioanire] = useState<boolean>(false)
    const [openEditObjectiveQuestioanire, setOpenEditObjectiveQuestioanire] = useState<boolean>(false)  
    const [openDeleteObjectiveQuestioanire, setOpenDeleteObjectiveQuestioanire] = useState<boolean>(false)  

    const [openAddTheoryQuestioanire, setOpenAddTheoryQuestioanire] = useState<boolean>(false)
    const [openEditTheoryQuestioanire, setOpenEditTheoryQuestioanire] = useState<boolean>(false)  
    const [openDeleteTheoryQuestioanire, setOpenDeleteTheoryQuestioanire] = useState<boolean>(false)  
    
    const [editedData, setEditedData] = useState<{ id: number, name: string, description: string }>({ id: -1, name: "", description: ""  })

    return (
        <>

            {
                !isLoading && <>            
                    <div 
                        className="w-full"
                    > 
                        <div 
                            className="w-full px-10 py-5 uppercase bg-blue-800 text-white font-bold mb-10"
                        > 
                            Exams
                        </div>
                        <div 
                            className='font-bold text-2xl text-green-600 ml-5 mb-7 mt-5 flex gap-10 pl-10'
                        >
                            <span 
                                className="text-lg text-black"
                            >
                                Objective
                            </span>
                            <span 
                                className='mt-1 cursor-pointer' 
                                onClick={() => 
                                {
                                    setOpenAddObjectiveQuestioanire(true)
                                }}      
                            >
                                <BsHighlighter className="w-20 hover:text-blue-600" />
                            </span>
                        </div> 
        
                        <div 
                            className="container border-2 border-gray-200 py-20 mx-auto flex justify-center item-center gap-10"
                            >
                                {
                                    (data?.data?.length > 0) && data?.data?.map((questionaire: { id: number, name: string, description: string, type: string }, index: number) => {
                                        let isObjective = questionaire?.type === "objective" ? true : false
                                        return (
                                              <>  
                                              {
                                                  isObjective &&                                   
                                                  <div 
                                                      key={index}
                                                      className="rounded-xl d-flex w-3/12 bg-green-200 hover:bg-blue-400 hover:text-white hover:font-bold border-2 border-green-400 p-5 text-center cursor-pointer"
                                                      onClick={
                                                        () => {             
                                                            router.push(`/dashboard/exam-questionaires/objective/${questionaire?.id}`)
                                                        }
                                                      }
                                                    >                        
                                                        <div 
                                                            className="py-10 px-10 mb-5"
                                                        >
                                                            {questionaire?.name}
                                                        </div>
                            
                                                        <div 
                                                            className="justify-center item-center gap-10 space-x-5"
                                                        >
                                                            <span 
                                                                className="bg-blue-300 w-fit px-3 py-1 text-[10px] md:text-[14px] rounded-xl border-2 border-gray-300"
                                                                onClick={
                                                                    () => {
                                                                        setEditedData(questionaire)
                                                                        setOpenEditObjectiveQuestioanire(true)
                                                                    }
                                                                }
                                                            >
                                                                Edit
                                                            </span>
                                                            <span 
                                                                className="bg-blue-300 w-fit px-3 py-1 text-[10px] md:text-[14px] rounded-xl border-2 border-gray-300"
                                                                onClick={
                                                                    () => {
                                                                        setEditedData(questionaire)
                                                                        setOpenDeleteObjectiveQuestioanire(true)
                                                                    }
                                                                }
                                                            >
                                                                Delete
                                                            </span>
                                                        </div>
                                                    </div>
                                              }   
                                              </>
                                        )
                                    })
                                }
                        </div>
        
                        <div 
                                className='font-bold text-2xl text-green-600 ml-5 mb-7 flex gap-10 mt-14 pl-10'
                            >
                                <span 
                                    className="text-lg text-black"
                                >
                                    Theory
                                </span>
                                <span 
                                    className='mt-1 cursor-pointer' 
                                    onClick={() => 
                                    {
                                        setOpenAddTheoryQuestioanire(true)
                                    }}      
                                > 
                                    <BsHighlighter className="w-20 hover:text-blue-600" />
                                </span>
                        </div> 
        
                        <div 
                            className="container border-2 border-gray-200 py-20 mx-auto flex justify-center item-center gap-10"
                            >
                                {
                                    (data?.data?.length > 0) && data?.data?.map((questionaire: { id: number, name: string, description: string, type: string }, index: number) => {
                                        let isObjective = questionaire?.type === "theory" ? true : false
                                        return (
                                              <>  
                                              {
                                                  isObjective &&                                   
                                                  <div 
                                                      key={index}
                                                      className="rounded-xl d-flex w-3/12 bg-green-200 hover:bg-blue-400 hover:text-white hover:font-bold border-2 border-green-400 p-5 text-center cursor-pointer"
                                                      onClick={
                                                        () => {                                                            
                                                            router.push(`/dashboard/exam-questionaires/theory/${questionaire?.id}`)
                                                        }
                                                      }
                                                    >                        
                                                        <div 
                                                            className="py-10 px-10 mb-5"
                                                        >
                                                            {questionaire?.name}
                                                        </div>
                            
                                                        <div 
                                                          className="justify-center item-center gap-10 space-x-5"
                                                        >
                                                            <span 
                                                                className="bg-blue-300 w-fit px-3 py-1 text-[10px] md:text-[14px] rounded-xl border-2 border-gray-300"
                                                                onClick={
                                                                    () => {
                                                                        setEditedData(questionaire)
                                                                        setOpenEditTheoryQuestioanire(true)
                                                                    }
                                                                }
                                                            >
                                                                Edit
                                                            </span>
                                                            <span 
                                                                className="bg-blue-300 w-fit px-3 py-1 text-[10px] md:text-[14px] rounded-xl border-2 border-gray-300"
                                                                onClick={
                                                                    () => {
                                                                        setEditedData(questionaire)
                                                                        setOpenDeleteTheoryQuestioanire(true)
                                                                    }
                                                                }
                                                            >
                                                                Delete
                                                            </span>
                                                        </div>
                                                    </div>
                                              }   
                                              </>
                                        )
                                    })
                                }
                        </div>
                    </div>
                </>
            }

            {
                openAddObjectiveQuestioanire 
                    && <AddExamObjectiveQuestionaireModal
                            onClick={
                            () => 
                            {
                                refetch()
                                setOpenAddObjectiveQuestioanire(false)
                            }
                            }
                            openQuestionaire={openAddObjectiveQuestioanire}
                            token={token}
                        />
            }

            {
                openEditObjectiveQuestioanire 
                    && <EditExamObjectiveQuestionaireModal
                            onClick={
                            () => 
                            {
                                refetch()
                                setOpenEditObjectiveQuestioanire(false)
                            }
                            }
                            openQuestionaire={openEditObjectiveQuestioanire}
                            token={token}
                            data={editedData}
                        />
            }

            {
                openDeleteObjectiveQuestioanire 
                    && <DeleteExamObjectiveQuestionaireModal
                            onClick={
                            () => 
                            {
                                refetch()
                                setOpenDeleteObjectiveQuestioanire(false)
                            }
                            }
                            openQuestionaire={openDeleteObjectiveQuestioanire}
                            token={token}
                            data={editedData}
                        />
            }




            {
                openAddTheoryQuestioanire 
                    && <AddExamTheoryQuestionaireModal
                            onClick={
                            () => 
                            {
                                refetch()
                                setOpenAddTheoryQuestioanire(false)
                            }
                            }
                            openQuestionaire={openAddTheoryQuestioanire}
                            token={token}
                        />
            }

            {
                openEditTheoryQuestioanire 
                    && <EditExamTheoryQuestionaireModal
                            onClick={
                            () => 
                            {
                                refetch()
                                setOpenEditTheoryQuestioanire(false)
                            }
                            }
                            openQuestionaire={openEditTheoryQuestioanire}
                            token={token}
                            data={editedData}
                        />
            }

            {
                openDeleteTheoryQuestioanire 
                    && <DeleteExamTheoryQuestionaireModal
                            onClick={
                            () => 
                            {
                                refetch()
                                setOpenDeleteTheoryQuestioanire(false)
                            }
                            }
                            openQuestionaire={openDeleteTheoryQuestioanire}
                            token={token}
                            data={editedData}
                        />
            }
        </>
    )
}
