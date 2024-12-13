"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react"
import { Show } from "../../../../components/shared/Show"
import { Icons } from "../../../../components/shared/Icons"
import { BsHighlighter } from "react-icons/bs"
import { Table } from "../../../../components/shared/Table"
import student from '../../../../components/shared/data/student.json'
import { AddDepartmentModal } from "./modals/AddDepartmentModal"
import { ViewDepartmentModal } from "./modals/ViewDepartmentModal"
import { EditDepartmentModal } from "./modals/EditDepartmentModal"
import { DeleteDepartmentModal } from "./modals/DeleteDepartmentModal"


export default function Department() 
{
      const [open] = useState<boolean>(false)
      const [showModal] = useState<boolean>(false)
      const [employeeId] = useState<string>('')
      const [isItThis] = useState<string>('')  
      const [openModal] = useState<boolean>(false)  
      
      const [openAddDepartment, setOpenAddDepartment] = useState<boolean>(false)
      const [openEditDepartment, setOpenEditDepartment] = useState<boolean>(false)
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

      const opevView = (x: boolean, data: any) =>
      {
         console.log(data)
         setOpenViewDepartment(x)
      }

      const openEdit = (x: boolean, data: any) =>
      {
            console.log(data)
            setOpenEditDepartment(x)
      }

      const openDelete = (x: boolean, data: any) =>
      {
         console.log(data)
         setOpenDeleteDepartment(x)
      }
  
      const Employee = () => 
      {
          return student.students;
      }

      type AllStudent = 
      {
          id: string
          firstName: string
          surName: string
          middleName: string
          studentId: string
          phone: string
          email: string
          enrolled: string
      }
  
      const employees = useMemo<ColumnDef<AllStudent>[]>(
          () => [
          {
            header: 'Name',
            cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
            accessorKey: 'firstName',
          },
          {
              header: 'Description',
              cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
              accessorKey: 'surName',
          },
      //     {
      //         header: 'View',
      //         cell: (row) => (<a href="#" onClick={() => opevView(true, row.cell.row.getValue.toString)}><Icons iconName="eye" color='green' width={5} height={5}/></a>),
      //         accessorKey: '',
      //         maxSize: 20
      //     },
          {
              header: 'Edit',
              cell: (row) => (<a href="#" onClick={() => openEdit(true, row.cell.row.getValue.toString)}><Icons iconName="edit"  width={5} height={5} color='green' /></a>),
              accessorKey: '',
              maxSize: 20
          },
          {
              header: 'Delete',
              cell: (row) => (<a href="#" onClick={() => openDelete(true, row.cell.row.getValue.toString)}><Icons iconName="delete" color='red' width={4} height={4}/></a>),
              accessorKey: '',
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
            <div 
                  className="shadow-md border-2 border-gray-100 py-5 mb-3 mt-7 mx-auto md:mx-5 pb-8 rounded-none overflow-hidden hover:shadow-stone-400"
            >                    
                  <div 
                        className='px-5'
                  >           
                    <Table data={Employee()} 
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


            { 
                  openAddDepartment &&  <AddDepartmentModal 
                        openDepartmentModal={openAddDepartment}
                        userType={''} 
                        token={''} 
                        onClick={() => {
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
                        imageUrl={''} 
                        userId={0} 
                        message={''} 
                        userType={''} 
                        token={''} 
                        onClick={() => {
                              setOpenEditDepartment(false)
                        }}
                  />
            }

            { 
                  openDeleteDepartment &&  <DeleteDepartmentModal 
                        openDepartmentModal={openDeleteDepartment} 
                        imageUrl={''} 
                        userId={0} 
                        message={''} 
                        userType={''} 
                        token={''} 
                        onClick={() => {
                              setOpenDeleteDepartment(false)
                        }}
                  />
            }
      </div>
  )
}

