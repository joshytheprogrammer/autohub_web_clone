import { ColumnDef } from '@tanstack/react-table'
import React, { useEffect, useMemo, useState } from 'react'
import { Show } from '../../../../../components/shared/Show'
import { Icons } from '../../../../../components/shared/Icons'
import { BsHighlighter } from 'react-icons/bs'
import { Table } from '../../../../../components/shared/Table'
import { EditColourModal } from '../sections/colour/editColourModal'
import { DeleteColourModal } from '../sections/colour/deleteColourModal'
import { AddColourModal } from '../sections/colour/addColourModal'
import { useQuery } from '@tanstack/react-query'
import { UseStore } from '../../../../../state/store'
import { GetColour } from '../../../../api/admin/market/colour'
import { PuffLoader } from 'react-spinners'


export default function Color()
{
      const userToken = UseStore((state) => state)
      const token: string = userToken.getUserToken()
      
      const [open] = useState<boolean>(false)
      const [showModal] = useState<boolean>(false)
      const [employeeId] = useState<string>('')
      const [isItThis] = useState<string>('')  
      const [openModal] = useState<boolean>(false)  

      const { data, isLoading, refetch, isRefetching } = useQuery({ queryKey: [`get-all-colour`, token], queryFn: () => GetColour(token), refetchOnWindowFocus: true })
      
      const [openAddColour, setOpenAddColour] = useState<boolean>(false)
      const [openEditColour, setOpenEditColour] = useState<boolean>(false)
      const [openDeleteColour, setOpenDeleteColour] = useState<boolean>(false)
      const [colourData, setColourData] = useState<{ id: number, name: string, rate: number }>({ id: -1, name: "", rate: -1 })
  
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

      const ChangeFuel = (x: boolean, data: any) => 
      {
          setColourData(data)
          setOpenEditColour(x)
      }
  
      const DeleteFuel = (x: boolean, data: any) => 
      {
          setColourData(data)
          setOpenDeleteColour(x)
      }

      type AllColours = 
      {
          id: string
          name: string
          rate: number
          edit: { id: number, name: string, rate: number }
          delete: { id: number, name: string, rate: number }
      }
  
      const colours = useMemo<ColumnDef<AllColours>[]>(
          () => [
          {
            header: 'Name',
            cell: (row) => (<a href="#" onClick={() => openAdd(true, row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
            accessorKey: 'name',
          },
          {
            header: 'Rate',
            cell: (row) => (<a href="#" onClick={() => openAdd(true, row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
            accessorKey: 'rate',
          },
          {
              header: 'Edit',
              cell: (row) => (<a href="#" onClick={() => ChangeFuel(true, row.renderValue())}><Icons iconName='edit'  width={5} height={5} color='red' /></a>),
              accessorKey: 'edit',
              maxSize: 20
          },
          {
              header: 'Delete',
              cell: (row) => (<a href="#" onClick={() => DeleteFuel(true, row.renderValue())}><Icons iconName="delete" color='red' width={4} height={4}/></a>),
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
                        All Colour
                  </span>
                  <span className='mt-1 cursor-pointer' 
                        onClick={() => {
                              setOpenAddColour(true)
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
                  
            {  !isLoading && (data?.length === 0) && <>
                    <div 
                        className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                    >
                        <div 
                            className="w-full d-flex justify-center items-center"
                        >
                            <div className="w-full text-center text-lg">No colour created yet</div>
                        </div>
                    </div>
                </>
            }

                  
            {  
                !isLoading && (data?.length > 0) && 
                  <div 
                        className=''
                  >                          
                        <Table data={data} 
                              columns={colours} 
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
            }
            <div className='p-10'></div>

            { 
                  openAddColour &&  <AddColourModal 
                        openColourlProduct={openAddColour} 
                        onClick={() => {
                              refetch()
                              setOpenAddColour(false)
                        }}
                        token={token}  
                  />
            }

            { 
                  openEditColour &&  <EditColourModal 
                        openColourProduct={openEditColour}
                        onClick={() => {
                              refetch()
                              setOpenEditColour(false)
                        }}
                        token={token}
                        data={colourData}  
                  />
            }

            { 
                  openDeleteColour &&  <DeleteColourModal 
                                            openDeleteColour={openDeleteColour}
                                            onClick={() => {
                                                refetch()
                                                setOpenDeleteColour(false)
                                             } 
                                            }
                                            token={token}
                                            data={colourData}                
                                        />
            }
      </div>
  )
}
