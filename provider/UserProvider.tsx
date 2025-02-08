"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState, useEffect } from "react";
import Access from "../app/(auth)/login/access";
import { UseStore } from "../state/store";


const UserProvider = ({ children }: { children: React.ReactNode }) => 
{
    const queryClient = new QueryClient();

    const authenticatedUser = UseStore((state) => state)
    const [token, setToken] = useState<string>("")
    const [dom, setDom] = useState<boolean>(false)

    useEffect(() => 
    {
        setToken(authenticatedUser.getUserToken())
        setDom(true)
    }, [])
    
    // if(!token)
    // {
    //     return <div className='-mt-20'
    //     >
    //       <Access showLogo={false} />
    //     </div>
    // }

    return (
        <>
            {
                dom && !token && <Access showLogo={true} goTo={`/user/create-advert`} />
            }
            {
                dom && token &&
                    <QueryClientProvider client={queryClient}>
                        { children }
                        <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>                
            }
        </>
    )
}

export default UserProvider