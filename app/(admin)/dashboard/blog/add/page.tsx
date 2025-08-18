"use client"
import React, { useMemo, useRef } from 'react'
import dynamic from 'next/dynamic'


import { useEffect, useState } from "react"
import Message from "../../../../../components/shared/Message"
import SingleImageUpload from '../../../../../components/shared/SingleImageUpload'
import { BeatLoader } from 'react-spinners'
import JoditEditor from 'jodit-react'


export default function Add() 
{
    const AddBlog = dynamic(() => import('../JoEdit/AddBlogEditor'), { ssr: false })  

    const TITLE_MESSAGE = 'Enter Title'
    const CONTENT_MESSAGE = 'Enter Content'  
    
    const [loading, setIsLoading] = useState<boolean>(false)

    const PICTURE_MESSAGE = 'Enter Picture'
         
    const [url, setUrl] = useState<string>("");
    const [pictureMessage, setPictureMessage] = useState<string>('')
    const [processAdvert, setProcessAdvert] = useState(false)
    
    const [title, setTitle] = useState<string>("")
    const [titleMessage, setTitleMessage] = useState<string>("")
    
    const [successStyle, setSuccessStyle] = useState<string>('')
    const [successMsg, setSuccessMsg] = useState<string>('')
         
    const [errMsgStyle, setErrMsgStyle] = useState<string>('')
    const [validationMessage, setValidationMessage] = useState<string>("")

    const [content, setContent] = useState<any>()  
    const blogTitleRef = useRef("");  
    const contentRef = useRef() 
    const pictureRef = useRef("")
          
        
    useEffect(() => 
    {
        setErrMsgStyle('ml-0 pt-1 text-red-500 font-bold rounded-md') 
        setSuccessStyle('bg-blue-600 p-3 text-white mb-3 font-bold rounded-md')   
    }, [])

    useEffect(() => 
    {
        console.log(blogTitleRef.current)        
    }, [blogTitleRef])

    useEffect(() => 
    {
        console.log(contentRef.current)
    }, [contentRef])

    // const config =  useMemo(
    //       () => (
    //         {
    //           readonly: false,
    //           minHeight: 600,
    //           allowResizeX: true,
    //           allowResizeY: true
    //         }
    //       ), [content]
    //   )
              
   const SaveAgreement = async () => 
   {
      console.log({ blogTitle: blogTitleRef.current, url: pictureRef.current, contentRef: contentRef.current })
      // setIsLoading(true) 
      // const agreement = content ? content : data?.data
      // const newCourse = AffiliateRegistrationAgreement(token, agreement)
      // newCourse.then((response: any) => 
      // {
      //    if(response?.status === 200)
      //    {
      //       refetch()                    
      //       setIsLoading(false)    
      //       toast.success(response?.message, {
      //              position: "top-center",
      //       });
      //    } else {
      //       setErrorMessage(response?.message)
      //       setIsLoading(false)
      //       setTimeout(() => 
      //       {
      //         setErrorMessage("")
      //       }, 5000)
      //       toast.error(response?.data, {
      //              position: "top-center",
      //      });
      //    }
      // }).   catch(() => {
           
      // })
   }


    return (
            <div 
               className='w-full'
            >             
              <div 
                className='font-bold text-2xl ml-5 mb-7 mt-7 flex justify-left items-center gap-10'
              >
                <span 
                   className="text-lg text-black"
                >
                   Create Blogs
                </span>
              </div>

              <div 
                 className="shadow-md border-2 border-gray-100 mb-3 mt-1 mx-auto md:mx-5 pb-8 rounded-none overflow-hidden hover:shadow-stone-400"
              >
                  <div  
                      className='w-full d-flex md:d-flex gap-10 md:mb-3 pt-7 md:pt-7'
                  >                                          
                      <div 
                          className="mb-4 md:w-full px-6 md:px-6"
                      >
                          <input  
                              className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded mb-2 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                              type="text" name="title" id="title" placeholder="Enter Title" 
                              onChange={(e: any) => 
                              {
                                let value: string = e.target.value
                                // setTitle(value)                                
                                blogTitleRef.current = value
                                setTitleMessage("")
                              }}
                              onBlur={(e: any) => 
                              {
                                let value: string = e.target.value
                                if(value === "" || value === undefined || value === null)
                                {
                                    setTitleMessage(TITLE_MESSAGE)
                                }
                              }}
                          />
                            { titleMessage && <Message msg={titleMessage} status={errMsgStyle} /> }
                      </div>

                    </div>

                    <div 
                        className="mb-4 md:w-full px-6 md:px-6"
                    >                       
                       {/* <Jodit dataz={data?.data} customOnChange={(event: any) => (contentRef.current = event)} /> */}
                       {/* <AddBlog customOnChange={(event: any) => (contentRef.current = event)}  /> */}
                       <AddBlog 
                              customOnChange={(event: any) => 
                                  {
                                    console.log(event)
                                    contentRef.current = event
                                  }
                              }  
                              theContent={content}

                        />

                        {/* <JoditEditor
                              ref={editor}
                              value={''}
                              config={config}
                              onBlur={(newContent) => {
                                 customOnChange && customOnChange(newContent)
                                 setContent(newContent)
                                console.log(newContent)
                              }}
                              onChange={(newContent) => 
                                 {
                                    console.log(newContent)
                                    user.setAgreement(newContent)
                                    customOnChange && customOnChange(newContent)
                                 }
                              }
                           /> */}
                    </div>

                     <div 
                        className="flex justify-center items-cener mt-10"
                     >
                        <SingleImageUpload 
                           width={0} 
                           space={""} 
                           ICloudColour={""} 
                           onClick={
                                     (photo) => {
                                        setProcessAdvert(true)
                                        // setUrl(photo)
                                        pictureRef.current = photo
                                    }
                                 } 
                        />
                     </div>

                     <div 
                        className="flex float-right mt-20"
                     >
                        <button 
                           className="px-5 py-3 bg-green-700 mt-5 mb-10 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800 mr-5"
                           onClick={() => SaveAgreement()}
                           >
                           { loading ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Create" ) } 
                        </button>
                     </div>
                          
                </div>

            </div>
      )
}


