import { useEffect, useMemo, useState } from "react"
import { BiChevronDown } from "react-icons/bi"


type SelectOptionTypes = 
{
    options: string[]
    value: string
    onChange: (x: string) => void
}

export const Select = ({ options, value, onChange }: SelectOptionTypes) => 
{

    const [search, setSearch] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)
    const [id] = useState<number>(Math.random()*31)
    const [placeHolder, setPlaceHolder] = useState<string>("")

    let isOpen: string = open ? 'max-h-40 border py-2 px-3  p-5' : 'max-h-0 border-0'

    useEffect(() => 
    {
       setPlaceHolder("search ...")
    }, [])


    const opt: any  = useMemo(() => 
    {
       // const OPTIONS = options.filter((x: any) => x.toString().toLocaleLowerCase() !== -1)
       const OPTIONS = options.filter((x: any) => x.toString().toLocaleLowerCase().indexOf(search.toString().toLowerCase()) !== -1)				
       return OPTIONS

    }, [options, search])

    useMemo(() => setSearch(value), [value])

    return (
         <div 
             id={`Select ${id}`} className="relative border border-2 box-shadow flex flex-col items-center justify-center"
         >
        {/* {opt.length} */}
           <div
             onClick={() => setOpen(!open)}
             className={`bg-white w-full h-[50px] pr-3 flex items-center justify-between rounded border border-gray-300`}
            >
               {/* {'Great'} */}
               <input 
                 value={search}
                 className="w-full py-2 px-3 mr-3 bg-opacity-75 focus:border-indigo-200 focus:bg-white focus:ring-2 focus:ring-indigo-100 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                 type="text" name="typeSearch" id="typeSearch" placeholder={placeHolder} 
                 onChange={(e: any) => 
                 {
                    let selected: string = e.target.value
                    setSearch(selected)
                 }}
               />
               <BiChevronDown 
                    size={20} 
                    className={`${open && "rotate-180"}`} 
                    onClick={() => {
                       setOpen(!open)
                    }} 
               />
            </div> 

            <div 
               id="options"
               className={`w-full bg-gray-50 focus:border-indigo-200 text-base outline-gray-200 text-gray-700 leading-8 transition-colors duration-200 ease-in-out overflow-auto ${isOpen}`}
            >
               {
                  opt.length > 0 && opt.map((changeOption: any, index: number) => 
                      {
                         return (
                           <div 
                            key={index}
                            className="w-full cursor-pointer mb-1 px-4 py-3 border-b border-200 border-blue-200 hover:bg-green-400"
                            onClick={
                              () => {
                                 onChange(changeOption)
                                 setOpen(false)
                                 setSearch(changeOption)
                              }
                            }
                            onFocus={
                              () => {
                                 setOpen(true)
                                 setSearch("")
                              }
                            }
                         >
                           {changeOption}
                         </div>
                         )
                      })
               }
               {
                  (opt.length === 0) && <div 
                      className="w-full bg-opacity-75 focus:border-indigo-200 text-base outline-gray-200 text-gray-700 leading-8 transition-colors duration-200 ease-in-out"
                      onClick={
                        () => {
                            onChange("")
                            setOpen(false)
                        }
                    }
                   >
                     No Match Found
                   </div>
               }
               
            </div>

         </div>
   )

}