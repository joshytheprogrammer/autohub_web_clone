import React, { useEffect, useState } from 'react';
import { Modal } from '../modal/Modal';


type ProductCommentProps = 
{
    children?: React.ReactNode,
    closeCommentDialog: boolean,
    onClick: (isOpen: boolean) => void,
    messages: { comments: string }[], 
    productName: string
}


export const ProductComments = ({ onClick, closeCommentDialog, messages, productName }: ProductCommentProps)  =>
{
        return (
                <>
                        <Modal onClick={onClick} isOpen={closeCommentDialog} wrapperWidth={900} margin={'200px auto 0px auto'} color='green'>
                                { (messages.length > 0) &&
                                        <div 
                                           className="flex gap-5 mt-3 items-center items-center"
                                        >
                                           <h1 
                                              className='w-full flex items-center items-center font-bold text-lg mb-2 col-span-10 text-center'
                                           >
                                              All comments on {productName}
                                           </h1>
                                        </div>
                                }
                                {
                                    (messages.length === 0) &&
                                        <div 
                                            className="flex mt-3 justify-center items-center items-center text-[26px]"
                                        >
                                                No Comment
                                        </div>
                                }       
                          <div className='overflow-y-auto xm:overflow-y-scroll justify-center item-center min:h-[40px] max:h-[300px]'>
                                { 
                                   (messages.length > 0) &&
                                        <div className="mt-5">
                                                {
                                                        messages &&
                                                        messages.length > 0 &&
                                                        messages?.map((msg: { comments: string }, index: number) => {
                                                                return (
                                                                        <>
                                                                           <div className="w-full border border-1 h-23 p-2 my-3" key={index}>
                                                                                {msg.comments}
                                                                           </div> 
                                                                        </> 
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
                        </Modal>
                </> 
        );
}
