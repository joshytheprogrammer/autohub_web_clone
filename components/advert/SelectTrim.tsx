import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { IEngine } from "../../app/model/engine";
import { UseStore } from "../../state/store";


type SelectTrimProps = 
{
    manufacturerId: number
    modelId: number
    trimOption: string
    trims: any
    engine: any
    placeholder: string
    selectedTrim: string
    edit: boolean
    onClick: (selectedX: IEngine[], modelId: number) => void
}

const SelectTrim = ({ manufacturerId, modelId, trimOption, trims, engine, selectedTrim, placeholder, edit, onClick }: SelectTrimProps) => 
{
  const advertState = UseStore((state) => state)  
  const [inputValue, setInputValue] = useState("")
  const [selected, setSelected] = useState("")
  const [open, setOpen] = useState<boolean>(false)
  const [choosen, setChoosen] = useState<string>(trimOption)
  const [theTrim, setTheTrim] = useState<number>(-1)

  useEffect(() => 
  {
     setSelected(selectedTrim)
     console.log(theTrim)
  }, [])

  useEffect(() => 
  {
      setTimeout(() => 
      {
        setSelected(selectedTrim)
        setChoosen(trimOption)
      }, 500)
  }, [modelId, manufacturerId])
  
  const fitlterData = (x: number) => 
  {
      const toDisplayEngine = engine && engine?.filter((enginne: any) => Number(enginne.trim_id) === Number(x))
      // sorting
      let sortedEngine = toDisplayEngine.sort((p1: { rate: number; }, p2: { rate: number; }) => (p1.rate < p2.rate) ? 1 : (p1.rate > p2.rate) ? -1 : 0)
      advertState.setTrimEngine(sortedEngine)
      onClick(sortedEngine, x)
  }

  return (
        <div 
            className="border border-3 shadow-md relative w-full md:mb-0 mb-3"
        >
            {
                ((manufacturerId === -1) || (modelId === -1)) && <><div className="bg-white p-3">You have to select a model first</div></>
            }
            {
                ((trims.length === 0) && (modelId != -1)) && <><div className="bg-white p-3">No trim is under this model</div></>
            }
            { 
               ((manufacturerId != -1) && (modelId != -1)) && trims && (trims.length > 0) && (modelId != -1) &&
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
                                            : (choosen === 'reset-trim') ? '- Select Trim -' : selected
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
                                placeholder="Search Trim"
                                className="placeholder:text-gray-700 p-2 outline-none w-full"
                            />
                        </div>                 
                        {
                            edit && <li
                                className={`p-2 text-md hover:bg-sky-600 border-2 border-gray-200 hover:border-2 hover:border-green-200 hover:text-white cursor-pointer py-3`}
                                onClick={() => 
                                {                 
                                    setSelected("")
                                    setInputValue("")
                                    advertState.setTrim(-1)
                                    advertState.setTrimName("")
                                    advertState.setEngine(-1)
                                    advertState.setEngineName("")
                                    advertState.setTrimEngine([]) 
                                    setTheTrim(-1)
                                    setOpen(false)
                                    onClick([], -1)
                                }}
                            >
                                - Select Trim -
                            </li>
                        }
                        {
                            trims?.map((x: any, index: number) => 
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
                                            advertState.setTrim(x?.tb_id)
                                            advertState.setTrimName(x?.name)
                                            advertState.setEngine(-1)
                                            advertState.setEngineName("")
                                            setTheTrim(x?.tb_id)
                                            setChoosen(x?.name)
                                            setOpen(false)
                                            fitlterData(x?.tb_id)
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

export default SelectTrim;