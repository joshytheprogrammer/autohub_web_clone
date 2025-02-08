"use client"

import React, { useEffect, useState } from 'react'
import { HiCloudUpload } from 'react-icons/hi'
import './css/upload.css'
import { reduceImageSize } from '../util/image'

type ImageProps = 
{
    width: number,
    space: string,
    ICloudColour: string,
    onClick: (photo: string) => void
}


export default function SingleImageUpload({width, space, ICloudColour, onClick}: ImageProps) 
{
    const [userPassport, setUserPassport] = useState<string>("")
    const [passport, setPassport] = useState<string>("")
    const [uploadText, setUploadText] = useState<string>("Click to upload profile picture")
    let photograph!: HTMLDivElement

    useEffect(() => 
    {
        setTimeout(() => 
        {   
            photograph = document.querySelector('.theArea')!
        }, 200)
        console.log({ width })
    }, [])

    useEffect(() => 
    {
        onClick(passport)
    }, [passport])

    useEffect(() => 
    {        
        let photo: HTMLInputElement | null = null
        photo = document.querySelector('#passport')!
    }, [userPassport])

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

    const displayPassport = (e: any) => 
    {
        let photo: HTMLInputElement | null = null
        let cloud: HTMLInputElement | null = null
        photo = document.querySelector('.theArea')!
        cloud = document.querySelector('.cloudy')!
        let passportUrl = URL.createObjectURL(e.target.files[0])
        photo.style.backgroundSize = 'cover'
        photo.style.width = '300px'
        photo.style.height = '300px'
        cloud.style.display = 'none'
        cloud.style.fontSize = '10px'
        setUploadText("Click to change profile picture")
        photo.style.backgroundImage = `url(${passportUrl})`

        const image = Array.from(e.target.files)
        Promise.all(
            image.map((file: any) => 
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
            let x = results[0] as string
            setPassport(x)
            setUserPassport(passportUrl)
        });

    }


    return (
          <>
              <div 
                  className={`relative theArea mb-4 flex-col ${space} object-fit mt-10 border-2 px-10 py-12 flex justify-center items-center mx-auto cursor-pointer hover:text-green-300 uploader`}
                  onClick={() => { 
                    hover() 
                  }}
              >    
                    {/* <img src={userPhoto} className='absolute object-fit rounded-full w-10/12' /> */}
                    
                    <section 
                        className={`passportText ${ICloudColour} w-full d-flex justify-center mt-5 text-center mx-auto font-bold upload`}
                      > 
                        <div className="cloudy mb-3"
                        >
                            <HiCloudUpload className={`w-10 h-10 ${ICloudColour} upload mx-auto`} />
                        </div>
                        <span className='px-2 text-white flex text-center justify-center text-sm rounded-full w-full whitespace-nowrap text-[9px] md:text-[13px]'>{uploadText}</span>
                    </section>
                    <input type='file' id='passport' name='passport' className='passort p-5 upload' hidden
                            onChange={(e: any) => {                                       
                                displayPassport(e)
                            }} 
                    />
              </div>
          </>
    )
}
