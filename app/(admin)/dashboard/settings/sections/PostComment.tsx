import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { AdvertPostControlUpdate } from '../../../../api/admin/setting'
// import toast from 'react-hot-toast'
import Message from '../../../../../components/shared/Message'


export default function PostComment({ option, token, onClick }: { option: string, token: string, onClick: () => void })
{
    const [loading, setIsLoading] = useState<boolean>(false)
    const Option: string[] = ['allow', 'pend']
    const [postComment, setPostComment] = useState<string>("")

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
            
    }, [postComment])

    const SavePostComment = () => 
    { 
        setIsLoading(true)
        if(postComment === 'none')
        {
           setErrorMessage("Kindly, select option")
           setIsLoading(false)
           return false
        }
        const saveThePost = AdvertPostControlUpdate(postComment, token)
        saveThePost.then((response) => 
        {
           if(response?.status === 200)
           {
              setSuccessMessage(response?.message)
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
              <div 
                  className="w-full md:w-1/2 rounded-lg mb-5 md:mb-5"
                  >
                     <h1 className='font-bold text-gray-500'>Decide whether comment on post should go pending or not</h1>
                     { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                     { successMessage && <Message msg={successMessage} status={successMsgStyle} />  }
                     <div 
                        className="relative"
                     >
                        <select 
                              defaultValue={postComment}
                              className="block appearance-none mb-3 w-full bg-white border border-gray-200 text-gray-700 py-5 px-4 pr-8 text-md rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              onChange={(e: any) => {
                                    // const selected = e.target.value
                                    setErrorMessage("")
                                    setPostComment(e.target.value)
                              }}
                        >
                        { <option value={"none"}> - Select Post Comment Status -  </option> }
                        {
                              Option.map((type:string, index:number) =>  {
                              return (
                                          <option
                                                key={index} 
                                                value={type} 
                                                selected={ type === option ? true : false }
                                          >
                                              {type}
                                          </option>
                                    )
                              })
                        }
                        </select> 
                        <div 
                           className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 -mt-14"
                        >
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>                      
                        <button 
                              className="px-5 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                              onClick={() => SavePostComment()}
                        >
                              { loading ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Save" ) } 
                        </button>
                     </div> 
                  </div>
    )
}
