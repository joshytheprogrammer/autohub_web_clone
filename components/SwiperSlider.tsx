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
import { settingsDB, sliderDB } from '../app/model/Product';
import { useEffect, useState } from 'react';


export default function SwiperSlider({ data, imageSize, timer }: { data: any, imageSize: number, timer: number }) 
{
   const router = useRouter()
   SwiperCore.use([Autoplay]);
   const [sliderAdvert, setSliderAdvert] = useState<any>([])
   const [slideTimer, setSlideTimer] = useState<number>(2000)

   useEffect(() => 
   {
      sliderDB.toArray().then((sly) => 
      {
        setSliderAdvert(sly)
      })
   }, [])

    return (
        <>
            { 
                <Swiper
                      // pagination={{
                      //   type: 'fraction',
                      // }}
                      autoplay={{ delay: slideTimer, disableOnInteraction: false, pauseOnMouseEnter: true }}
                      slidesPerView={1}
                      loop={true}
                      navigation={true}
                      modules={[Pagination, Navigation, Autoplay]}
                      rewind={true}
                      className='mySwiper'
                >
                  {
                      sliderAdvert?.length > 0 && sliderAdvert?.map((image: any, index: number) => 
                      {
                        <SwiperSlide key={index}>{image?.image_url}</SwiperSlide>
                      })
                      
                  }

                  {
                     sliderAdvert?.length > 0 && sliderAdvert?.map((image: any, index: number) => {
                        return (
                          <SwiperSlide key={index}>
                          <div className='z-40 carousel md:h-[400px] md:h-full lg:h-full w-full m-auto overflow-hidden relative cursor-pointer'>
                            <img
                                src={image?.image_url} 
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