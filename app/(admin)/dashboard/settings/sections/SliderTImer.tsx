import delay from 'delay'
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { SlideTimertControlUpdate } from '../../../../api/admin/setting'
import Message from '../../../../../components/shared/Message'
import { settingsDB } from '../../../../model/Product'


export default function SliderTImer({ value, token, onClick }: { value: number, token: string, onClick: () => void }) 
{
    const [timerValue, setTimerValue] = useState<number>(value)
    const [loading, setIsLoading] = useState<boolean>(false)
    
    const [successMsgStyle, setSuccessMsgStyle] = useState<string>('')
    const [successMessage, setSuccessMessage] = useState<string>("")
    const [errMsgStyle, setErrMsgStyle] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>("")
        
    useEffect(() => 
    {
       setErrMsgStyle('text-md text-red-600 font-bold rounded-lg py-3 px-2')
       setSuccessMsgStyle('text-md text-white bg-green-600 mb-2 font-bold rounded-lg py-3 px-2')
    }, []) 
        
    useEffect(() => 
    {
               
    }, [timerValue])
    
    const SaveTimer = () => 
    { 
       setIsLoading(true)
       if(timerValue === 0)
       {
          setErrorMessage("Timer cannot be zero")
          setIsLoading(false)
          return false
       }
       const saveThePost = SlideTimertControlUpdate(timerValue, token)
       saveThePost.then(async (response) => 
       {
         if(response?.status === 200)
         {
           settingsDB.clear()
           settingsDB.add(response?.data)
           setSuccessMessage(response?.message)
      //      let stngs: any = await settingsDB.get(1);
      //      console.log(stngs)
      //      console.log(stngs?.timer)
      //      console.log(stngs['timer'])
           onClick()
           //  toast.success(response?.message, {
           //    position: "top-center",
           //  })
           setIsLoading(false)
           setTimeout(() => 
           {
             setSuccessMessage("")
           }, 5000)
         } else {
            setErrorMessage("Action Failed")
            setIsLoading(false)
         }
      }).then(() => {
         setIsLoading(false)
      })
    }
    
    return (        
        <>            
            <div 
               className="w-full md:w-1/2 rounded-lg mb-5 md:mb-5"
            >
              <h1 className='font-bold text-gray-500'>Change slider timing</h1>
              <span className='text-red-600 font-bold'>Take note that 1000 equal 1s</span>
              { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
              { successMessage && <Message msg={successMessage} status={successMsgStyle} />  }
              
              <input  
                  defaultValue={timerValue}
                  className="w-full border rounded-md p-3 bg-opacity-75 mb-3 rounded border border-blue-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                  type="text" name="timer_value" id="timer_value" placeholder="Enter timing value for slider"
                  onChange={
                        (e: any) => {
                           setTimerValue(Number(e.target.value))
                        }
                  } 
              />                        
                 <button 
                    className="px-5 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                    onClick={() => SaveTimer()}
                >
                   { loading ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Save" ) } 
               </button> 
            </div>
        </>
    )
}
