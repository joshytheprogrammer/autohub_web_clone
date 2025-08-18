import { useEffect, useMemo, useRef, useState } from "react"
import { BiChevronDown } from "react-icons/bi"
import { UseStore } from "../../../../../state/store"


type SelectOptionTypes = 
{
   selectedCountry: number 
   selectedStateName: string
   states: any
   onChange: (name: string, id: number) => void
}

export const SelectStates = ({ selectedCountry, selectedStateName, states = [], onChange }: SelectOptionTypes) => 
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
       if(selectedCountry === -1 && (states?.length === 0 || states?.states?.length === 0))
       {
         setPlaceHolder("First select a country")
       }
      //  if(selectedStateName != "")
      //  {
      //    setSearch(selectedStateName)
      //    setHoldData(selectedStateName)
      //  }
      //  setTimeout(() =>
      //  {         
      //    console.log("Here")
      //    console.log(states?.states?.length)
      //    console.log(states?.states)
      //    console.log(states?.length)
      //    console.log(states)
      //    console.log(selectedStateName)
      //    itemRef.current = selectedStateName
      //    setSearch(itemRef.current)
      //    setHoldData(itemRef.current)
      //  }, 100)
    }, [])

    useEffect(() => 
    {
       setTimeout(() => 
      { 
         if(selectedCountry === -1 &&  (states?.states?.length === 0 || states?.length === 0))
         {
            setPlaceHolder("First select a country")
         }
         
         if(selectedCountry != -1 && (states?.states?.length === 0 || states?.length === 0))
         {
            setPlaceHolder("No state")         
         }
         
         if(selectedCountry != -1 && states?.states?.length > 0)
         {
            setPlaceHolder("Select state")         
         }
         
         setSearch("")
         setHoldData("")
      }, 500)       
    }, [states?.states, states?.popular_states, states])

    useEffect(() => 
    {

    }, [open])

    const stateSearch: any  = useMemo(() => 
    {
       const others = states?.states?.filter((x: any) => x?.name.toString().toLocaleLowerCase().indexOf(search.toString().toLowerCase()) !== -1)	

       const popular = states?.popular_states?.filter((x: any) => x?.name.toString().toLocaleLowerCase().indexOf(search.toString().toLowerCase()) !== -1)

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
    }, [states, search])

    const statePopularSearch: any  = useMemo(() => 
    {
       const OPTIONS = states?.popular_states?.filter((x: any) => x?.name.toString().toLocaleLowerCase().indexOf(search.toString().toLowerCase()) !== -1)	
       return OPTIONS
    }, [states, search])

   //  useMemo(() => setSearch(value), [value])

    const hasItem = (search: string) => 
    {
       const OPTIONS = states?.states?.filter((x: any) => x?.name.toString().toLocaleLowerCase().indexOf(search.toString().toLowerCase()) !== -1)	
       if(OPTIONS?.length > 0)
       {
         //  itemRef.current.style.backgroundColor = 'lightblue';
          setIsSelected(true)
       } else {
          setIsSelected(false)
       }
    }

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
               {/* {opt.length} */}
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
                     disabled={selectedCountry === -1 ? true : false}
                     onChange={
                        (e: any) => {
                           let selected: string = e.target.value
                           if(selected === "")
                           {
                              setHoldData("")
                           }
                           setSearch(selected)  
                       }
                     }
                     onClick={
                       (e: any) => {
                          let selected: string = e.target.value
                          setSearch("")
                          hasItem(selected)
                          setChangeView(Math.random()*31515)
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
                     {  search?.length === 0 && selectedCountry != -1 && (states?.states?.length != 0 || states?.popular_states?.length != 0) &&                    
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
                           Select State
                        </li>
                     }
                     {  search?.length === 0 && selectedCountry != -1 && states?.popular_states?.length > 0 &&               
                        <li 
                           className={`${isOpen} bg-gray-300 text-gray-400 font-bold`}
                        >
                           Popular States
                        </li>
                     }
                     {
                        states?.popular_states?.length > 0 && search?.length === 0 && selectedCountry != -1 && states?.popular_states?.map((state: { id: number, name: string }, index: number) => 
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
                                       state?.name?.toLowerCase() === holdData?.toLowerCase() &&
                                       "bg-green-600 text-white"
                                    }
                                 `}
                                 onClick={
                                    () => {
                                       onChange(state?.name, state?.id)
                                       setOpen(false)
                                       setSearch(state?.name)
                                       setHoldData(state?.name)                     
                                       hasItem(state?.name)
                                    }
                                 }
                                 onFocus={
                                    () => {
                                       setOpen(true)
                                       setSearch("")
                                    }
                                 }
                              >
                                 {state?.name}
                              </li>
                              )
                        })
                     }
                     {  search?.length === 0 && selectedCountry != -1 && states?.popular_states?.length > 0 &&                     
                        <li 
                           className={`${isOpen} bg-gray-300 text-gray-400 font-bold`}
                        >
                           Other States
                        </li>
                     }
                     {
                        states?.states?.length > 0 && search?.length === 0 && selectedCountry != -1 && states?.states?.map((state: { id: number, name: string }, index: number) => 
                        {
                           return (
                              <li 
                                 // key={index} ref={el => itemRef.current[state?.id] = el}
                                 key={index} ref={itemRef}
                                 className={
                                    `w-full hover:bg-blue-600 hover:border-2 hover:border-green-200 
                                    hover:text-white cursor-pointer focus:border-indigo-200 
                                    text-base outline-gray-200 text-gray-700 leading-8 transition-colors 
                                    duration-200 ease-in-out overflow-auto ${isOpen}
                                    ${
                                       state?.name?.toLowerCase() === holdData?.toLowerCase() &&
                                       "bg-green-600 text-white"
                                    }
                                 `}
                                 onClick={
                                    () => {
                                       onChange(state?.name, state?.id)
                                       setOpen(false)
                                       setSearch(state?.name)
                                       setHoldData(state?.name)                     
                                       hasItem(state?.name)
                                    }
                                 }
                                 onFocus={
                                    () => {
                                       setOpen(true)
                                       setSearch("")
                                    }
                                 }
                              >
                                 {state?.name}
                              </li>
                              )
                        })
                     }

                     {
                        stateSearch?.length > 0 && search?.length > 0 && selectedCountry != -1 && stateSearch?.map((state: { id: number, name: string }, index: number) => 
                        {
                           return (
                              <li 
                                 // key={index} ref={el => itemRef.current[state?.id] = el}
                                 key={index} ref={itemRef}
                                 className={
                                    `w-full hover:bg-blue-600 hover:border-2 hover:border-green-200 
                                    hover:text-white cursor-pointer focus:border-indigo-200 
                                    text-base outline-gray-200 text-gray-700 leading-8 transition-colors 
                                    duration-200 ease-in-out overflow-auto ${isOpen}
                                    ${
                                       state?.name?.toLowerCase() === holdData?.toLowerCase() &&
                                       "bg-green-600 text-white"
                                    }
                                 `}
                                 onClick={
                                    () => {
                                       onChange(state?.name, state?.id)
                                       setOpen(false)
                                       setSearch(state?.name)
                                       setHoldData(state?.name)                     
                                       hasItem(state?.name)
                                    }
                                 }
                                 onFocus={
                                    () => {
                                       setOpen(true)
                                       setSearch("")
                                    }
                                 }
                              >
                                 {state?.name}
                              </li>
                              )
                        })
                     }

                     {
                        stateSearch?.length === 0 && selectedCountry != -1 && (states?.states?.length != 0 || states?.popular_states?.length != 0) && <div 
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