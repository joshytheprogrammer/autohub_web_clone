import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";



type SearchMeProps = 
{
    data: any
    placeholder: string
}


const SearchMe = ({ data, placeholder }: SearchMeProps) => 
{
    
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);


  return (
        <div 
                className="border border-3 shadow-md relative md:max-w-[400px] md:w-3/12 w-12/12 md:mb-0 mb-3"
                // onMouseLeave={() => {
                //     setOpen(false)
                // }}
        >
            <div
                onClick={() => setOpen(!open)}
                className={`bg-white w-full h-[30px] pt-2 md:pb-2 h-[40px] pb-3 px-3 flex items-center justify-between rounded ${
                !selected && "text-gray-700"
                }`}
            >
                {selected
                ? selected?.length > 25
                    ? selected?.substring(0, 25) + "..."
                    : selected
                : placeholder}
                <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
            </div>
            <ul
                className={`bg-white overflow-y-auto mt-2 absolute w-full border-r-2 border-b-2 border-l-2 border-blue-300 ${
                open ? "max-h-60 z-40" : "max-h-0 z-40"
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
                        className="placeholder:text-gray-700 p-2 outline-none"
                    />
                </div>
                {
                    data?.map((country: { tb_id: number, name: string }, index: number) => (
                        <li
                            key={country?.name}
                            className={`p-2 text-md bg-blue-100 hover:bg-sky-600 hover:text-green-300 hover:font-bold cursor-pointer py-3
                            ${
                            country?.name?.toLowerCase() === selected?.toLowerCase() &&
                            "bg-sky-600 text-white"
                            }
                            ${
                            country?.name?.toLowerCase().startsWith(inputValue)
                                ? "block"
                                : "hidden"
                            }`}
                            onClick={() => 
                            {
                                setSelected(country?.name);
                                setOpen(false);
                                setInputValue("");
                            }}
                        >
                            {country?.name}
                        </li>
                    ))
                }
            </ul>
        </div>
  );
};

export default SearchMe;