import React, { useEffect, useState } from 'react'
import { PuffLoader } from 'react-spinners';
import { useInfiniteQuery } from '@tanstack/react-query';
import ProductCard from './ProductCard';
import { useInView } from 'react-intersection-observer';
import { AllProduct } from '../app/api/home/market/AllProduct';
import { HiArrowPath } from 'react-icons/hi2';


export default function Products({ onClick }: { onClick : () => void }) 
{
    const { ref, inView } = useInView()
    const [currentPage] = useState<number>(1)

    const {
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
        isFetchingNextPage,
        isFetchingPreviousPage,
        isFetching,
        isPending,
        isSuccess,
        fetchStatus,
        isRefetching,
        refetch,
        isLoading,
        isFetched,
        isError,
        ...data
      } = useInfiniteQuery(
        {
            queryKey: ['adverts'],
            queryFn: ({ pageParam }) => AllProduct(pageParam),
            // refetchOnMount: true,
            refetchOnWindowFocus: true,
            initialPageParam: currentPage,
            getNextPageParam: (lastPage, allPages) => {
                const nextPage = lastPage.length ? (allPages.length + 1) : undefined 
                return nextPage
            },
            getPreviousPageParam: (firstPage) =>
            firstPage.prevCursor,
            retry: 5,
            staleTime: 0
       }
      )

      if(!isLoading)
      {
        //  console.log(data)
      }

      useEffect(() => {
            fetchNextPage()
      }, [inView, hasNextPage, fetchNextPage])


  return (
        <>
            {
                isLoading && <div className="col-span-12 h-[70px] flex justify-center items-center" style={{ marginTop: '20px', paddingTop: '0px' }}
                >
                    {/* <PuffLoader className='w-12 h-12' /> */}
                </div>
            }

            {/* { 
                !isLoading && data?.data?.pages && data?.data?.pages?.length > 0 && 
                data?.data?.pages?.map((products) => products?.map((product: ActiveProduct, index: number) => {
                    return (
                        <ProductCard key={index} product={product} refetchs={() => refetch()} />
                    )
                }))
            } */}

            { 
                !isLoading && data?.data?.pages && data?.data?.pages?.length > 0 && 
                data?.data?.pages?.map((products) => 
                    // {
                    //     products && products.length > 0 && products !== undefined && products?.map((product: ActiveProduct, index: number) => {
                    //         return (
                    //             <ProductCard key={index} product={product} refetchs={() => refetch()} />
                    //         )
                    //     })
                    // }
                    
                    // {
                        products.length > 0 ? (
                            products?.map((product: ActiveProduct, index: number) => {
                                    return (
                                           <ProductCard key={index} product={product} refetchs={() => refetch()} />
                                    )
                                })
                        ) : (
                           <>
                                { 
                                    !Array.isArray(products) && 
                                    <div 
                                        className="col-span-12 h-[20px] flex justify-center items-center" style={{ marginTop: '100px', paddingTop: '0px' }}
                                    >
                                        {/* <button 
                                            className='p-3 bg-blue-500 rounded-lg text-white font-bold'
                                            onClick={
                                                () => {
                                                    refetch()
                                                }
                                            }
                                        >
                                            Product Loading Gltches, Kindly click here to reload product
                                        </button> */}
                                        <HiArrowPath 
                                            color='green'
                                            size={100}
                                            className='p-3 rounded-lg cursor-pointer mt-32 mb-12'
                                            onClick={
                                                () => {
                                                    onClick()
                                                    refetch()
                                                }
                                            } 
                                        />
                                    </div>
                                }
                           </>
                        )
                    // }
                    
                )
            }
            {}

            { 
                <div ref={ref} className="col-span-12 h-[20px] flex justify-center items-center" style={{ marginTop: '60px', paddingTop: '0px' }}
                >
                    { isFetchingNextPage ? <PuffLoader className='w-12 h-12' />  : isPending ?  <PuffLoader className='w-12 h-12' />  : isRefetching ? " .. loading product" : isError ? 'No Product' : !isRefetching ? 'No Product' : '' }
                    
                </div>
            }

            {/* { data?.data?.pages && data?.data?.pages?.length > 0 && 
                <div ref={ref} className="col-span-12 h-[20px] flex justify-center items-center" style={{ marginTop: '60px', paddingTop: '0px' }}
                >
                    { isFetchingNextPage && hasNextPage && <PuffLoader className='w-12 h-12' />  }
                    
                </div>
            } */}

            {/* { data?.data?.pages && data?.data?.pages?.length > 0 && !isPending &&
                <div ref={ref} className="col-span-12 h-[20px] flex justify-center items-center" style={{ marginTop: '20px', paddingTop: '0px' }}
                >
                    { !hasNextPage &&  "No Product"  }
                    
                </div>
            } */}

            <div className='h-[60px]'></div>
        </>
  )
}
