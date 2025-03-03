import Link from "next/link";
import { HiBan, HiHome } from "react-icons/hi";

export default function NotFound() 
{

  return (
            <main 
                  className='container md:grid md:grid-cols-12 justify-center item-center mt-7 mb-4 mx-auto h-[600px]'
            > 
                <div
                    className="col-span-12 text-center text-[40px] md:text-[60px] mt-28"
                  >
                      Oops, Page not found
                      <span 
                        className='mt-1 mr-2 flex justify-center items-center col-span-12 mt-20'
                      >
                        <Link 
                          href={'/'}
                        >                                
                          <HiHome className='mr-1 text-green-600 text-2xl md:mt-2 text-[40px] md:text-[60px]'/>
                        </Link>
                      </span>
                  </div>
            </main>
  )
}
