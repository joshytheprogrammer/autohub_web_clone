"use client"

import { useQuery } from "@tanstack/react-query"
import { Dashboard } from "../../api/admin/market/dashboard"
import { UseStore } from "../../../state/store"
import { useEffect, useState } from "react"
import Pulsate from "../../../components/Pulsate"
import { PuffLoader } from "react-spinners"


export default function User() 
{
    const User = UseStore((state) => state)
    const [token, setToken] = useState<string>("")

    useEffect(() => 
    {
        setToken(User.getUserToken())
    }, [])

    const { data, isLoading } = useQuery({ queryKey: [`active-products`, token], queryFn: () => Dashboard(token)})

    return (
        <div 
            className="w-full"
        > 
            {
                isLoading &&  <div 
                                    className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                              >
                    <PuffLoader className='w-12 h-12' color="black" />
                </div>
            }
            { !isLoading && data?.data && <>
                    <div 
                        className="flex-1 p-3 md:p-10 text-2xl font-bold mt-5 md:mt-0"
                    >
                        Application Summary
                    </div>

                    <div 
                        className='grid grid-cols-12 gap-5 py-2 px-3 md:px-10 md:mt-0 mt-5 mb-20'
                    >
                        {  data?.data?.map((d: { title: string, figures: string, icon: string }, index: number) => <Pulsate key={index} titles={d.title} figures={d.figures} icons={d.icon} />) }
                    </div>
                </>
            }
        </div>
    )
}
