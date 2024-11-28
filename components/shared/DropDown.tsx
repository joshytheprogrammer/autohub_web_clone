import Link from 'next/link'
import React from 'react'


export const DropDown = ({ submenus, dropdown }: any) =>
{
    // const [dropDownStatus, setDropDownStatus] = useState<boolean>(dropdown)
    // const [isOpen, setIsOpen] = useState<string>('hidden')

    return (
        <ul 
            className={`d-flex bg-orange px-5 py-1 pb-4 ${dropdown ? `block z-50 absolute rounded-sm border border-shadow bg-white mt-2 border border-3 border-green-500` : `hidden` }`}
            // onMouseLeave={() => {
            //     setIsOpen('hidden')
            // }}
        >
        { 
            submenus?.map((submenu: any, index: number) => {
                return (
                    <li className='w-[250px] bg-white py-2 z-50' key={index}
                    >
                        <Link className='text-black font-bold hover:text-green-600 hover:font-bold cursor-pointer' href={submenu?.goTo}                        >
                            {submenu?.name}
                        </Link>
                    </li> 
                )
            })
        }
        </ul>
    )
}
