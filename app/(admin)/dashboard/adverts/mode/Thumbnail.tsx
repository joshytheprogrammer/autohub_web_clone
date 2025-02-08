import React, { useEffect, useState } from 'react'
import { UseStore } from '../../../../../state/store'
import { useQuery } from '@tanstack/react-query'
import { BounceLoader } from 'react-spinners'
import { USAGE_PATH } from '../../../../../constant/Path'
import currencyFormatter from '../../../../../components/util/currency-formatter'
import { Icons } from '../../../../../components/shared/Icons'
import Pagination from '../../../../../components/Pagination'
import { ViewProductDetail } from '../modals/ViewProductDetail'
import { GetAdverts } from '../../../../api/admin/market/adverts'
import { DefaultUserDetail } from './LikeRow'
import { ViewUserInfo } from '../modals/ViewUserInfo'
import { DeleteAdvertModal } from '../modals/DeleteAdvertModal'
import { VerifyProductModal } from '../modals/VerifyProductModal'


export default function Thumbnail() 
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
        
    const [verifyProduct, setOpenVerifyProduct] = useState<boolean>(false)
    const [openDeleteProduct, setOpenDeleteProduct] = useState<boolean>(false)
    
    const [refresh, setRefresh] = useState<boolean>(false)

    const [openViewInfo, setOpenViewInfo] = useState<boolean>(false)
    const [viewUserInfo, setOpenViewUserInfo] = useState<any>("")

    const [productDetail, setOpenProductDetail] = useState<boolean>(false)
    const [productInfo, setOpenProductInfo] = useState<UserDetail>(DefaultUserDetail)
    
    
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
    }, [open, showModal, employeeId, isItThis, openModal, refresh])


    useEffect(() => 
    {
      refetch()
    }, [perPage, searchQuery])


    return (
          <>
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
                            // ref={inputRef}
                            name="search"
                            autoComplete="off"
                            aria-label="Search ..."
                            // value={query}
                            className="h-[65px] w-full md:w-full bg-gray-100 bg-opacity-50 py-2 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out"
                            placeholder="Search name, middlename, lastname"
                            onKeyUp={tellThePost}
                        />    
                    </div>    
                </div> 

                <div 
                    className='grid grid-cols-12 gap-5 px-3 pb-5 mb-5 mt-5'
                >                        
                            {
                                isLoading && (
                                    <div className="min-h-[320px] col-span-12 flex justify-center items-center text-brandGreen">                            
                                        <BounceLoader color="#1c9236" />    
                                    </div>
                                )
                            }

                            {/* {
                                !isLoading && isRefetching && (
                                    <div className="min-h-[320px] col-span-12 flex justify-center items-center text-brandGreen">                            
                                        <BounceLoader color="#1c9236" />
                                    </div>
                                )
                            } */}

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
                                !isLoading && data?.data?.product_advert?.product?.map((product: any, index: number) => {
                                    return (
                                        <div className="relative d-flex col-span-12 md:col-span-3 border rounded-lg p-2 bg-green-100 shadow-md" key={index}>
                                            <img src={`${USAGE_PATH.PRODUCT_FACE}${product.image}`} 
                                                 alt="product images" 
                                                 className={`border border-solid border-3 mb-2 border-red-600 p-1 h-auto cursor-pointer`}                                                  
                                                 onClick={() => 
                                                 { 
                                                    setOpenProductInfo(product)
                                                    setOpenProductDetail(true)                                                    
                                                }
                                            }
                                            />
                                            <div className="w-full p-2 flex bg-white">
                                                <p className="font-bold w-2/2 text-lg text-green-600">{ product?.title }</p>
                                            </div>
                                            <div className="w-full p-2 flex justify-between mt-1 items-center bg-white">
                                                <span className="font-bold w-1/2 text-lg uppercase text-blue-500">{ product?.country }</span>
                                                <span className="font-bold w-1/2 right-0 text-blue-500"> { product?.state } </span>
                                            </div>
                                            <div className="w-full p-2 flex justify-between mt-1 items-center bg-white">
                                                <span className="font-bold w-1/2 text-sm uppercase text-red-900">{ product?.fullname }</span>
                                                <span className="font-bold w-1/2 text-sm right-0 text-red-900"> { product?.condition } </span>
                                            </div>
                                            <div className="w-full p-2 flex justify-center mt-1 items-center bg-white">
                                                <span 
                                                    className={`${product?.status === 'active' ? 'bg-blue-600' : 'bg-red-600'} hover:bg-blue-900 cursor-pointer px-3 py-1 rounded-md text-white text-sm font-bold`}
                                                    // className="font-bold w-1/2 text-sm uppercase text-red-900"
                                                >
                                                  { product?.status }
                                                </span>
                                            </div>
                                            <div className="w-full p-2 flex justify-center item-center space-x-32 md:space-x-24 bg-white mt-1">
                                                <div className="font-bold w-2/2 text-xl text-green-700">{ currencyFormatter(product?.price) }</div>
                                                <div className="flex justify-center space-between items-center center py-1 px-3 rounded-full bg-green-100">
                                                    <Icons iconName={'eye'} color="black" width={6} height={6} strokeWidth={1} />
                                                    <span className="ml-2 mt-1 text-red-600 font-bold">{product?.views}</span>
                                                </div>
                                            </div>
                                            <div className={`flex justify-between p-2 bg-blue-100 mt-1 rounded-lg`}>
                                                <span 
                                                    className="bg-green-600 hover:bg-red-600 cursor-pointer px-3 py-1 rounded-md text-white text-sm font-bold"
                                                    onClick={() => {                                                        
                                                        setOpenViewUserInfo(product)
                                                        setOpenViewInfo(true)
                                                    }}
                                                >
                                                   User Info
                                                </span>
                                                <span  
                                                    onClick={() =>
                                                    { 
                                                        setOpenProductInfo(product)  
                                                        setOpenVerifyProduct(true)
                                                    } }
                                                    className="flex justify-center cursor-pointer space-between items-center center py-1 px-3 rounded-full bg-green-100 text-sm font-bold hover:bg-green-600 hover:text-white hover:text-sm"
                                                >
                                                    Verify
                                                </span>
                                                <span  
                                                    onClick={() =>
                                                    { 
                                                        setOpenProductInfo(product) 
                                                        setOpenDeleteProduct(true)
                                                    } }
                                                    className="flex justify-center cursor-pointer space-between items-center center py-1 px-3 rounded-full bg-red-300 text-sm font-bold hover:bg-red-600 hover:text-white hover:text-sm"
                                                >
                                                    Delete
                                                </span>
                                            </div>
                                        </div> 
                                    )
                                }) 
                            }

                </div>
                <div className="p-6 mt-14"></div>
                { 
                        !isLoading && !isRefetching && (data?.data?.product_advert?.product.length > 0) && 
                                <Pagination onClick={(data: number) => {
                                        setCurrentPage(data)
                                        // setRefresh(data)
                                        // setPerPage(data.perPage)
                                        setTimeout(() => {
                                            refetch()   
                                        }, 1000)
                                        // do all the setting here and then refresh for new set of data rows
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
                                    // setRefresh(data)
                                    // setPerPage(data.perPage)
                                    setTimeout(() => {
                                        refetch()   
                                    }, 1000)
                                    // do all the setting here and then refresh for new set of data rows
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
                                                user={viewUserInfo?.user}   
                    />
                }

                { 
                    productDetail &&  <ViewProductDetail 
                        openViewProductDetail={productDetail} 
                        product={productInfo}
                        onClick={() => {                              
                            refetch()
                            setOpenProductDetail(false)
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
                <div 
                    className='p-10'
                >                
                </div>
        </>
    )
}
