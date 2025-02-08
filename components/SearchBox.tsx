import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BsGeoAltFill } from "react-icons/bs";
import { productsDB } from '../app/model/Product';
import currencyFormatter from './util/currency-formatter';


type SearchProps = {
    deviceWidth?: boolean
}

export default function SearchBox({ deviceWidth = true } : SearchProps) 
{
    const router = useRouter()
    const [borderCharcter, setBorderCharacter] = useState<string>("")
    const [showSuggestion, setShowSuggestion] = useState<boolean>(false)
    const [keyword, setKeyWord] = useState<string>("")
    const [search, setSearch] = useState<ActiveProduct[]>([])

    useEffect(() => {

    }, [borderCharcter])

    const setBorderBehaviour = (value: string) => 
    {
        setBorderCharacter(value)
    }

    const product = async (keyword: string) => 
    {
        const found = await productsDB.where("manufacturer").startsWithAnyOfIgnoreCase(keyword).or('model').startsWithAnyOfIgnoreCase(keyword).or('year').startsWithAnyOfIgnoreCase(keyword).or('colour').startsWithAnyOfIgnoreCase(keyword).toArray()
        setSearch(found)
    }

    let deviceType = deviceWidth === true ? 'md:block' : 'md:block'
    
    return (
        <div className={`d-flex relative md:mt-2 mb-3 ${deviceType}`}>            
            <div className={`w-full bg-white border-2 shadow relative rounded-xl flex p-2 absolute ${borderCharcter}`}
            >
                <span className="w-auto flex justify-end text-gray-500 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </span>
                <input 
                        name="episodequery" id="title" 
                        className="border-gray-300 outline-none border-0 w-full rounded-xl p-2 focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="Search by Manufacturer, Model"
                        onFocus={() => {
                            setShowSuggestion(true)
                            setBorderBehaviour(`border border-2 border-blue-500`)
                        }} 
                        onBlur={() => {
                            setBorderBehaviour(``)                            
                        }}
                        onChange={() => {

                        }}
                        // onMouseOver={() => {
                        //     if(keyword && keyword.length >= 3)
                        //     {
                        //         setShowSuggestion(true)
                        //     }
                        // }}
                        onKeyUp={(e: any) => {
                            setShowSuggestion(true)
                            setKeyWord(e.target.value)
                            product(e.target.value)
                        }}
                />
            </div>
            {   showSuggestion && keyword && 
                <div 
                        className='absolute w-full bg-white px-5 pt-3 pb-4 z-50 mt-1 rounded-xl border border-blue-100 overflow-auto overflow-y-scroll min-h-fit max-h-[550px] border-2 border-blue-100'                        
                        onMouseLeave={() => {
                            setShowSuggestion(false)
                        }}
                >
                    <div 
                        className='grid grid-cols-12 mb-1'
                    >                        
                        {   search && (search?.length === 0) && <span className='col-span-12 mt-2 font-bold text-red-400 text-lg px-3'> No result found </span> }

                        {   search && (search?.length === 1) && <span className='col-span-12 mt-2 font-bold text-black text-lg px-3 bg-blue-100 py-3'> 1 result found for {keyword} </span>}

                        {   search && (search?.length > 1) && <span className='col-span-12 mt-2 font-bold text-black text-lg px-3 bg-blue-100 py-3'> {search?.length} results found for {keyword} </span>}
                    </div>
                    
                    <div className='p-1'></div>
                    { 
                        search && search.map((search: any, index: number) => {
                            return (
                                <div 
                                    key={index}
                                    className='border-b-2 pb-2 cursor-pointer hover:bg-gray-100 px-3' 
                                    onClick={() => {
                                        setShowSuggestion(false)                           
                                        router.push(`/product-detail/${search?.slug}`)
                                    }}
                                >
                                    <div 
                                        className="d-flex gap-3 pb-1 items-start px-2 md:px-1 pt-2"
                                    >
                                        <div 
                                                className="text-[15px] md:text-[13px] lg:text-[17px] w-full text-green-600 font-bold "
                                        >
                                            {search?.title}
                                        </div>
                                        <div className="text-[15px] md:text-[17px] lg:text-[15px] w-full text-blue-700 font-bold"
                                            >
                                            <span 
                                                className='uppercase font-bold'
                                            >
                                                {currencyFormatter(search?.price)}
                                            </span>
                                        </div>
                                    </div>
                                    <div 
                                        className="flex justify-left items-center text-[12px] md:text-[13px] lg:text-[14px] w-full text-red-500"
                                    >
                                        <BsGeoAltFill />
                                        <span 
                                            className='uppercase font-bold ml-1'
                                        >
                                            {search?.country}
                                        </span>
                                        <span 
                                            className='ml-2'
                                        >
                                            {search?.state}
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                            
                    }
                </div>
            }
        </div>
  )

}
