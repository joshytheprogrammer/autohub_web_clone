import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { UseStore } from "../state/store";



type SelectManufacturerProps = 
{
    placeholder: string
    manufacturers: any
    models: any
    selectedManufacturer: string
    onClick: (selectedX: any, manufacturerId: number) => void
}


const SearchManufacturer = ({ placeholder, manufacturers, models, selectedManufacturer, onClick }: SelectManufacturerProps) => 
{
    const advertState = UseStore((state) => state)

    const [data, setData] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
  
    const [selected, setSelected] = useState<string>("");
    const [selectedStates, setSelectedStates] = useState(advertState.getStateModel());
  
    const [open, setOpen] = useState(false);  
   
    const [neverCall] = useState<number>(-1)
    const [refresh] = useState<number>(-1)
    
    useEffect(() => 
    {
       setTimeout(() => 
        {
            setSelected(selectedManufacturer)
            setData(manufacturers)
        }, 500)
        console.log(manufacturers,selectedStates)
    }, [])
  
    useEffect(() => 
    {
        // callData(theCountry)
    }, [selected])
  
    useEffect(() => 
    {
      
    }, [neverCall])
    
    useEffect(() => 
    {
        
    }, [refresh])
  
  
    const callData = (x: number) => 
    {
       const toDisplayModel = models && models?.filter((state: any) => Number(state.manufacturer_id) === Number(x))
       console.log(models)
       // sorting
       let sortedStates = toDisplayModel.sort((p1: { rate: number; }, p2: { rate: number; }) => (p1.rate < p2.rate) ? 1 : (p1.rate > p2.rate) ? -1 : 0)
       console.log(toDisplayModel)
       setSelectedStates(sortedStates)
       onClick(sortedStates, x)
    }
  
    return (
        
              <div 
                  className="border border-3 shadow-md relative md:mb-0 mb-3"
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
                    className={`bg-white overflow-y-auto absolute w-full border-r-2 border-b-2 border-l-2 border-blue-300 ${ 
                        open ? "max-h-120 z-30" : "max-h-0 z-30"
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
                              placeholder="Enter country name"
                              className="placeholder:text-gray-700 p-2 outline-none w-full"
                          />
                      </div>
                      <li
                          className={`p-2 text-md hover:bg-sky-600 border-2 border-gray-200 hover:border-2 hover:border-green-200 hover:text-white cursor-pointer py-3`}
                          onClick={() => 
                          {                        
                              setSelected("")
                              setInputValue("")
                              advertState.setSearchManufacturer("")
                            //   setRefresh(Math.random()*(317*953))
                              setOpen(false)
                              onClick([], -1)
                          }}
                      >
                          - Select Manufacturer -
                      </li>
                      {
                          data?.map((x: { tb_id: number, name: string }, index: number) => 
                          (
                              <li
                                  key={index}
                                  className={`p-2 text-md bg-gray-100 hover:bg-sky-600 border-1 border-gray-200 hover:border-2 hover:border-green-200 hover:text-white cursor-pointer py-3
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
                                      advertState.setSearchManufacturer(x?.name)
                                      advertState.setSearchModel("")
                                    //   setRefresh(Math.random()*(317*953))  
                                      setOpen(false)     
                                      callData(x?.tb_id)                         
                                  }
                                  }
                              >
                                  <span className="font-bold text-blue-400">{x?.name}</span>
                              </li>
                          ))
                      }
                  </ul>
              </div>
          
    );
  };

export default SearchManufacturer;