"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react"
import { Show } from "../../../../components/shared/Show"
import { Icons } from "../../../../components/shared/Icons"
import { BsHighlighter } from "react-icons/bs"
import { Table } from "../../../../components/shared/Table"
import { AddDepartmentModal } from "./modals/AddDepartmentModal"
import { ViewDepartmentModal } from "./modals/ViewDepartmentModal"
import { EditDepartmentModal } from "./modals/EditDepartmentModal"
import { DeleteDepartmentModal } from "./modals/DeleteDepartmentModal"
import { useQuery } from "@tanstack/react-query"
import { UseStore } from "../../../../state/store"
import { Departments } from "../../../api/admin/department"
import { PuffLoader } from "react-spinners"


export default function Department() 
{
      const userToken = UseStore((state) => state)
      const token: string = userToken.getUserToken()

      const { data, isLoading, refetch, isRefetching } = useQuery({ queryKey: [`get-all-departments`, token], queryFn: () => Departments(token)})

      const [open] = useState<boolean>(false)
      const [showModal] = useState<boolean>(false)
      const [employeeId] = useState<string>('')
      const [isItThis] = useState<string>('')  
      const [openModal] = useState<boolean>(false)  
      
      const [openAddDepartment, setOpenAddDepartment] = useState<boolean>(false)
      const [openEditDepartment, setOpenEditDepartment] = useState<boolean>(false)
      const [editData, setEditData] = useState<{ id: number, name: string, description: string }>({ id: -1, name: "", description: "" })
      const [openDeleteDepartment, setOpenDeleteDepartment] = useState<boolean>(false)
      const [openViewDepartment, setOpenViewDepartment] = useState<boolean>(false)
  
      const [showingStates, setShowStates] = useState<boolean>(false)

      const [refresh, setRefresh] = useState<boolean>(false)

      useEffect(() => 
      {
        setRefresh(false)
      }, [open, showModal, employeeId, isItThis, openModal, showingStates, refresh])
  
      const ShowStates = (page: any) => 
      {
         console.log(page)
         setShowStates(true)
      }

      const openEdit = (x: boolean, data: any) =>
      {
         setEditData(data)
         setOpenEditDepartment(x)
      }

      const openDelete = (x: boolean, data: any) =>
      {
         setEditData(data)
         setOpenDeleteDepartment(x)
      }

      type AllStudent = 
      {
          id: string
          name: string
          description: string
          edit_data: { id: number, name: string, description: string }
          delete_data: { id: number, name: string, description: string }
      }
  
      const employees = useMemo<ColumnDef<AllStudent>[]>(
          () => [
          {
            header: 'Name',
            cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
            accessorKey: 'name',
          },
          {
              header: 'Description',
              cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
              accessorKey: 'description',
          },
      //     {
      //         header: 'View',
      //         cell: (row) => (<a href="#" onClick={() => opevView(true, row.cell.row.getValue.toString)}><Icons iconName="eye" color='green' width={5} height={5}/></a>),
      //         accessorKey: '',
      //         maxSize: 20
      //     },
          {
              header: 'Edit',
              cell: (row) => (<a href="#" onClick={() => openEdit(true, row.renderValue())}><Icons iconName="edit"  width={5} height={5} color='green' /></a>),
              accessorKey: 'edit_data',
              maxSize: 20
          },
          {
              header: 'Delete',
              cell: (row) => (<a href="#" onClick={() => openDelete(true, row.renderValue())}><Icons iconName="delete" color='red' width={4} height={4}/></a>),
              accessorKey: 'delete_data',
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
                        All Departments
                  </span>
                  <span className='mt-1 cursor-pointer' 
                        onClick={() => {
                              setOpenAddDepartment(true)
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
                  openAddDepartment &&  <AddDepartmentModal 
                        openDepartmentModal={openAddDepartment}
                        userType={''} 
                        token={token} 
                        onClick={() => {
                              refetch()
                              setOpenAddDepartment(false)
                        }}
                  />
            }

            { 
                  openViewDepartment &&  <ViewDepartmentModal 
                        openViewDepartment={openViewDepartment} 
                        imageUrl={''} 
                        userId={0} 
                        message={''} 
                        userType={''} 
                        token={''} 
                        onClick={() => {
                              setOpenViewDepartment(false)
                        }}
                  />
            }

            { 
                  openEditDepartment &&  <EditDepartmentModal 
                        openEditDepartment={openEditDepartment}
                        data={editData} 
                        userType={''} 
                        token={token} 
                        onClick={() => {
                            refetch()
                            setOpenEditDepartment(false)
                        }}
                  />
            }

            { 
                  openDeleteDepartment &&  <DeleteDepartmentModal 
                        openDepartmentModal={openDeleteDepartment} 
                        userType={''} 
                        token={token} 
                        onClick={() => {
                            refetch()
                            setOpenDeleteDepartment(false)
                        }}
                        data={editData}
                  />
            }
      </div>
  )
}

