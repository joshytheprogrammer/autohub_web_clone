type MessageProps = 
{
    msg: string,
    status: string,
    customStyle?: string
}

export default function Message({msg, status, customStyle}: MessageProps) 
{

    const style: string = `w-full ${status} ${customStyle}`

    return (
      <>
          {
              msg && <div className={`${style}`}
              >
                  {msg}  
              </div>
          }
      </>
    )
}
