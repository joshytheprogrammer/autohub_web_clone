import { BASE_URL } from "../../../constant/Path"


export async function MemberProfileDetail(token: string)
{
    let endPoint = `member/profile`
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
      return await response.json()
}

export async function MemberProfile(data: Member, token: string)
{
    let endPoint = `member/update-profile`
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
      return await response.json()
}

export async function ProfilePicture(token: string)
{
    let endPoint = `member/profile-picture`
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
      return await response.json()
}

export async function Profile(picture: string, token: string)
{
    let endPoint = `member/picture`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',    
          'Authorization': `Bearer ${token}`    
        },   
        body: JSON.stringify({ picture: picture }), 
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}