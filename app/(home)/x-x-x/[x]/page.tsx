"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { useRouter, useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { PuffLoader } from "react-spinners"
import ProductCard from "../../../../components/ProductCard"
import { HiArrowLeft, HiHome } from "react-icons/hi2"
import { CategoryProduct } from "../../../api/home/market/AllProduct"
import Link from "next/link"


export default function Category() 
{
  const params = useParams<{ x: string }>()
  const router = useRouter()

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
    } = useInfiniteQuery({
      queryKey: [`cagegory-${params?.x}`],
      queryFn: ({ pageParam }) => CategoryProduct(pageParam, params?.x),
      initialPageParam: currentPage,
      getNextPageParam: (lastPage, allPages) => {
          const nextPage = lastPage.length ? (allPages.length + 1) : undefined 
          return nextPage
      },
      getPreviousPageParam: (firstPage) =>
        firstPage.prevCursor,
    })

    useEffect(() => {
          fetchNextPage()
    }, [inView, hasNextPage, fetchNextPage])


    return (
        <>                         
            <div 
                className="container mx-auto mb-20 md:mt-2"
            >
              <div 
                  className="w-full mx-auto mt-2 border-2 border-gray-200 border-shadow bg-white container px-5 py-2 flex justify-between items-center fixed text-lg z-4 md:rounded-xl mb-10"
              >
                <div 
                    className="flex justify-between items-center bg-white rounded-md cursor-pointer"
                    onClick={() => { router.back() }}
                >
                  <HiArrowLeft className="font-bold rounded-full hover:border-4 hover:border-green-300" style={{ fontSize: '30px', fontWeight: 'bolder', padding: '3px' }} />
                  <span className="ml-2 font-bold text-blue-500 uppercase text-sm">Go Back</span>
                </div>
                <div 
                    className="rounded-md flex justify-between items-center"
                >
                    <div 
                        className="flex justify-center items-center bg-white rounded-lg px-2"
                    >
                        <Link 
                            href={'/'}
                        >
                            <HiHome 
                                className="mr-2 text-blue-500" 
                            /> 
                        </Link>   
                        {/* {'>>'}  */}
                        {/* <span 
                            className="font-bold ml-2 text-sm"
                        >
                            Category Name
                        </span> */}
                    </div>
                </div>
              </div>
            </div>
            {
                isLoading && <div className="col-span-12 h-[1400px] flex justify-center items-center" style={{ marginTop: '60px', paddingTop: '0px' }}
                >
                    <PuffLoader className='w-12 h-12' />
                </div>
            }  
            {
                !isLoading && (data?.data?.pages[0].length === 0) && <div className="col-span-12 h-[570px] flex justify-center items-center" style={{ marginTop: '60px', paddingTop: '0px' }}
                >
                    <h1>No Product</h1>
                </div>
            }
            <div 
                className='container grid grid-cols-12 gap-2 md:gap-5 mx-auto mt-14 px-2 mt-10 md:p-0 relative'
            > 
              { 
                  !isLoading && data?.data?.pages && 
                  data?.data?.pages.map((products) => products?.map((product: ActiveProduct, index: number) => {
                      return (
                          <ProductCard key={index} product={product} refetchs={() => { refetch() }} />
                      )
                  }))
              }
            </div>

            {
                !isLoading && (data?.data?.pages[0].length > 0) &&
                <div ref={ref} className="col-span-12 h-[70px] flex justify-center items-center" style={{ marginTop: '60px', marginBottom: '100px', paddingTop: '0px' }}
                >
                    { isFetchingNextPage && hasNextPage && <PuffLoader className='w-12 h-12' />  }
                    { !isFetchingNextPage && !isFetching && "No more product"  }
                    
                </div>
            }
        </>
  )
}
