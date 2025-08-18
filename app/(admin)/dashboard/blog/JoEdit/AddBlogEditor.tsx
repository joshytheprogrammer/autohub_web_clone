import JoditEditor from "jodit-react";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { UseStore } from "../../../../../state/store";
import { useQuery } from "@tanstack/react-query";
import { AffiliateAgreementRegistration, AffiliateRegistrationAgreement } from "../../../../api/home/cms";
import { BeatLoader, PuffLoader } from "react-spinners";
import toast from "react-hot-toast";


const AddBlogEditor = ({customOnChange, theContent}: any) => 
{
   const user = UseStore((state) => state)
   const token: string = user.getUserToken()
   
   // const { data, isLoading, refetch } = useQuery({ queryKey: [`affilate-agreement`, token], queryFn: () => AffiliateAgreementRegistration(token)})
   // if(!isLoading)
   // {
   //    console.log(data)
   // }
   
   
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
      // user.setAgreement(data?.data)
      console.log("************")
  }, [])

  
  return (

         <>
              {
                 <> 
                        <div 
                           className="d-flex space-x-20 w-12/12 h-16 -mt-2 overflow-y-scroll h-[600px] scrollbar-track-white scrollbar-thin overflow-x-hidden px-1 mx-1 border-2 bg-white border-bg-[#d1dbea]"
                        >  
                        {/* <div 
                           className=""
                        >
                           <h1 
                              className='font-semibold text-blue-700 mb-5 uppercase'
                           >
                              Content
                           </h1> 
                        </div> */}
                        <div >
                           <JoditEditor
                              ref={editor}
                              value={theContent}
                              config={config}
                              onBlur={(newContent) => {
                                 customOnChange && customOnChange(newContent)
                                 setContent(newContent)
                              }}
                              onChange={(newContent) => 
                                 {
                                    // user.setAgreement(newContent)
                                    customOnChange && customOnChange(newContent)
                                 }
                              }
                           />
                        </div>
                     </div>

                     
                 </>
              }
         </>
  );

};

export default React.memo(AddBlogEditor);