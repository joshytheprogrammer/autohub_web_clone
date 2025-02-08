import { ColumnDef } from '@tanstack/react-table'
import React, { useEffect, useMemo, useState } from 'react'
import { AddTransmissionProduct } from '../sections/transmission/addTransmissionProduct'
import { EditTranmissionProduct } from '../sections/transmission/editTranmissionProduct'
import { DeleteTransmissionProduct } from '../sections/transmission/deleteTransmissionProduct'
import { Table } from '../../../../../components/shared/Table'
import { BsHighlighter } from 'react-icons/bs'
import { Show } from '../../../../../components/shared/Show'
import { Icons } from '../../../../../components/shared/Icons'
import { UseStore } from '../../../../../state/store'
import { useQuery } from '@tanstack/react-query'
import { GetTransmission } from '../../../../api/admin/market/transmission'
import { PuffLoader } from 'react-spinners'


export default function Transmissions()
{
      const userToken = UseStore((state) => state)
      const token: string = userToken.getUserToken()
      
      const [open] = useState<boolean>(false)
      const [showModal] = useState<boolean>(false)
      const [employeeId] = useState<string>('')
      const [isItThis] = useState<string>('')  
      const [openModal] = useState<boolean>(false)  

      const { data, isLoading, refetch, isRefetching } = useQuery({ queryKey: [`get-all-fuel`, token], queryFn: () => GetTransmission(token), refetchOnWindowFocus: true })
      
      const [openAddTransmission, setOpenAddTransmission] = useState<boolean>(false)
      const [openEditTransmission, setOpenEditTransmission] = useState<boolean>(false)
      const [openDeleteTransmission, setOpenDeleteTransmission] = useState<boolean>(false)
      const [transmissionData, setTransmissionData] = useState<{ id: number, name: string }>({ id: -1, name: "" })
    
      const [refresh, setRefresh] = useState<boolean>(false)

      useEffect(() => 
      {
        setRefresh(false)
      }, [open, showModal, employeeId, isItThis, openModal, refresh])
  
      const openAdd = (x: boolean, data: any) =>
      {
         console.log(data)
         setOpenAddTransmission(x)
      }

      const ChangeFuel = (x: boolean, data: any) => 
      {
          setTransmissionData(data)
          setOpenEditTransmission(x)
      }
  
      const DeleteFuel = (x: boolean, data: any) => 
      {
          setTransmissionData(data)
          setOpenDeleteTransmission(x)
      }

      type Fossile = 
      {
          id: string
          name: string
          edit: { id: number, name: string }
          delete: { id: number, name: string }
      }
  
      const fuel = useMemo<ColumnDef<Fossile>[]>(
          () => [
          {
            header: 'Name',
            cell: (row) => (<a href="#" onClick={() => openAdd(true, row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
            accessorKey: 'name',
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
                        Fuel Types
                  </span>
                  <span className='mt-1 cursor-pointer' 
                        onClick={() => {
                              setOpenAddTransmission(true)
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
                  
            {  !isLoading && (data?.data.length === 0) && <>
                    <div 
                        className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                    >
                        <div 
                            className="w-full d-flex justify-center items-center"
                        >
                            <div className="w-full text-center text-lg">No transmission created yet</div>
                        </div>
                    </div>
                </>
            }
                  
            {  
                  !isLoading && (data?.data?.length > 0) && 
                  <div 
                      className=''
                  >                          
                        <Table data={data?.data} 
                              columns={fuel} 
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

            { 
                  openAddTransmission &&  <AddTransmissionProduct 
                        openTransmissionProduct={openAddTransmission} 
                        token={token} 
                        onClick={() => {
                              refetch()
                              setOpenAddTransmission(false)
                        }}
                  />
            }

            { 
                  openEditTransmission &&  <EditTranmissionProduct 
                        openTransmissionProduct={openEditTransmission}
                        token={token} 
                        onClick={() => {
                              refetch()
                              setOpenEditTransmission(false)
                           }
                        }
                        data={transmissionData}
                  />
            }

            { 
                  openDeleteTransmission &&  <DeleteTransmissionProduct 
                                            openDeleteTransmission={openDeleteTransmission}
                                            token={token}
                                            onClick={() => {
                                                refetch()
                                                setOpenDeleteTransmission(false)
                                              } 
                                            }
                                            data={transmissionData}                  
                                        />
            }
            
      </div>
  )
}

