import Link from 'next/link'
import React from 'react'



export default function MobileCategory({ data }: { data: any}) 
{

  return (        
      <ul 
          className="gap-3 mt-3 w-full grid grid-cols-12 flex md:hidden block"
      >
            {
                data?.map((category: any, idx: number) => 
                <Link 
                        href={`x-x-x/${category.hash}`}
                        key={idx}
                        className='col-span-4 hover:bg-blue-100 py-3 rounded-lg border-2 border-shadow mb-3'
                >
                    <li
                        className="h-fit gap-2 p-2 flex flex-col items-center justify-between rounded cursor-pointer"
                        role="button"
                    >
                        <div 
                            className="flex justify-center gap-3 items-center bg-brandGray w-full h-[30px] rounded-lg"
                        >
                            <img aria-hidden="true" src={category.mobile} alt="" />
                        </div>

                        <p 
                            className="text-center text-sm text-gray-500 text-ellipsis truncate w-full"
                        >
                            {category.name}
                        </p>
                    </li>    
                </Link>
            )}
      </ul>
  )
}
