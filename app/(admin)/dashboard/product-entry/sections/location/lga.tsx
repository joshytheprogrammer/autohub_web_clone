import { ColumnDef } from '@tanstack/react-table'
import React, { useEffect, useMemo, useState } from 'react'
import { Show } from '../../../../../../components/shared/Show'
import { Icons } from '../../../../../../components/shared/Icons'
import { BsHighlighter } from 'react-icons/bs'
import { Table } from '../../../../../../components/shared/Table'
import { DeleteStateModal } from './state/deleteStateModal'
import { useQuery } from '@tanstack/react-query'
import { UseStore } from '../../../../../../state/store'
import { PuffLoader } from 'react-spinners'
// import SearchCountry from './SearchCountry'
import { countryDB } from '../../../../../model/Product'
import { AddLGAModal } from './lga/addLgaModal'
import { EditLGAModal } from './lga/editLGAModal'
import { LGAA, GetLGA } from '../../../../../api/admin/market/lga'


export default function LGA() 
{
    const userToken = UseStore((state) => state)
    const token: string = userToken.getUserToken()

    const [open] = useState<boolean>(false)
    const [showModal] = useState<boolean>(false)
    const [employeeId] = useState<string>('')
    const [isItThis] = useState<string>('')  
    const [openModal] = useState<boolean>(false)  
    const [allCountry, setCountries] = useState<any>([])
    const [countryId, setCountryId] = useState<number>(1)
    const [stateId, setStateId] = useState<number>(50)
    
    const { data, isLoading, refetch, isRefetching } = useQuery({ queryKey: [`get-all-lga`, token], queryFn: () => GetLGA(token), refetchOnWindowFocus: true })
   
    const [openLGAState, setOpenLGAState] = useState<boolean>(false)
    const [openEditState, setOpenEditState] = useState<boolean>(false)
    const [openDeleteState, setOpenDeleteState] = useState<boolean>(false)
    const [stateData, setStateData] = useState<
                                                { id: number, name: string, country_id: number, country_name: string, state_id: number, state_name: string, rate: number }
                                               >(
                                                  { id: -1, name: "", country_id: -1, country_name: "", state_id: -1, state_name: "", rate: -1 }
                                                )

    const [refresh, setRefresh] = useState<boolean>(false)

    useEffect(() => 
    {
        product()
    }, [])

    const visible: any = 
    {
        delete: userToken.getFName() != "Data-Operator"
    }

//     useEffect(() => 
//     {
//         refetch()
//     }, [countryId])

    const product = async () => 
    {
       const countries = await countryDB.toArray()
       setCountries(countries)
    }

    useEffect(() => 
    {
      setRefresh(false)
    }, [open, showModal, employeeId, isItThis, openModal, refresh])

    useEffect(() => 
    {
  
    }, [allCountry])
    
  
    const openAdd = (x: boolean, data: any) =>
    {
        setOpenLGAState(x)
    }

    const changeLGA = (x: boolean, data: any) => 
    {
        setStateData(data)
        setOpenEditState(x)
    }

    const DeleteState = (x: boolean, data: any) => 
    {
        setStateData(data)
        setOpenDeleteState(x)
    }

    type AllState = 
    {
        id: string
        name: string
        rate: number
        edit: { id: number, country_id: number, state_id: number, name: string }
        delete: { id: number, country_id: number, state_id: number, name: string }
    }

    const employees = useMemo<ColumnDef<AllState>[]>(
        () => [
        {
          header: 'Names',
          cell: (row) => (<a href="#" onClick={() => openAdd(true, row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
          accessorKey: 'name',
        },
        {
            header: 'Rate',
            cell: (row) => (<Show display={row.renderValue()} textSize='18px' />),
            accessorKey: 'rate',
            maxSize: 20
        },
        {
            header: 'Edit',
            cell: (row) => (<a href="#" onClick={() => changeLGA(true, row.renderValue())}><Icons iconName='edit'  width={5} height={5} color='red' /></a>),
            accessorKey: 'edit',
            maxSize: 20
        },
        {
            header: 'Delete',
            cell: (row) => (<a href="#" onClick={() => DeleteState(true, row.renderValue())}><Icons iconName="delete" color='red' width={4} height={4}/></a>),
            accessorKey: 'delete',
            maxSize: 20
          }
    ],[])

    return (
      <div 
            className="w-full"
      > 
            <div 
               className='grid grid-cols-12 font-bold text-2xl justify-center items-center text-green-600 ml-5 mb-7 mt-5 gap-10'
            >
                  <div 
                     className="text-lg text-black col-span-2 md:col-span-1"
                    >
                        Local Government
                  </div>
                  <div className='mt-1 cursor-pointer col-span-2 md:col-span-1' 
                        onClick={() => {
                              setOpenLGAState(true)
                        }}      
                  >
                     <BsHighlighter className="w-20 hover:text-blue-600" />
                  </div>
                  <div 
                      className="text-lg text-black hidden md:col-span-6"
                  >
                  </div>
                  {/* <SearchCountry 
                        placeholder={''} 
                        selectedManufacturer={''} 
                        onClick={
                              (x) => {
                                  setCountryId(x)
                              }
                        } 
                        countries={allCountry}
                  />
                  <SearchCountry 
                        placeholder={''} 
                        selectedManufacturer={''} 
                        onClick={
                              (x) => {
                                  setCountryId(x)
                              }
                        } 
                        countries={allCountry}
                  /> */}
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
                            <div className="w-full text-center text-lg">No state yet</div>
                        </div>
                    </div>
                </>
            }

                  
            {  
               !isLoading && (data?.data?.length > 0) && 
                  <div 
                      className='-mt-7'
                  >                          
                        <Table data={data?.data} 
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
                            visible={visible}             
                        /> 
                  </div>
            }

            { 
                  openLGAState &&  <AddLGAModal 
                        openStateProduct={openLGAState} 
                        token={token} 
                        onClick={() => 
                        {
                              refetch()
                              setOpenLGAState(false)
                        }}
                        callAgain={() => 
                          {
                             refetch()
                             setOpenLGAState(false)
                          }
                        }
                  />
            }

            { 
                  openEditState &&  <EditLGAModal 
                        openStateProduct={openEditState}
                        token={token} 
                        onClick={() => 
                        {
                              refetch()
                              setOpenEditState(false)
                        }}
                        data={stateData} 
                  />
            }

            { 
                  openDeleteState &&  <DeleteStateModal 
                                            openDeleteState={openDeleteState}
                                            token={token}
                                            onClick={() => 
                                            {
                                                refetch()
                                                setOpenDeleteState(false)
                                            } }
                                            data={stateData}                
                                        />
            }
      </div>
    )
}
