import { useEffect, useMemo, useRef, useState } from "react"
import { BiChevronDown } from "react-icons/bi"
import { UseStore } from "../../../../../state/store"


type SelectOptionTypes = 
{
   selectedManufacturer: number 
   selectedModel: number
   generations: any
   selectedGenerationName: string
   onChange: (name: string, id: number) => void
}

export const SelectGenerations = ({ selectedManufacturer, selectedModel, generations = [], selectedGenerationName, onChange }: SelectOptionTypes) => 
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

    useEffect(() => 
    {
    }, [selectedGenerationName]);

    let isOpen: string = open ? 'max-h-160 border py-2 px-3  p-5' : 'max-h-0 border-0'

    useEffect(() => 
    {
       if((selectedManufacturer === -1 || selectedModel === -1) && generations?.length === 0)
       {
         setPlaceHolder("First select a model")
         advertState.setGenerationName("") 
       }
       if((selectedManufacturer != -1 || selectedModel != -1) && generations?.length === 0)
       {
          setPlaceHolder("No Generation")
       }
       if((selectedManufacturer === -1 || selectedModel === -1) && generations?.length > 0)
       {
          setTimeout(() =>
          {  
            if(advertState.getGenerationName()  === "")
            {
               setPlaceHolder("First select a model")
               setHoldData("")
               setSearch("")
            } else {          
               if(selectedModel === -1)
               {console.log("YYYeeeeeeeeeeeaaaaah")
                  setPlaceHolder("Select generation")
                  setHoldData("")
                  setSearch("")
               } else {     
                  console.log("hdhdhdudidodoekeiruru")             
                  setSearch(advertState.getGenerationName())
                  setHoldData(advertState.getGenerationName()) 
               }
            }
          }, 100)
       }
    }, [])
    

    useEffect(() => 
    {
       setPlaceHolder("First select a model")
       setSearch("")
       setHoldData("") 
    }, [selectedManufacturer])

    useEffect(() => 
    {
       setTimeout(() => 
      { 
         if((selectedManufacturer === -1 || selectedModel === -1) && generations?.length === 0)
         {
            setPlaceHolder("First select a model")             
            setSearch("")
            setHoldData("")      
            advertState.setGenerationName("")
            console.log("ccccccccccc")
         }
         
         if((selectedManufacturer != -1 || selectedModel != -1) && generations?.length === 0)
         {
            setPlaceHolder("No model")         
         }
         
         if((selectedManufacturer != -1 || selectedModel != -1) && generations?.length > 0)
         {
            setTimeout(() =>
            {  
               if(advertState.getGenerationName()  === "")
               {
                  setPlaceHolder("Select generation")
                  setHoldData("")
                  setSearch("") 
                  console.log("qqqqqqqqqqsssssssss")
               } else {          
                  setSearch(advertState.getGenerationName())
                  setHoldData(advertState.getGenerationName()) 
                  console.log("lkjuyhgf")
               }
            }, 100)        
         }
      }, 200)       
    }, [generations])

    useEffect(() => 
    {

    }, [open])

    const generationSearch: any  = useMemo(() => 
    {
       const others = generations?.filter((x: any) => x?.name.toString().toLocaleLowerCase().indexOf(search.toString().toLowerCase()) !== -1) 
       if(others?.length > 0)
       {
         return others
       }
    }, [generations, search])

   //  useMemo(() => setSearch(value), [value])

    const hasItem = (search: string) => 
    {
       const OPTIONS = generations?.filter((x: any) => x?.name.toString().toLocaleLowerCase().indexOf(search.toString().toLowerCase()) !== -1)	
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
                     disabled={((selectedManufacturer === -1 || selectedModel === -1) || selectedModel === -1) ? true : false}
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
                     {  search?.length === 0 && (selectedManufacturer != -1 || selectedModel != -1) && generations?.length != 0 &&                    
                        <li 
                           className={`${isOpen} text-gray-700 cursor-pointer hover:bg-blue-600 hover:border-2 hover:border-green-200 hover:text-white font-bold`}
                           onClick={
                              () => {
                                 setIsSelected(false)
                                 setSearch("")
                                 setHoldData("")
                                 onChange("", -1)
                                 advertState.setGeneration(-1)
                                 advertState.setGenerationName("")
                                 advertState.setSeries([])
                                 advertState.setSerie(-1)
                                 advertState.setSerieName("")
                                 advertState.setTrims([])
                                 advertState.setTrim(-1)
                                 advertState.setTrimName("")
                                 setOpen(false)
                              }
                           }
                        >
                           Select Generation
                        </li>
                     }
                     {/* {  search?.length === 0 && (selectedManufacturer != -1 || selectedModel != -1) && generations?.length > 0 &&               
                        <li 
                           className={`${isOpen} bg-gray-300 text-gray-400 font-bold`}
                        >
                           Popular Generation
                        </li>
                     } */}
                     
                     {
                        generations?.length > 0 && search?.length === 0 && (selectedManufacturer != -1 || selectedModel != -1) && generations?.map((generation: { id: number, name: string, year_begin: string, year_end: string }, index: number) => 
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
                                       generation?.name?.toLowerCase() === holdData?.toLowerCase() &&
                                       "bg-green-600 text-white"
                                    }
                                 `}
                                 onClick={
                                    () => {
                                       onChange(generation?.name, generation?.id)
                                       setSearch(`${generation?.name} - (${generation?.year_begin} - ${generation?.year_end})`)
                                       setHoldData(`${generation?.name} - (${generation?.year_begin} - ${generation?.year_end})`)                     
                                       hasItem(generation?.name)
                                       advertState.setGeneration(generation?.id)
                                       advertState.setGenerationName(generation?.name)
                                       advertState.setSeries([])
                                       advertState.setSerie(-1)
                                       advertState.setSerieName("")
                                       advertState.setTrims([])
                                       advertState.setTrim(-1)
                                       advertState.setTrimName("")
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
                                 {generation?.name} - ({generation?.year_begin} - {generation?.year_end})
                              </li>
                              )
                        })
                     }
                     {/* {  search?.length === 0 && (selectedManufacturer === -1 || selectedModel === -1) && generations?.length > 0 &&                     
                        <li 
                           className={`${isOpen} bg-gray-300 text-gray-400 font-bold`}
                        >
                           Other Generation
                        </li>
                     } */}
                     {/* {
                        generations?.length > 0 && search?.length === 0 && (selectedManufacturer === -1 || selectedModel === -1) && generations?.map((generation: { id: number, name: string, year_begin: string, year_end: string }, index: number) => 
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
                                       generation?.name?.toLowerCase() === holdData?.toLowerCase() &&
                                       "bg-green-600 text-white"
                                    }
                                 `}
                                 onClick={
                                    () => {
                                       onChange(generation?.name, generation?.id)
                                       setOpen(false)
                                       setSearch(`${generation?.name} - (${generation?.year_begin} - ${generation?.year_end})`)
                                       setHoldData(`${generation?.name} - (${generation?.year_begin} - ${generation?.year_end})`)                     
                                       hasItem(generation?.name)
                                    }
                                 }
                                 onFocus={
                                    () => {
                                       setOpen(true)
                                       setSearch("")
                                    }
                                 }
                              >
                                 {generation?.name} - ({generation?.year_begin} - {generation?.year_end})
                              </li>
                              )
                        })
                     } */}

                     {
                        generationSearch?.length > 0 && search?.length > 0 && (selectedManufacturer === -1 || selectedModel === -1) && generationSearch?.map((generation: { id: number, name: string, year_begin: string, year_end: string }, index: number) => 
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
                                       generation?.name?.toLowerCase() === holdData?.toLowerCase() &&
                                       "bg-green-600 text-white"
                                    }
                                 `}
                                 onClick={
                                    () => {
                                       onChange(generation?.name, generation?.id)
                                       setSearch(`${generation?.name} - (${generation?.year_begin} - ${generation?.year_end})`)
                                       setHoldData(`${generation?.name} - (${generation?.year_begin} - ${generation?.year_end})`)                     
                                       hasItem(generation?.name)
                                       advertState.setGeneration(generation?.id)
                                       advertState.setGenerationName(generation?.name)
                                       advertState.setSeries([])
                                       advertState.setSerie(-1)
                                       advertState.setSerieName("")
                                       advertState.setTrims([])
                                       advertState.setTrim(-1)
                                       advertState.setTrimName("")
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
                                 {generation?.name} - ({generation?.year_begin} - {generation?.year_end})
                              </li>
                              )
                        })
                     }

                     {
                        generationSearch?.length === 0 && (selectedManufacturer === -1 || selectedModel === -1) && generations?.length != 0 && <div 
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