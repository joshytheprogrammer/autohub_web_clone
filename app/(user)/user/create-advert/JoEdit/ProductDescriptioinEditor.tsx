import JoditEditor from "jodit-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { UseStore } from "../../../../../state/store";


type DescriptionType = 
{
   customOnChange: (content: string) => void
   data?: string
}

const ProductDescriptioinEditor = ({ customOnChange, data = ""}: DescriptionType) => 
{
   const user = UseStore((state) => state)

   const [content, setContent] = useState("");
   const editor = useRef(null);
   
   const config =  useMemo(
      () => (
        {
          readonly: false,
          minHeight: 500,
          allowResizeX: true,
          allowResizeY: true
        }
      ), [content]
  )
  
  useEffect(() => 
  {
      user.setAgreement("")
      setContent(data)
  }, [])

  return (

         <>
            <div 
               className="w-full overflow-auto overflow-y-scroll justify-center h-[530px] item-center border border-b-8 border-t-8 border-gray-100"
            >
               <JoditEditor
                  ref={editor}
                  value={user.getDescription()}
                  config={config}
                  onBlur={(newContent) => setContent(newContent)}
                  onChange={(newContent) => {
                     user.setDescription(newContent)
                     customOnChange && customOnChange(newContent);
                     }
                  }
                  
               />
            </div>
              
         </>
  );

};

export default ProductDescriptioinEditor;