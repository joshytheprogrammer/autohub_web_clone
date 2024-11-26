import React, { useState } from 'react'
import Tiptap from './TipTap'
import { UseStore } from '../../../../../state/store'

export default function TextArea() 
{
   const advertState = UseStore((state) => state)
   const [text, setText] = useState<string>(advertState.getDescription())

   const TextChange = (e: string) => 
   {
      advertState.setDescription(e)
      setText(e)
   }

    return (
      <div 
          className='w-full' id={text}
      >
          <Tiptap content={''} onChange={(e) =>  TextChange(e) } 
          />
      </div>
    )
}
