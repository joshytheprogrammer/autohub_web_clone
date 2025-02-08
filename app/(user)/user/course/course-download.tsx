"use client"

import { useState } from "react"
import { UseStore } from "../../../../state/store"
import { useQuery } from "@tanstack/react-query"
import { Courses } from "../../../api/admin/academic/student"
// import { Icons } from "../../../../components/shared/Icons"
import axios from "axios"
import { BASE_URL } from "../../../../constant/Path"
import { PuffLoader } from "react-spinners"

export const downloadPdfFile = async (x: any, token: string) =>
{
    let id = x?.id
    if(x?.file_name === null)
    {
        alert('Course Material Not Available')
    } else {
      await axios.get(`${BASE_URL}student/download-document/${id}`, 
        { 
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token ? `Bearer ${token}` : "",
          },
          responseType: 'blob' 
        })
        .then((response: any) => 
        {  
            window.open(URL.createObjectURL(response.data));
        }).catch(() => {                      
            return false;
        })
    }
}

export default function CourseDownload() 
{
  const userToken = UseStore((state) => state)
  const token: string = userToken.getUserToken()

  const { data, isLoading, refetch } = useQuery({ queryKey: [`student-courses`], queryFn: () => Courses(token) })

  return (
    <>
          {
            isLoading && 
              <div 
                className="col-span-12 h-[300px] flex justify-center items-center" 
                style={{ marginTop: '30px', paddingTop: '20px' }}
            >
                <PuffLoader color="#1c9236" />
            </div>
        }
        {  !isLoading &&
           (data?.data?.length === 0) && <div className="col-span-12 h-[500px] flex justify-center items-center border border-3 border-shadow border-green-200 bg-[#f5fbf7]" style={{ marginTop: '30px', paddingTop: '20px' }}>
               <h1 
                  className="font-bold"
                >
                    No course created yet
                </h1>
            </div>
        }
        
        { !isLoading &&
           (data?.data?.length > 0) && 
              <div 
                className="col-span-12 mt-0 md:mt-5"
              >                      
                <div 
                  className="font-bold text-xl mb-5 text-blue-700 mt-5 md:mt-0"
                >
                  MACEOS ACADEMY COURSES
                </div> 
                <span 
                  className="col-span-12 font-bold text-red-800 text-sm -mt-3 mb-3"
                >
                  Download Course
                </span>
            </div>
        }
        
        { !isLoading &&
          (data?.data?.length > 0) && data?.data?.map((x: any, index: number) => {
            // let hasFile = (x.file_name != null) ? "cursor-pointer" : ""
            return (
                <button
                    key={index}
                    disabled={(x.loadable === 0) ? true : false}
                    onClick={
                        () => {
                           downloadPdfFile(x, token) 
                        }
                      }
                      className={`text-md text-left md:col-span-4 col-span-12 px-2 py-2 mb-1 justify-center w-full font-bold text-black gap-2 ring-2 ring-blue-100 hover:bg-green-100 rounded-lg px-1 border border-solid 
                                   border-blue-400 flex justify-between px-5 ${(x.loadable === 1) ? 'bg-green-500 text-white hover:bg-green-800' : ''}`}
                >
                   {x.name}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-4 h-4">
                    <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                  </svg>
                </button>
            )
          })
        }
        <div className="p-5"></div>
    </>
  );
}
