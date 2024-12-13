import React, { useEffect, useMemo, useState } from 'react'
import { Table } from '../../../../../../components/shared/Table'
import { ColumnDef } from '@tanstack/react-table'
import { BsHighlighter } from 'react-icons/bs'
import { Icons } from '../../../../../../components/shared/Icons'
import student from '../../../../../../components/shared/data/student.json'
import { Show } from '../../../../../../components/shared/Show'
import { AddCountryModal } from './country/addCountryModal'
import { AllCountyStatesModal } from './country/allCountryStates'
import { DeleteCountryModal } from './country/deleteCountryModal'
import { EditCountryModal } from './country/editCountryModal'


export default function Country() 
{
    const [open] = useState<boolean>(false)
    const [showModal] = useState<boolean>(false)
    const [employeeId] = useState<string>('')
    const [isItThis] = useState<string>('')  
    const [openModal] = useState<boolean>(false)  
    
    const [openAddCountry, setOpenAddCountry] = useState<boolean>(false)
    const [openEditCountry, setOpenEditDealer] = useState<boolean>(false)
    const [openDeleteCountry, setOpenDeleteCountry] = useState<boolean>(false)
    const [openCountryStates, setOpenCountryState] = useState<boolean>(false)

    const [refresh, setRefresh] = useState<boolean>(false)

    useEffect(() => 
    {
      setRefresh(false)
    }, [open, showModal, employeeId, isItThis, openModal, refresh])
    
  
    const openAdd = (x: boolean, data: any) =>
    {
        console.log(data)
        setOpenAddCountry(x)
    }

    const openEdit = (x: boolean, data: any) =>
    {
        console.log(data)
        setOpenEditDealer(x)
    }

    const openDelete = (x: boolean, data: any) =>
    {
        console.log(data)
        setOpenDeleteCountry(x)
    }

    const openCountryWithStates = (x: boolean, data: any) => 
    {
        console.log(data)
        setOpenCountryState(x)
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
          header: 'Countries',
          cell: (row) => (<a href="#" onClick={() => openAdd(true, row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
          accessorKey: 'firstName',
        },
        {
            header: 'States',
            cell: (row) => (<a href="#" className='text-blue-600' onClick={() => openCountryWithStates(true, row.cell.row.getValue.toString)}>21</a>),
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
                        Countries
                  </span>
                  <span className='mt-1 cursor-pointer' 
                        onClick={() => {
                              setOpenAddCountry(true)
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
                       onClick={() => console.log('')}
                       searchTerm={() => console.log('')}                
                /> 
            </div>

            { 
                  openAddCountry &&  <AddCountryModal 
                        openCountryProduct={openAddCountry} 
                        userType={''} 
                        token={''} 
                        onClick={() => {
                              setOpenAddCountry(false)
                        }}
                  />
            }

            { 
                  openEditCountry &&  <EditCountryModal 
                        openCountryProduct={openEditCountry}
                        userType={''} 
                        token={''} 
                        onClick={() => {
                              setOpenEditDealer(false)
                        }}
                  />
            }

            { 
                  openDeleteCountry &&  <DeleteCountryModal 
                                            openDeleteCountry={openDeleteCountry}
                                            userType={''}
                                            token={''}
                                            onClick={() => {
                                                setOpenDeleteCountry(false)
                                            } } message={''}                  
                                        />
            }

            { 
                  openCountryStates &&  <AllCountyStatesModal 
                                            openCountryStates={openCountryStates}
                                            userType={''}
                                            token={''}
                                            onClick={() => {
                                                setOpenCountryState(false)
                                            } } message={''}                  
                                        />
            }
      </div>
    )
}
