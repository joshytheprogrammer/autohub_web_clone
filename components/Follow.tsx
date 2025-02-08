"use client"

import { useQuery } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import { FlUnFlow, Followers } from "../app/api/home/market/advert/Comments"
import { ScaleLoader } from "react-spinners"
import delay from "delay"
import { UseStore } from "../state/store"
import { useRouter } from "next/navigation"

type FollowProps =
{
    vendorId: string
    user: string
}

export default function Follow({ vendorId, user }: FollowProps)
{  
    const userState = UseStore((state) => state)
    const token: string = userState.getUserToken() ? userState.getUserToken() : ''
    const userType: string = userState.getUType() ? userState.getUType() : ''
    
    const { data, isLoading: isLoadingComment, refetch } = useQuery({ queryKey: [`user-followers-${vendorId}`, vendorId], queryFn: () => Followers(Number(user), token, userType) })
    
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState("")

    useEffect(() => 
    {
        
    }, [msg])
  
    const follower = async () => 
    {
        setLoading(true)
        await delay(2000)
        if(token != "" && token != undefined && token != null)
        {
            const FollowUnfollow = FlUnFlow(Number(vendorId), token, userType)
            FollowUnfollow.then(() => 
            {
                setLoading(false)
                refetch()
            }).catch(() => {

            })
        } else {
            // setMsg("You have to be logged in to follow")
            setMsg("Login to follow")
            setLoading(false)
            setTimeout(() => {
                setMsg("")
            }, 3000)
          }
    }
    

    return (
        <>
            <div className="flex justify-between mt-3"
            >
              <div 
                 className="flex justify-center items-center space-x-4"
              >
              </div>
              {
                 loading && <ScaleLoader height={16} color="black" className='font-bold' />
              }
              {
                 !loading && 
                 <button 
                       onClick={() => follower() } 
                       className="w-fit h-fit rounded-md p-2 text-white font-bold text-xs mt-1"
                 >
                    { 
                        !isLoadingComment && (data?.plus === 'yes')
                        ? <>
                            {
                                (Number(data?.data) > 0) ? <Flw count={data?.message} /> : <UnFlw count={data?.message} />
                            }
                        </>
                        :
                        'xx'
                    }
                    { !isLoadingComment && (data?.plus === 'no') && <Follower count={data?.message} />}
                 </button>
              }
              { msg && <span className='p-2 bg-red-600 text-white text-red-500 w-full flex justify-center items-center whitespace-nowrap rounded px-3'>{ msg } </span> }
            </div>
        </>
  )

}

const Flw = ({ count = 0 }: { count: number }) =>
{
   return (
        <div 
            className="flex justify-center items-center"
        >
            <span 
                className="p-3 rounded-lg bg-blue-700 w-full hover:bg-blue-400 mr-4"
            >
                Unfollow
            </span>
            <span 
                className="font-bold text-blue-600 text-sm flex justify-center items-center"
            > 
                {(count === 0) && <div className="flex justify-center items-center">No Follower</div>}
                {(count === 1) && <div className="flex justify-center items-center"><span className="mr-1">{count} </span> Follower</div>}
                {(count === 2) && <div className="flex space-x-4"><span className="mr-1">{count} </span>Followers</div>}
            </span>
        </div>
   )
}

const UnFlw = ({ count = 0 }: { count: number }) =>
{
   return (
        <div 
            className="flex justify-center items-center"
        >
            <span 
                className="p-3 rounded-lg bg-green-700 w-full hover:bg-green-400 mr-4"
            >
                Follow
            </span>
            <span 
                className="font-bold text-blue-600 text-sm flex justify-center items-center"
            > 
                {(count === 0) && <div className="flex justify-center items-center">No Follower</div>}
                {(count === 1) && <div className="flex justify-center items-center"><span className="mr-1">{count} </span> Follower</div>}
                {(count === 2) && <div className="flex space-x-4"><span className="mr-1">{count} </span>Followers</div>}
            </span>
        </div>
   )
}

const Follower = ({ count = 0 }: { count: number }) =>
{
   const router = useRouter()

   return (
        <div 
            className="flex justify-center items-center"
        >
            <span 
                className="p-3 rounded-lg bg-green-700 w-full hover:bg-green-400 mr-4"
                onClick={
                    () => {
                        router.push('/login')
                    }
                }
            >
                Loin to Follow
            </span>
            <span 
                className="font-bold text-blue-600 text-sm flex justify-center items-center"
            > 
                {(count === 0) && <div className="flex justify-center items-center">No Follower</div>}
                {(count === 1) && <div className="flex justify-center items-center"><span className="mr-1">{count} </span> Follower</div>}
                {(count > 1) && <div className="flex space-x-4"><span className="mr-1">{count} </span>Followers</div>}
            </span>
        </div>
   )
}