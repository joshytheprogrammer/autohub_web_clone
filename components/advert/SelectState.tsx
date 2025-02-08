import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { UseStore } from "../../state/store";


type SelectStateProps = 
{
    countryId: number
    placeholder: string
    incomingData: any[]
    stateOption: string
    selectedState: string
    edit: boolean
    onClick: (countrId: number) => void
}


const SelectState = ({ placeholder, incomingData, countryId, stateOption, selectedState, edit, onClick }: SelectStateProps) => 
{
  const advertState = UseStore((state) => state)
  
  const [inputValue, setInputValue] = useState("")
  const [selected, setSelected] = useState("")
  const [open, setOpen] = useState<boolean>(false)
  const [choosen, setChoosen] = useState<string>(stateOption) 
  
  useEffect(() => 
  {
    setSelected(selectedState)
    setTimeout(() => 
    {      
        setSelected(selectedState)
    }, 500)
  }, [])

  useEffect(() => 
  {
    setTimeout(() => 
    {
        setChoosen(stateOption)
    }, 500)
  }, [countryId])


  return (
        <div 
            className="border border-3 shadow-md relative w-full md:mb-0 mb-3"
        >
            {
                (countryId === -1) && <><div className="bg-white p-3">You have to select a country first</div></>
            }
            {
                ((incomingData.length === 0) && (countryId != -1)) && <><div className="bg-white p-3">No State is under this country</div></>
            }
            { incomingData && (incomingData.length > 0) && (countryId != -1) &&
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
                                            : (choosen === 'reset-state') ? '- Select State -' : selected
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
                                placeholder="Search State"
                                className="placeholder:text-gray-700 p-2 outline-none w-full"
                            />
                        </div>
                        {
                            edit && 
                            <li
                                className={`p-2 text-md hover:bg-sky-600 border-2 border-gray-200 hover:border-2 hover:border-green-200 hover:text-white cursor-pointer py-3`}
                                onClick={() => {                        
                                    setSelected("")
                                    setOpen(false);
                                    setInputValue("")
                                    advertState.setStates(-1)
                                    advertState.setStateName("")
                                    onClick(-1)
                                }}
                            >
                                - Select State -
                            </li>
                        }
                        {
                            incomingData?.map((x: any, index: number) => (
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
                                        setChoosen(x?.name)
                                        setInputValue("")
                                        setOpen(false)
                                        advertState.setStates(x?.tb_id)
                                        advertState.setStateName(x?.name)
                                        onClick(x?.id)
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

export default SelectState;