import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { UseStore } from "../../state/store";


type SelectLGAProps = 
{
    LGA: any
    stateId: number
    placeholder: string
    edit: boolean
    onClick: (lgaId: number) => void
    lgaOption: string
    selectedLGA: string
}


const SelectLGA = ({ LGA, placeholder, stateId, selectedLGA, lgaOption, edit, onClick }: SelectLGAProps) => 
{
  const advertState = UseStore((state) => state)
  
  const [inputValue, setInputValue] = useState<string>("")
  const [selected, setSelected] = useState<string>("")
  const [stId, setStateId] = useState<number>(-1)
  const [lgaId, setLgaId] = useState<number>(-1)
  const [open, setOpen] = useState<boolean>(false)
  const [choosen, setChoosen] = useState<string>(lgaOption) 
  
  useEffect(() => 
  {
    setTimeout(() => 
    {      
    }, 500)
    setStateId(stateId)
    setSelected(selectedLGA)
  }, [])

  useEffect(() => 
  {
    setTimeout(() => 
    {
        setChoosen("reset-state")
    }, 500)
  }, [stateId]) 

  useEffect(() => 
  {
    setTimeout(() => 
    {      
      setChoosen(advertState.getLgaName())
    }, 500)
    //  setSelected(selected)
  }, [lgaId])  


  return (
        <div 
            className="border border-3 shadow-md relative w-full md:mb-0 mb-3"
        >
            {
                (stateId === -1) && <><div className="bg-white p-3">You have to select a state first</div></>
            }
            {
                ((LGA.length === 0) && (stateId != -1)) && <><div className="bg-white p-3">No lga is under state</div></>
            }
            
            { LGA && (LGA.length > 0) && (stateId != -1) &&
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
                                    advertState.setLGA(-1)
                                    advertState.setLgaName("")
                                    setLgaId(-1)
                                }}
                            >
                                - Select LGA -
                            </li>
                        }
                        {
                            LGA?.map((x: any, index: number) => (
                                <li
                                    key={index}
                                    className={`p-2 text-md hover:bg-sky-600 border-2 border-gray-200 hover:border-2 hover:border-green-200 hover:text-white cursor-pointer py-3
                                    ${
                                        x?.name?.toLowerCase() === "" &&
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
                                        setOpen(false)                                       
                                        advertState.setLGA(x?.tb_id)
                                        advertState.setLgaName(x?.name)
                                        setLgaId(x?.tb_id)
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

export default SelectLGA;