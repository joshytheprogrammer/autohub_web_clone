"use client"


import Access from './access'


export default function Page() 
{
      
      return (
            <>  
                  {/* <Access showLogo={false} goTo={`/user/adverts`} /> */}
                  <Access showLogo={true} goTo={`/`} />
            </>
      )
}
