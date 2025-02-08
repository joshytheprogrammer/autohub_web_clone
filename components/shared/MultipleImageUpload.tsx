import React, { useEffect, useState } from 'react'
import { HiCloudUpload } from 'react-icons/hi'
import { UseStore } from '../../state/store'
import { reduceImageSize } from '../util/image'


type ImageProps = 
{
    width: number,
    ICloudColour: string,
    onClick: (img: any, position: number) => void
}

export default function MultipleImageUpload({width, ICloudColour, onClick}: ImageProps) 
{
    const advertState = UseStore((state) => state)
    const [userPassport] = useState<string>("")
    const [uploadText] = useState<string>("Click to upload pictures")
    let photograph!: HTMLDivElement
    
    const [previewUrls, setPreviewUrls] = useState<any[]>([]);
    const [ mainImagePosition, setMainImagePosition] = useState<number>(-1)    
    const [thumbnail, setImages] = useState<string[]>([])
    const [imageSizes] = useState([])
    const [images, setProductImages] = useState<any[]>([]);    
    
    const [mainImageErrorMsg, setMainImageErrorMsg] = useState("")

    useEffect(() => 
    {
        setTimeout(() => 
        {   
            photograph = document.querySelector('.theArea')!
        }, 200)
        console.log({ thumbnail, mainImageErrorMsg, width })
    }, [])

    useEffect(() => 
    {        
        let photo: HTMLInputElement | null = null
        photo = document.querySelector('#passport')!
    }, [userPassport])

    useEffect(() => 
    {        
        let imagesToSave: any = []
        for (let index = 0; index < previewUrls.length; index++) 
        {
            if(index === mainImagePosition)
            {
                imagesToSave.push({image: previewUrls[index], position: index, faceImage: mainImagePosition})
            } else {
                imagesToSave.push({image: previewUrls[index], position: index, faceImage: 0})
            }
        }
        console.log(imagesToSave)
        onClick(imagesToSave, mainImagePosition)
    }, [previewUrls])

    const hover = () => 
    {
        let photo: HTMLInputElement | null = null
        photo = document.querySelector('#passport')!
        if(photo === null)
        {
            let photo: HTMLInputElement
            photo = document.querySelector('#passport')!
            photo.click()
        } else {
            photo.click()
        }
    }

    
    const markMainImage = (position: number) => 
    {
        setMainImagePosition(position)
        advertState.setImagePosition(position)
    }


    const handleMultipleImages = (e: any) => 
    {
        const files = Array.from(e.target.files)

        if (files.length > 0) 
        {
            setProductImages([...images, ...files])            

            Promise.all(
                files.map((file: any) => 
                {
                    return new Promise((resolve, reject) => {
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
                setPreviewUrls([...previewUrls, ...results]);
            });
        }     
        setMainImageErrorMsg("")    
    }

    const handleDeleteImage = (index: number) => 
    {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
      
        const newPreviewUrls = [...previewUrls];
        imageSizes.splice(index, 1);
        newPreviewUrls.splice(index, 1);
        setPreviewUrls(newPreviewUrls);
        if(mainImagePosition === index)
        {
            setMainImagePosition(-1)
            advertState.setImagePosition(-1)
        }
        if(mainImagePosition > index)
        {
            setMainImagePosition(mainImagePosition - 1)
            advertState.setImagePosition(mainImagePosition - 1)
        }
    }


    return (
          <>
              <div 
                  className="theArea mb-4 flex-col w-7/12 md:w-4/12 object-fill rounded-md px-10 py-1 flex justify-center items-center mx-auto cursor-pointer hover:text-green-300 uploader"
                  onClick={() => { 
                    hover() 
                  }}
              >                 
                    
                    <div 
                        className={`passportText ${ICloudColour} w-full d-flex justify-center mt-5 text-center mx-auto font-bold upload`}
                    > 
                        <div className="cloudy mb-3"
                        >
                            <HiCloudUpload className={`w-10 h-10 ${ICloudColour} upload mx-auto`} />
                        </div>
                        <span className='bg-white p-1 text-black flex text-center justify-center text-sm rounded-full opacity-50 w-full'>{uploadText}</span>
                    </div>
                    <input 
                            type='file' 
                            id='passport' 
                            name='passport' 
                            className='passort p-5 upload' 
                            multiple 
                            onChange={handleMultipleImages}  
                            hidden
                    />
              </div> 
                    
              <div 
                    className="grid md:grid-cols-12 gap-5 pt-3 mt-10"
              >
                {
                    previewUrls && previewUrls.map((image, index) => {
                        let whenSet = (index === mainImagePosition) ? `col-span-3 z-30 border border-4 p-1 h-23 relative border-green bg-green-400` : `col-span-3  z-30 border border-2 h-23 relative`
                        return (
                                <div className={whenSet} key={index}
                                >
                                    <img src={image} alt="upload" />
                                    <div 
                                        className={`${(index === mainImagePosition) ? 'pr-1 pt-1 pb-1' : ''} absolute flex justify-between bottom-0 w-full`}
                                    >
                                        <span className="rounded-sm border border-1 left-0 border-green-900 p-1 bg-blue-200 delete cursor-pointer hover:bg-orange-200" 
                                            onClick={() => handleDeleteImage(index)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-4 h-4">
                                                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                            </svg>
                                        </span>
                                        <span 
                                            className="rounded-sm border border-1 right-0 border-green-900 p-1 bg-blue-200 delete cursor-pointer hover:bg-orange-200"
                                            onClick={() => markMainImage(index)}
                                        >
                                            <div 
                                                className="p-1 bg-blue-700 hover:bg-blue-900 text-white hover:font-bold" 
                                                style={{ fontSize: "12px" }}
                                            >
                                                Make as Main Image
                                            </div>
                                        </span>
                                    </div>
                                </div> 
                        )
                    })
                }
              </div>
          </>
    )
}
