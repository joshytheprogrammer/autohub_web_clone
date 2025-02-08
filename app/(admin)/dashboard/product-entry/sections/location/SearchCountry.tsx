import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";


type SearchCountryProps = 
{
    placeholder: string
    selectedManufacturer: string
    onClick: (selectedX: number) => void
    countries: any
}


const SearchCountry = ({ placeholder, selectedManufacturer, countries, onClick }: SearchCountryProps) => 
{
  const [inputValue, setInputValue] = useState<string>("")
  const [selected, setSelected] = useState<string>("")
  const [open, setOpen] = useState(false) 

  useEffect(() => 
  {
     setSelected(selectedManufacturer)
  }, [])


  return (
        <>
            <div 
                className="border border-3 shadow-md relative md:mb-0 mb-3 col-span-8 md:col-span-5"
            >
                <div
                    onClick={() => setOpen(!open)}
                    className={`bg-white w-full h-[50px] pt-2 md:pb-2 h-[40px] pb-3 px-3 flex items-center justify-between rounded ${
                    !selected && "text-gray-700"
                    }`}
                >
                    {
                    selected
                    ? selected?.length > 25
                        ? selected?.substring(0, 25) + "..."
                        : selected
                        : placeholder
                    }
                    <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
                </div>
                <ul
                    className={`bg-gray-100 overflow-y-auto -mt-2 absolute w-full ${
                    open ? "max-h-80 z-40" : "max-h-0 z-40"
                    } `}
                    onMouseLeave={() => {
                        setOpen(false)
                    }}
                >
                    <div className="flex items-center px-2 sticky top-0 bg-white border border-3 shadow-md border-2 border-blue-100"
                    >
                        <AiOutlineSearch size={18} className="text-gray-700" />
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                            placeholder="Enter country name"
                            className="placeholder:text-gray-200 p-2 outline-none w-full text-sm"
                        />
                    </div>
                    {
                        countries?.map((x: { tb_id: number, name: string }, index: number) => 
                        (
                            <li
                                key={index}
                                className={`p-2 text-sm text-black hover:bg-sky-600 border-2 border-gray-200 hover:border-2 hover:border-green-200 hover:text-white cursor-pointer py-3
                                ${
                                    x?.name?.toLowerCase() === selected?.toLowerCase() &&
                                    "bg-sky-600 text-white"
                                }
                                ${
                                    x?.name?.toLowerCase().startsWith(inputValue)
                                        ? "block"
                                        : "hidden"
                                    }
                                `}
                                onClick={() => 
                                {
                                    setSelected(x?.name)
                                    setInputValue("")
                                    setOpen(!open)
                                    onClick(x.tb_id)
                                }
                                }
                            >
                                {x?.name}
                            </li>
                        ))
                    }
                </ul>
            </div>
            
        </>
  );
};

export default SearchCountry;