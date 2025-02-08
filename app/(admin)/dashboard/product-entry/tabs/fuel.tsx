import React, { useEffect, useMemo, useState } from 'react'
import { AddFuelProduct } from '../sections/fuel/addFuelProduct'
import { EditFuelProduct } from '../sections/fuel/editFuelProduct'
import { DeleteFuelProduct } from '../sections/fuel/deleteFuelProduct'
import { Table } from '../../../../../components/shared/Table'
import { BsHighlighter } from 'react-icons/bs'
import { ColumnDef } from '@tanstack/react-table'
import { Show } from '../../../../../components/shared/Show'
import { Icons } from '../../../../../components/shared/Icons'
import { useQuery } from '@tanstack/react-query'
import { UseStore } from '../../../../../state/store'
import { GetFuel } from '../../../../api/admin/market/fuel'
import { PuffLoader } from 'react-spinners'



export default function Fuel()
{
      const userToken = UseStore((state) => state)
      const token: string = userToken.getUserToken()
      
      const [open] = useState<boolean>(false)
      const [showModal] = useState<boolean>(false)
      const [employeeId] = useState<string>('')
      const [isItThis] = useState<string>('')  
      const [openModal] = useState<boolean>(false)  

      const { data, isLoading, refetch, isRefetching } = useQuery({ queryKey: [`get-all-fuel`, token], queryFn: () => GetFuel(token), refetchOnWindowFocus: true })
      
      const [openAddFuel, setOpenAddFuel] = useState<boolean>(false)
      const [openEditFuel, setOpenEditFuel] = useState<boolean>(false)
      const [openDeleteFuel, setOpenDeleteFuel] = useState<boolean>(false)
      const [fuelData, setFuelData] = useState<{ id: number, name: string }>({ id: -1, name: "" })
  
      const [refresh, setRefresh] = useState<boolean>(false)

      useEffect(() => 
      {
        setRefresh(false)
      }, [open, showModal, employeeId, isItThis, openModal, refresh])
  
      const openAdd = (x: boolean, data: any) =>
      {
         console.log(data)
         setOpenAddFuel(x)
      }

      const ChangeFuel = (x: boolean, data: any) => 
      {
          setFuelData(data)
          setOpenEditFuel(x)
      }
  
      const DeleteFuel = (x: boolean, data: any) => 
      {
          setFuelData(data)
          setOpenDeleteFuel(x)
      }

      type Fossile = 
      {
          id: string
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
                              setOpenAddFuel(true)
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
                            <div className="w-full text-center text-lg">No fuel created yet</div>
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
                  openAddFuel &&  <AddFuelProduct 
                        openFuelProduct={openAddFuel} 
                        token={token} 
                        onClick={() => {
                              refetch()
                              setOpenAddFuel(false)
                        }}
                  />
            }

            { 
                  openEditFuel &&  <EditFuelProduct 
                        openFuelProduct={openEditFuel}
                        token={token} 
                        onClick={() => {
                              refetch()
                              setOpenEditFuel(false)
                        }}
                        data={fuelData}
                  />
            }

            { 
                  openDeleteFuel &&  <DeleteFuelProduct 
                                            openDeleteFuel={openDeleteFuel}
                                            token={token}
                                            onClick={() => {
                                                refetch()
                                                setOpenDeleteFuel(false)
                                             } 
                                          }       
                                          data={fuelData}        
                                    />
            }
      </div>
  )
}
