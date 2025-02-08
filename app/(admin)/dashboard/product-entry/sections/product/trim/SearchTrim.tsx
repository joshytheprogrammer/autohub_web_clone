import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";


type SearchTrimProps = 
{
    placeholder: string
    selectedTrim: string
    onClick: (selectedX: number | string) => void
    trims: any
    selectedModel?:  number
    trimOption?: string
}


const SearchTrim = ({ placeholder, selectedTrim, selectedModel, trims, onClick }: SearchTrimProps) => 
{
  const [inputValue, setInputValue] = useState<string>("")
  const [selected, setSelected] = useState<string>("")
  const [open, setOpen] = useState(false) 
  
  useEffect(() => 
  {
     setSelected(selectedTrim)
  }, [])


  return (
        <>
            <div 
                className="border border-3 shadow-md relative md:mb-0 mb-1 col-span-12 md:col-span-12"
            >
 
                {
                    ((selectedTrim === "") || (selectedModel === -1)) && <><div className="bg-white p-3 border-b-2 border-blue-300">You have to select a model first</div></>
                }

                {
                    (trims.length === 0) && ((selectedTrim === "") || (selectedModel === -1)) && <><div className="bg-white p-3 border-b-2 border-blue-300">No trim for selected model</div></>
                }
                
                { 
                    ((trims.length > 0) && (selectedTrim != "") && selectedModel != -1) && <>
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
                                    placeholder="Enter trim name"
                                    className="placeholder:text-gray-200 p-2 outline-none w-full text-sm"
                                />
                            </div>
                            <li
                                className={`p-2 text-md hover:bg-sky-600 border-2 border-gray-200 hover:border-2 hover:border-green-200 hover:text-white cursor-pointer py-3`}
                                onClick={() => 
                                    {                        
                                        setSelected("")
                                        setInputValue("")
                                        setOpen(false)
                                        onClick(-1)
                                    }
                                }
                            >
                                - Select Trim  -
                            </li>
                            {
                                trims?.map((x: { tb_id: number, name: string }, index: number) => 
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
                    </>
                }
            </div>
            
        </>
  );
};

export default SearchTrim;