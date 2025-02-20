"use client"

import { useState, useEffect } from "react"
import { BeatLoader } from "react-spinners"
import Message from "../../../../components/shared/Message"
import { UseStore } from "../../../../state/store"
import { reduceImageSize } from "../../../../components/util/image"
import { USAGE_PATH } from "../../../../constant/Path"
import { ChangeProfilePicture } from "../../../api/auth/profile"


export default function ChangePassport() 
{    
    const userState = UseStore((state) => state)
    const token: string = userState.getUserToken()
    const userType: string = userState.getUType()


    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [picture, setPicture] = useState<string>("")
    const [imgUrl, setUrl] = useState<string>("")
    const [rawImage, setRawImage] = useState<string>("")
    const [errMsgStyle, setErrMsgStyle] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>("")
    

    useEffect(() => 
    {
       setPicture(userState.getPassport())
       setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
       setErrorMessage("")
    }, [])
    
    useEffect(() => 
    {
        userState.setPassport(picture)
    }, [picture])
    
    useEffect(() => 
    {
        userState.setPassport(picture)
    }, [imgUrl])

    useEffect(() => 
    {

    }, [rawImage])

    const ChangeImage = async () =>
    {
        setIsUploading(true)
        const UploadImage = ChangeProfilePicture(rawImage, userType, token)
        UploadImage.then((response) => 
        {
            setIsUploading(true)
            if(response?.status === 200)
            {
               setIsUploading(false)  
               setUrl("")             
               setPicture(response?.data?.passport)
               userState.setPassport(response?.data?.passport)
            } 
            else {
               setIsUploading(false)
               setErrorMessage("Updating Profile failed")
            }
        }).then(() => {

        })
    }

    const imageUrlToDisplay = (file: any) => 
    {
        const img = file[0]
        const displayedImage: any = URL.createObjectURL(img)
        setPicture("")
        setUrl(displayedImage)

        const image = Array.from(file)        
        Promise.all(
            image.map((file: any) => 
            {
               return new Promise((resolve, reject) => 
               {
                  const reader: FileReader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = async () => 
                  {                        
                     let sizeToCalculate = reader.result as string
                     let x = await reduceImageSize(sizeToCalculate)
                     resolve(x)
                  }
                  reader.onerror = (error) => reject(error);
               });
            })
            ).then((results) => {
               let x = results[0] as string
               setRawImage(x)
            });
    }

    const closeIt = () => 
    {
            setUrl("")               
    }

    return (
            <>
                <div 
                     className='md:col-span-12 col-span-12 bg-green-400 d-flex bg-green-50 border-shadow drop-shadow-lg md:block px-3 md:px-10 py-20 mt-3 md:rounded-2xl md:mb-0'
                >  
                <div 
                    className='w-full d-flex md:flex px-5 md:-mt-0 -mt-10'
                >      
                    <div 
                        className="flex justify-left w-10/12 md:w-4/12 rounded-lg mx-auto"
                    >
                        { picture && <img src={`${USAGE_PATH.AVATAR}${picture}`} className='flex justify-left  bg-blue-200 mb-3 rounded-xl' />  }
                        { imgUrl && <img src={`${imgUrl}`} className='flex justify-left bg-blue-200 mb-3 rounded-xl' />  }

                        {/* { picture && <img src={`${picture}`} className='flex justify-left  bg-blue-200 mb-3 rounded-xl' />  } */}
                        {/* { imgUrl && <img src={`${imgUrl}`} className='flex justify-left bg-blue-200 mb-3 rounded-xl' />  } */}
                    </div>
                </div>
                <div 
                    className="drag-area p-3 items-center text-center mx-auto"
                >
                    <span 
                        className="flex select justify-center items-center text-xs block" role="button"
                    >
                        <b className="px-10 py-5">Browse</b>
                        <input type="file" id="product" name="product" className="file" onChange={
                                (e) => {
                                          imageUrlToDisplay(e.target.files)
                                       }
                                } 
                        />
                    </span>
                </div>                   
                <div 
                    className="container grid grid-col-12 mx-auto flex justify-center items-center mb-1"
                >
                    { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                </div> 
                { imgUrl &&
                    <div 
                        className="items-center gap-5 mt-2 sm:flex flex justify-left mb-2 mx-5 -ml-1 justify-center flexx"
                    >                                        
                        <button 
                            className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                            onClick={closeIt}
                        >
                            Cancel
                        </button>
                        <button 
                            className="py-3 px-4 bg-green-700 hover:bg-green-500 text-white font-semibold text-sm rounded-xl w-max"
                            onClick={ChangeImage}
                        >
                        {   (isUploading === true) ? ( <BeatLoader size={9} color="#fff" />) : ( "Upload Image" )  }
                        </button>
                    </div>
                }
                
                    <div className="h-[110px]"></div> 
                </div>  

            </>
      )
}
