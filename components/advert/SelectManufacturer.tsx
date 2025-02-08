import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { UseStore } from "../../state/store";
import { IManufacturer } from "../../app/model/manufacturer";
import { IModel } from "../../app/model/model";


type ManufacturerProps = 
{
    placeholder: string
    manufacturers: any
    models: any
    selectedManufacturer: string
    edit: boolean
    onClick: (selectedX: IModel[], modelId: number) => void
}


const SelectManufacturer = ({ placeholder, manufacturers, models, selectedManufacturer, edit, onClick }: ManufacturerProps) => 
{
  const advertState = UseStore((state) => state)  
  const [data, setData] = useState<IManufacturer>([])
  const [inputValue, setInputValue] = useState<string>("")
  const [selected, setSelected] = useState<string>("")
  const [open, setOpen] = useState(false)   

  useEffect(() => 
  {
     setSelected(selectedManufacturer)
     setData(manufacturers)
  }, [])


  const fitlterData = (x: number) => 
  {
     const toDisplayModel = models && models?.filter((model: any) => Number(model.manufacturer_id) === Number(x))
     // sorting
     let sortedModels = toDisplayModel.sort((p1: { rate: number; }, p2: { rate: number; }) => (p1.rate < p2.rate) ? 1 : (p1.rate > p2.rate) ? -1 : 0)
     advertState.setTheMakerModels(sortedModels)        
     advertState.setTheModelTrim([])
     advertState.setTrimEngine([])
     onClick(sortedModels, x)
  }

  return (
        <>
            <div 
                className="border border-3 shadow-md relative w-full md:mb-0 mb-3"
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
                            placeholder="Search brand name"
                            className="placeholder:text-gray-700 p-2 outline-none w-full"
                        />
                    </div>
                    {
                        edit && 
                        <li
                            className={`p-2 text-md hover:bg-sky-600 border-2 border-gray-200 hover:border-2 hover:border-green-200 hover:text-white cursor-pointer py-3`}
                            onClick={() => {                        
                                setSelected("")
                                setInputValue("")
                                advertState.setManufacturer(-1)
                                advertState.setManufacturerName("")
                                advertState.setTheMakerModels([]) 
                                advertState.setTheModelTrim([]) 
                                advertState.setTrimEngine([]) 
                                advertState.setModel(-1)
                                advertState.setModelName("")
                                advertState.setTrim(-1)
                                advertState.setTrimName("")
                                advertState.setEngine(-1)
                                advertState.setEngineName("")
                                advertState.setOthers("no")
                                setOpen(false)
                                onClick([], -1)
                                // setRefresh(Math.random()*(317*953))
                            }}
                        >
                            - Select Manufacturer -
                        </li>
                    }
                    {
                        data?.map((x: any, index: number) => 
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
                                    advertState.setManufacturer(x?.tb_id)
                                    advertState.setManufacturerName(x?.name)
                                    advertState.setModel(-1)
                                    advertState.setModelName("")
                                    advertState.setTrim(-1)
                                    advertState.setTrimName("")
                                    advertState.setEngine(-1)
                                    advertState.setEngineName("")
                                    advertState.setOthers("no")
                                    setOpen(false)
                                    fitlterData(x?.tb_id)
                                    // setRefresh(Math.random()*(317*953))
                                }
                                }
                            >
                                {x?.name}
                            </li>
                        ))
                    }
                    <li
                        className={`p-2 text-md hover:bg-sky-600 border-2 border-gray-200 hover:border-2 hover:border-green-200 hover:text-white cursor-pointer py-3`}
                        onClick={() => 
                        {    
                            setSelected("Others")
                            setInputValue("")
                            advertState.setManufacturer(0)
                            advertState.setManufacturerName("Others")
                            advertState.setModel(-1)
                            advertState.setModelName("")
                            advertState.setTrim(-1)
                            advertState.setTrimName("")
                            advertState.setEngine(-1)
                            advertState.setEngineName("")
                            advertState.setOthers("yes")
                            setOpen(false)
                            // setRefresh(Math.random()*(317*953))
                        }}
                    >
                        Others
                    </li>
                </ul>
            </div>
            
        </>
  );
};

export default SelectManufacturer;