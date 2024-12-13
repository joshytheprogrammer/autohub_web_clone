import React, { useEffect, useMemo, useState } from 'react'
import student from '../../../../../../components/shared/data/student.json'
import { CellContext, ColumnDef } from '@tanstack/react-table'
import { Show } from '../../../../../../components/shared/Show'
import { BsHighlighter } from 'react-icons/bs'
import { Table } from '../../../../../../components/shared/Table'
import { Icons } from '../../../../../../components/shared/Icons'
import { AddTrimProduct } from './trim/addTrimProduct'
import { EditTrimProduct } from './trim/editTrimProduct'
import { DeleteTrimProduct } from './trim/deleteTrimProduct'
import { AllTrimEngine } from './trim/allTrimEngine'

export default function Trim()
{
    const [open] = useState<boolean>(false)
    const [showModal] = useState<boolean>(false)
    const [employeeId] = useState<string>('')
    const [isItThis] = useState<string>('')  
    const [openModal] = useState<boolean>(false)  
    
    const [openAddTrim, setOpenAddTrim] = useState<boolean>(false)
    const [openEditTrim, setOpenEditDealer] = useState<boolean>(false)
    const [openDeleteTrim, setOpenDeleteTrim] = useState<boolean>(false)
    const [openTrimEngine, setOpenTrimEngine] = useState<boolean>(false)

    const [refresh, setRefresh] = useState<boolean>(false)

    useEffect(() => 
    {
      setRefresh(false)
    }, [open, showModal, employeeId, isItThis, openModal, refresh])
    
  
    const openAdd = (x: boolean, data: any) =>
    {
        console.log(data)
        setOpenAddTrim(x)
    }

    const openEdit = (x: boolean, data: any) =>
    {
        console.log(data)
        setOpenEditDealer(x)
    }

    const openDelete = (x: boolean, data: any) =>
    {
        console.log(data)
        setOpenDeleteTrim(x)
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
          header: 'Names',
          cell: (row) => (<a href="#" onClick={() => openAdd(true, row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
          accessorKey: 'firstName',
        },
        {
            header: 'States',
            cell: (row: CellContext<AllStudent, unknown>) =>{
              const value:any = row.renderValue() as {}
              console.log(value)
              return (                                                                                                                               
                  <>
                      <span className="px-2 py-2 font-semibold cursor-pointer text-xs text-white hover:text-white rounded-xl bg-blue-600 hover:bg-blue-800"
                            onClick={() => setOpenTrimEngine(true)}
                      >
                          {'View Engines'}
                      </span>
                  </>
              )
          },
            accessorKey: 'firstName',
            maxSize: 20
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
               className='font-bold text-2xl text-green-600 ml-5 mb-7 mt-5 flex gap-10'
            >
                  <span 
                     className="text-lg text-black"
                    >
                        Add Trim
                  </span>
                  <span className='mt-1 cursor-pointer' 
                        onClick={() => {
                              setOpenAddTrim(true)
                        }}      
                  >
                     <BsHighlighter className="w-20 hover:text-blue-600" />
                  </span>
            </div> 

            <div 
                className='-mt-7'
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
                  openAddTrim &&  <AddTrimProduct 
                        openTrimProduct={openAddTrim} 
                        userType={''} 
                        token={''} 
                        onClick={() => {
                              setOpenAddTrim(false)
                        }}
                  />
            }

            { 
                  openEditTrim &&  <EditTrimProduct
                        openTrimProduct={openEditTrim}
                        userType={''} 
                        token={''} 
                        onClick={() => {
                              setOpenEditDealer(false)
                        }}
                  />
            }

            { 
                  openDeleteTrim &&  <DeleteTrimProduct 
                                            openDeleteTrim={openDeleteTrim}
                                            userType={''}
                                            token={''}
                                            onClick={() => {
                                                setOpenDeleteTrim(false)
                                            } } message={''}                  
                                        />
            }

            { 
                  openTrimEngine &&  <AllTrimEngine
                                          openTrimEngine={openTrimEngine}
                                          userType={''}
                                          token={''}
                                          onClick={() => {
                                              setOpenTrimEngine(false)
                                          } } message={''}                  
                                    />
            }
      </div>
    )
}

