import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { UseStore } from "../../state/store";


type SelectTrimProps = 
{
    manufacturerId: number
    modelId: number
    trimId: number
    engineOption: string
    engine: any
    placeholder: string
    selectedEngine: string
    onClick: (trimId: number) => void
    edit: boolean
}

const Engine = ({ manufacturerId, modelId, trimId, engineOption, engine, selectedEngine, placeholder, onClick, edit }: SelectTrimProps) => 
{
  const advertState = UseStore((state) => state) 
  const [inputValue, setInputValue] = useState("")
  const [selected, setSelected] = useState("")
  const [open, setOpen] = useState<boolean>(false)
  const [choosen, setChoosen] = useState<string>(engineOption)
  const [theEngine, setTheEngine] = useState<number>(-1)

  useEffect(() => 
  {
     setSelected(selectedEngine)
  }, [])

  useEffect(() => 
  {
      setTimeout(() => 
      {
         setSelected(selectedEngine)
         setChoosen(engineOption)
         console.log(theEngine)
      }, 500)
  }, [manufacturerId, modelId, trimId])

  return (
        <div 
            className="border border-3 shadow-md relative w-full md:mb-0 mb-3"
        >
            {
                ((manufacturerId === -1) || (modelId === -1) || (trimId === -1)) && <><div className="bg-white p-3">You have to select a trim first</div></>
            }
            {
                ((engine.length === 0) && (trimId != -1)) && <><div className="bg-white p-3">No trim is under this trim</div></>
            }
            { 
               ((manufacturerId != -1) && (modelId != -1) && (trimId != -1)) && engine && (engine.length > 0) &&
                <>
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
                                            : (choosen === 'reset-engine') ? '- Select Engine -' : selected
                                        : placeholder 
                        }
                         <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
                    </div> 
                    <ul
                        className={`bg-gray-100 overflow-y-auto -mt-2 absolute w-full ${
                        open ? "max-h-200 z-40" : "max-h-0 z-40"
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
                                placeholder="Search Engine"
                                className="placeholder:text-gray-700 p-2 outline-none w-full"
                            />
                        </div>
                        {
                            edit &&                  
                            <li
                                className={`p-2 text-md hover:bg-sky-600 border-2 border-gray-200 hover:border-2 hover:border-green-200 hover:text-white cursor-pointer py-3`}
                                onClick={() => 
                                {                 
                                    setSelected("")
                                    setInputValue("")
                                    advertState.setEngine(-1)
                                    advertState.setEngineName("")
                                    setOpen(false)
                                    onClick(-1)
                                }}
                            >
                                - Select Engine -
                            </li>
                        }
                        {
                            engine?.map((x: any, index: number) => 
                            (
                                <li
                                    key={index}
                                    className={`p-2 text-md hover:bg-sky-600 border-2 border-gray-200 hover:border-2 hover:border-green-200 hover:text-white cursor-pointer py-3
                                    ${
                                        x?.name?.toLowerCase() === selected?.toLowerCase() &&
                                        "bg-sky-600 text-white"
                                    }
                                    ${
                                        x?.name?.toLowerCase().startsWith(inputValue)
                                            ? "block"
                                            : "hidden"
                                        }`
                                    }
                                    onClick={() => 
                                        {
                                            setSelected(x?.name)
                                            setInputValue("")
                                            advertState.setEngine(x?.tb_id)
                                            advertState.setEngineName(x?.name)
                                            setTheEngine(x?.tb_id)
                                            setChoosen(x?.name)
                                            setOpen(false)
                                            onClick(x?.tb_id)
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
  );
};

export default Engine