import React, { useEffect, useMemo, useState } from 'react'
import { Table } from '../../../../../../components/shared/Table'
import { ColumnDef } from '@tanstack/react-table'
import { BsHighlighter } from 'react-icons/bs'
import { Icons } from '../../../../../../components/shared/Icons'
import { Show } from '../../../../../../components/shared/Show'
import { AddCountryModal } from './country/addCountryModal'
import { AllCountyStatesModal } from './country/allCountryStates'
import { DeleteCountryModal } from './country/deleteCountryModal'
import { EditCountryModal } from './country/editCountryModal'
import { GetCountry } from '../../../../../api/admin/market/country'
import { useQuery } from '@tanstack/react-query'
import { UseStore } from '../../../../../../state/store'
import { PuffLoader } from 'react-spinners'


export default function Country() 
{
    const userToken = UseStore((state) => state)
    const token: string = userToken.getUserToken()
    
    const [open] = useState<boolean>(false)
    const [showModal] = useState<boolean>(false)
    const [employeeId] = useState<string>('')
    const [isItThis] = useState<string>('')  
    const [openModal] = useState<boolean>(false)  

    const { data, isLoading, refetch, isRefetching } = useQuery({ queryKey: [`get-all-country`, token], queryFn: () => GetCountry(token), refetchOnWindowFocus: true })
    
    const [openAddCountry, setOpenAddCountry] = useState<boolean>(false)
    const [openEditCountry, setOpenEditCountry] = useState<boolean>(false)
    const [openDeleteCountry, setOpenDeleteCountry] = useState<boolean>(false)
    const [openCountryStates, setOpenCountryState] = useState<boolean>(false)
    const [countryData, setCountryData] = useState<{ id: number, name: string, rate: number  }>({ id: -1, name: "", rate: -1 })

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

    const ChangeCountry = (x: boolean, data: any) => 
    {
        setCountryData(data)
        setOpenEditCountry(x)
    }

    const DeleteCountry = (x: boolean, data: any) => 
    {
        setCountryData(data)
        setOpenDeleteCountry(x)
    }

    type AllCountry = 
    {
        id: string
        name: string
        count: number
        edit: string
        delete: string
    }

    const countries = useMemo<ColumnDef<AllCountry>[]>(
        () => [
        {
          header: 'Countries',
          cell: (row) => (<a href="#" onClick={() => openAdd(true, row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
          accessorKey: 'name',
        },
        {
            header: 'States',
            cell: (row) => (<Show display={row.renderValue()} color='green' textSize='18px' />),
            accessorKey: 'count',
            maxSize: 20
        },
        {
            header: 'Edit',
            cell: (row) => (<a href="#" onClick={() => ChangeCountry(true, row.renderValue())}><Icons iconName='edit'  width={5} height={5} color='red' /></a>),
            accessorKey: 'edit',
            maxSize: 20
        },
        {
            header: 'Delete',
            cell: (row) => (<a href="#" onClick={() => DeleteCountry(true, row.renderValue())}><Icons iconName="delete" color='red' width={4} height={4}/></a>),
            accessorKey: 'delete',
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
                            <div className="w-full text-center text-lg">No country created yet</div>
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
                            columns={countries}
                            showNavigation={false}
                            searchPlaceHolder='search for transactions ...'
                            path='transactions'
                            from='transactions'
                            headerTextColor="white" 
                            onClick={() => console.log('')}
                            searchTerm={() => console.log('')}                
                        /> 
                    </div>
            }

            { 
                  openAddCountry &&  <AddCountryModal 
                        openCountryProduct={openAddCountry} 
                        token={token} 
                        onClick={() => 
                          {
                              refetch()
                              setOpenAddCountry(false)
                          }
                        }
                  />
            }

            { 
                  openEditCountry &&  <EditCountryModal 
                        openCountryProduct={openEditCountry}
                        token={token}
                        onClick={() => 
                        {
                            refetch()
                            setOpenEditCountry(false)
                        }}
                        data={countryData}
                  />
            }

            { 
                  openDeleteCountry &&  <DeleteCountryModal 
                                            openDeleteCountry={openDeleteCountry}
                                            token={token}
                                            onClick={() => 
                                            {
                                                refetch()
                                                setOpenDeleteCountry(false)
                                             } 
                                            }
                                            data={countryData}                 
                                        />
            }

            { 
                  openCountryStates &&  <AllCountyStatesModal 
                                            openCountryStates={openCountryStates}
                                            token={token}
                                            onClick={() => 
                                              {
                                                 refetch()
                                                 setOpenCountryState(false)
                                              } 
                                            } 
                                            message=''
                                            userType=''               
                                        />
            }
      </div>
    )
}
