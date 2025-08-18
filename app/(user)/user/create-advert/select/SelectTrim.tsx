import { useEffect, useMemo, useRef, useState } from "react"
import { BiChevronDown } from "react-icons/bi"
import { UseStore } from "../../../../../state/store"


type SelectOptionTypes = 
{
   selectedManufacturer: number 
   selectedModel: number
   selectedGeneration: number
   selectedSerie: number
   trims: any
   selectedTrimName: string
   onChange: (name: string, id: number) => void
}

export const SelectTrim = ({ selectedManufacturer, selectedModel, selectedGeneration, selectedSerie, trims = [], selectedTrimName, onChange }: SelectOptionTypes) => 
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
    }, [selectedTrimName]);

    useEffect(() => 
    {
       if((selectedManufacturer === -1 || selectedModel === -1 || selectedGeneration === -1|| selectedSerie === -1) && trims?.length === 0)
       {
         setPlaceHolder("First select serie")
         advertState.setTrimName("") 
       }
       if((selectedManufacturer != -1 || selectedModel != -1 || selectedGeneration != -1|| selectedSerie != -1) && trims?.length === 0)
       {
          setPlaceHolder("No Generation")
       }
       if((selectedManufacturer === -1 || selectedModel === -1 || selectedGeneration === -1|| selectedSerie === -1) && trims?.length > 0)
       {
          setTimeout(() =>
          {  
            if(advertState.getTrimName()  === "")
            {
               setPlaceHolder("First select serie")
               setHoldData("")
               setSearch("")
            } else {          
               if(selectedModel === -1)
               {console.log("YYYeeeeeeeeeeeaaaaah")
                  setPlaceHolder("Select Serie")
                  setHoldData("")
                  setSearch("")
               } else {     
                  console.log("hdhdhdudidodoekeiruru")             
                  setSearch(advertState.getTrimName())
                  setHoldData(advertState.getTrimName()) 
               }
            }
          }, 100)
       }
    }, [])

    useEffect(() => 
    {
       setPlaceHolder("First select a serie")
       setSearch("")
       setHoldData("") 
    }, [selectedManufacturer, selectedModel, selectedGeneration, selectedSerie])

   //  useEffect(() => 
   //  {
   //     setTimeout(() => 
   //    { 
   //       if((selectedManufacturer === -1 || selectedModel === -1 || selectedGeneration === -1 || selectedSerie === -1) &&  (trims?.length === 0 || trims?.length === 0))
   //       {
   //          setPlaceHolder("First select a serie")
   //       }
         
   //       if((selectedManufacturer != -1 || selectedModel != -1 || selectedGeneration != -1 || selectedSerie != -1) && (trims?.length != 0 || trims?.length === 0))
   //       {
   //          setPlaceHolder("No trim")         
   //       }
         
   //       if((selectedManufacturer != -1 || selectedModel != -1 || selectedGeneration != -1 || selectedSerie != -1) && trims?.length > 0)
   //       {
   //          setPlaceHolder("Select trim")         
   //       }
         
   //       setSearch("")
   //       setHoldData("")
   //    }, 500)       
   //  }, [trims])    

    useEffect(() => 
    {
       setTimeout(() => 
      { 
         if((selectedManufacturer === -1 || selectedModel === -1 || selectedGeneration === -1 || selectedSerie === -1) && trims?.length === 0)
         {
            setPlaceHolder("First select generation")             
            setSearch("")
            setHoldData("")      
            advertState.setTrimName("")
            console.log("ccccccccccc")
         }
         
         if((selectedManufacturer != -1 || selectedModel != -1 || selectedGeneration != -1 || selectedSerie != -1) && trims?.length === 0)
         {
            setPlaceHolder("No Trim")         
         }
         
         if((selectedManufacturer != -1 || selectedModel != -1 || selectedGeneration != -1 || selectedSerie != -1) && trims?.length > 0)
         {
            setTimeout(() =>
            {  
               if(advertState.getTrimName()  === "")
               {
                  setPlaceHolder("Select a trim")
                  setHoldData("")
                  setSearch("") 
                  console.log("qqqqqqqqqqsssssssss")
               } else {          
                  setSearch(advertState.getTrimName())
                  setHoldData(advertState.getTrimName()) 
                  console.log("lkjuyhgf")
               }
            }, 100)        
         }
      }, 200)       
    }, [trims])

    useEffect(() => 
    {

    }, [open])

    const trimSearch: any  = useMemo(() => 
    {
       const others = trims?.filter((x: any) => x?.name.toString().toLocaleLowerCase().indexOf(search.toString().toLowerCase()) !== -1)	

       const popular = trims?.filter((x: any) => x?.name.toString().toLocaleLowerCase().indexOf(search.toString().toLowerCase()) !== -1)

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
    }, [trims, search])

    const statePopularSearch: any  = useMemo(() => 
    {
       const OPTIONS = trims?.filter((x: any) => x?.name.toString().toLocaleLowerCase().indexOf(search.toString().toLowerCase()) !== -1)	
       return OPTIONS
    }, [trims, search])

   //  useMemo(() => setSearch(value), [value])

    const hasItem = (search: string) => 
    {
       const OPTIONS = trims?.filter((x: any) => x?.name.toString().toLocaleLowerCase().indexOf(search.toString().toLowerCase()) !== -1)	
       if(OPTIONS.length > 0)
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
                     disabled={(selectedManufacturer === -1 || selectedModel === -1 || selectedGeneration === -1 || selectedSerie === -1) ? true : false}
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
                     {  search?.length === 0 && (selectedManufacturer != -1 || selectedModel != -1 || selectedGeneration != -1 || selectedSerie != -1) && (trims?.length != 0 || trims?.length != 0) &&                    
                        <li 
                           className={`${isOpen} text-gray-700 cursor-pointer hover:bg-blue-600 hover:border-2 hover:border-green-200 hover:text-white font-bold`}
                           onClick={
                              () => {
                                 setIsSelected(false)
                                 setSearch("")
                                 setHoldData("")
                                 onChange("", -1)
                                 advertState.setTrim(-1)
                                 advertState.setTrimName("")
                                 setOpen(false)
                              }
                           }
                        >
                           Select Trim
                        </li>
                     }
                     {/* {  search?.length === 0 && (selectedManufacturer != -1 || selectedModel != -1 || selectedGeneration != -1 || selectedSerie != -1) && trims?.length > 0 &&               
                        <li 
                           className={`${isOpen} bg-gray-300 text-gray-400 font-bold`}
                        >
                           Popular trims
                        </li>
                     } */}
                     {
                        trims?.length > 0 && search?.length === 0 && (selectedManufacturer != -1 || selectedModel != -1 || selectedGeneration != -1 || selectedSerie != -1) && trims?.map((trim: { id: number, name: string }, index: number) => 
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
                                       trim?.name?.toLowerCase() === holdData?.toLowerCase() &&
                                       "bg-green-600 text-white"
                                    }
                                 `}
                                 onClick={
                                    () => {
                                       onChange(trim?.name, trim?.id)
                                       setSearch(trim?.name)
                                       setHoldData(trim?.name)                     
                                       hasItem(trim?.name)
                                       advertState.setTrim(trim?.id)
                                       advertState.setTrimName(trim?.name)
                                       setOpen(false)
                                    }
                                 }
                                 onFocus={
                                    () => {
                                       setOpen(true)
                                       setSearch("")
                                    }
                                 }
                              >
                                 {trim?.name}
                              </li>
                              )
                        })
                     }
                     {/* {  search?.length === 0 && (selectedManufacturer != -1 || selectedModel != -1 || selectedGeneration != -1 || selectedSerie != -1) && trims?.length > 0 &&                     
                        <li 
                           className={`${isOpen} bg-gray-300 text-gray-400 font-bold`}
                        >
                           Other Trims
                        </li>
                     } */}
                     {/* {
                        trims?.length > 0 && search?.length === 0 && (selectedManufacturer != -1 || selectedModel != -1 || selectedGeneration != -1 || selectedSerie != -1) && trims?.map((trim: { id: number, name: string }, index: number) => 
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
                                       trim?.name?.toLowerCase() === holdData?.toLowerCase() &&
                                       "bg-green-600 text-white"
                                    }
                                 `}
                                 onClick={
                                    () => {
                                       onChange(trim?.name, trim?.id)
                                       setOpen(false)
                                       setSearch(trim?.name)
                                       setHoldData(trim?.name)                     
                                       hasItem(trim?.name)
                                    }
                                 }
                                 onFocus={
                                    () => {
                                       setOpen(true)
                                       setSearch("")
                                    }
                                 }
                              >
                                 {trim?.name}
                              </li>
                              )
                        })
                     } */}

                     {
                        trimSearch?.length > 0 && search?.length > 0 && (selectedManufacturer != -1 || selectedModel != -1 || selectedGeneration != -1 || selectedSerie != -1) && trimSearch?.map((trim: { id: number, name: string }, index: number) => 
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
                                       trim?.name?.toLowerCase() === holdData?.toLowerCase() &&
                                       "bg-green-600 text-white"
                                    }
                                 `}
                                 onClick={
                                    () => {
                                       onChange(trim?.name, trim?.id)
                                       setSearch(trim?.name)
                                       setHoldData(trim?.name)                     
                                       hasItem(trim?.name)
                                       advertState.setTrim(trim?.id)
                                       advertState.setTrimName(trim?.name)
                                       setOpen(false)
                                    }
                                 }
                                 onFocus={
                                    () => {
                                       setOpen(true)
                                       setSearch("")
                                    }
                                 }
                              >
                                 {trim?.name}
                              </li>
                              )
                        })
                     }

                     {
                        trimSearch?.length === 0 && (selectedManufacturer != -1 || selectedModel != -1 || selectedGeneration != -1 || selectedSerie != -1) && (trims?.length != 0 || trims?.length != 0) && <div 
                           className={`w-full hover:bg-blue-600 hover:border-2 p-3 hover:border-green-200 hover:text-white cursor-pointer bg-opacity-75 focus:border-indigo-200 text-base outline-gray-200 text-gray-700 leading-8 transition-colors duration-200 ease-in-out overflow-auto`}
                           onClick={
                              () => {
                                 onChange("", -1)
                                 setIsSelected(false)
                                 setOpen(false)
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