import { ColumnDef } from '@tanstack/react-table'
import React, { useEffect, useMemo, useState } from 'react'
import student from '../../../../../components/shared/data/student.json'
import { AddTransmissionProduct } from '../sections/transmission/addTransmissionProduct'
import { EditTranmissionProduct } from '../sections/transmission/editTranmissionProduct'
import { DeleteTransmissionProduct } from '../sections/transmission/deleteTransmissionProduct'
import { Table } from '../../../../../components/shared/Table'
import { BsHighlighter } from 'react-icons/bs'
import { Show } from '../../../../../components/shared/Show'
import { Icons } from '../../../../../components/shared/Icons'

export default function Transmissions()
{
      const [open] = useState<boolean>(false)
      const [showModal] = useState<boolean>(false)
      const [employeeId] = useState<string>('')
      const [isItThis] = useState<string>('')  
      const [openModal] = useState<boolean>(false)  
      
      const [openAddTransmission, setOpenAddTransmission] = useState<boolean>(false)
      const [openEditTransmission, setOpenEditDealer] = useState<boolean>(false)
      const [openDeleteTransmission, setOpenDeleteTransmission] = useState<boolean>(false)
  
      const [showingStates] = useState<boolean>(false)

      const [refresh, setRefresh] = useState<boolean>(false)

      useEffect(() => 
      {
        setRefresh(false)
      }, [open, showModal, employeeId, isItThis, openModal, showingStates, refresh])
  
      const openAdd = (x: boolean, data: any) =>
      {
         console.log(data)
         setOpenAddTransmission(x)
      }

      const openEdit = (x: boolean, data: any) =>
      {
         console.log(data)
         setOpenEditDealer(x)
      }

      const openDelete = (x: boolean, data: any) =>
      {
         console.log(data)
         setOpenDeleteTransmission(x)
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
                        All Transmissions
                  </span>
                  <span className='mt-1 cursor-pointer' 
                        onClick={() => {
                              setOpenAddTransmission(true)
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
                  openAddTransmission &&  <AddTransmissionProduct 
                        openTransmissionProduct={openAddTransmission} 
                        userType={''} 
                        token={''} 
                        onClick={() => {
                              setOpenAddTransmission(false)
                        }}
                  />
            }

            { 
                  openEditTransmission &&  <EditTranmissionProduct 
                        openTransmissionProduct={openEditTransmission}
                        userType={''} 
                        token={''} 
                        onClick={() => {
                              setOpenEditDealer(false)
                        }}
                  />
            }

            { 
                  openDeleteTransmission &&  <DeleteTransmissionProduct 
                                            openDeleteTransmission={openDeleteTransmission}
                                            userType={''}
                                            token={''}
                                            onClick={() => {
                                                setOpenDeleteTransmission(false)
                                            } } message={''}                  
                                        />
            }
      </div>
  )
}
