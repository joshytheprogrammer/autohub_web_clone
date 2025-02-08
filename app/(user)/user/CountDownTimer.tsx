import { useEffect, useRef, useState } from "react"
import { UseStore } from "../../../state/store";
import { useRouter } from "next/navigation";


const formatTime = (time: number) => 
{
   let minutes: number | string = Math.floor(time / 60)
   let seconds: number | string = Math.floor(time - minutes * 60)
     
   if(minutes <=10) minutes = '0' + minutes;
   if(seconds <=10) seconds = '0' + seconds;
 
   return minutes + ': ' + seconds
}

export default function CountDownTimer({ message, seconds }: { message: string, seconds: number }) 
{
  const router = useRouter()
  const SubmiteState = UseStore((state) => state)
  const [countdown, setCountDown] = useState<number>(seconds)
  const [theTime, setTheTime] = useState<number>(0)
  const timerId = useRef<any>()    

  // SubmiteState.setForce("yes")   

  useEffect(() => 
  {
      timerId.current = setInterval(() => 
      {
          setCountDown(prev => prev -1)
      }, 1000)
      return () => clearInterval(timerId.current)
  }, [])

  useEffect(() => 
  {
    if(countdown <= 0)
    {
       clearInterval(timerId.current)
       SubmiteState.setForce('yes')
       router.push(`/user/force-submit`)
    }
  }, [countdown])

  const runningOut = (countdown < 300) ? 'bg-red-700' : 'bg-green-700'

  return (
      <div 
          className="w-full flex jsutify-center items-center center"
      >
          <h1 
            className={`font-bold md:text-lg text-sm text-white px-5 py-2 w-fit rounded-full ${runningOut}`}
          > 
            { formatTime(countdown) }
          </h1>
          { 
            (countdown < 300) && 
              <span 
                 className="text-red-600 font-bold md:text-md text-md px-3"
              >
                 {message}
              </span> 
          }
      </div>
  )
}

