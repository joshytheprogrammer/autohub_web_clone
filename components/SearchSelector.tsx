import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

type countryNames = {
    name: string
}[]

const SearchSelector = () => 
{
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    
  }, []);

  return (
        <div className="border border-3 shadow-md w-fit fixed"
        >
            <div
                onClick={() => setOpen(!open)}
                className={`bg-white w-full p-2 flex items-center justify-between rounded ${
                !selected && "text-gray-700"
                }`}
            >
                {selected
                ? selected?.length > 25
                    ? selected?.substring(0, 25) + "..."
                    : selected
                : "Select Country"}
                <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
            </div>
            <ul
                className={`bg-white mt-2 overflow-y-auto m-1 ${
                open ? "max-h-60 z-40" : "max-h-0 z-40"
                } `}
            >
                <div className="flex items-center sticky top-0 bg-white border border-3 shadow-md"
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
            </ul>
        </div>
  );
};

export default SearchSelector;