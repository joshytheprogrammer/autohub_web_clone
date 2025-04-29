import { useRef, useMemo, useState, useEffect } from 'react'
import JoditEditor from 'jodit-react'
import { UseStore } from '../../../../../state/store'
// import './joedit.css';

type EditJo = 
{
   content: string 
   setContent: (data: string) => void
}

const Jodit = ({ content, setContent }: EditJo) => 
{
   const dataState = UseStore((state) => state)  
   const[theData, setTheData] = useState<string>("")
   
   const editor = useRef(null)

   const updateContent = (e: string) => 
   {
      dataState.setAgreement(e)
   }

  //  useEffect(() => 
  //  {
  //     setTheData(dataState.setAgreement(content))
  //  }, [])
   
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

   return (

        <div 
          className=''
        >
            <JoditEditor
               ref={editor}
               value={dataState.getAgreement()}
               config={config}
               tabIndex={1} // tabIndex of textarea
               onBlur={(newContent) => 
                 {
                    updateContent(newContent)
                    setContent(newContent)
                 }
               } // preferred to use only this option to update the content for performance reasons
            />
        </div>

    )
}
export default Jodit
