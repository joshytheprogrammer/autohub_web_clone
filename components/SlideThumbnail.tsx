
import React, { CSSProperties, useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Thumbs, FreeMode } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
// import { useRouter } from 'next/navigation'


// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation"
import "swiper/css/thumbs"
import { USAGE_PATH } from "../constant/Path";

// import "./styles.css";


// import Swiper core and required modules

// install Swiper modules
SwiperCore.use([Navigation, Thumbs]);



export default function SlideThumbnail({ data, imageSize, waterMark, slug }: { data: any, imageSize: any, waterMark: string | any, slug: string }) 
{
    
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <>
        <div 
            className="relative"
        >
            {/* <div 
              className="py-1 px-2 border-2 border-blue-500 text-white round-md absolute w-fit h-fit m-3 z-50"
            >
               View enlarged image
            </div> */}
            {                    
            <Swiper
                    style={{
                    '--swiper-navigation-color': '#6545f7ff',
                    '--swiper-pagination-color': '#fff',
                    'marginBottom': '10px',
                    } as CSSProperties}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2 h-[300px] md:h-[570px] lg:h-[570px]"
                >
                    
                    {
                        data?.length > 0 && data?.map((image: any, index: number) => 
                        {
                        return (
                            <SwiperSlide 
                                key={index}
                            >
                                <div 
                                    className="h-fit flex justify-center items-center"
                                >
                                    <img src={image?.image_url} className="object-fit"/>
                                    <img src={`https://eu2.contabostorage.com/531567a74f5740769e7b8d34e116cadd:autohub//aa/2025-08-18-profile-image-autohub-image68a34af2cd40f-1.jpg`} width={200} height={50} className="absolute z-5 h-[50px]" />
                                </div>
                            </SwiperSlide>
                           )
                        })
                    }
            </Swiper>
            }
        </div>

        <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
        >
        {
            data?.length > 0 && data?.map((image: any, index: number) => 
            {
                return (                    
                    <SwiperSlide 
                        key={index}
                        style={{ width: '200px', height: '200px' }}
                    >
                        <img src={image?.image_url} />
                        {/* <img src={`${USAGE_PATH.WATER_MARK}${waterMark}`} width={500} height={500} className="absolute cursor-pointer" /> */}
                    </SwiperSlide>
                )
            })
        }
      </Swiper>

    </>
  );


}
