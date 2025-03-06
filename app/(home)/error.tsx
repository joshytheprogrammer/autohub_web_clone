'use client'
 
import { PuffLoader } from 'react-spinners'
 
export default function Error({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {
  
  return (
    <div 
      className="flex justify-center items-center bg-green-400 flex d-flex bg-green-50 border-shadow drop-shadow-lg md:block px-3 md:px-10 py-5 mt-3 rounded-2xl md: mb-0 h-[700px] justify-center item-center" 
      style={{ marginTop: '0px', paddingTop: '50px' }}
    >
        <div 
          className="flex justify-center items-center"
          style={{ marginTop: '100px' }}
        >
            {/* <h2>{error?.message}</h2> */}
            <h2 className='text-xl text-center font-bold'>Connection Lost, Kinldy click here to roload Page</h2>
            <button
              className='border border-blue-500 text-black ml-8 font-bold justify-center item-center p-3 rounded-lg'
              onClick={
                () => {
                  reset()
                }
              }
            >
              Reload
            </button>
            <PuffLoader color="#1c9236" />
            
        </div>
    </div>
  )
}