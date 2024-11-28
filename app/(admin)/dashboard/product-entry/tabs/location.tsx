import { ColumnDef, CellContext } from '@tanstack/react-table'
import React, { useEffect, useMemo, useState } from 'react'
import { HiFlag } from 'react-icons/hi2'
import { Icons } from '../../../../../components/shared/Icons'
import { Show } from '../../../../../components/shared/Show'
import { Table } from '../../../../../components/shared/Table'
import { EditCategoryModal } from './categories/editCategoryModal'

export default function Location() 
{
    const [openCategoryModal, setCategoryModalOpen] = useState<boolean>(false)
    const [viewTransactionDetail, setVeiwTransactionDetail] = useState<boolean>(false)


    const [showingStates, setShowStates] = useState<boolean>(false)

    useEffect(() => 
    {
       console.log({ viewTransactionDetail })
    }, [])
    

    const ShowStates = (page: any) => 
    {
        console.log(showingStates)
        console.log(page)
        setShowStates(true)
    }

    type CountryProps =
    {
        category: string,
        seller: string,
        buyer: string,
        transactionId: string,
        amount: number,
        initiatedDate: string,
        percentage: number,
    }
      
    const ActiveTrans: CountryProps[] = 
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

    const ActiveTransAct = useMemo<ColumnDef<CountryProps>[]>(
        () => [
        {
          header: 'Name',
          cell: (row: CellContext<CountryProps, unknown>) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
          accessorKey: 'category',
          size: 100,
        },
        {
            header: 'Description',
            cell: (row: CellContext<CountryProps, unknown>) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
            accessorKey: 'seller',
            size: 1200,
        },
        {
            header: 'Edit',
            cell: () => (<a href="#" onClick={() => setCategoryModalOpen(true)}><Icons iconName='edit' color='blue' width={4} height={4}/></a>),
            accessorKey: '',
        },
        {
            header: 'Delete',
            cell: () => (<a href="#" onClick={() => setVeiwTransactionDetail(true)}><Icons iconName="delete" color="red" width={4} height={4}/></a>),
            accessorKey: '',
        },
        {
            header: 'Thrash',
            cell: () => (<a href="#" onClick={() => setVeiwTransactionDetail(true)}><HiFlag className="text-green-600 hover:text-black" width={5} height={5}/></a>),
            accessorKey: '',
        }
    ],[])

    return (
        <>            
            <div 
                className='mx-5 font-bold text-md mt-5 text-blue-700 uppercase'
            > 
                    <h1 
                        className='text-black'
                    >
                        All Countries
                    </h1>
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
               /> 

                <div 
                     className="py-10"
                >
                </div>              
            </div>  

            { openCategoryModal && <EditCategoryModal editModal={openCategoryModal} 
                                                      onClick={() => {
                                                          setCategoryModalOpen(false)  
                                                      }} 
                                        /> 
            }   
        </>
    )
}
