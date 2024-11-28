'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { useEffect, useState } from 'react'
import Toolbar from './Toolbar'
import { UseStore } from '../../../../../state/store'


type ContentProps = 
{
   content: string 
   onChange: (data: string) => void
}

const Tiptap = ({content, onChange} : ContentProps) => 
{ 
   const advertState = UseStore((state) => state)    
   const [writeUp, setWriteUp] = useState<string>(advertState.getDescription())
    const changeText = (e: string) => 
    {
       onChange(e)
    }

    const editor = useEditor({
      extensions: [StarterKit, Underline],
      editorProps: {
         attributes: {
            class: 'flex flex-col px-1 py-3 justify-start border-b border-r border-l border-gray-400 auto-scroll overflow-auto overflow-y-scroll h-[200px] shadow-md items-start w-full gap-3 font-medium text-[17px] pt-4 rounded-bl-md rounded-br-md outline-none'
         },
      },
      onUpdate:  ({ editor }) => 
      {
         setWriteUp(editor.getHTML())
         changeText(editor.getHTML())
      },
      content: writeUp,
      editable: true,
      autofocus: true

    }, [content])

    useEffect(() => 
    {
        editor?.commands.setContent(writeUp)
    }, []);

    return (
        <div 
            className=''
        >
            <Toolbar editor={editor} />
            <EditorContent style={{ whiteSpace: 'pre-line' }} editor={editor} content={writeUp} />
        </div>
    )
}

export default Tiptap
