import React, { useState } from 'react'
import { UseStore } from '../../../../../state/store'
// import ProductDescriptioinEditor from './ProductDescriptioinEditor'
import dynamic from 'next/dynamic'

const ProductDescriptioinEditor = dynamic(
    () => import('./ProductDescriptioinEditor'),
    {
       ssr: false
    }
   )

type TheTextArea = {
    onClick: (content: string) => void
}

export default function TextArea({ onClick }: TheTextArea)
{
   const advertState = UseStore((state) => state)
   const [text, setText] = useState<string>(advertState.getDescription())

   const TextChange = (e: string) => 
   {
      advertState.setDescription(e)
      setText(e)
      onClick(e)
   }

    return (
      <div 
          className='w-full' id={text}
      >
          {/* <Tiptap content={''} onChange={(e) =>  TextChange(e) } 
          /> */}
          <ProductDescriptioinEditor
              data={advertState.getDescription()}
              customOnChange={
                (content: string) => {
                  setTimeout(() => 
                  {                                                    
                    if(content?.length === 0 || content === "" || content === "<p><br></p>" ||  content === "<p></p>")
                    {                              
                      // setTheDescription("")
                      // advertState.setDescription("")
                      // setDescriptionMessage(DESCRIPTION_MESSAGE)
                    } else {                                                    
                      // setTheDescription(content)
                      // setDescriptionMessage("")
                      // advertState.setDescription(content)
                    }
                  }, 100)
                 }
                }  
            />
      </div>
    )
}
