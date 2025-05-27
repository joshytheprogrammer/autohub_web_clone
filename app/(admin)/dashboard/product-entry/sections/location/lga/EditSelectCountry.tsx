import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
// import { IState } from "../../../../../../model/state";
import { UseStore } from "../../../../../../../state/store";
// import { ICountry } from "../../../../../../model/country";


type EditSelectCountryProps = 
{
    placeholder: string
    countries: any
    countryId: number
    countryName: string
    edit: boolean
    onClick: (selectedX: string, countrId: number) => void
}


const EditSelectCountry = ({ placeholder, countries, countryId, countryName, edit, onClick }: EditSelectCountryProps) => 
{
  const [inputValue, setInputValue] = useState<string>("");

  const [selected, setSelected] = useState<string>("");

  const [open, setOpen] = useState(false);  
 
  const [neverCall] = useState<number>(-1)
  
  useEffect(() => 
  {
     setSelected(countryName)
  }, [])

  useEffect(() => 
  {
     setSelected(countryName)
  }, [countryName])

  
//   useEffect(() => 
//   {
//      if(theCountry === -1)
//      {
//         onClick("", -1)
//      } else {
//         callData(theCountry)
//      }
//   }, [theCountry])

  useEffect(() => 
  {
    
  }, [neverCall])
  

//   const callData = (x: number) => 
//   {
//      const toDisplayState = states && states?.filter((state: any) => Number(state.country_id) === Number(x))
//      // sorting
//      let sortedStates = toDisplayState.sort((p1: { rate: number; }, p2: { rate: number; }) => (p1.rate < p2.rate) ? 1 : (p1.rate > p2.rate) ? -1 : 0)
//      setSelectedStates(sortedStates)
//      advertState.setStateModel(sortedStates)
//      advertState.setTheModelTrim([])
//      onClick(sortedStates, theCountry)
//   }

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
                    <div className="flex items-center px-2 sticky top-0 bg-white shadow-md border-2 border-blue-100"
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
                                onClick("", -1)
                                // advertState.setCountryName("")
                                // advertState.setCountry(-1)
                                // advertState.setStates(-1)
                                // advertState.setStateName("")
                            }}
                        >
                            - Select Country -
                        </li>
                    }
                    {
                        countries?.map((x: { tb_id: number, name: string }, index: number) => 
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
                                    onClick(x?.name, x?.tb_id)
                                    // advertState.setCountry(x?.tb_id)
                                    // advertState.setCountryName(x?.name)
                                    // setRefresh(Math.random()*(317*953))                                
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

export default EditSelectCountry;