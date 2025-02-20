import { UseStore } from '../../state/store'
import { useRouter } from 'next/navigation'


export default function EnterClassRoom() 
{
   const router = useRouter()
   const userData = UseStore((state) => state)
   
  return (
      <div 
            className="md:w-12/12 w-full p-5 flex h-[500px] justify-center items-center border-2 py-10 md:py-5 md:mb-0 mb-5 pb-10 shadow-md"
      >
            {/* <div 
            className='w-full pt-10'
            > */}
            <button 
                  className='flex font-bold text-blue-500 justify-center px-7 py-4 bg-blue-800 hover:bg-blue-600 rounded-xl text-gray-400 hover:text-blue-400 font-bold items-center mb-5 text-center uppercase text-[14px] md:text-[18px]'
                  onClick={
                  () => {
                        userData.setSideType('student')
                        router.push('/user/dashboard')
                  }
                  }
            >
                  Enter Classroom
            </button>
            {/* </div> */}
      </div>
  )
}