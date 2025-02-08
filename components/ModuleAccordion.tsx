import { useEffect, useState } from "react"
import { Icons } from "./shared/Icons"


type ModuleAccordionProp = {
    id: number 
    title: string 
    content: string
}

export default function ModuleAccordion( {id=-1, title='', content }: ModuleAccordionProp) 
{
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [theCss, setCss] = useState<string>('')
    // const [position, setPosition] = useState<number>(-1)
    const removePadding = !isOpen ? 'px-3 py-1' : ''
    const [theSubModule] = useState<any>(content)

    useEffect(() => 
    {
        const openOrNot = (isOpen === true ) ?  "mb-5 mt-2 p-5 rounded-md border border-2" : "mt-2 p-5 rounded-md border border-2"
        setCss(openOrNot)
    }, [isOpen])
    
    return (        
        <div>
            <div 
                className="inline-flex items-center justify-between w-full rounded py-2 px-4 text-xl font-bold bg-green-700 cursor-pointer px-3 py-2" 
                onMouseOver={
                    () => 
                    {
                    //   setPosition(id)
                      setIsOpen(!isOpen)
                    }
                  }
                >
                <span 
                    className="text-white font-bold text-sm"
                >
                    {title}
                </span>
                <div 
                  className="accordion-indicator"
                >
                  { isOpen? <Icons width={3} height={3} iconName={'upArrow'} color="white" /> : <Icons width={3} height={3} iconName={'downArrow'} color="white" /> }
                </div>
            </div>
            <div 
              className={removePadding}
            > 
                {
                    isOpen && <div 
                                className={theCss}
                            >
                        <ul 
                           className="text-black" 
                           style={{ listStylePosition: 'outside' }}
                        >
                           {
                              (theSubModule?.length > 0) && theSubModule?.map((module: { name: string }, index: number) => {
                                 return (
                                            <li 
                                                className="text-lg font-bold" 
                                                key={index} 
                                                style={{ listStylePosition: 'outside' }}
                                            >
                                                {module?.name}
                                            </li>
                                        )
                                   })
                           }
                           {
                              (theSubModule?.length === 0) && 
                                <div 
                                    className="text-md text-black font-bold"
                                >
                                    No Sub Course Listed for <span className="text-blue-700 font-bold">{title}</span>
                                </div>
                           }
                        </ul>
                    </div>
                } 
            </div>
            <span className='py-3 mt-10'></span>
        </div>
    );
}
