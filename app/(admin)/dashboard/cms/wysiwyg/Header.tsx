import { useEffect } from 'react'
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight, FaBold, FaCode, FaImage, FaImages, FaIndent, FaItalic, FaLink, FaList, FaListOl, FaListUl, FaOutdent, FaRedo, FaUnderline, FaUndo, FaUnlink } from 'react-icons/fa'

export default function Header(value: { value: string }) 
{
  const Headings: string[] = ["H1", "H2", "H3", "H4", "H5", "H6"]
  const FontNames: string[] = ["Times New Roman", "Arial"]

  useEffect(() => 
  {
      const Bold: any  = document.querySelectorAll('#bold')
    //   const Underline: any  = document.querySelectorAll('#underline')
    //   const Italics: any  = document.querySelectorAll('#italic')
    //   const Redo: any  = document.querySelectorAll('#redo')
    //   const Undo: any  = document.querySelectorAll('#undo')
    //   const Left: any  = document.querySelectorAll('#left')
    //   const Center: any  = document.querySelectorAll('#center')
    //   const Right: any  = document.querySelectorAll('#right')
    //   const Justify: any  = document.querySelectorAll('#justify')
    //   const BulletBlockOrder: any  = document.querySelectorAll('#blockOrder')
    //   const NumberOrder: any  = document.querySelectorAll('#numberOrder')
    //   const BulletRoundOrder: any  = document.querySelectorAll('#rounderOrder')
    //   const Link: any  = document.querySelectorAll('#link')
    //   const Unlink: any  = document.querySelectorAll('#unlink')
    //   const Image: any  = document.querySelectorAll('#image')
    //   const Images: any  = document.querySelectorAll('#images')
    //   const ForwardIndent: any  = document.querySelectorAll('#forwardIntent')
    //   const BackWardIndent: any  = document.querySelectorAll('#backwardIntent')
    //   const Heading: any  = document.querySelectorAll('#heading')
    //   const FontFamily: any  = document.querySelectorAll('#fontFamily')
    //   const FontColor: any  = document.querySelectorAll('#fontColor')
    //   const HightlightColor: any  = document.querySelectorAll('#highlightColor')

    //   console.log(Bold)
  }, [])
  
  
  const formatDoc = (cmd: any, value:any =  null) => 
  {
     if(value)
     {
        document.execCommand(cmd, true, value)
     } else { 
        document.execCommand(cmd)
     }
  } 
  

  return (
      <div 
          className='w-full px-1 py-1 mx-auto overflow-x-auto'
      >
          <div 
              className='container flex px-5 py-6 md:py-4 bg-blue-100 gap-2 overflow-x-auto'
          >   
              <div 
                  className='p-2 rounded-full border-2 border-gray-100 bg-white hover:text-blue-400 cursor-pointer'
                  id='bold' onClick={() => formatDoc('bold')}
              >
                  <FaBold />
              </div>
              <div 
                  className='p-2 rounded-full border-2 border-gray-100 bg-white hover:text-blue-400 cursor-pointer'
                  id='underline' onClick={() => {
                      alert("+++")
                  }}
              >
                  <FaUnderline />
              </div>
              <div 
                  className='p-2 rounded-full border-2 border-gray-100 bg-white hover:text-blue-400 cursor-pointer'
                  id='italic' onClick={() => {
                      alert("+++")
                  }}
              >
                  <FaItalic />
              </div>
              <div 
                  className='p-2 rounded-full border-2 border-gray-100 bg-white hover:text-blue-400 cursor-pointer'
                  id='redo' onClick={() => {
                      alert("+++")
                  }}
              >
                  <FaRedo />
              </div>
              <div 
                  className='p-2 rounded-full border-2 border-gray-100 bg-white hover:text-blue-400 cursor-pointer'
                  id='left' onClick={() => {
                      alert("+++")
                  }}
              >
                  <FaAlignLeft />
              </div>
              <div 
                  className='p-2 rounded-full border-2 border-gray-100 bg-white hover:text-blue-400 cursor-pointer'
                  id='center' onClick={() => {
                      alert("+++")
                  }}
              >
                  <FaAlignCenter />
              </div>
              <div 
                  className='p-2 rounded-full border-2 border-gray-100 bg-white hover:text-blue-400 cursor-pointer'
                  id='right' onClick={() => {
                      alert("+++")
                  }}
              >
                  <FaAlignRight />
              </div>
              <div 
                  className='p-2 rounded-full border-2 border-gray-100 bg-white hover:text-blue-400 cursor-pointer'
                  id='justify' onClick={() => {
                      alert("+++")
                  }}
              >
                  <FaAlignJustify />
              </div>
              <div 
                  className='p-2 rounded-full border-2 border-gray-100 bg-white hover:text-blue-400 cursor-pointer'
                  id='undo' onClick={() => {
                      alert("+++")
                  }}
              >
                  <FaUndo />
              </div>
              <div 
                  className='p-2 rounded-full border-2 border-gray-100 bg-white hover:text-blue-400 cursor-pointer'
                  id='blockList' onClick={() => {
                      alert("+++")
                  }}
              >
                  <FaList />
              </div>
              <div 
                  className='p-2 rounded-full border-2 border-gray-100 bg-white hover:text-blue-400 cursor-pointer'
                  id='bold' onClick={() => {
                      alert("+++")
                  }}
              >
                  <FaListOl />
              </div>
              <div 
                  className='p-2 rounded-full border-2 border-gray-100 bg-white hover:text-blue-400 cursor-pointer'
                  id='blockList' onClick={() => {
                      alert("+++")
                  }}
              >
                  <FaListUl />
              </div>
              <div 
                  className='p-2 rounded-full border-2 border-gray-100 bg-white hover:text-blue-400 cursor-pointer'
                  id='link' onClick={() => {
                      alert("+++")
                  }}
              >
                  <FaLink />
              </div>
              <div 
                  className='p-2 rounded-full border-2 border-gray-100 bg-white hover:text-blue-400 cursor-pointer'
                  id='unlink' onClick={() => {
                      alert("+++")
                  }}
              >
                  <FaUnlink />
              </div>
              <div 
                  className='p-2 rounded-full border-2 border-gray-100 bg-white hover:text-blue-400 cursor-pointer'
                  id='image' onClick={() => {
                      alert("+++")
                  }}
              >
                  <FaImage />
              </div>
              <div 
                  className='p-2 rounded-full border-2 border-gray-100 bg-white hover:text-blue-400 cursor-pointer'
                  id='images' onClick={() => {
                      alert("+++")
                  }}
              >
                  <FaImages />
              </div>
              <div 
                  className='p-2 rounded-full border-2 border-gray-100 bg-white hover:text-blue-400 cursor-pointer'
                  id='forwardIndent' onClick={() => {
                      alert("+++")
                  }}
              >
                  <FaIndent />
              </div>
              <div 
                  className='p-2 rounded-full border-2 border-gray-100 bg-white hover:text-blue-400 cursor-pointer'
                  id='backwardIntent' onClick={() => {
                      alert("+++")
                  }}
              >
                  <FaOutdent />
              </div>
              <div 
                  className='p-2 rounded-full border-2 border-gray-100 bg-white hover:text-blue-400 cursor-pointer'
                  id='backwardIntent' onClick={() => {
                      alert("+++")
                  }}
              >
                  <FaCode />
              </div>
          </div>   

          <div 
              className='container flex px-5 py-6 md:py-4 bg-blue-100 bg-blue-100 gap-2 overflow-x-auto'
          > 
              <div 
                  className="relative"
              >
                  <select onChange={() => {  

                      }
                      } id='heading' className="block appearance-none w-fit bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                      {
                        Headings.map((size: string, index: number) => {
                            return (
                              <option key={index} value={size}> {size} </option>
                            )
                        })
                      }
                  </select>
                  <div 
                      className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                  >
                      <svg className="fill-current h-4 w-4" 
                           xmlns="http://www.w3.org/2000/svg" 
                           viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                      />
                      </svg>
                  </div>
              </div>

              <div 
                  className="relative"
              >
                  <select 
                        onChange={() => {   
                        }
                      } id='fontFamily' className="block appearance-none w-fit bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                      {
                          FontNames.map((size: string, index: number) => {
                            return (
                                <option key={index} value={size}> {size} </option>
                            )
                          })
                      }
                  </select>
                  <div 
                      className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                  >
                      <svg className="fill-current h-4 w-4" 
                           xmlns="http://www.w3.org/2000/svg" 
                           viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                      />
                      </svg>
                  </div>
              </div>

              <div 
                  className='p-1 w-fit rounded-md flex justify-center items-center gap-2 pr-2 bg-white border-2 border-gray-300 hover:text-blue-400 cursor-pointer'>
                  <input type='color' 
                        id='fontColor' onClick={() => {
                            alert("+++")
                        }
                    }
                  /> 
                  <span 
                      className='w-fit text-nowrap'
                  >
                    Font Color
                  </span>
              </div>

              <div 
                  className='p-1 rounded-md flex justify-center items-center gap-2 pr-2 bg-white border-2 border-gray-300 hover:text-blue-400 cursor-pointer'>
                  <input type='highlightColor' 
                         id='fontBold' onClick={() => {
                            
                         }
                    }
                  /> 
                  <span 
                      className='w-fit text-nowrap'
                  >
                    Highlight Color
                  </span>
              </div>

          </div>

      </div>
  )
}