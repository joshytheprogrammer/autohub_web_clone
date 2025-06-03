"use client"


import { HiLocationMarker } from "react-icons/hi"
import { HiMiniPhoneArrowUpRight } from "react-icons/hi2"


export default function ContactUs() 
{
  // const data: any =  [
	// 	{
	// 		"id": 195369,
	// 		"value": "L 4dr Sedan (2.5L 4cyl 6A)",
	// 		"id_name": 195369
	// 	},
	// 	{
	// 		"id": 195370,
	// 		"value": "L 4dr Sedan w/Prod. End 11/13 (2.5L 4cyl 6A)",
	// 		"id_name": 195370
	// 	},
	// 	{
	// 		"id": 195371,
	// 		"value": "LE 4dr Sedan (2.5L 4cyl 6A)",
	// 		"id_name": 195371
	// 	},
	// 	{
	// 		"id": 195372,
	// 		"value": "LE 4dr Sedan w/Prod. End 11/13 (2.5L 4cyl 6A)",
	// 		"id_name": 195372
	// 	},
	// 	{
	// 		"id": 195373,
	// 		"value": "SE 4dr Sedan (2.5L 4cyl 6A)",
	// 		"id_name": 195373
	// 	},
	// 	{
	// 		"id": 195374,
	// 		"value": "SE 4dr Sedan (3.5L 6cyl 6A)",
	// 		"id_name": 195374
	// 	},
	// 	{
	// 		"id": 195375,
	// 		"value": "SE 4dr Sedan w/Prod. End 11/13 (2.5L 4cyl 6A)",
	// 		"id_name": 195375
	// 	},
	// 	{
	// 		"id": 195376,
	// 		"value": "SE 4dr Sedan w/Prod. End 11/13 (3.5L 6cyl 6A)",
	// 		"id_name": 195376
	// 	},
	// 	{
	// 		"id": 195377,
	// 		"value": "SE Sport 4dr Sedan (2.5L 4cyl 6A)",
	// 		"id_name": 195377
	// 	},
	// 	{
	// 		"id": 195378,
	// 		"value": "SE Sport 4dr Sedan w/Prod. End 11/13 (2.5L 4cyl 6A)",
	// 		"id_name": 195378
	// 	},
	// 	{
	// 		"id": 195379,
	// 		"value": "XLE 4dr Sedan (2.5L 4cyl 6A)",
	// 		"id_name": 195379
	// 	},
	// 	{
	// 		"id": 195380,
	// 		"value": "XLE 4dr Sedan (3.5L 6cyl 6A)",
	// 		"id_name": 195380
	// 	},
	// 	{
	// 		"id": 195381,
	// 		"value": "XLE 4dr Sedan w/Prod. End 11/13 (2.5L 4cyl 6A)",
	// 		"id_name": 195381
	// 	},
	// 	{
	// 		"id": 195382,
	// 		"value": "XLE 4dr Sedan w/Prod. End 11/13 (3.5L 6cyl 6A)",
	// 		"id_name": 195382
	// 	}
	// ]
  //  let nameOnly = []
  // for (let index = 0; index < data.length; index++) 
  // {
  //    nameOnly.push(data[index]['value'])    
  // }
  // console.log(nameOnly)
  // console.log(nameOnly?.length)



  return (
        <div 
              className='container w-full d-flex justify-center mt-7 mb-4 mx-auto my-10'
        > 
            <div 
              className="w-full d-flex px-5"
            >
                <div 
                    className='font-bold text-lg md:text-2xl mt-10 text-blue-600 flex justify-center text-center'
                >
                    Contact Us
                </div>

                <div 
                  className="text-xl md:text-xl border-shadow py-10 text-center"
                >
                    <div 
                      className="mt-10 text-[40px] w-full flex justify-center items-center"
                    >
                      <HiMiniPhoneArrowUpRight className="text-green-800 mr-5 text-[30px] mt-2" /> 
                      <p>09133333357</p>
                    </div>
                    <div 
                      className="mt-10 text-[40px] w-full flex justify-center items-center leading-10"
                    >
                      <HiLocationMarker className="text-red-600 mr-5 md:text-[30px] text-[100px] mt-1" /> 
                      <p>Plot 2015, Festac Link Road, Amuwo Odofin, Lagos.</p>                       
                    </div>
                </div>
            </div>

            <div className="h-[170px] md:h-[370px]"></div>
        </div>
  )
}
