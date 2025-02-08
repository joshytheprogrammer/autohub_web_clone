'use client'
 
import { useEffect } from 'react'
import { PuffLoader } from 'react-spinners'
 
export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div 
      className="col-span-12 bg-green-400 flex d-flex bg-green-50 border-shadow drop-shadow-lg md:block px-3 md:px-10 py-5 mt-3 rounded-2xl md: mb-0 h-[700px] justify-center item-center" 
      style={{ marginTop: '0px', paddingTop: '50px' }}
    >
        <div 
          className="container flex justify-center items-center ml-20"
          style={{ marginTop: '250px' }}
        >
            <PuffLoader color="#1c9236" />
            {/* <h2>Something went wrong!</h2>
            <button
              onClick={
                () => reset()
              }
            >
              Try again +
            </button> */}
        </div>
    </div>
  )
}