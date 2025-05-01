import JoditEditor from "jodit-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { UseStore } from "../../../../../state/store";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { AgreementRegistration, RegistrationAgreement } from "../../../../api/home/cms";
import { BeatLoader, PuffLoader } from "react-spinners";


const Editor = ({customOnChange}: any) => 
{
   const user = UseStore((state) => state)
   const token: string = user.getUserToken()
   
   const { data, isLoading, refetch } = useQuery({ queryKey: [`agreement-detail`, token], queryFn: () => AgreementRegistration(token)})
   
   const [loading, setIsLoading] = useState<boolean>(false) 
   const [errorMessage, setErrorMessage] = useState<string>("")

   const [content, setContent] = useState("");
   const editor = useRef(null);
   
   const config =  useMemo(
      () => (
        {
          readonly: false,
          minHeight: 600,
          allowResizeX: true,
          allowResizeY: true
        }
      ), [content]
  )
  
  useEffect(() => 
  {
      user.setAgreement(data?.data)
  }, [])   
              
  const SaveAgreement = async () => 
  {
      setIsLoading(true) 
      console.log(user.getAgreement())
      // return false
      const newCourse = RegistrationAgreement(token, user.getAgreement())
      newCourse.then((response: any) => 
      {
         if(response?.status === 200)
         {
            refetch()                    
            setIsLoading(false)    
         } else {
            setErrorMessage(response?.message)
            setIsLoading(false)
            setTimeout(() => 
            {
              setErrorMessage("")
            }, 5000)
         }
      }).catch(() => {
           
      })
  }

  return (

         <>
              {
                  isLoading &&  <div 
                              className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                          >
                              <PuffLoader className='w-12 h-12' color="black" />
                    </div>
              } 

              {
                 !isLoading && <>  
                     <h1 
                        className='font-semibold text-blue-700 mb-5 uppercase'
                     >
                        Member Agreement
                     </h1>                   
                     <div>
                        <JoditEditor
                           ref={editor}
                           value={data?.data}
                           config={config}
                           onBlur={(newContent) => setContent(newContent)}
                           onChange={(newContent) => {
                              console.log(newContent)
                              user.setAgreement(newContent)
                              customOnChange && customOnChange(newContent);
                           }}
                        />
                     </div>

                     <button 
                        className="px-5 py-3 bg-blue-600 mt-5 mb-10 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                        onClick={() => SaveAgreement()}
                        >
                        { loading ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Save" ) } 
         </button>
                 </>
              }
         </>
  );

};

export default Editor;