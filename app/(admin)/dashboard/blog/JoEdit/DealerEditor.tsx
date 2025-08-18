import JoditEditor from "jodit-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { UseStore } from "../../../../../state/store";
import { useQuery } from "@tanstack/react-query";
import { DealerAgreement, DealerRegistration } from "../../../../api/home/cms";
import { BeatLoader, PuffLoader } from "react-spinners";
import toast from "react-hot-toast";


const DealerEditor = ({customOnChange}: any) => 
{
   const user = UseStore((state) => state)
   const token: string = user.getUserToken()
   
   const { data, isLoading, refetch } = useQuery({ queryKey: [`dealer-agreement`, token], queryFn: () => DealerRegistration(token)})
   if(!isLoading)
   {
      console.log(data)
   }
   
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
      // return false
      const agreement = content ? content : data?.data
      const newCourse = DealerAgreement(token, agreement)
      newCourse.then((response: any) => 
      {
         if(response?.status === 200)
         {
            refetch()                    
            setIsLoading(false)    
            toast.success(response?.message, {
                   position: "top-center",
            });
         } else {
            setErrorMessage(response?.message)
            setIsLoading(false)
            setTimeout(() => 
            {
              setErrorMessage("")
            }, 5000)
            toast.error(response?.data, {
                   position: "top-center",
           });
         }
      }).   catch(() => {
           
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
                        Affiliate Agreement
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

export default DealerEditor;