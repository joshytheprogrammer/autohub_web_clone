"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react"
import { Show } from "../../../../components/shared/Show"
import { Icons } from "../../../../components/shared/Icons"
import { BsHighlighter } from "react-icons/bs"
import { Table } from "../../../../components/shared/Table"
import { useQuery } from "@tanstack/react-query"
import { UseStore } from "../../../../state/store"
import { PuffLoader } from "react-spinners"
import { AddQuestionaireModal } from "./modal/AddQuestionaireModal"
import { EditQuestionaireModal } from "./modal/EditQuestionaireModal"
import { DeleteQuestionaireModal } from "./modal/DeleteQuestionaireModal"
import { Questionaires } from "../../../api/admin/academic/test"
import { useRouter } from "next/navigation"


export default function TestQuestionaire() 
{
    const router = useRouter()
    const userToken = UseStore((state) => state)
    const token: string = userToken.getUserToken()

    const { data, isLoading, refetch, isRefetching } = useQuery({ queryKey: [`get-all-test-questionaire`, token], queryFn: () => Questionaires(token)})
      
    const [openAddQuestionaire, setOpenAddQuestionaire] = useState<boolean>(false)
    const [openEditQuestionaire, setOpenEditQuestionaire] = useState<boolean>(false)
    const [openDeleteQuestionaire, setOpenDeleteQuestionaire] = useState<boolean>(false)
      
    const [editData, setEditData] = useState<{ id: number, name: string, description: string }>({ id: -1, name: "", description: "" })
  
    const [showingStates, setShowStates] = useState<boolean>(false)

    useEffect(() => 
    {
    }, [open, showingStates])
  
    const ShowStates = (page: any) => 
    {
       console.log(page)
       setShowStates(true)
    }

    const Questions = (id: any) => 
    {
       router.push(`/dashboard/test-questionaires/${id}`)
    }

    const openEdit = (x: boolean, data: any) =>
    {
       setEditData(data)
       setOpenEditQuestionaire(x)
    }

    const openDelete = (x: boolean, data: any) =>
    {
       setEditData(data)
       setOpenDeleteQuestionaire(x)
    }

    type AllStudent = 
    {
        id: string
        name: string
        description: string
        edit: { id: number, name: string, description: string }
        delete: { id: number, name: string, description: string }
    }
  
    const employees = useMemo<ColumnDef<AllStudent>[]>(
        () => [
        {
          header: 'Name',
          cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
          accessorKey: 'name',
        },
        {
           header: 'Questions',
           cell: (row) => (<a href="#" onClick={() => Questions(row.renderValue())}><BsHighlighter className="w-16 hover:text-blue-600" /></a>),
           accessorKey: 'id',
        },
        {
           header: 'Desciptions',
           cell: (row) => (<a onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
           accessorKey: 'description',
        },
        {
           header: 'Edit',
           cell: (row) => (<a href="#" onClick={() => openEdit(true, row.renderValue())}><Icons iconName="edit"  width={5} height={5} color='green' /></a>),
           accessorKey: 'edit',
           maxSize: 20
        },
        {
           header: 'Delete',
           cell: (row) => (<a href="#" onClick={() => openDelete(true, row.renderValue())}><Icons iconName="delete" color='red' width={4} height={4}/></a>),
           accessorKey: 'delete',
           maxSize: 20
        }
     ],[])

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
                        All Test Questionaires
                  </span>
                  <span className='mt-1 cursor-pointer' 
                        onClick={() => {
                              setOpenAddQuestionaire(true)
                        }}      
                  >
                     <BsHighlighter className="w-20 hover:text-blue-600" />
                  </span>
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
                                <div className="w-full text-center text-lg">No Member Yet</div>
                            </div>
                        </div>
                    </>
                }
            
            {
                  !isLoading && (data?.data?.length > 0) &&                         
                  <div 
                        className="shadow-md border-2 border-gray-100 py-5 mb-3 mt-7 mx-auto md:mx-5 pb-8 rounded-none overflow-hidden hover:shadow-stone-400"
                  >                    
                        <div 
                              className='px-5'
                        >           
                        <Table data={data?.data} 
                              columns={employees} 
                              showNavigation={false} 
                              searchPlaceHolder='search for employees ...' 
                              path='students' 
                              from='students' 
                              pageNos={[10, 20, 30]}
                              onClick={(no) => {
                              //      setPerPage(no)
                              }}
                              searchTerm={(word) => {
                                    // setSearchQuery(word)
                              }}
                        /> 
                        </div>                       
                  </div>
            }


            {
                openAddQuestionaire && <AddQuestionaireModal
                                            onClick={
                                                () => 
                                                {
                                                    refetch()
                                                    setOpenAddQuestionaire(false)
                                                }
                                            }
                                            openQuestionaire={openAddQuestionaire}
                                            token={token}
                                        />
            }

            {
                openEditQuestionaire && <EditQuestionaireModal
                                            onClick={
                                                () => 
                                                {
                                                    refetch()
                                                    setOpenEditQuestionaire(false)
                                                }
                                            }
                                            openQuestionaire={openEditQuestionaire}
                                            token={token}
                                            data={editData}
                                        />
            }

            {
                openDeleteQuestionaire && <DeleteQuestionaireModal
                                            onClick={
                                                () => 
                                                {
                                                    refetch()
                                                    setOpenDeleteQuestionaire(false)
                                                }
                                            }
                                            openQuestionaire={openDeleteQuestionaire}
                                            token={token}
                                            data={editData}
                                        />
            }

      </div>
  )
}


