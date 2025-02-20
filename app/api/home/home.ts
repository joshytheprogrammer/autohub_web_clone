import { BASE_URL } from "../../../constant/Path";


export async function ApplicationData()
{
    let endPoint = 'landing-data'
    let ApiUrl = `${BASE_URL}${endPoint}`
    try 
    {
        let response = await fetch(ApiUrl)
        // const response = await fetch(ApiUrl, 
        // {
        //     method: 'GET',    
        //     headers: {    
        //       'Content-Type': 'application/json'    
        //     }
        // })  
        if(!response.ok)
        {
            throw new Error(`HTTP Error! status: ${response}`)
            // return { status: false, data: response } 
        } 
        const result = await response.json() 
        return { status: true, data: result }

    } catch (error) {
        return { status: false, data: error } 
    }
}

export async function Detail(slug: string, token: string)
{
    let endPoint = `detail/`
    let ApiUrl = `${BASE_URL}${endPoint}${slug}`

    const response = await fetch(ApiUrl, 
    {
        method: 'GET',    
        headers: {    
          'Content-Type': 'application/json',      
          'Authorization': `Bearer ${token}`     
        }
    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
        // return response.status
      } else {
        const x: any = await response.json() 
        return x
      }
}

export async function LogOutUser(token: string)
{
    let endPoint = `auth/logout`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',      
          'Authorization': `Bearer ${token}`     
        }
    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      const x: any = await response.json() 
      return x
}

export async function UserInfo(token: string)
{
  if(token)
  {
    let endPoint = `member/user-info`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'GET',    
        headers: {    
          'Content-Type': 'application/json',      
          'Authorization': `Bearer ${token}`     
        }
    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      const x: any = await response.json() 
      return x
  } else {
      return "anonymous"
  }
    
}