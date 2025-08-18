import React from 'react'
import { Bold, Italic, ListOrdered, Underline  } from "lucide-react"
// import { Bold, Strikethrough, Italic, List, ListOrdered, Heading2, Underline, Quote, Undo, Redo, Code } from "lucide-react"
import { Editor } from '@tiptap/react'

type ToolProps =
{
   editor: Editor | null
}


export default function Toolbar({ editor } : ToolProps) 
{
    if(!editor)
    {
       return null
    }
    return (
      <div 
          className='px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start gap-5 w-full flex-wrap border border-black-500 shadow-md bg-white'
      >
          <div 
              className='flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap'
          >
              <button onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleBold().run();
                }}
                className={editor.isActive("bold") ? "bg-red-700 text-white p-2 rounded-lg" : "text-sky-400 border-2 p-2 rounded-lg" }
                >
                 <Bold className='w-4 h-4' />
              </button>
              <button onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleItalic().run();
                }}
                className={editor.isActive("italic") ? "bg-red-700 text-white p-2 rounded-lg" : "text-sky-400 border-2 p-2 rounded-lg" }
              >
                 <Italic className='w-4 h-4' />
              </button>
              <button onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleOrderedList().run();
                }}
                className={editor.isActive("orderedList") ? "bg-red-700 text-white p-2 rounded-lg" : "text-sky-400 border-2 p-2 rounded-lg" }
              >
                 <ListOrdered className='w-4 h-4' />
              </button>
              <button onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleUnderline().run();
                }}
                className={editor.isActive("underline") ? "bg-red-700 text-white p-2 rounded-lg" : "text-sky-400 border-2 p-2 rounded-lg" }
              >
                 <Underline className='w-4 h-4' />
              </button>
          </div>        
      </div>
    )
}
