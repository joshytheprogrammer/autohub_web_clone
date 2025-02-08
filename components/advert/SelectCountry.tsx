import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { UseStore } from "../../state/store";
import { ICountry } from "../../app/model/country";
import { IState } from "../../app/model/state";


type SelectCountryProps = 
{
    placeholder: string
    countries: any
    states: any
    selectedCountry: string
    edit: boolean
    onClick: (selectedX: IState[], countrId: number) => void
}


const SelectCountry = ({ placeholder, countries, states, selectedCountry, edit, onClick }: SelectCountryProps) => 
{
  const advertState = UseStore((state) => state)
  
  const [data, setData] = useState<ICountry>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const [selected, setSelected] = useState<string>("");
  const [selectedStates, setSelectedStates] = useState(advertState.getStateModel());

  const [open, setOpen] = useState(false);  

  const [theCountry, setTheCountry] = useState<number>(advertState.getCountry())  
  const [neverCall] = useState<number>(-1)
  const [refresh, setRefresh] = useState<number>(-1)
  const [nothing] = useState<number>(-1)
  
  useEffect(() => 
  {
     setSelected(selectedCountry)
     setData(countries)
  }, [])

  
  useEffect(() => 
  {
     console.log(selectedStates)
  }, [nothing])

  useEffect(() => 
  {
     if(theCountry === -1)
     {
        onClick([], -1)
     } else {
        callData(theCountry)
     }
  }, [theCountry])

  useEffect(() => 
  {
    
  }, [neverCall])
  
  useEffect(() => 
  {
      setTheCountry(advertState.getCountry())
  }, [refresh])


  const callData = (x: number) => 
  {
     const toDisplayState = states && states?.filter((state: any) => Number(state.country_id) === Number(x))
     // sorting
     let sortedStates = toDisplayState.sort((p1: { rate: number; }, p2: { rate: number; }) => (p1.rate < p2.rate) ? 1 : (p1.rate > p2.rate) ? -1 : 0)
     setSelectedStates(sortedStates)
     advertState.setStateModel(sortedStates)
     advertState.setTheModelTrim([])
     onClick(sortedStates, theCountry)
  }

  return (
        <>
            <div 
                className="border border-3 shadow-md relative w-full md:mb-0 mb-3"
            >
                <div
                    onClick={() => setOpen(!open)}
                    className={`bg-white w-full h-[50px] pt-2 md:pb-2 pb-3 px-3 flex items-center justify-between rounded ${
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
                    open ? "max-h-120 z-40" : "max-h-0 z-40"
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
                            placeholder="Search Country"
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
                                advertState.setCountryName("")
                                advertState.setCountry(-1)
                                advertState.setStates(-1)
                                advertState.setStateName("")
                                setRefresh(Math.random()*(317*953))
                            }}
                        >
                            - Select Country -
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
                                    setSelected(x?.name);
                                    setOpen(false);
                                    setInputValue("")
                                    advertState.setCountry(x?.tb_id)
                                    advertState.setCountryName(x?.name)
                                    setRefresh(Math.random()*(317*953))                                
                                }
                                }
                            >
                                {x?.name}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
  );
};

export default SelectCountry;