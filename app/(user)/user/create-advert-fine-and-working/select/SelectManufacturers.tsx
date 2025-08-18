import { useEffect, useMemo, useRef, useState } from "react"
import { BiChevronDown } from "react-icons/bi"
import { UseStore } from "../../../../../state/store"


type SelectOptionTypes = 
{
   selectedManufacturer: number
   selectedManufacturerName: string
   manufacturers: any
   onChange: (x: string, id: number) => void
}

export const SelectManufacturers = ({ selectedManufacturer, selectedManufacturerName, manufacturers = [], onChange }: SelectOptionTypes) => 
{
    const advertState = UseStore((state) => state)
    const [search, setSearch] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)
    const [id] = useState<number>(Math.random()*31)
    const [placeHolder, setPlaceHolder] = useState<string>("")
    const [holdData, setHoldData] = useState<string>("")
    const [isSelected, setIsSelected]= useState<boolean>(false)
    const [changeView, setChangeView]= useState<any>(-1)

    const itemRef = useRef<any>(0);

    useEffect(() => 
    {
        if (isSelected && itemRef.current) 
        {
         //   itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
         //   itemRef.current.style.backgroundColor = 'lightblue';
        }
    }, [isSelected, changeView]);

    let isOpen: string = open ? 'max-h-160 border py-2 px-3  p-5' : 'max-h-0 border-0'

    useEffect(() => 
    {
       if(selectedManufacturer === -1 && (manufacturers?.length === 0 || manufacturers?.manufacturers?.length === 0))
       {
         setPlaceHolder("First select a country")
       }
      //  setTimeout(() =>
      //  {         
      //    setSearch(selectedManufacturerName)
      //    setHoldData(selectedManufacturerName)
      //  }, 100)
    }, [])

    useEffect(() => 
    {
       if(selectedManufacturer === -1)
       {
          setPlaceHolder("Select Manufacturer")
       } else {
           setSearch(advertState.getManufacturerName())
           setHoldData(advertState.getManufacturerName())
       }
    }, [selectedManufacturer])

    useEffect(() => 
    {

    }, [open])

    const manufacturerSearch: any  = useMemo(() => 
    {
       const others = manufacturers?.manufacturers?.filter((x: any) => x?.name.toString().toLocaleLowerCase().indexOf(search.toString().toLowerCase()) !== -1)	

       const popular = manufacturers?.popular_manufacturers?.filter((x: any) => x?.name.toString().toLocaleLowerCase().indexOf(search.toString().toLowerCase()) !== -1)

       if(others?.length > 0)
       {
          if(popular?.length === 0)
          {
            return others
          }
          if(popular?.length > 0)
          {
             Object.assign(others, popular)
             return others
          }
       } else 
         if(others?.length === 0) 
         {
            if(popular?.length === 0)
            {
               return others
            }
            if(popular?.length > 0)
            {
               return popular
            }
       }
    }, [manufacturers, search])
    
    //  useMemo(() => setSearch(value), [value])

    return (
         <>
            <div 
               id={`Select ${id}`} className="border border-3 shadow-md relative w-full md:mb-0 mb-3"
               onMouseLeave={
                  () => {
                     setOpen(false)
                     setSearch(holdData)
                  }
               }
            >
               <div
                  onClick={
                     () => {
                        setOpen(!open)
                     } 
                  }
                  className={`bg-white w-full h-[50px] pr-3 flex items-center justify-between rounded border border-gray-300`}
               >
                  <input 
                     value={search}
                     className="w-full py-2 px-3 mr-3 bg-opacity-75 focus:border-indigo-200 focus:bg-white focus:ring-2 focus:ring-indigo-100 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                     type="text" name="typeSearch" id="typeSearch" placeholder={placeHolder} 
                     autoComplete="false"
                     onChange={
                        (e: any) => {
                           let selected: string = e.target.value
                           if(selected === "")
                           {
                              setHoldData("")
                           }
                           setSearch(selected)
                           setHoldData(selected)  
                       }
                     }
                     onClick={
                       (e: any) => {
                          let selected: string = e.target.value
                          setSearch("")
                        //   hasItem(selected)
                        //   setChangeView(Math.random()*31515)
                       }
                     }
                  />
                     <BiChevronDown 
                        size={20} 
                        className={`${open && "rotate-180"}`} 
                        onClick={() => {
                           setOpen(!open)
                         }
                        } 
                     />
                  </div> 
                  <ul
                     className={`bg-gray-100 -mt-2 absolute w-full overflow-y-auto drop-shadow-xl scrollbar-thin max-h-fit h-[500px] scrollbar-thumb-indigo-300 scrollbar-track-green-200 dark:bg-gray-800 dark:border-gray-700 ${
                     open ? "max-h-120 z-40" : "max-h-0 z-40"
                     } `}
                     onMouseLeave={
                        () => {
                          setOpen(false)
                        }
                     }
                  >
                     {  search?.length === 0 && (manufacturers?.manufacturers?.length != 0 || manufacturers?.popular_manufacturers?.length != 0) &&                    
                        <li 
                           className={`${isOpen} text-gray-700 cursor-pointer hover:bg-blue-600 hover:border-2 hover:border-green-200 hover:text-white font-bold`}
                           onClick={
                              () => {
                                 setIsSelected(false)
                                 setSearch("")
                                 setHoldData("")
                                 onChange("", -1)
                                 setOpen(false)
                              }
                           }
                        >
                           Select Manufacturers
                        </li>
                     }
                     {  search?.length === 0 && manufacturers?.popular_manufacturers?.length > 0 &&               
                        <li 
                           className={`${isOpen} bg-gray-300 text-gray-400 font-bold`}
                        >
                           Popular Manufacturers
                        </li>
                     }
                     {
                        manufacturers?.popular_manufacturers?.length > 0 && search?.length === 0 && manufacturers?.popular_manufacturers?.map((manufacturer: { id: number, name: string }, index: number) => 
                        {
                           return (
                              <li 
                                 key={index} ref={itemRef}
                                 className={
                                    `w-full hover:bg-blue-600 hover:border-2 hover:border-green-200 
                                    hover:text-white cursor-pointer focus:border-indigo-200 
                                    text-base outline-gray-200 text-gray-700 leading-8 transition-colors 
                                    duration-200 ease-in-out overflow-auto ${isOpen}
                                    ${
                                       manufacturer?.name?.toLowerCase() === holdData?.toLowerCase() &&
                                       "bg-green-600 text-white"
                                    }
                                 `}
                                 onClick={
                                    () => {
                                       onChange(manufacturer?.name, manufacturer?.id)
                                       setOpen(false)
                                       setSearch(manufacturer?.name)
                                       setHoldData(manufacturer?.name)  
                                    }
                                 }
                                 onFocus={
                                    () => {
                                       setOpen(true)
                                       setSearch("")
                                    }
                                 }
                              >
                                 {manufacturer?.name}
                              </li>
                              )
                        })
                     }
                     {  search?.length === 0 && manufacturers?.popular_manufacturers?.length > 0 &&                     
                        <li 
                           className={`${isOpen} bg-gray-300 text-gray-400 font-bold`}
                        >
                           Other Manufacturers
                        </li>
                     }
                     {
                        manufacturers?.manufacturers?.length > 0 && search?.length === 0 && manufacturers?.manufacturers?.map((manufacturer: { id: number, name: string }, index: number) => 
                        {
                           return (
                              <li 
                                 // key={index} ref={el => itemRef.current[manufacturer?.id] = el}
                                 key={index} ref={itemRef}
                                 className={
                                    `w-full hover:bg-blue-600 hover:border-2 hover:border-green-200 
                                    hover:text-white cursor-pointer focus:border-indigo-200 
                                    text-base outline-gray-200 text-gray-700 leading-8 transition-colors 
                                    duration-200 ease-in-out overflow-auto ${isOpen}
                                    ${
                                       manufacturer?.name?.toLowerCase() === holdData?.toLowerCase() &&
                                       "bg-green-600 text-white"
                                    }
                                 `}
                                 onClick={
                                    () => {
                                       onChange(manufacturer?.name, manufacturer?.id)
                                       setOpen(false)
                                       setSearch(manufacturer?.name)
                                       setHoldData(manufacturer?.name)
                                    }
                                 }
                                 onFocus={
                                    () => {
                                       setOpen(true)
                                       setSearch("")
                                    }
                                 }
                              >
                                 {manufacturer?.name}
                              </li>
                              )
                        })
                     }
                     {/* {manufacturerSearch?.length > 0 && search?.length > 0 && <>Fine and Great</>} */}
                     {
                        manufacturerSearch?.length > 0 && search?.length > 0 && manufacturerSearch?.map((manufacturer: { id: number, name: string }, index: number) => 
                        {
                           return (
                              <li 
                                 // key={index} ref={el => itemRef.current[manufacturer?.id] = el}
                                 key={index} ref={itemRef}
                                 className={
                                    `w-full hover:bg-blue-600 hover:border-2 hover:border-green-200 
                                    hover:text-white cursor-pointer focus:border-indigo-200 
                                    text-base outline-gray-200 text-gray-700 leading-8 transition-colors 
                                    duration-200 ease-in-out overflow-auto ${isOpen}
                                    ${
                                       manufacturer?.name?.toLowerCase() === holdData?.toLowerCase() &&
                                       "bg-green-600 text-white"
                                    }
                                 `}
                                 onClick={
                                    () => {
                                       onChange(manufacturer?.name, manufacturer?.id)
                                       setOpen(false)
                                       setSearch(manufacturer?.name)
                                       setHoldData(manufacturer?.name)
                                    }
                                 }
                                 onFocus={
                                    () => {
                                       setOpen(true)
                                       setSearch("")
                                    }
                                 }
                              >
                                 {manufacturer?.name}
                              </li>
                              )
                        })
                     }

                     {
                        manufacturerSearch?.length === 0 && selectedManufacturer != -1 && (manufacturers?.manufacturers?.length != 0 || manufacturers?.popular_manufacturers?.length != 0) && <div 
                           className={`w-full hover:bg-blue-600 hover:border-2 p-3 hover:border-green-200 hover:text-white cursor-pointer bg-opacity-75 focus:border-indigo-200 text-base outline-gray-200 text-gray-700 leading-8 transition-colors duration-200 ease-in-out overflow-auto`}
                           onClick={
                              () => {
                                 onChange("", -1)
                                 setOpen(false)
                                 setIsSelected(false)
                              }
                        }
                        >
                           No Match Found
                        </div>
                     }
                  </ul>
            </div>
            
         </>
   )

}