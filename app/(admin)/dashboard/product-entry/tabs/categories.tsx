import { ColumnDef, CellContext } from '@tanstack/react-table'
import React, { useMemo, useState } from 'react'
import { Icons } from '../../../../../components/shared/Icons'
import { Show } from '../../../../../components/shared/Show'
import { Table } from '../../../../../components/shared/Table'
import { EditCategoryModal } from '../sections/categories/editCategoryModal'
import { BsHighlighter } from 'react-icons/bs'
import { AddCategoryModal } from '../sections/categories/addCategoryModal'
import { DeletCategoryModal } from '../sections/categories/deletCategoryModal'
import { GetCategories } from '../../../../api/admin/market/categories'
import { useQuery } from '@tanstack/react-query'
import { UseStore } from '../../../../../state/store'
import { PuffLoader } from 'react-spinners'
import toast from 'react-hot-toast'

type TCateg = {
    id: number
    name: string,
    icon: string,
    link: string,
    mobile: string,
    rate: number
}

export default function Categories() 
{
    const userToken = UseStore((state) => state)
    const token: string = userToken.getUserToken()
    
    const [openCategoryModal, setCategoryModalOpen] = useState<boolean>(false)
    const [openEditCategoryModal, setEditCategoryModalOpen] = useState<boolean>(false)
    const [openDeleteCategoryModal, setDeleteCategoryModalOpen] = useState<boolean>(false)

    const { data, isLoading, refetch, isRefetching } = useQuery({ queryKey: [`get-all-categories`, token], queryFn: () => GetCategories(token), refetchOnWindowFocus: true })

    const [showingStates, setShowStates] = useState<boolean>(false)
    const CategInitialData = { id: -1, name: "", icon: "", link: "", mobile: "", rate: -1 }
    const [categData, setCategData] = useState<TCateg>(CategInitialData)
    

    const ShowStates = (page: any) => 
    {
        console.log(showingStates)
        console.log(page)
        setShowStates(true)
    }

    const ChangeCateg = (x: boolean, data: any) => 
    {
        setCategData(data)
        setEditCategoryModalOpen(x)
    }

    const DeleteCateg = (x: boolean, data: any) => 
    {
        setCategData(data)
        setDeleteCategoryModalOpen(x)
    }

    type ActiveTransProps =
    {
        id: string,
        name: string,
        link: string,
        mobile: string,
        icon: number,
        rate: number,
        edited: string,
        deleted: string,
    }

    const CategoriesColumn = useMemo<ColumnDef<ActiveTransProps>[]>(
        () => [
        {
          header: 'Name',
          cell: (row: CellContext<ActiveTransProps, unknown>) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
          accessorKey: 'name',
          size: 100,
        },
        {
            header: 'Icon',
            cell: (row: CellContext<ActiveTransProps, unknown>) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
            accessorKey: 'icon',
            size: 1200,
        },
        {
            header: 'Link',
            cell: (row: CellContext<ActiveTransProps, unknown>) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
            accessorKey: 'link',
            size: 1200,
        },
        {
            header: 'Mobile',
            cell: (row: CellContext<ActiveTransProps, unknown>) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
            accessorKey: 'mobile',
            size: 1200,
        },
        {
            header: 'Rate',
            cell: (row: CellContext<ActiveTransProps, unknown>) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
            accessorKey: 'rate',
            size: 1200,
        },
        {
            header: 'Edit',
            cell: (row) => (<a href="#" onClick={() => ChangeCateg(true, row.renderValue())}><Icons iconName='edit' color='blue' width={4} height={4}/></a>),
            accessorKey: 'edited',
        },
        {
            header: 'Delete',
            cell: (row) => (<a href="#" onClick={() => DeleteCateg(true, row.renderValue())}><Icons iconName="delete" color="red" width={4} height={4}/></a>),
            accessorKey: 'deleted',
        }
    ],[])

    return (
        <>            
            <div 
               className='font-bold text-2xl text-green-600 ml-5 mb-7 mt-7 flex gap-10'
            >
                  <span 
                     className="text-lg text-black"
                    >
                        All Categories
                  </span>
                  <span className='mt-1 cursor-pointer' 
                        onClick={() => {
                            setCategoryModalOpen(true)
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
                  
            {  !isLoading && (data?.data?.staffs?.staff.length === 0) && <>
                    <div 
                        className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                    >
                        <div 
                            className="w-full d-flex justify-center items-center"
                        >
                            <div className="w-full text-center text-lg">No category created yet</div>
                        </div>
                    </div>
                </>
            }
                  
            {  !isLoading && (data?.data?.length > 0) && 
                <div 
                        className=''
                >                          
                    <Table data={data?.data}
                            columns={CategoriesColumn}
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
                openCategoryModal && <AddCategoryModal openCategoryModal={openCategoryModal} 
                                                      onClick={() => {
                                                          refetch()
                                                          setCategoryModalOpen(false)  
                                                      }} 
                                                      userType={''} token={token}
                                        /> 
            } 
            {
                openDeleteCategoryModal &&  <DeletCategoryModal openDeleteCategory={openDeleteCategoryModal}
                                                                onClick={() => {
                                                                    toast.success('Deleted', {
                                                                        position: "top-center",
                                                                    });
                                                                    refetch()
                                                                    setDeleteCategoryModalOpen(false)
                                                                } }
                                                                token={token}
                                                                data={categData}
                                            /> 
            }
            { 
                openEditCategoryModal && <EditCategoryModal editModal={openEditCategoryModal} 
                                                      onClick={() => {
                                                          refetch()
                                                          setEditCategoryModalOpen(false)  
                                                      }} 
                                                      token={token}
                                                      data={categData}
                                        /> 
            }   
        </>
    )
}
