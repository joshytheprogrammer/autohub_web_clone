import React, { useEffect, useState } from 'react'
import { USAGE_PATH } from '../constant/Path'
import { PuffLoader, ScaleLoader } from 'react-spinners'
import { Comments, ProductCommentProps, ProductComments } from '../app/api/home/market/advert/Comments'
import Message from './shared/Message'
import { useQuery } from '@tanstack/react-query'
import { UseStore } from '../state/store'


type PrdoductCommentProps = 
{
    productId: string
    vendorId: string 
}


export default function ProductComment({ productId, vendorId }: PrdoductCommentProps) 
{
  const userToken = UseStore((state) => state)
  const token: string = userToken.getUserToken()
  const userType: string = userToken.getUType()

  const { data, isLoading: isLoadingComment, refetch } = useQuery({ queryKey: [`product-comment-${productId}`, productId], queryFn: () => ProductComments(Number(productId)), refetchOnWindowFocus: true })
  
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [comment, setComment] = useState<string>('')

  const [errMsgStyle, setErrMsgStyle] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>("")

  const [successMsgStyle, setSuccessMsgStyle] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>("")

      
  useEffect(() => 
  {
     setErrMsgStyle('text-md text-red-600 font-bold')
     setErrorMessage("")
     setSuccessMsgStyle('text-md text-green-600 font-bold bg-green-600 text-whiet')
     setSuccessMessage("")
     console.log({ errMsgStyle })
  }, [])  
  
  useEffect(() => 
  {
    
  }, [comment])    

  const SendMessage = async () => 
  {
      const data: ProductCommentProps = 
      {
        product_id: productId,
        vendor_id: vendorId,
        comments: comment
      }

      if(!comment)
      {
          setErrorMessage('Enter Comment')
          setIsLoading(false)
          setTimeout(() => {
            setErrorMessage("")
          }, 5000)
      } else {
          const postComment = Comments(data, token, userType)
          postComment.then((response) => 
          {
              if(response?.status === 200)
              {
                setSuccessMsgStyle("Successfully posted")
                setSuccessMessage("Comment successfully posted")
                setIsLoading(false)
                setComment("")
                refetch()
                setTimeout(
                  () => 
                  {
                    setSuccessMessage("")
                  }, 5000)
              }
    
          }).catch(() => {
              setIsLoading(false)
          })
      }
  }
      
  const SubmitData = (event: any) => 
  {
        event.preventDefault();
        SendMessage()
  }

  return (
        <>
            <div 
                className="px-1 py-3 flex justify-between items-center"
            >
                <span className="text-xl text-blue-700">Leave A Comment</span>
                <span 
                      className="text-blue-500 text-sm flex justify-center items-center"
                >
                    <p className="text-black font-semibold mr-3">Comments: </p><p className='font-bold text-lg'>{data?.length}</p>
                </span>
            </div>
                              
            <div  
                className='w-full d-flex gap-10 md:mb-3'
            >
              <form
                  onSubmit={SubmitData}
              >                                          
                <div 
                    className="mb-4 md:w-full"
                >
                  { errorMessage && <Message msg={errorMessage} status={'bg-red-600 p-3 rounded-lg text-white mb-2'} /> }
                  { successMessage && <Message msg={successMsgStyle} status={'bg-green-600 p-3 rounded-lg text-white mb-2'} /> }
                  {
                    !token &&<div 
                          className="flex h-[30px] justify-center items-center pt-10 pb-20"
                      >
                          <div 
                              className='d-flex justify-center items-center'
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                            </svg>
                          </div>
                          <p className='text-red-600 text-lg font-bold'>Login to comment</p>
                      </div>
                  }
                  {/* { token &&
                    <textarea  
                        id='CommentOnProduct'
                        defaultValue={comment}
                        className="inside w-full border rounded-md p-3 bg-white bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                        placeholder="Enter Message." 
                        rows={2}
                        onChange={(e) => 
                        {
                          setComment(e.target.value)
                        }}
                        value={comment}
                    >
                    </textarea>
                  } */}
                  { token &&
                    <input  
                        id='CommentOnProduct'
                        defaultValue={comment}
                        className="inside w-full border rounded-md p-3 bg-white bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                        placeholder="Enter Message." 
                        onChange={(e) => 
                        {
                          setComment(e.target.value)
                        }}
                        value={comment}
                    />
                  }
                </div>
                <div 
                    className="p-4 bg-green-500 hover:bg-green-700 hover:text-white rounded-lg flex justify-center items-center cursor-pointer"
                    onClick={SendMessage}
                >
                    { isLoading ? <ScaleLoader height={22} color="white" className='font-bold' /> : "Post Comment"}
                </div>
              </form>
            </div>
                              
            <div 
                className="font-bold text-md mt-7 d-flex justify-between items-centerp-3 rounded-lg"
            >
              {
                isLoadingComment  &&  <div 
                                className="flex md:d-flex xl:flex-row h-[30px] justify-center items-center"
                            >
                                { isLoadingComment && <PuffLoader className='w-12 h-12' color="white" /> }
                            </div>
              }
              {/* {
                  isLoadingComment  &&  <div 
                                  className="flex md:d-flex xl:flex-row h-[30px] justify-center items-center"
                              >
                                  { isLoadingComment && <PuffLoader className='w-12 h-12' color="white" /> }
                              </div>
              } */}
              {
                  !isLoadingComment && (data.length === 0) &&  <div 
                                  className="flex h-[30px] justify-center items-center pt-10 pb-20"
                              >
                                  <div 
                                      className='d-flex justify-center items-center'
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                    </svg>
                                  </div>
                                  <p className=''>Be the first to leave a comment</p>
                              </div>
              }
              {   
                !isLoadingComment && 
                 (data as any)?.map((comments: any, index: number) => 
                 {
                    return (
                      <div 
                        key={index} className='border-2 border-gray-200 p-3 mb-1 bg-[#fbfbfb] rounded-lg'
                      >
                        <div 
                            className="flex gap-2 justify-between items-center"
                        >
                          <div 
                              className="flex justify-center items-center gap-3"
                          >                                        
                              <img src={`${USAGE_PATH.AVATAR}${comments?.passport}`} className="rounded-full" width={50} height={50} />
                              <span className='font-semibold text-[12px] md:text-[16px]'>{comments?.firstname} {comments?.surname}</span>
                          </div>
                          <div 
                              className="text-green-600 text-[12px] md:text-[14px]"
                          >
                            {comments?.created_at} 
                          </div>
                        </div>
                        <div 
                            className="text-[14px] md:text-[16px] mt-3 text-blue-500"
                        >
                            { comments?.comments }
                        </div>
                      </div>
                    )
                 })
              }
            </div>
        </>
  )
}
