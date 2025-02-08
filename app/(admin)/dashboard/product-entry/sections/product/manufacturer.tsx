import { ColumnDef } from '@tanstack/react-table'
import React, { useEffect, useMemo, useState } from 'react'
import { Show } from '../../../../../../components/shared/Show'
import { Icons } from '../../../../../../components/shared/Icons'
import { BsHighlighter } from 'react-icons/bs'
import { Table } from '../../../../../../components/shared/Table'
import { AddManufacturerProduct } from './manufacturer/addManufacturerProduct'
import { EditManufacturerProduct } from './manufacturer/editManufacturerProduct'
import { DeleteManufacturerProduct } from './manufacturer/deleteManufacturerProduct'
import { AllManufacturerModel } from './manufacturer/allManufacturerModel'
import { useQuery } from '@tanstack/react-query'
import { UseStore } from '../../../../../../state/store'
import { GetManufacturer } from '../../../../../api/admin/market/product-entry/manufacturer'
import { PuffLoader } from 'react-spinners'
import Pagination from '../../../../../../components/Pagination'



export default function Manufacturer()
{
    const userToken = UseStore((state) => state)
    const token: string = userToken.getUserToken()
    
    const pages = [10, 20, 35, 50, 100]
    const [currentPage, setCurrentPage] = useState<number>(1)  
    const [perPage, setPerPage] = useState<number>(pages[0])  
    const [searchQuery, setSearchQuery] = useState("")
    
    const [open] = useState<boolean>(false)
    const [showModal] = useState<boolean>(false)
    const [employeeId] = useState<string>('')
    const [isItThis] = useState<string>('')  
    const [openModal] = useState<boolean>(false)  

    const { data, isLoading, refetch, isRefetching } = useQuery({ queryKey: [`get-all-manufacturer`, currentPage, perPage, token], queryFn: () => GetManufacturer(currentPage, perPage, searchQuery, token), refetchOnWindowFocus: true })
    
    const [openAddManufacturer, setOpenAddManufacturer] = useState<boolean>(false)
    const [openEditManufacturer, setOpenEditManufacture] = useState<boolean>(false)
    const [openDeleteManufacturer, setOpenDeleteManufacturer] = useState<boolean>(false)
    const [openManufacturerModel, setOpenManufacturerModel] = useState<boolean>(false)
    const [manufactureData, setManufactureData] = useState<{ id: number, name: string, rate: number  }>({ id: -1, name: "", rate: -1 })

    const [refresh, setRefresh] = useState<boolean>(false)

    useEffect(() => 
    {
      setRefresh(false)
    }, [open, showModal, employeeId, isItThis, openModal, refresh])
    
    const displayByPageNo = (page: any) => 
    {   
       setPerPage(Number(page)) 
       setTimeout(() => 
       {          
          refetch()
       }, 1000)        
    }
        
    const tellThePost = (e: any) => 
    { 
        setSearchQuery(e.target.value)
        setTimeout(() => 
        {            
           callTheSearch(e)
        }, 1000)
    }
  
    const callTheSearch = (e: any) => 
    {        
       if (e.target.value != "") 
       {
          refetch()
       } else {
          setSearchQuery("")       
          refetch()                            
       }
    }
  
    const openAdd = (x: boolean, data: any) =>
    {
        console.log(data)
        setOpenAddManufacturer(x)
    }

    const ChangeManufacture = (x: boolean, data: any) => 
    {
        setManufactureData(data)
        setOpenEditManufacture(x)
    }

    const DeleteManufacture = (x: boolean, data: any) => 
    {
        setManufactureData(data)
        setOpenDeleteManufacturer(x)
    }

    type AllManufacturers = 
    {
        id: number
        name: string
        rate: number
        count: number
        edited: any
        deleted: any
    }

    const theManufacturers = useMemo<ColumnDef<AllManufacturers>[]>(
        () => [
        {
          header: 'Names',
          cell: (row) => (<a href="#" onClick={() => openAdd(true, row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
          accessorKey: 'name',
        },
        {
            header: 'Models',
            cell: (row) => (<Show display={row.renderValue()} color='green' textSize='18px' />),
            accessorKey: 'count',
            maxSize: 20
        },
        {
            header: 'Rate',
            cell: (row) => (<Show display={row.renderValue()} color='green' textSize='18px' />),
            accessorKey: 'rate',
            maxSize: 20
        },
        {
            header: 'Edit',
            cell: (row) => (<a href="#" onClick={() => ChangeManufacture(true, row.renderValue())}><Icons iconName='edit'  width={5} height={5} color='red' /></a>),
            accessorKey: 'edit',
            maxSize: 20
        },
        {
            header: 'Delete',
            cell: (row) => (<a href="#" onClick={() => DeleteManufacture(true, row.renderValue())}><Icons iconName="delete" color='red' width={4} height={4}/></a>),
            accessorKey: 'delete',
            maxSize: 20
          }
    ],[])

    return (
      <div 
            className="w-full"
      > 
            <div 
               className='grid grid-cols-12 my-1 gap-5 mx-5 flex justify-center items-center'
            >
                  <div 
                     className="col-span-2 text-lg text-black"
                    >
                        Add Manufacturers
                  </div>
                  <div className='col-span-2 mt-1 cursor-pointer' 
                        onClick={() => {
                              setOpenAddManufacturer(true)
                        }}      
                  >
                     <BsHighlighter className="w-[23px] h-[23px] hover:text-blue-600 text-blue-600 font-bold" />
                  </div>
                  <div 
                        className="col-span-2 md:col-span-2"
                    >
                        <div 
                            className="mb-4 border border-gray-200"
                        >
                            <div 
                                className="relative border text-gray-800 bg-white col-span-3 md:col-span-2"
                            >
                                <select
                                    value={perPage}
                                    onChange={(e) => {
                                        displayByPageNo(Number(e.target.value));
                                    }} className="appearance-none w-full py-4 pl-3 md:pr-20 pr-14 bg-white" name="whatever" id="frm-whatever">
                                    {pages?.map((pageSize: number) => (
                                        <option key={pageSize} value={pageSize}
                                        >
                                            {pageSize}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>   
                  </div>
                  <div 
                        className="col-span-6 md:col-span-6 -mt-3"
                    >
                        <input
                            type="text"
                            required
                            name="search"
                            autoComplete="off"
                            aria-label="Search ..."
                            className="h-[60px] w-full md:w-full bg-gray-100 bg-opacity-50 py-2 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out"
                            placeholder="Search by name"
                            onKeyUp={
                                (e) => tellThePost(e)
                            }
                        />    
                  </div>
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
                  
                {  !isLoading && (data?.manufacturer.manufacturers?.length === 0) && <>
                        <div 
                            className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                        >
                            <div 
                                className="w-full d-flex justify-center items-center"
                            >
                                <div className="w-full text-center text-lg">No manufacturer Yet</div>
                            </div>
                        </div>
                    </>
                }
                  
                {  !isLoading && (data?.manufacturer.manufacturers?.length === 0) && searchQuery && <>
                        <div 
                            className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                        >
                            <div 
                                className="w-full d-flex justify-center items-center"
                            >
                                <div className="w-full text-center text-lg">No manufacturer created yet</div>
                            </div>
                        </div>
                    </>
                }
                  
                {  !isRefetching && (data?.manufacturer.manufacturers?.length === 0) && searchQuery && <>
                        <div 
                            className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                        >
                            <div 
                                className="w-full d-flex justify-center items-center"
                            >
                                <div className="w-full text-center text-lg">No result found for {searchQuery}</div>
                            </div>
                        </div>
                    </>
                }


            {
                !isLoading && (data?.manufacturer.manufacturers?.length > 0) && 
                <div 
                    className='-mt-7'
                >                          
                    <Table data={data?.manufacturer.manufacturers} 
                        columns={theManufacturers} 
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
            <div className="p-10"></div>
            
            { 
                    !isLoading && !isRefetching && (data?.manufacturer?.manufacturers?.length > 0) && 
                            <Pagination onClick={(data: number) => {
                                    setCurrentPage(data)
                                    // setRefresh(data)
                                    // setPerPage(data.perPage)
                                    setTimeout(() => {
                                        refetch()   
                                    }, 1000)
                                } 
                            } 
                            perPageNo={perPage} 
                            currentPageNo={currentPage} 
                            noOfPages={data?.manufacturer?.noOfPages} 
                            hasNextPage={data?.manufacturer?.hasNextPage} 
                            hasPreviousPage={data?.manufacturer?.hasPreviousPage} 
                        />    
            }
            { 
                !isLoading && isRefetching && (data?.manufacturer?.manufacturers?.length > 0) && 
                        <Pagination onClick={(data: number) => {
                                setCurrentPage(data)
                                setTimeout(() => {
                                    refetch()   
                                }, 1000)
                            } 
                        } 
                        perPageNo={perPage} 
                        currentPageNo={currentPage} 
                        noOfPages={data?.manufacturer?.noOfPages} 
                        hasNextPage={data?.manufacturer?.hasNextPage} 
                        hasPreviousPage={data?.manufacturer?.hasPreviousPage} 
                    />    
            }

            { 
                  openAddManufacturer &&  <AddManufacturerProduct 
                        openManufacturerProduct={openAddManufacturer} 
                        token={token} 
                        onClick={
                            () => {
                              refetch()
                              setOpenAddManufacturer(false)
                            }
                        }
                  />
            }

            { 
                  openEditManufacturer &&  <EditManufacturerProduct 
                        openManufacturerProduct={openEditManufacturer}
                        token={token} 
                        onClick={
                            () => {
                              refetch()
                              setOpenEditManufacture(false)
                            }
                        }
                        data={manufactureData} 
                  />
            }

            { 
                  openDeleteManufacturer &&  <DeleteManufacturerProduct 
                                            openDeleteManufacturer={openDeleteManufacturer}
                                            token={token} 
                                            onClick={() => {
                                                refetch()
                                                setOpenDeleteManufacturer(false)
                                              } 
                                            } 
                                            data={manufactureData}                
                                        />
            }

            { 
                  openManufacturerModel &&  <AllManufacturerModel 
                                            openManufacturerModel={openManufacturerModel}
                                            userType={''}
                                            token={''}
                                            onClick={() => {
                                                refetch()
                                                setOpenManufacturerModel(false)
                                            } } message={''}                  
                                        />
            }
      </div>
    )
}
