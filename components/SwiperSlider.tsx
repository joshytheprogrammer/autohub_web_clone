// import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
// import currencyFormatter from './util/currency-formatter';
// import { USAGE_PATH } from '../constant/Path';
// import { HiOutlineSpeakerphone } from 'react-icons/hi';
// import { useLiveQuery } from "dexie-react-hooks";
// import { settingsDB } from '../app/model/Product';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { useRouter } from 'next/navigation';


export default function SwiperSlider({ data, imageSize, timer }: { data: any, imageSize: number, timer: number }) 
{
    const router = useRouter()
    SwiperCore.use([Autoplay]);

    const slides: string[] = [
        'https://eu2.contabostorage.com/531567a74f5740769e7b8d34e116cadd:autohub//aa/2025-04-16-advert-image-autohub-image67ffcb70149d5-100.jpg',
        'https://eu2.contabostorage.com/531567a74f5740769e7b8d34e116cadd:autohub//aa/2025-04-16-advert-image-autohub-image67ffc8a0c6870-100.jpg',
        'https://eu2.contabostorage.com/531567a74f5740769e7b8d34e116cadd:autohub//aa/2025-04-26-advert-image-autohub-image680ccec45e560-100.jpg',
        'https://eu2.contabostorage.com/531567a74f5740769e7b8d34e116cadd:autohub//aa/2025-04-15-advert-image-autohub-image67fe206ee49a6-100.jpg',
        'https://eu2.contabostorage.com/531567a74f5740769e7b8d34e116cadd:autohub//aa/2025-04-13-advert-image-autohub-image67fb801d07b4d-99.jpg'
    ]

    return (
        <>
            { 
                <Swiper
                      // pagination={{
                      //   type: 'fraction',
                      // }}
                      autoplay={{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                      slidesPerView={1}
                      loop={true}
                      navigation={true}
                      modules={[Pagination, Navigation, Autoplay]}
                      rewind={true}
                      className='mySwiper'
                >
                  {
                      data?.length > 0 && data?.map((image: any, index: number) => 
                      {
                        <SwiperSlide key={index}>{image?.image_url}</SwiperSlide>
                      })
                      
                  }

                  {
                     slides.map((x: string, index: number) => {
                        return (
                          <SwiperSlide key={index}>
                          <div className='z-40 carousel md:h-[400px] md:h-full lg:h-full w-full m-auto overflow-hidden relative cursor-pointer'>
                            <img
                                src={x} 
                                alt='dfdfd' 
                                className="z-40 carousel md:h-[400px] md:h-full lg:h-full w-full m-auto overflow-hidden relative cursor-pointer"
                            />
                          </div>
                        </SwiperSlide>
                        )
                     })
                  }
                        
                </Swiper>
            }
        </>
      );
}


// data?.length > 0 && data?.map((image: any, index: number) => 
//   {  
//        return (

//     )}



{/* <SwiperSlide>Slide 1</SwiperSlide>
<SwiperSlide>Slide 2</SwiperSlide>
<SwiperSlide>Slide 3</SwiperSlide> */}