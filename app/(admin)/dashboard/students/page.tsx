"use client"

import React, { useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Show } from '../../../../components/shared/Show';
import { Icons } from '../../../../components/shared/Icons';
import student from '../../../../components/shared/data/student.json'
import { Table } from '../../../../components/shared/Table';


export default function Students() 
{
      const [open, setOpen] = useState<boolean>(false)
      const [showModal, setShowModal] = useState<boolean>(false)
      const [employeeId, setEmployeeId] = useState<string>('')
      const [isItThis, setIsItThis] = useState<string>('')  
      const [openModal, setOpenModal] = useState<boolean>(false)  
      
      const [editOpenModal, setEditModal] = useState<boolean>(false)
      const [deleteOpenModal, setDeleteModal] = useState<boolean>(false)
  
      const [showingStates, setShowStates] = useState<boolean>(false)
      const [action, setAction] = useState<boolean>(false)
      const [showProfile, setShowProfile] = useState<boolean>(false)

      const [refresh, setRefresh] = useState<boolean>(false)

      useEffect(() => 
      {
        setRefresh(false)
      }, [open, showModal, employeeId, isItThis, openModal, editOpenModal, deleteOpenModal, showingStates, action, showProfile, refresh])
      
      const editModal = (page: any) => {
          setEditModal(true)
      }
  
      const deleteModal = (page: any) => {
          setDeleteModal(true)
      }
  
      const ShowStates = (page: any) => 
      {
          setShowStates(true)
      }
  
      const pages = (page: any) => {
          // setShowModal(true)
          // navigate(`${page}`);
          setAction(true)
      }
  
      const setProfile = (data: any) => 
      {
          setShowProfile(true)
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
            cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
            accessorKey: 'firstName',
          },
          {
              header: 'Surname',
              cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
              accessorKey: 'surName',
          },
          {
              header: 'MiddleName',
              cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
              accessorKey: 'middleName',
          },
          {
              header: 'Student Id',
              cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
              accessorKey: 'studentId',
          },
          {
              header: 'Phone',
              cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
              accessorKey: 'phone',
          },
          {
              header: 'Email',
              cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
              accessorKey: 'email',
          },
          {
              header: 'Enrolled',
              cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
              accessorKey: 'enrolled',
          },
          {
              header: '...',
              cell: (row) => (<a href="#" onClick={() => setProfile(row.cell.row.getValue.toString)}><Icons iconName="eye" width={5} height={5}/></a>),
              accessorKey: '',
          },
          {
              header: '...',
              cell: (row) => (<a href="#" onClick={() => pages(row.cell.row.getValue.toString)}><Icons iconName="list-bullet" width={4} height={4}/></a>),
              accessorKey: '',
          }
      ],[])

  return (
      <div 
            className="w-full"
      > 
            <div 
                    className='font-bold text-2xl text-green-600 ml-5 mb-7 mt-7'
            >
                    All Students
            </div> 
            <div 
                  className="shadow-md border-2 border-gray-100 py-5 mb-3 mt-7 mx-auto md:mx-5 pb-8 rounded-none overflow-hidden hover:shadow-stone-400"
            >                    
                  <div 
                        className='px-5'
                  >                              
                    <Table data={Employee()} 
                            columns={employees} 
                            showNavigation={true} 
                            searchPlaceHolder='search for employees ...' 
                            path='students' 
                            from='students' 
                    /> 
                  </div>                       
            </div>
      </div>
  )
}
