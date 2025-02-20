"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { RotateLoader } from "react-spinners"
import { useAppData } from "../app/hook/queries/useAppData"


const AutoHubProvider = ({ children }: { children: React.ReactNode }) => 
{
    const { isLoading, completed } = useAppData()
    const queryClient = new QueryClient();

    return (
        <>
            {
                ((isLoading === false) && ((completed === "no") || (completed === ""))) &&  <div 
                                className="flex md:d-flex xl:flex-row h-screen bg-[#27973f] justify-center items-center"
                            >
                                { isLoading && <RotateLoader className='w-12 h-12' color="white" /> }
                            </div>
            }
            {
                ((isLoading === true) && ((completed === "no") || (completed === ""))) &&  <div 
                                className="flex md:d-flex xl:flex-row h-screen bg-[#27973f] justify-center items-center"
                            >
                                { isLoading && <RotateLoader className='w-12 h-12' color="white" /> }
                            </div>
            }
            
            {   
                ((isLoading === false) && (completed === "yes")) && 
                <QueryClientProvider client={queryClient}>
                    { children }
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>

            }
        </>
    )
}

export default AutoHubProvider