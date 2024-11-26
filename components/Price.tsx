import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

type countryNames = {
    name: string
}[]

const Price = () => 
{
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);


  return (
        <div    
                className="border border-3 shadow-md relative md:max-w-[400px] md:w-3/12 w-12/12 md:mb-0 mb-3"
                onMouseLeave={() => {
                    setOpen(false)
                }}
        >
            <div
                onClick={() => setOpen(!open)}
                className={`bg-white w-full pt-1 md:pb-1 h-[40px] pb-1 px-3 flex items-center justify-between rounded ${
                !selected && "text-gray-700"
                }`}
            >
                {selected
                ? selected?.length > 25
                    ? selected?.substring(0, 25) + "..."
                    : selected
                : "Price"}
                <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
            </div>
            <ul
                className={`bg-white overflow-y-auto -mt-2 border-2 border-blue-100 absolute w-full p-3 d-flex gap-3 -mt-1 ${
                open ? "max-h-60 z-40" : "max-h-0 z-40 hidden"
                } `}
                onMouseLeave={() => {
                    setOpen(false)
                }}
            >
                <p className="font-bold text-md mb-2 text-green-700">Enter Price Range</p>
                <div className="flex items-center sticky top-0 bg-white border border-3 shadow-md mb-3"
                >
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                        placeholder="0.00"
                        className="placeholder:text-gray-700 p-2 w-full"
                    />
                </div>
                <div className="flex items-center sticky top-0 bg-white border border-3 shadow-md mb-1"
                >
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                        placeholder="0.00"
                        className="placeholder:text-gray-700 p-2 w-full"
                    />
                </div>
                <div
                    className="px-3 py-2"
                >                    
                    <button 
                            type="submit" 
                            className="bg-blue-800 hover:bg-blue-600 w-full rounded-md text-white text-md mt-2 p-3 mb-1"
                    >
                        Search
                    </button>
                </div>
            </ul>
        </div>
  );
};

export default Price;