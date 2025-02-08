import { useEffect, useRef, useState } from "react"
import { UseStore } from "../../../../../state/store";
import { useRouter } from "next/navigation";

const formatTime = (time: number) => 
{
   let minutes: number | string = Math.floor(time / 60)
   let seconds: number | string = Math.floor(time - minutes * 60)
     
   if(minutes <=10) minutes = '0' + minutes;
   if(seconds <=10) seconds = '0' + seconds;
 
   return minutes + ': ' + seconds
}

const DisplayTime = () => {

}

export default function CountDownTimerExam({ seconds, question, message='' }: { seconds: number, question: string, message: string })
{
    const router = useRouter()
    localStorage.setItem("text-exam-objective-thoeory-ques", question)
    // console.log("2 Submissions")
    // console.log(localStorage.getItem("text-exam-objective-thoeory-ques"))

    const advertState = UseStore((state) => state)
    const [countdown, setCountDown] = useState(seconds)
    const [theTime, setTheTime] = useState(0)
    const timerId = useRef<any>()

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
        console.log("Will get you submitted")
        advertState.setForceExamObj('yes')
        router.push('/user/force-exam-submit')
      }
    }, [countdown])

    const runningOut = (countdown < 300) ? 'bg-red-700' : 'bg-green-700'

    return (
        <div 
            className=""
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

