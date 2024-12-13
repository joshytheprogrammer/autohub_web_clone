"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState, useEffect } from "react";
import Access from "../app/(auth)/login/access";
import { UseStore } from "../state/store";
import { useRouter } from "next/navigation";


const AdminProvider = ({ children }: { children: React.ReactNode }) => 
{
    const router = useRouter()
    const queryClient = new QueryClient();

    const authenticatedUser = UseStore((state) => state)
    const [token, setToken] = useState<string>("")
    const [dom, setDom] = useState<boolean>(false)
    const ROLES = ['admin', 'super-admin']

    useEffect(() => 
    {
        setToken(authenticatedUser.getUserToken())
        if(!ROLES.includes(authenticatedUser.getUType()))
        {
            router.push('/')
        }
        setDom(true)
    }, [])

    return (
        <>
            {
                dom && !token && <Access showLogo={false} goTo={`/dashboard`} />
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

export default AdminProvider