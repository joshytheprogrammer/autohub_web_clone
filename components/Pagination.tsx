import { useState } from "react";

type PaginationProps = 
{
    onClick: (x: number) => void 
    perPageNo: number 
    currentPageNo: number 
    noOfPages: number 
    hasNextPage: boolean 
    hasPreviousPage: boolean 
}


export default function Pagination({onClick, perPageNo, currentPageNo, noOfPages, hasNextPage, hasPreviousPage}: PaginationProps)
{
    const [currentPage, setCurrentPage] = useState<number>(currentPageNo)  
    const [perPage] = useState<number>(perPageNo)  
    const [pages] = useState<number>(noOfPages)    
    
    const fetchRoles = async (theCurrentPage: number, thePerPage: number) => 
    {
        console.log(thePerPage)
        setCurrentPage(theCurrentPage)
        onClick(theCurrentPage)
    }

    
    let decrease = [];
    let increase = [];
    
    
    const showOnlySomeLinks = 2
  
    for (let index = 1; index <= showOnlySomeLinks; index++) 
    {
        if((currentPage-index) >= 1)
        {
          decrease.push(currentPage-index) 
        }
    }
  
    for (let index = 1; index <= showOnlySomeLinks; index++) 
    {
        if((currentPage+index) > currentPage)
        {
          increase.push(currentPage+index) 
        }
    }
  
    const sorting = decrease.reverse()
    const before= sorting.map((num: number, index: number) => 
    {
          if(num !== currentPage && currentPage >= 1)
          {
              return <button key={index} className="rounded-lg border border-teal-500 px-4 py-2 hover:border-5 hover:border-green-500 text-white cursor-pointer bg-green-600 hover:bg-green-800" onClick={() => fetchRoles(num, perPage)}>{(num)}</button> 
          }
    })
  
    
    const after= increase.map((num: number, index: number) => 
    {
          if(num != currentPage && currentPage >= 1)
          {
              if(Number(pages) >= num)
              {
                  return <button key={index} className="rounded-lg border border-teal-500 px-4 py-2 hover:border-5 hover:border-green-500 text-white cursor-pointer bg-green-600 hover:bg-green-800" onClick={() => fetchRoles(num, perPage)}>{(num)}</button> 
              }
          }
    })
    
    return (
                <nav 
                    className="w-full items-center mb-2 flex justify-center space-x-1 -mt-14 py-4 px-2" 
                    aria-label="Pagination"
                >                 
                    { 
                        hasPreviousPage && 
                            <button 
                                onClick={() => fetchRoles(Number(currentPage)-1, perPage)} 
                                className="rounded-lg border bg-blue-800 px-4 py-2 hover:bg-blue-500" 
                                disabled={!hasPreviousPage}
                            >
                            
                                <span className="sr-only">Previous</span>
                                <svg className="mt-1 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd">
                                    </path>
                                </svg>
                            </button>
                    }
                    { 
                        before
                    }
                    {
                        <button className="rounded-lg border border-blue-600 bg-white px-4 py-2 text-lg text-black cursor-default">{currentPage} </button> 
                    }
                    { 
                        after
                    }
                    
                    {
                        hasNextPage &&
                            <button 
                                onClick={() => fetchRoles(Number(currentPage)+1, perPage)} 
                                className="rounded-lg border bg-blue-800 px-4 py-2 hover:bg-blue-500"  
                                disabled={!hasNextPage}
                            >
                                <span className="sr-only">Next</span>
                                <svg className="mt-1 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd">
                                </path>
                                </svg>
                            </button>
                    }
                </nav>
  )

}