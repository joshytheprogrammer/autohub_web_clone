import Link from 'next/link'
import React from 'react'


export default function PostAdvert() 
{

  return (
            <Link href={'/user/create-advert'}
                    type="button" 
                    className="col-span-2 md:col-span-1 flex justify-center whitespace-nowrap text-sm md:text-[14px] items-center btn-outline-primary md:mt-3 mt-4 z-30 h-fit transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-green-700 hover:bg-green-700 text-green-700 hover:text-white font-normal py-2 px-2 rounded"
            >
                Post-Advert
            </Link>
  )
}
