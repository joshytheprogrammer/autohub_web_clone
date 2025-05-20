import { BASE_URL } from "../../../constant/Path"


export async function DealerProfileDetail(token: string)
{
    let endPoint = `dealer/profile`
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

export async function DealerProfile(data: Dealer, token: string)
{
    let endPoint = `dealer/update-profile`
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
    let endPoint = `dealer/profile-picture`
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
    let endPoint = `dealer/picture`
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

export async function BecomeADealer(companyName: string, companyAddress: string, token: string)
{
    let endPoint = `member/become-a-dealer`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',   
          'Authorization': `Bearer ${token}`  
        },   
        body: JSON.stringify({ company_name: companyName, company_address: companyAddress }), 
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      const x =  await response.json()
      console.log(x)
      return x
}