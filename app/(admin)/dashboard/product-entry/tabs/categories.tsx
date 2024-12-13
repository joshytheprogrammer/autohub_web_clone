import { ColumnDef, CellContext } from '@tanstack/react-table'
import React, { useEffect, useMemo, useState } from 'react'
import { Icons } from '../../../../../components/shared/Icons'
import { Show } from '../../../../../components/shared/Show'
import { Table } from '../../../../../components/shared/Table'
import { EditCategoryModal } from '../sections/categories/editCategoryModal'
import { BsHighlighter } from 'react-icons/bs'
import { AddCategoryModal } from '../sections/categories/addCategoryModal'
import { DeletCategoryModal } from '../sections/categories/deletCategoryModal'


export default function Categories() 
{
    const [openCategoryModal, setCategoryModalOpen] = useState<boolean>(false)
    const [openEditCategoryModal, setEditCategoryModalOpen] = useState<boolean>(false)
    const [openDeleteCategoryModal, setDeleteCategoryModalOpen] = useState<boolean>(false)

    const [showingStates, setShowStates] = useState<boolean>(false)

    useEffect(() => 
    {
    //    console.log({ viewTransactionDetail })
    }, [])
    

    const ShowStates = (page: any) => 
    {
        console.log(showingStates)
        console.log(page)
        setShowStates(true)
    }

    type ActiveTransProps =
    {
        category: string,
        seller: string,
        buyer: string,
        transactionId: string,
        amount: number,
        initiatedDate: string,
        percentage: number,
    }
      
    const ActiveTrans: ActiveTransProps[] = 
    [
        {
          category: 'E-Commerce E-Commerce E-Commerce E-Commerce ',
          seller: 'Kingsley Effiong',
          buyer: 'Mathew Peter',
          transactionId: 'UF79KFKCUF0EODKE',
          amount: 4500,
          percentage: 450,
          initiatedDate: '10-11-2024',
        },
        {
          category: 'Mortgage',
          seller: 'Thomas Lee',
          buyer: 'Christain Pulisic',
          transactionId: 'QPF0948464JRKFMFFRMGJ',
          amount: 2900,
          percentage: 290,
          initiatedDate: '15-11-2024',
        },
        {
          category: 'Cars',
          seller: 'Tijani Bayero',
          buyer: 'Emeka Paul',
          transactionId: '183736DDHCJKICKOOEKEJ',
          amount: 5500,
          percentage: 550,
          initiatedDate: '20-12-2024',
        },
    ]

    const AllActiveTransactions = () => 
    {
        return ActiveTrans
    }

    const ActiveTransAct = useMemo<ColumnDef<ActiveTransProps>[]>(
        () => [
        {
          header: 'Name',
          cell: (row: CellContext<ActiveTransProps, unknown>) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
          accessorKey: 'category',
          size: 100,
        },
        {
            header: 'Description',
            cell: (row: CellContext<ActiveTransProps, unknown>) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
            accessorKey: 'seller',
            size: 1200,
        },
        {
            header: 'Edit',
            cell: () => (<a href="#" onClick={() => setEditCategoryModalOpen(true)}><Icons iconName='edit' color='blue' width={4} height={4}/></a>),
            accessorKey: '',
        },
        {
            header: 'Delete',
            cell: () => (<a href="#" onClick={() => setDeleteCategoryModalOpen(true)}><Icons iconName="delete" color="red" width={4} height={4}/></a>),
            accessorKey: '',
        },
        // {
        //     header: 'Thrash',
        //     cell: () => (<a href="#" onClick={() => setVeiwTransactionDetail(true)}><HiFlag className="text-green-600 hover:text-black" width={5} height={5}/></a>),
        //     accessorKey: '',
        // }
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
                
            <div 
                    className=''
            >                          
                <Table data={AllActiveTransactions()}
                        columns={ActiveTransAct}
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

                <div 
                     className="py-10"
                >
                </div>              
            </div>  

            { 
                openCategoryModal && <AddCategoryModal openCategoryModal={openCategoryModal} 
                                                      onClick={() => {
                                                          setCategoryModalOpen(false)  
                                                      }} 
                                                      userType={''} token={''}
                                        /> 
            } 
            {
                openDeleteCategoryModal &&  <DeletCategoryModal openDeleteCategory={openDeleteCategoryModal}
                                                                onClick={() => {
                                                                    setDeleteCategoryModalOpen(false)
                                                                } }
                                                                userType={''} token={''} message={''}
                                            /> 
            }
            { 
                openEditCategoryModal && <EditCategoryModal editModal={openEditCategoryModal} 
                                                      onClick={() => {
                                                          setEditCategoryModalOpen(false)  
                                                      }} 
                                                      userType={''} token={''}
                                        /> 
            }   
        </>
    )
}
