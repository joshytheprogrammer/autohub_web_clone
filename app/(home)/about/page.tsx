"use client"


export default function AboutUs() 
{

  return (
            <div 
                  className='container w-full d-flex justify-between mt-7 mb-4 mx-auto my-10'
            > 
                <div 
                  className="w-full d-flex px-5"
                >
                    <div 
                        className='font-bold text-lg md:text-2xl mt-10'
                    >
                        About Us
                    </div>

                    <div 
                      className="text-lg md:text-xl border-shadow py-10"
                    >
                        <p>
                          Autohub Africa is a Nigerian company poised to revolutionize the automobile industry through a turn-key automobile services, ranging from land-vehicles to aviation, maritime, AI and space exploration. 
                        </p>
                        <p className="mt-10">
                          We are building an inter-business community for maximum utilization of automotive products.
                        </p>
                    </div>
                </div>

                <div className="h-[150px] md:h-[350px]"></div>
            </div>
  )
}
