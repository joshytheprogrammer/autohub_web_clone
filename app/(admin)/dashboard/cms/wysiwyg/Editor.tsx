import Header from './Header'
import Content from './Content'

type EditorProps = 
{
    id: string
    name: string
    content: string
    onClick: (content: string) => void
}

export default function Wysiwyg({id, name, content, onClick}: EditorProps) 
{
  return (
      <div 
          className='w-full px-1 py-1 mx-auto border-2 border-gray-200 rounded-lg'
      >
          <div className='font-bold text-sm text-black ml-2 text-gray-400'>{name}</div>
          <Header value={id} />

          <Content id={id} content={content} onClick={(data: string) => { onClick(data); }} />
              
      </div>
  )
}