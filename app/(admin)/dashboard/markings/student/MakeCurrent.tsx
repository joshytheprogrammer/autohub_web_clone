import { useState } from "react"
import { Modal } from "../../../../../components/modal/Modal"
import { BeatLoader } from "react-spinners"


type MakeCurrentProps = 
{
   makeCurrent: boolean,
   onClick: () => void
   token: string
   student: { id: number, user_id: number, firstname: string, surname: string }
}


export const MakeCurrent = ({onClick, makeCurrent, student}: MakeCurrentProps)  =>
{
  //  const [testId, setTestId] = useState<number>(student?.id)
  //  const [testName, setTestName] = useState<string>(student?.firstname)
   const [loading, setIsLoading] = useState<boolean>(false)

   const setTheSelection = () => 
   {   
      setIsLoading(true) 
   }

   return (
        <Modal 
            onClick={onClick} 
            isOpen={makeCurrent} 
            wrapperWidth={800} 
            margin={'80px auto 0px auto'}
        >        
          <div 
            className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll d-flex justify-center item-center'
          >
             <h1 
               className='flex w-full justify-center items-center font-bold text-lg mb-10 mx-auto'
             >
                Set Current Test For <span className='text-red-500 ml-2 font-bold'>{student?.firstname}</span>
             </h1>
                                
            <div 
              className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-2 mt-5"
            >
              <button  
                className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                onClick={
                  () => {
                    onClick()
                  }
                }
              >
                Close
              </button>
              <button
                disabled={loading}
                className="mt-2 py-3 px-4 bg-brandGreen text-white font-semibold text-sm rounded-xl w-max"
                onClick={
                   () => {
                       setTheSelection()
                   }
                }
              >
                {  loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Make Current" )     }
              </button>
            </div>
          </div>
       </Modal>  
    );
}
