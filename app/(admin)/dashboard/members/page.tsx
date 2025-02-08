"use client"

import { ColumnDef } from '@tanstack/react-table'
import { useEffect, useMemo, useState } from "react"
import { Show } from '../../../../components/shared/Show'
import { Icons } from '../../../../components/shared/Icons'
import { Table } from '../../../../components/shared/Table'
import { UseStore } from '../../../../state/store'
import { useQuery } from '@tanstack/react-query'
import { PuffLoader } from 'react-spinners'
import Pagination from '../../../../components/Pagination'
import { GetMembers } from '../../../api/admin/market/users'
import { USAGE_PATH } from '../../../../constant/Path'
import { SuspendUserModal } from '../users/modals/SuspendUserModal'


export default function Members() 
{
    const userToken = UseStore((state) => state)
    const token: string = userToken.getUserToken()
    
    const pages = [20, 50, 100, 200, 350, 500, 1000]
    const [currentPage, setCurrentPage] = useState<number>(1)  
    const [perPage, setPerPage] = useState<number>(pages[0])  
    const [searchQuery, setSearchQuery] = useState("")

    const { data, isLoading, refetch, isRefetching } = useQuery({ queryKey: [`get-all-product`, currentPage, perPage, searchQuery, token], queryFn: () => GetMembers(currentPage, perPage, searchQuery, token)})

    const [open] = useState<boolean>(false)
    const [showModal] = useState<boolean>(false)
    const [employeeId] = useState<string>('')
    const [isItThis] = useState<string>('')  
    const [openModal] = useState<boolean>(false)  
        
    const [openSuspend, setSuspend] = useState<boolean>(false)
    const [userData, setUserData] = useState<number>(-1)
    
    const [showingStates, setShowStates] = useState<boolean>(false)
    const [refresh, setRefresh] = useState<boolean>(false)
    
    const displayByPageNo = (page: any) => 
    {   
       setPerPage(Number(page)) 
       setTimeout(() => 
       {          
          refetch()
       }, 2000)        
    }
    
    const tellThePost = (e: any) => 
    {        
        setSearchQuery(e.target.value)
        setTimeout(() => 
        {            
           callTheSearch(e)
        }, 2000)
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

    useEffect(() => 
    {
       setRefresh(false)
    }, [open, showModal, employeeId, isItThis, openModal, showingStates, refresh])
  

    useEffect(() => 
    {
       refetch()
    }, [perPage, searchQuery])
  
    const ShowStates = (page: any) => 
    {
       console.log(page)
       setShowStates(true)
    }

    const SuspendUser = (x: boolean, data: any) => 
    {
       setUserData(data)
       setSuspend(x)
    }
    
    type AllMembers = 
    {
        id: string
        firstname: string
        surname: string
        phone: string
        email: string
        passport: string
        status: string
        data: { id: number, passport: string, fullname: string, rc_number: string, company_name: string, company_address: string }
    }
  
    const Member = useMemo<ColumnDef<AllMembers>[]>(
          () => [            
            {
                  header: 'Picture',
                  cell: (row) => (<a href="#"><img src={`${USAGE_PATH.AVATAR}${row.renderValue()}`} width={65} height={65} className='rounded-full' /></a>),
                  accessorKey: 'passport',
                  maxSize: 20
            },
            {
                  header: 'Firstname',
                  cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
                  accessorKey: 'firstname',
            },
            {
                  header: 'Surname',
                  cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
                  accessorKey: 'surname',
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
                  header: 'Status',
                  cell: (row) => (<a href="#"><Show color='black' display={row.renderValue()} /></a>),
                  accessorKey: 'status'
            },
            {
                  header: 'Suspend',
                  cell: (row) => (<a href="#" onClick={() => SuspendUser(true, row.renderValue())}><Icons iconName="delete" color='red' width={4} height={4} /></a>),
                  accessorKey: 'data',
                  maxSize: 20
            }
      ],[])

    return (
            <div 
                className="w-full"
            >                 
                  <div 
                        className='font-bold text-2xl ml-5 mb-7 mt-7 flex justify-left items-center gap-10'
                  >
                        <span 
                              className="text-lg text-black"
                        >
                              All Members
                        </span>
                  </div>
                <div 
                    className={`grid grid-cols-12 my-1 gap-5 mx-5`}
                >              
                    <div 
                        className="col-span-4 md:col-span-2"
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
                        className="col-span-8 md:col-span-10"
                    >
                        <input
                            type="text"
                            required
                            name="search"
                            autoComplete="off"
                            aria-label="Search ..."
                            className="h-[65px] w-full md:w-full bg-gray-100 bg-opacity-50 py-2 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out"
                            placeholder="Search firstname, surname, phone, email"
                            onKeyUp={tellThePost}
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
                  
                {  !isLoading && (data?.data?.members?.member.length === 0) && <>
                        <div 
                            className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                        >
                            <div 
                                className="w-full d-flex justify-center items-center"
                            >
                                <div className="w-full text-center text-lg">No Member Yet</div>
                            </div>
                        </div>
                    </>
                }
                  
                {  !isLoading && (data?.data?.members?.member.length === 0) && searchQuery && <>
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
                  !isLoading && (data?.data?.members?.member.length > 0) && 
                        <div 
                                className="shadow-md border-2 border-gray-100 mb-3 mt-1 mx-auto md:mx-5 pb-8 rounded-none overflow-hidden hover:shadow-stone-400"
                            >                    
                                <div 
                                        className='px-5'
                                >                              
                                    <Table data={data?.data?.members?.member} 
                                            columns={Member} 
                                            showNavigation={false} 
                                            searchPlaceHolder='search for employees ...' 
                                            path='students' 
                                            from='students' 
                                            pageNos={pages}
                                            onClick={(no) => {
                                                setPerPage(no)
                                            }}
                                            searchTerm={(word) => {
                                                setSearchQuery(word)
                                            }}
                                    /> 
                                </div>                       
                        </div>
                }
                <div className="p-10"></div>
                
                { 
                        !isLoading && !isRefetching && (data?.data?.members?.member.length > 0) && 
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
                                noOfPages={data?.data?.members?.noOfPages} 
                                hasNextPage={data?.data?.members?.hasNextPage} 
                                hasPreviousPage={data?.data?.members?.hasPreviousPage} 
                            />    
                }
                { 
                    !isLoading && isRefetching && (data?.data?.members?.member.length > 0) && 
                            <Pagination onClick={(data: number) => {
                                    setCurrentPage(data)
                                    setTimeout(() => {
                                        refetch()   
                                    }, 1000)
                                } 
                            } 
                            perPageNo={perPage} 
                            currentPageNo={currentPage} 
                            noOfPages={data?.data?.members?.noOfPages} 
                            hasNextPage={data?.data?.members?.hasNextPage} 
                            hasPreviousPage={data?.data?.members?.hasPreviousPage} 
                        />    
                }


                { 
                    openSuspend &&  <SuspendUserModal 
                                                onClick={() => {
                                                   refetch()
                                                   setSuspend(false)
                                                }} 
                                                openSuspendUser={openSuspend} 
                                                data={userData}  
                                                token={token} 
                    />
                }
            
      </div>
    )
}
