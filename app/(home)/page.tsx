"use client"

import { useQuery } from '@tanstack/react-query'
import Product from '../../components/Product'
import { PuffLoader } from 'react-spinners'
import MobileCategory from '../../components/category/MobileCategory'
import WebCategory from '../../components/category/WebCategory'
import Banner from '../../components/Banner'
import SlideShow from '../../components/SlideShow'
import { Landing } from '../api/home/market/AllProduct'
import { useEffect, useState } from 'react'
import useNetwork from '../hook/network'

export default function Home() 
{
    const isLive = useNetwork()
    const [ran, setRan] = useState<number>()
    const { isFetching, refetch, isLoading, ...data } = useQuery({ queryKey: ['landing-page'], queryFn: () => Landing(), refetchOnMount: true, refetchOnWindowFocus: true } )

    useEffect(() => 
    {
        if(isLive)
        {
            refetch()
        }
    }, [isLive, ran])

    useEffect(() => 
    {
        setRan((33*111*1984)*(Math.random()))
    }, [])
    
    return (
        <>
            {
                isLoading && <div className="col-span-12 h-[1500px] flex justify-center items-center" style={{ marginTop: '60px', paddingTop: '0px' }}
                >
                    <PuffLoader className='w-12 h-12' />
                </div>
            }

            {   !isLoading &&
                <div 
                    className='w-full'
                >
                    <div className='container md:grid md:grid-cols-12 justify-between mt-2 mb-4 mx-auto border-shadow shadow-lg'
                    >
                        <div 
                            className='col-span-3 md:block hidden'
                        >
                            
                            <div className="order-2 md:order-1 w-full shrink-0 md:block h-full md:h-fit pb-5 bg-white overflow-hidden">
                                <h3 className="hidden md:flex h-12 text-[#1e1e1e]/50 bg-green-400 font-bold w-full items-center px-4 text-md">
                                    Categories
                                </h3>

                                <WebCategory data={data?.data?.category} />
                            </div>
                        </div>
                        <div 
                            className='md:col-span-6 col-span-12 bg-green-100'
                        >
                            <SlideShow data={data?.data?.slider} imageSize={data?.data?.slider?.length} timer={data?.data?.settings?.timer} />
                        </div>
                        <div 
                            className='col-span-3 bg-red-200 md:block hidden border-shadow shadow-lg'
                        >
                            <img 
                                className=''
                                src='/swap-car.png'
                            />
                        </div>
                    </div>

                    
                    {/* <div 
                        className='container w-full bg-blue-300 md:mx-auto mx-auto mt-1'
                    >
                        <img 
                            src='/campaign_desk.png' 
                            className='md:block hidden w-full'
                        />
                        <img 
                            src='/campaign_mobile.png' 
                            className='md:hidden block w-full'
                        />
                    </div> */}
                                
                    <div 
                        className='mx-2 flex justify-center items-center font-bold'
                    >
                        <MobileCategory data={data?.data?.category} />
                    </div>

                    <Banner />

                    <div className='container grid grid-cols-12 gap-2 md:gap-5 mx-auto mt-4 px-2 md:p-0'
                    >
                        <Product />
                    </div>

                    <div className='p-10'></div>

                </div>
            }
        </>
    )

}
