import { useEffect } from "react"

type ContentProps = 
{
    id: string
    content: string
    onClick: (content: string) => void
}


export default function Content({id, content, onClick}: ContentProps) 
{
    useEffect(() => 
    {
        if(content)
        {
            const board: HTMLDivElement = document.querySelector(`#${id}`)!
            board.innerHTML = content         
        }
    }, [])
    const print = () => 
    {
        const board: HTMLDivElement = document.querySelector(`#${id}`)!
        console.log(board?.innerHTML)
        onClick(board?.innerHTML)
    }

    return (
        <div 
            className='w-full px-2 py-1 mx-auto md:mt-2 mt-1'
        >
            <div  
                className="w-full px-1 py-1 mx-auto w-full h-[14vh] overflow-auto border rounded-md p-3 bg-white bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                id={id} 
                contentEditable={true}
                onKeyUp={print}
            >

            </div>             
        </div>
    )

}