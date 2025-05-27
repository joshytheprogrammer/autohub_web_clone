import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { UseStore } from "../../state/store";


type SelectStateProps = 
{
    countryId: number
    placeholder: string
    states: any[]
    LGA: any
    stateOption: string
    selectedState: string
    edit: boolean
    onClick: (selectedLGA: any, stateId: number) => void
}


const SelectState = ({ placeholder, states, LGA, countryId, stateOption, selectedState, edit, onClick }: SelectStateProps) => 
{
  const advertState = UseStore((state) => state)
  
  const [inputValue, setInputValue] = useState("")
  const [selected, setSelected] = useState("")
  const [open, setOpen] = useState<boolean>(false)
  const [choosen, setChoosen] = useState<string>(stateOption) 
  const [stat8Id, setStateId] = useState<number>(-1)
  
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

  const callData = (x: number) => 
  {
     const toDisplayLGA = LGA && LGA?.filter((lga: any) => Number(lga.state_id === Number(x)))
     // sorting
     let sortedLgas = toDisplayLGA.sort((p1: { rate: number; }, p2: { rate: number; }) => (p1.rate < p2.rate) ? 1 : (p1.rate > p2.rate) ? -1 : 0)
     //  setSelectedStates(sortedLgas)
     advertState.setLGAModel(sortedLgas)
    //  console.log(sortedLgas)
     onClick(sortedLgas, stat8Id)
  }  

  useEffect(() => 
  {
    if(stat8Id === -1)
    {
       onClick([], -1)
    } else {
       callData(stat8Id)
    }
  }, [stat8Id])


  return (
        <div 
            className="border border-3 shadow-md relative w-full md:mb-0 mb-3"
        >
            {
                (countryId === -1) && <><div className="bg-white p-3">You have to select a country first</div></>
            }
            {
                ((states.length === 0) && (countryId != -1)) && <><div className="bg-white p-3">No State is under this country</div></>
            }
            { states && (states.length > 0) && (countryId != -1) &&
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
                                    setStateId(-1)
                                    advertState.setLgaName("")
                                }}
                            >
                                - Select State -
                            </li>
                        }
                        {
                            states?.map((x: any, index: number) => (
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
                                        setStateId(x?.tb_id)
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