import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import currencyFormatter from './util/currency-formatter';
import { USAGE_PATH } from '../constant/Path';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { useLiveQuery } from "dexie-react-hooks";
import { settingsDB } from '../app/model/Product';


export default function SlideShow({ data, imageSize, timer }: { data: any, imageSize: number, timer: number }) 
{
    const router = useRouter()
    const [slide, setSlide] = useState<number>(0)
    const slideTimer = useLiveQuery(() => settingsDB.get(1));
    let timing: number = Number(slideTimer?.timer)
    let sliderTimeOut: any;

  
    useEffect(() => 
    {
        sliderTimeOut =  setTimeout(() => 
        {
            if(slide === 0)
            {
                if(imageSize > 1)
                {
                  setSlide(slide+1)
                }
            } else if((imageSize-1) > slide) {
                setSlide(slide+1)
            } else {
                setSlide(0)
            }
        }, timing);
    }, [timing])

    const nextSlide = () => 
    {
        clearTimeout(sliderTimeOut)
        setSlide(slide === (data?.length - 1) ? 0 : slide + 1)
    }
  
    const prevSlide = () => 
    {
        clearTimeout(sliderTimeOut)
        setSlide(slide === 0 ? (data?.length - 1) : slide - 1)
    }


    return (
          <>
              {
                 (data?.length === 0) && <>
                    <div 
                        className="w-full h-[400px] md:h-[400px] d-flex justify-center items-center mx-auto pt-14"
                    >
                            <div 
                                className='w-full flex justify-center items-center mt-10'
                            >
                                <HiOutlineSpeakerphone className='h-40 text-[130px] text-green-600' />
                            </div>
                            <div 
                                className='w-full flex justify-center items-center'
                            >             
                                <h1 className="font-bold text-md text-green-900"
                                >
                                    Place An Advert
                                </h1>                    
                            </div>
                    </div>
                  </>
              }
              {    (data?.length > 0) &&             
                <div 
                        className="z-40 carousel h-[330px] md:h-[400px] md:h-full lg:h-full w-full m-auto overflow-hidden relative cursor-pointer"                
                >
                    {
                        ((data?.length > 0)) && <img
                                                        src={`${USAGE_PATH.IMAGE_SLIDER}${data[slide]?.image_url}`} 
                                                        className="slide absolute w-full h-full object-fit"
                                                        onClick={() => 
                                                        {
                                                            router.push(`/product-detail/${data[slide]?.slug}`)
                                                        }}
                                                    />
                    }

                    {
                        (data?.length > 1) && <>
                            <div 
                                className="absolute top-[40%] -translate-x-0 translate-y-[-50%] z-5 left-5 text-xl rounded-full cursor-pointer bg-green-100 p-1"
                            > 
                                <BsArrowLeftCircleFill color="gray" className="arrow arrow-left w-9 h-9 text-white hover:bg-green-700 hover:fill-red" style={{ backgroundColor: "" }} onClick={prevSlide} />
                            </div>
                            <div 
                                className="absolute top-[40%] -translate-x-0 translate-y-[-50%] right-5 text-xl rounded-full cursor-pointer bg-green-100 p-1"
                            >
                            <BsArrowRightCircleFill color="gray" className="arrow arrow-right w-9 h-9 text-white" style={{ backgroundColor: "" }} onClick={nextSlide} />
                            </div>
                        </>
                    }

                    {
                    (data?.length > 0) && 
                    <div 
                            className="absolute bg-blue-600 hover:bg-green-600 hover:border-2 hover:border-white rounded-lg px-4 py-2 bottom-7 md:bottom-5 font-semibold text-md text-white right-10"
                            onClick={() => 
                            {
                                router.push(`/product-detail/${data[slide]?.slug}`)
                            }}
                        >
                        <span 
                                className=""
                            >
                                {  data[slide]?.title } - {currencyFormatter(data[slide]?.price)}
                            </span>
                        <br />
                        <span 
                                className="text-sm font-bold"
                            >
                            { data[slide]?.country } - { data[slide]?.state }  
                        </span>
                        </div>
                    }

                </div>
              }
          </>
    )
}
