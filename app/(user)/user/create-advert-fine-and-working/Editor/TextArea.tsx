import React, { useState } from 'react'
import Tiptap from './TipTap'
import { UseStore } from '../../../../../state/store'

type TheTextArea = {
    onClick: (categoryId: string) => void
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
          <Tiptap content={''} onChange={(e) =>  TextChange(e) } 
          />
      </div>
    )
}
