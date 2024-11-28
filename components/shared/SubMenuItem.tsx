import React, { useState } from 'react'   
import { BsChevronDown } from "react-icons/bs";
import { DropDown } from './DropDown'
import Link from 'next/link';

export const SubMenuItem = ({ items }: any) =>
{
    const [dropdown, setDropDown] = useState<boolean>(false)
    return (
        <li className='flex mx-auto'
        >
            {
                items?.subMenu ? (
                    <div className='d-flex relative'>
                        <button type='button' aria-haspopup="menu" aria-expanded={ dropdown? true : false } className='flex text-sm items-center font-bold justify-center text-gray-300 hover:black-500 hover:font-bold cursor-pointer inline-block'
                                onClick={() => setDropDown((prev) => !prev)}
                        >
                            {items?.name}
                            <BsChevronDown className='font-bold text-white border-3 text-md ml-2 w-7 h-4' />
                        </button>
                        <DropDown submenus={items?.subMenu} dropdown={dropdown} />
                    </div>
                ) : (
                    <Link shallow={true} className='mx-2 text-gray-200 font-bold hover:text-black hover:font-bold cursor-pointer text-sm' href={items?.goTo}>
                        {items?.name}
                    </Link>
                )
            }
        </li>
    )
}