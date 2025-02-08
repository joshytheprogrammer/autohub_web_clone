import React, { useEffect, useMemo, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { BsHighlighter } from 'react-icons/bs'
import { Table } from '../../../../../components/shared/Table'
import { AddConditionProduct } from '../sections/condition/addConditionProduct'
import { EditConditionProduct } from '../sections/condition/editConditionProduct'
import { DeleteConditionProduct } from '../sections/condition/deleteConditionProduct'
import { Show } from '../../../../../components/shared/Show'
import { Icons } from '../../../../../components/shared/Icons'
import { useQuery } from '@tanstack/react-query'
import { UseStore } from '../../../../../state/store'
import { GetCondition } from '../../../../api/admin/market/condition'
import { PuffLoader } from 'react-spinners'


export default function Conditions()
{
      const userToken = UseStore((state) => state)
      const token: string = userToken.getUserToken()
      
      const [open] = useState<boolean>(false)
      const [showModal] = useState<boolean>(false)
      const [employeeId] = useState<string>('')
      const [isItThis] = useState<string>('')  
      const [openModal] = useState<boolean>(false)  

      const { data, isLoading, refetch, isRefetching } = useQuery({ queryKey: [`get-all-fuel`, token], queryFn: () => GetCondition(token), refetchOnWindowFocus: true })
      
      const [openAddCondition, setOpenAddCondition] = useState<boolean>(false)
      const [openEditCondition, setOpenEditCondition] = useState<boolean>(false)
      const [openDeleteCondition, setOpenDeleteCondition] = useState<boolean>(false)
      const [conditionData, setConditionData] = useState<{ id: number, name: string }>({ id: -1, name: "" })
  
      const [refresh, setRefresh] = useState<boolean>(false)

      useEffect(() => 
      {
        setRefresh(false)
      }, [open, showModal, employeeId, isItThis, openModal, refresh])
  
      const openAdd = (x: boolean, data: any) =>
      {
         console.log(data)
         setOpenAddCondition(x)
      }

      const ChangeFuel = (x: boolean, data: any) => 
      {
          setConditionData(data)
          setOpenEditCondition(x)
      }
  
      const DeleteFuel = (x: boolean, data: any) => 
      {
          setConditionData(data)
          setOpenDeleteCondition(x)
      }

      type AllCondition = 
      {
          id: string
          name: string
          edit: string
          delete: string
      }
  
      const conditions = useMemo<ColumnDef<AllCondition>[]>(
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
                        All Conditions
                  </span>
                  <span className='mt-1 cursor-pointer' 
                        onClick={() => {
                              setOpenAddCondition(true)
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
                            <div className="w-full text-center text-lg">No Condition created yet</div>
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
                           columns={conditions} 
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
                  openAddCondition &&  <AddConditionProduct 
                        openConditionProduct={openAddCondition} 
                        token={token} 
                        onClick={() => 
                          {
                              refetch()
                              setOpenAddCondition(false)
                          }
                        }
                        data={conditionData}  
                  />
            }

            { 
                  openEditCondition &&  <EditConditionProduct 
                        openConditionProduct={openEditCondition}
                        token={token} 
                        onClick={() => 
                          {
                              refetch()
                              setOpenEditCondition(false)
                          }
                        }
                        data={conditionData}  
                  />
            }

            { 
                  openDeleteCondition &&  <DeleteConditionProduct 
                                            openDeleteCondition={openDeleteCondition}
                                            token={token}
                                            onClick={() => 
                                              {
                                                refetch()
                                                setOpenDeleteCondition(false)
                                              } 
                                            }
                                            data={conditionData}                  
                                        />
            }
      </div>
  )
}
