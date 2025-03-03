import React, { useEffect, useState } from 'react'
import { PuffLoader } from 'react-spinners';
import { useInfiniteQuery } from '@tanstack/react-query';
import ProductCard from './ProductCard';
import { useInView } from 'react-intersection-observer';
import { AllProduct } from '../app/api/home/market/AllProduct';


export default function Products() 
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
       }
      )

      if(!isLoading)
      {
         console.log(data)
      }

      useEffect(() => {
            fetchNextPage()
      }, [inView, hasNextPage, fetchNextPage])


  return (
        <>
            {
                isLoading && <div className="col-span-12 h-[120px] flex justify-center items-center" style={{ marginTop: '120px', paddingTop: '0px' }}
                >
                    <PuffLoader className='w-12 h-12' />
                </div>
            }

            { 
                !isLoading && data?.data?.pages && data?.data?.pages?.length > 0 && 
                data?.data?.pages?.map((products) => products?.map((product: ActiveProduct, index: number) => {
                    return (
                        <ProductCard key={index} product={product} refetchs={() => refetch()} />
                    )
                }))
            }

            { data?.data?.pages && data?.data?.pages?.length > 0 && 
                <div ref={ref} className="col-span-12 h-[20px] flex justify-center items-center" style={{ marginTop: '60px', paddingTop: '0px' }}
                >
                    { isFetchingNextPage && hasNextPage && <PuffLoader className='w-12 h-12' />  }
                    
                </div>
            }

            { data?.data?.pages && data?.data?.pages?.length > 0 && !isPending &&
                <div ref={ref} className="col-span-12 h-[20px] flex justify-center items-center" style={{ marginTop: '20px', paddingTop: '0px' }}
                >
                    { !hasNextPage &&  "No Product"  }
                    {/* { isFetchingNextPage === true ? "Yes" : "No"  } */}
                    
                </div>
            }
        </>
  )
}
