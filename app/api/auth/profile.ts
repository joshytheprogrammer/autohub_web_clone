import { BASE_URL } from "../../../constant/Path"


export async function UserDetail(url: string, token: string)
{
    let endPoint = `${url}`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'GET',    
        headers: {    
          'Content-Type': 'application/json',      
          'Authorization': `Bearer ${token}`  
        },  
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      const x = await response.json()
      return x
}

export async function UserProfile(data: Member | Dealer, token: string)
{
    let endPoint = `${data?.url}`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',       
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ data: data }),    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      const x = await response.json()
      return x
}

export async function ChangeProfilePicture(passport: string, userType: string, token: string)
{
    let endPoint = `${userType}/change-picture`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',       
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ passport: passport }),    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      const x = await response.json()
      return x
}