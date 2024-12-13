import { ColumnDef } from '@tanstack/react-table'
import React, { useEffect, useMemo, useState } from 'react'
import student from '../../../../../components/shared/data/student.json'
import { Show } from '../../../../../components/shared/Show'
import { Icons } from '../../../../../components/shared/Icons'
import { BsHighlighter } from 'react-icons/bs'
import { Table } from '../../../../../components/shared/Table'
import { EditColourModal } from '../sections/colour/editColourModal'
import { DeleteColourModal } from '../sections/colour/deleteColourModal'
import { AddColourModal } from '../sections/colour/addColourModal'

export default function Color()
{
      const [open] = useState<boolean>(false)
      const [showModal] = useState<boolean>(false)
      const [employeeId] = useState<string>('')
      const [isItThis] = useState<string>('')  
      const [openModal] = useState<boolean>(false)  
      
      const [openAddColour, setOpenAddColour] = useState<boolean>(false)
      const [openEditColour, setOpenEditDealer] = useState<boolean>(false)
      const [openDeleteColour, setOpenDeleteColour] = useState<boolean>(false)
  
      const [refresh, setRefresh] = useState<boolean>(false)

      useEffect(() => 
      {
        setRefresh(false)
      }, [open, showModal, employeeId, isItThis, openModal, refresh])
  
      const openAdd = (x: boolean, data: any) =>
      {
         console.log(data)
         setOpenAddColour(x)
      }

      const openEdit = (x: boolean, data: any) =>
      {
         console.log(data)
         setOpenEditDealer(x)
      }

      const openDelete = (x: boolean, data: any) =>
      {
         console.log(data)
         setOpenDeleteColour(x)
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
            header: 'Firstname',
            cell: (row) => (<a href="#" onClick={() => openAdd(true, row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
            accessorKey: 'firstName',
          },
          {
              header: 'Edit',
              cell: (row) => (<a href="#" onClick={() => openEdit(true, row.cell.row.getValue.toString)}><Icons iconName='edit'  width={5} height={5} color='red' /></a>),
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
                        All Product Colour
                  </span>
                  <span className='mt-1 cursor-pointer' 
                        onClick={() => {
                              setOpenAddColour(true)
                        }}      
                  >
                     <BsHighlighter className="w-20 hover:text-blue-600" />
                  </span>
            </div> 

            <div 
                className=''
            >                          
                <Table data={Employee()} 
                       columns={employees} 
                       showNavigation={false} 
                       searchPlaceHolder='search for transactions ...' 
                       path='transactions' 
                       from='transactions' 
                       headerTextColor="white"
                        onClick={
                            () => console.log('')
                        } searchTerm={
                            () => console.log('')
                         } 
                /> 
            </div>

            { 
                  openAddColour &&  <AddColourModal 
                        openColourlProduct={openAddColour} 
                        userType={''} 
                        token={''} 
                        onClick={() => {
                              setOpenAddColour(false)
                        }}
                  />
            }

            { 
                  openEditColour &&  <EditColourModal 
                        openColourProduct={openEditColour}
                        userType={''} 
                        token={''} 
                        onClick={() => {
                              setOpenEditDealer(false)
                        }}
                  />
            }

            { 
                  openDeleteColour &&  <DeleteColourModal 
                                            openDeleteColour={openDeleteColour}
                                            userType={''}
                                            token={''}
                                            onClick={() => {
                                                setOpenDeleteColour(false)
                                            } } message={''}                  
                                        />
            }
      </div>
  )
}
