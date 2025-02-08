import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { ITrim } from "../../app/model/trim";
import { UseStore } from "../../state/store";


type SelectStateProps = 
{
    manufacturerId: number
    placeholder: string
    models: any
    trims: any
    modelOption: string
    selectedModel: string
    edit: boolean
    onClick: (selectedX: ITrim[], modelId: number) => void
}


const SelectModel = ({ placeholder, models, trims, manufacturerId, selectedModel, modelOption, edit, onClick }: SelectStateProps) => 
{
    const advertState = UseStore((state) => state)  
    const [inputValue, setInputValue] = useState<string>("")
    const [selected, setSelected] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)
    const [choosen, setChoosen] = useState<string>(modelOption)

    const [theModel, setTheModel] = useState<number>(-1)

    useEffect(() => 
    {
       setSelected(selectedModel)
       setTheModel(-1)
    }, [])

    useEffect(() => 
    {
        setSelected(selectedModel)
        setChoosen(modelOption)
    }, [manufacturerId])
    
    useEffect(() => 
    {
        fitlterData(theModel)
    }, [theModel])
    
    useEffect(() => 
    {
    }, [selected])


    const fitlterData = (x: number) => 
    {
        const toDisplayModel = trims && trims?.filter((trim: any) => Number(trim.model_id) === Number(x))
        // sorting
        let sortedTrim = toDisplayModel.sort((p1: { rate: number; }, p2: { rate: number; }) => (p1.rate < p2.rate) ? 1 : (p1.rate > p2.rate) ? -1 : 0)
        advertState.setTheModelTrim(sortedTrim)
        advertState.setTrimEngine([])
        onClick(sortedTrim, x)
    }

    return (
            <div 
                className="border border-3 shadow-md relative w-full md:mb-0 mb-3"
            >
                {
                    (manufacturerId === -1) && <><div className="bg-white p-3">You have to select a manufacturer first</div></>
                }
                {
                    ((models.length === 0) && (manufacturerId != -1)) && <><div className="bg-white p-3">No model is under this manufacturer</div></>
                }
                { 
                  models && (models.length > 0) && (manufacturerId != -1) &&
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
                                                : (choosen === 'reset-model') ? '- Select Model -' : selected
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
                                    placeholder="Search Model"
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
                                        advertState.setModel(-1)
                                        advertState.setModelName("")
                                        advertState.setTrim(-1)
                                        advertState.setTrimName("")
                                        advertState.setEngine(-1)
                                        advertState.setEngineName("")
                                        advertState.setTheModelTrim([]) 
                                        advertState.setTrimEngine([]) 
                                        setOpen(false)
                                        onClick([], -1)
                                    }}
                                >
                                    - Select Model -
                                </li>
                            }
                            {
                                models?.map((x: any, index: number) => (
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
                                        }`}
                                        onClick={() => 
                                        {
                                            setSelected(x?.name)
                                            setInputValue("")
                                            advertState.setModel(x?.tb_id)
                                            advertState.setModelName(x?.name)
                                            advertState.setTrim(-1)
                                            advertState.setTrimName("")
                                            advertState.setEngine(-1)
                                            advertState.setEngineName("")
                                            setChoosen(x?.name)
                                            setOpen(false)
                                            fitlterData(x?.tb_id)
                                        }}
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

export default SelectModel;