import React, { useEffect, useMemo, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Show } from '../../../../../../components/shared/Show'
import { BsHighlighter } from 'react-icons/bs'
import { Table } from '../../../../../../components/shared/Table'
import { Icons } from '../../../../../../components/shared/Icons'
import { AddTrimProduct } from './trim/addTrimProduct'
import { EditTrimProduct } from './trim/editTrimProduct'
import { DeleteTrimProduct } from './trim/deleteTrimProduct'
import { AllTrimEngine } from './trim/allTrimEngine'
import { UseStore } from '../../../../../../state/store'
import { modelDB, trimDB } from '../../../../../model/Product'
import { useQuery } from '@tanstack/react-query'
import { GetTrim } from '../../../../../api/admin/market/product-entry/trim'
import { PuffLoader } from 'react-spinners'
import Pagination from '../../../../../../components/Pagination'
import SearchTrim from './trim/SearchTrim'


export default function Trim()
{
    const userToken = UseStore((state) => state)
    const token: string = userToken.getUserToken()
    
    const pages = [100, 200, 500, 1000]
    const [currentPage, setCurrentPage] = useState<number>(1)  
    const [perPage, setPerPage] = useState<number>(pages[0])  
    const [searchQuery, setSearchQuery] = useState<string>("") 
    const [theType, setTheType] = useState<number | string>("all")
    
    const [open] = useState<boolean>(false)
    const [showModal] = useState<boolean>(false)
    const [employeeId] = useState<string>('')
    const [isItThis] = useState<string>('')  
    const [openModal] = useState<boolean>(false)  
    const [allModels, setModels] = useState<any>([])
    
    const [openAddTrim, setOpenAddTrim] = useState<boolean>(false)
    const [openEditTrim, setOpenEditTrim] = useState<boolean>(false)
    const [openDeleteTrim, setOpenDeleteTrim] = useState<boolean>(false)
    const [openTrimEngine, setOpenTrimEngine] = useState<boolean>(false)
    const [selectedTrim, setSelectedTrim] = useState<string>("")
    const [allTrim, setTrims] = useState<any>([])
    const [trimData, setTrimData] = useState<{ id: number, tb_id: number, manufacturer_id: number,  model_id: number, model_name: string, manufacturer_name: string, name: string, rate: number }>(
                                                { id: -1, tb_id: -1, manufacturer_id: -1,  model_id: -1, model_name: "", manufacturer_name: "", name: "", rate: -1 }
                                            )

    useEffect(() => 
    {
        ModelsTrim()
        TrimModels()
        console.log(selectedTrim)
        console.log(allTrim)
    }, [])
    
    const { data, isLoading, refetch, isRefetching } = useQuery({ queryKey: [`get-all-trims`, currentPage, perPage, token], queryFn: () => GetTrim(currentPage, perPage, searchQuery, theType, token), refetchOnWindowFocus: true })
    
    const ModelsTrim = async () => 
    {
       const models = await modelDB.toArray()
       setModels(models)
    }

    const TrimModels = async () => 
    {
       const trimss = await trimDB.toArray()
       setTrims(trimss)
    }

    const [refresh, setRefresh] = useState<boolean>(false)

    useEffect(() => 
    {
        refetch()
    }, [theType])

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
        setOpenAddTrim(x)
    }

    const ChangeTrim = async (x: boolean, data: any) => 
    {
        setTrimData(data)  
        const found = await trimDB.where("tb_id").equals(Number(data?.id)).toArray()
        setSelectedTrim(found[0]?.name)
        setOpenEditTrim(x)
    }

    const DeleteTrim = (x: boolean, data: any) => 
    {
        setTrimData(data)
        setOpenDeleteTrim(x)
    }

    type AllTrim = 
    {
        id: number
        name: string
        rate: number
        count: number
        edit: any
        delete: any
    }

    const theTrims = useMemo<ColumnDef<AllTrim>[]>(
        () => [
        {
          header: 'Names',
          cell: (row) => (<a href="#" onClick={() => openAdd(true, row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
          accessorKey: 'name',
        },
        {
            header: 'Trim',
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
            cell: (row) => (<a href="#" onClick={() => ChangeTrim(true, row.renderValue())}><Icons iconName='edit'  width={5} height={5} color='red' /></a>),
            accessorKey: 'edit',
            maxSize: 20
        },
        {
            header: 'Delete',
            cell: (row) => (<a href="#" onClick={() => DeleteTrim(true, row.renderValue())}><Icons iconName="delete" color='red' width={4} height={4}/></a>),
            accessorKey: 'delete',
            maxSize: 20
        }
    ],[])

    return (
      <div 
            className="w-full"
      > 
            <div 
                className='grid grid-cols-12 font-bold text-2xl justify-center items-center text-green-600 ml-5 mb-4 mt-5 gap-10'
            >
                    <SearchTrim 
                        placeholder={''} 
                        selectedTrim={''} 
                        onClick={
                                (x) => {
                                    setTimeout(
                                        () => {
                                            if(x === 'all')
                                            {
                                                setTheType('all')
                                            } else {                                                
                                                setTheType(x)
                                            }
                                    }, 1000)
                                }
                        } 
                        trims={allTrim}
                    />
            </div> 
            <div 
               className='grid grid-cols-12 my-1 gap-5 mx-5 flex justify-center items-center'
            >
                  <div 
                     className="col-span-2 text-lg text-black"
                    >
                        All Trims
                  </div>
                  <div className='col-span-2 mt-1 cursor-pointer' 
                        onClick={() => {
                              setOpenAddTrim(true)
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
                                    onChange={
                                        (e) => {
                                        displayByPageNo(Number(e.target.value));
                                      }
                                    } className="appearance-none w-full py-4 pl-3 md:pr-20 pr-14 bg-white" name="whatever" id="frm-whatever">
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
                  
                {  !isLoading && (data?.trim.trims?.length === 0) && <>
                        <div 
                            className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                        >
                            <div 
                                className="w-full d-flex justify-center items-center"
                            >
                                <div className="w-full text-center text-lg">No trim Yet</div>
                            </div>
                        </div>
                    </>
                }
                  
                {  !isLoading && (data?.trim.trims?.length === 0) && searchQuery && <>
                        <div 
                            className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                        >
                            <div 
                                className="w-full d-flex justify-center items-center"
                            >
                                <div className="w-full text-center text-lg">No trim created yet</div>
                            </div>
                        </div>
                    </>
                }
                  
                {  !isRefetching && (data?.trim.trims?.length === 0) && searchQuery && <>
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
                !isLoading && (data?.trim.trims?.length > 0) && 
                <div 
                    className='-mt-7'
                >                          
                    <Table data={data?.trim.trims} 
                        columns={theTrims} 
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
                    !isLoading && !isRefetching && (data?.trim?.trims?.length > 0) && 
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
                            noOfPages={data?.trim?.noOfPages} 
                            hasNextPage={data?.trim?.hasNextPage} 
                            hasPreviousPage={data?.trim?.hasPreviousPage} 
                        />    
            }
            { 
                !isLoading && isRefetching && (data?.trim?.trims?.length > 0) && 
                        <Pagination onClick={(data: number) => {
                                setCurrentPage(data)
                                setTimeout(() => {
                                    refetch()   
                                }, 1000)
                            } 
                        } 
                        perPageNo={perPage} 
                        currentPageNo={currentPage} 
                        noOfPages={data?.trim?.noOfPages} 
                        hasNextPage={data?.trim?.hasNextPage} 
                        hasPreviousPage={data?.trim?.hasPreviousPage} 
                    />    
            }

            { 
                  openAddTrim &&  <AddTrimProduct 
                        openTrimProduct={openAddTrim} 
                        token={token} 
                        onClick={() => {
                              refetch()
                              setOpenAddTrim(false)
                        }}
                  />
            }

            { 
                  openEditTrim &&  <EditTrimProduct
                        openTrimProduct={openEditTrim}
                        token={token} 
                        onClick={() => {
                            refetch()
                            setOpenEditTrim(false)
                        }}
                        pdata={trimData}
                  />
            }

            { 
                  openDeleteTrim &&  <DeleteTrimProduct 
                                            openDeleteTrim={openDeleteTrim}
                                            token={token}
                                            onClick={() => {
                                                refetch()
                                                setOpenDeleteTrim(false)
                                            } } 
                                            data={trimData}                 
                                        />
            }

            { 
                  openTrimEngine &&  <AllTrimEngine
                                          openTrimEngine={openTrimEngine}
                                          userType={''}
                                          token={''}
                                          onClick={() => {
                                              refetch()
                                              setOpenTrimEngine(false)
                                          } } message={''}                  
                                    />
            }
      </div>
    )
}

