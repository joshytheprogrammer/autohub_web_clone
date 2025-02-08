
import { useQuery } from "@tanstack/react-query";
import { Modal } from "../../../../../components/modal/Modal";
import { AllSelectedAdvertComment, CommentModeration, ControlComment } from "../../../../api/admin/market/adverts";
import { PuffLoader, ScaleLoader } from "react-spinners";
import { useState } from "react";
import toast from "react-hot-toast";


type AdvertProductModalProps = 
{
    children?: React.ReactNode,
    closeCommentDialog: boolean,
    onClick: (isOpen: boolean) => void,
    productId: number
    token: string
}


export const AdvertComments = ({ onClick, closeCommentDialog, productId, token }: AdvertProductModalProps)  =>
{
        const { data, isLoading, refetch, isRefetching } = useQuery({ queryKey: [`advert-comments`, productId, token], queryFn: () => AllSelectedAdvertComment(productId, token), retryOnMount: true })
        
        const [controlling, setControlling] = useState<boolean>(false)
        

        const control = (option: string, commentId: number) =>
        {
             const CommentControl = ControlComment(productId, option, commentId, token)
             CommentControl.then((response) => 
             {                
                if(response?.status === 200)
                {      
                   refetch() 
                   setControlling(false)
                   toast.success(response?.data, {
                          position: "top-center",
                   });
                } else {
                   toast.error(response?.data, {
                          position: "top-center",
                  });
                }
             }).then(() => {
                
             })
        }

        const moderate = (option: string, commentId: number) =>
        {
             const ModerateControl = CommentModeration(productId, option, commentId, token)
             ModerateControl.then((response) => 
             {                
                if(response?.status === 200)
                {      
                   refetch() 
                   setControlling(false)
                   toast.success(response?.data, {
                          position: "top-center",
                   });
                } else {
                   toast.error(response?.data, {
                          position: "top-center",
                  });
                }
             }).then(() => {
                
             })
        }

        
        return (
                <>
                        <Modal 
                                onClick={onClick} 
                                isOpen={closeCommentDialog} wrapperWidth={900} margin={'150px auto 0px auto'} color='green'
                        >
                                {
                                        isLoading && !isRefetching &&  <div 
                                                className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                                        >
                                                <PuffLoader className='w-12 h-12 -mt-20' color="black" />
                                        </div>
                                }
                                {
                                isLoading && isRefetching  &&  <div 
                                                className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                                        >
                                                <PuffLoader className='w-12 h-12 -mt-20' color="black" />
                                        </div>
                                }
                                
                                {  !isLoading && (data?.data?.length === 0) && <>
                                        <div 
                                        className="min-h-[320px] col-span-12 flex justify-center items-center text-brandGreen"
                                        >
                                        <p 
                                                className="text-2xl font-bold text-green-800"
                                        >
                                                No Comment Yet
                                        </p>
                                        </div>
                                </>
                           }
                           {
                              !isLoading && data?.data && <>
                                { (data?.data?.length > 0) &&
                                        <div 
                                           className="w-full flex gap-5 mt-3 justify-between"
                                        >
                                           <span 
                                              className='w-6/12 flex items-center items-center font-bold text-lg mb-2 col-span-10 text-center'
                                           >
                                              All comments on {data?.plus}
                                           </span>
                                           <span 
                                              className='w-6/12flex items-center items-center font-bold text-lg mb-2 col-span-10 text-center'
                                           >
                                              { controlling && <ScaleLoader height={16} color="blue" className='font-bold mr-2' /> }
                                           </span>
                                        </div>
                                }
                                <div 
                                        className='overflow-y-auto xm:overflow-y-scroll justify-center item-center min:h-[40px] max:h-[300px]'
                                >
                                        { 
                                        (data?.data?.length > 0) &&
                                        <div className="mt-5">
                                                {
                                                        data?.data &&
                                                        data?.data?.length > 0 &&
                                                        data?.data?.map((comment: { id: number, enabled: string, status: string, comments: string }, index: number) => {
                                                                return (
                                                                        <div 
                                                                            className="w-full flex jusity-between border-2 border-blue-200 rounded-md p-1 mb-2"
                                                                            key={index}
                                                                        >
                                                                            <div 
                                                                                  className="w-10/12 p-2" 
                                                                            >
                                                                                {comment.comments}
                                                                            </div>
                                                                            {
                                                                                (comment?.status === 'active') && 
                                                                                <div 
                                                                                    className="w-2/12 pt-2 mr-2 text-center items-center bg-green-600 text-white hover:bg-blue-600 font-bold text-sm px-2 rounded-md hover:text-white font-bold cursor-pointer"
                                                                                    onClick={() => {
                                                                                        moderate('reject', comment?.id)
                                                                                    }}
                                                                                >         
                                                                                    {'Reject'}                                                                    
                                                                                </div>
                                                                            }
                                                                            {
                                                                                ((comment?.status === 'pending') || (comment?.status === 'rejected')) && 
                                                                                <div 
                                                                                    className="w-2/12 pt-2 mr-2 text-center text-white items-center bg-red-600 hover:bg-blue-600 font-bold text-sm px-2 rounded-md hover:text-white font-bold cursor-pointer"
                                                                                    onClick={() => {
                                                                                        moderate('active', comment?.id)
                                                                                    }}
                                                                                >         
                                                                                    {'Accept'}                                                                    
                                                                                </div>
                                                                            }
                                                                            
                                                                            {
                                                                                (comment.enabled === 'no') && 
                                                                                <div 
                                                                                    className="w-2/12 pt-2 text-center items-center bg-red-600 text-white hover:bg-blue-600 font-bold text-sm px-2 rounded-md hover:text-white font-bold cursor-pointer"
                                                                                    onClick={() => {
                                                                                        control('yes', comment?.id)
                                                                                    }}
                                                                                >         
                                                                                    {'Enable'}                                                                    
                                                                                </div>
                                                                            }
                                                                            {
                                                                                (comment.enabled === 'yes') && 
                                                                                <div 
                                                                                    className="w-2/12 pt-2 text-center items-center bg-green-600 hover:bg-blue-600 font-bold text-sm px-2 rounded-md hover:text-white font-bold cursor-pointer"
                                                                                    onClick={() => {
                                                                                        control('no', comment?.id)
                                                                                    }}
                                                                                >         
                                                                                    {'Disable'}                                                                    
                                                                                </div>
                                                                            }
                                                                        </div> 
                                                                        )
                                                                })        
                                                }
                                        </div>
                                }
                                </div>
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-left mb-2 mx-5 mt-8 -ml-1">
                                        <button  
                                                className="w-full mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                                onClick={() =>
                                                        onClick(false)
                                                }
                                                >
                                                Close
                                        </button>
                                </div>
                              </>
                           }
                        </Modal>
                </> 
        );
}
