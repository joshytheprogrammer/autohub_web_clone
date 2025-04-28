import React, { useState } from 'react'
import Tiptap from './TipTap'
import { UseStore } from '../../../../../state/store'

type TheTextArea = {
    onClickIt: (agreement: string) => void
}

export default function TextArea({ onClickIt }: TheTextArea) 
{
   const advertState = UseStore((state) => state)
   const [text, setText] = useState<string>(advertState.getAgreement())

   const TextChange = (e: string) => 
   {
       advertState.setAgreement(e)
       setText(e)
       onClickIt(e)
   }

    return (
      <div 
          className='w-full' id={text}
      >
          <Tiptap content={''} onChange={(e) => TextChange(e) } 
          />
      </div>
    )
}
