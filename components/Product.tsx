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
        refetch,
        isLoading,
        ...data
      } = useInfiniteQuery(
        {
            queryKey: ['adverts'],
            queryFn: ({ pageParam }) => AllProduct(pageParam),
            refetchOnMount: true,
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

      useEffect(() => {
            fetchNextPage()
      }, [inView, hasNextPage, fetchNextPage])


  return (
        <>
            {/* {
                isLoading && <div className="col-span-12 h-[60px] flex justify-center items-center" style={{ marginTop: '60px', paddingTop: '0px' }}
                >
                    <PuffLoader className='w-12 h-12' />
                </div>
            } */}

            { 
                data?.data?.pages && 
                data?.data?.pages.map((products) => products?.map((product: ActiveProduct, index: number) => {
                    return (
                        <ProductCard key={index} product={product} refetchs={() => refetch()} />
                    )
                }))
            }

            {
                <div ref={ref} className="col-span-12 h-[70px] flex justify-center items-center" style={{ marginTop: '60px', paddingTop: '0px' }}
                >
                    { isFetchingNextPage && hasNextPage && <PuffLoader className='w-12 h-12' />  }
                    { !isFetchingNextPage && !isFetching && "No Product"  }
                    
                </div>
            }
        </>
  )
}
