"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState, useEffect } from "react";


export default function RegisterLayout({ children } : { children: React.ReactNode })
{
    const queryClient = new QueryClient();

    return (
      <html lang="en">
        <body className="bg-[#27973f]"
        >
          <main>
            <div>
                <QueryClientProvider client={queryClient}>
                    { children }
                  <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider> 
            </div>
          </main>
        </body>
      </html>
    )
}