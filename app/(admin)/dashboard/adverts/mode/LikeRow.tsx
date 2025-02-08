import { ColumnDef } from '@tanstack/react-table'
import React, { useEffect, useMemo, useState } from 'react';
import { Table } from '../../../../../components/shared/Table';
import { Show } from '../../../../../components/shared/Show';
import { Icons } from '../../../../../components/shared/Icons';
import { BsHourglassSplit } from 'react-icons/bs';
import { ViewProductDetail } from '../modals/ViewProductDetail';
import { VerifyProductModal } from '../modals/VerifyProductModal';
import { useQuery } from '@tanstack/react-query';
import { UseStore } from '../../../../../state/store';
import { GetAdverts } from '../../../../api/admin/market/adverts';
import { PuffLoader } from 'react-spinners';
import Pagination from '../../../../../components/Pagination';
import { ViewUserInfo } from '../modals/ViewUserInfo';
import { DeleteAdvertModal } from '../modals/DeleteAdvertModal';
import { AdvertComments } from '../modals/AdvertComments';


export const DefaultUserDetail = 
{    
    image: "",
    firstname: "", 
    surname: "", 
    phone: "", 
    email: "", 
    user_type: "",
    product: ""
}


export default function LikeRow() 
{
    const userToken = UseStore((state) => state)
    const token: string = userToken.getUserToken()
    
    const pages = [100, 200, 350, 500, 1000]
    const [currentPage, setCurrentPage] = useState<number>(1)  
    const [perPage, setPerPage] = useState<number>(pages[0])  
    const [searchQuery, setSearchQuery] = useState("")

    const { data, isLoading, refetch, isRefetching } = useQuery({ queryKey: [`get-all-product`, currentPage, perPage, searchQuery, token], queryFn: () => GetAdverts(currentPage, perPage, searchQuery, token)})

    const [open] = useState<boolean>(false)
    const [showModal] = useState<boolean>(false)
    const [employeeId] = useState<string>('')
    const [isItThis] = useState<string>('')  
    const [openModal] = useState<boolean>(false)  
        
    const [openDeleteProduct, setOpenDeleteProduct] = useState<boolean>(false)

    const [openViewInfo, setOpenViewInfo] = useState<boolean>(false)
    const [viewUserInfo, setOpenViewUserInfo] = useState<UserDetail>(DefaultUserDetail)

    const [productDetail, setopenProductDetail] = useState<boolean>(false)
    const [productInfo, setOpenProductInfo] = useState<UserDetail>(DefaultUserDetail)

    const [productComment, setProductComment] = useState<number>(-1)
    const [openComment, setOpenComment] = useState<boolean>(false)

    const [verifyProduct, setOpenVerifyProduct] = useState<boolean>(false)
    
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

    const ViewInfo = (x: boolean, data: any) => 
    {
        setOpenViewUserInfo(data)
        setOpenViewInfo(x)
    }

    const ProductDetail = (x: boolean, data: any) => 
    {
        setopenProductDetail(x)
        setOpenProductInfo(data)
    }

    const DeleteProduct = (x: boolean, data: any) => 
    {
        setOpenProductInfo(data) 
        setOpenDeleteProduct(x)       
    }

    const openVerify = (x: boolean, data: any) =>
    {
        setOpenProductInfo(data)  
        setOpenVerifyProduct(x)
    }

    const ViewComment = (x: boolean, data: any) =>
    {
        setProductComment(data)
        setOpenComment(x)  
    }
    
    type AllProducts = 
    {
        tb_id: string
        user_id: string
        fullname: string
        title: string
        price: string
        country: string
        state: string
        views: string
        mileage: string
        images: any 
        user: UserDetail
        product: any
    }
  
    const employees = useMemo<ColumnDef<AllProducts>[]>(
          () => [
          {
            header: 'Name',
            cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
            accessorKey: 'fullname',
          },
          {
              header: 'Title',
              cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
              accessorKey: 'title',
          },
          {
              header: 'Price',
              cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
              accessorKey: 'price',
          },
          {
              header: 'Country',
              cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
              accessorKey: 'country',
          },
          {
              header: 'State',
              cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
              accessorKey: 'state',
          },
          {
              header: 'Mileage',
              cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
              accessorKey: 'mileage',
          },
          {
              header: 'Comments',
              cell: (row) => (<a href="#" onClick={() => ViewComment(true, row.renderValue())}><Icons color='green' height={5} width={5} iconName='comment' /></a>),
              accessorKey: 'tb_id',
              maxSize: 20
          },
          {
              header: 'Status',
              cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
              accessorKey: 'status',
              maxSize: 20
          },
          {
              header: 'User Information',
              cell: (row) => (<a href="#" onClick={() => ViewInfo(true, row.renderValue())}><Icons iconName="eye" color='blue' width={5} height={5}/></a>),
              accessorKey: 'user',
              maxSize: 20
          },
          {
              header: 'Product Detail',
              cell: (row) => (<a href="#" onClick={() => ProductDetail(true, row.renderValue())}><Icons iconName="eye" color='green' width={5} height={5}/></a>),
              accessorKey: 'product',
              maxSize: 20
          },
        
          {
              header: 'Verify',
              cell: (row) => (<a href="#" onClick={() => openVerify(true, row.renderValue())}><BsHourglassSplit  width={5} height={5} color='red' /></a>),
              accessorKey: 'product',
              maxSize: 20
          },
          {
              header: 'Delete',
              cell: (row) => (<a href="#" onClick={() => DeleteProduct(true, row.renderValue())}><Icons iconName="delete" color='red' width={4} height={4}/></a>),
              accessorKey: 'product',
              maxSize: 20
            }
      ],[])

    return (
            <div 
                className="w-full"
            >                 
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
                            placeholder="Search name, middlename, lastname"
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
                  
                {  !isLoading && (data?.data?.product_advert?.product.length === 0) && <>
                        <div 
                            className="min-h-[320px] col-span-12 flex justify-center items-center text-brandGreen"
                        >
                            <p 
                                className="text-2xl font-bold text-green-800"
                            >
                                No Product Yet
                            </p>
                        </div>
                    </>
                }
                  
                {  !isLoading && (data?.data?.product_advert?.product.length === 0) && searchQuery && <>
                        <div 
                            className="min-h-[320px] col-span-12 flex justify-center items-center text-brandGreen"
                        >
                            <p 
                                className="text-2xl font-bold text-green-800"
                            >
                                No Product Found For {searchQuery}
                            </p>
                        </div>
                    </>
                }

                {
                  !isLoading && (data?.data?.product_advert?.product.length > 0) && 
                        <div 
                                className="shadow-md border-2 border-gray-100 mb-3 mt-1 mx-auto md:mx-5 pb-8 rounded-none overflow-hidden hover:shadow-stone-400"
                            >                    
                                <div 
                                        className='px-5'
                                >                              
                                    <Table data={data?.data?.product_advert?.product} 
                                            columns={employees} 
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
                        !isLoading && !isRefetching && (data?.data?.product_advert?.product.length > 0) && 
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
                                noOfPages={data?.data?.product_advert?.noOfPages} 
                                hasNextPage={data?.data?.product_advert?.hasNextPage} 
                                hasPreviousPage={data?.data?.product_advert?.hasPreviousPage} 
                            />    
                }
                { 
                    !isLoading && isRefetching && (data?.data?.product_advert?.product.length > 0) && 
                            <Pagination onClick={(data: number) => {
                                    setCurrentPage(data)
                                    setTimeout(() => {
                                        refetch()   
                                    }, 1000)
                                } 
                            } 
                            perPageNo={perPage} 
                            currentPageNo={currentPage} 
                            noOfPages={data?.data?.product_advert?.noOfPages} 
                            hasNextPage={data?.data?.product_advert?.hasNextPage} 
                            hasPreviousPage={data?.data?.product_advert?.hasPreviousPage} 
                        />    
                }

                { 
                    openDeleteProduct &&  <DeleteAdvertModal 
                            openDeleteProduct={openDeleteProduct} 
                            product={productInfo}
                            token={token} 
                            onClick={() => {                                
                                refetch()
                                setOpenDeleteProduct(false)
                            }}
                    />
                }

                { 
                    openViewInfo &&  <ViewUserInfo 
                                                onClick={() => {
                                                    setOpenViewInfo(false)
                                                }} 
                                                openViewUserDetailModal={openViewInfo} 
                                                user={viewUserInfo}   
                    />
                }

                { 
                    productDetail &&  <ViewProductDetail 
                        openViewProductDetail={productDetail} 
                        product={productInfo}
                        onClick={() => {                              
                            refetch()
                            setopenProductDetail(false)
                        }}
                    />
                }

                { 
                    verifyProduct &&  <VerifyProductModal 
                            openVerifyProduct={verifyProduct}
                            product={productInfo}
                            token={token} 
                            onClick={() => {                              
                                refetch()
                                setOpenVerifyProduct(false)
                            }}
                    />
                }

                {
                    openComment && <AdvertComments 
                                            closeCommentDialog={openComment} 
                                            onClick={
                                                () => setOpenComment(false)
                                            } 
                                            productId={productComment} 
                                            token={token}
                                    />
                }
            <div 
                className='p-10'
            >                
            </div>
      </div>
    )
}
