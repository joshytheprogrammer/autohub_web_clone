import Link from 'next/link'
import React from 'react'

export default function WebCategory({ data }: { data: any}) 
{

  return (        
        <ul 
            className="hidden gap-1 md:flex flex-col justify-between px-2 pt-2"
        >
            {
                data?.map((category: any, idx: number) => 
                (
                    <li 
                        key={idx} 
                        className='border-b-2 border-gray-100 hover:bg-gray-200 hover:text-white hover:font-bold hover:text-white'
                    >
                        <Link
                            href={`/x-x-x/${category.hash}`}
                            className="h-[39px] duration-300 transition flex items-center justify-between px-4 cursor-pointer rounded-lg"
                        >
                            <div className="flex gap-3 items-center">
                                <img src={`${category.icon}`} className='mt-1' alt="" style={{width: "17px", height: "17px"}} />

                                <p 
                                    className="text-gray-700 text-md"
                                >
                                    {category.name}
                                </p>
                            </div>

                            <div className="text-sm font-semibold flex relative gap-5">
                                <span style={{fontSize: "11px"}} className="bg-blue-500 text-purple-100 px-2 font-bold rounded-full">{category.products_count}</span>
                            </div>
                        </Link>
                    </li>
                ))
            }
        </ul>
  )
}
