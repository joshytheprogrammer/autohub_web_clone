import Link from 'next/link'
import { UseStore } from '../../state/store'


export default function Logo() 
{
  const Session = UseStore((state) => state)
  
  return (
        <Link 
            href={'/'}
            className="py-2 col-span-2 md:col-span-2 w-[170px] h-[60px] sm:w-[105px] md:w-[170px] pt-5 md:pt-3"
            onClick={
               () => {                  
                  Session.setSideType('member')
               }
            }
        >
          <img
                src="/logo.png"
                alt="Picture of the author"
          />
        </Link>
  )
}