import { BASE_URL } from "../../../../../constant/Path"


export async function GetModel(currentPage: number, perPage: number, searchQuery: string, type: number | string, token: string)
{     
    let theQuery: string = searchQuery.trim()
    let endPoint = (theQuery.length === 0) ? `product-entry/model/${currentPage}/${perPage}/${type}` :  `product-entry/model/${currentPage}/${perPage}/${theQuery}/${type}`
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

export async function AddModel(manufactureId: number, name: string, rate: number, token: string)
{
    let endPoint = `product-entry/model/create`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ manufacturer_id: manufactureId, name: name, rate: rate })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function UpdateModel(id: number,  manufactureId: number, name: string, rate: number, token: string)
{
    let endPoint = `product-entry/model/update`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ id: id, manufacturer_id: manufactureId,  name: name, rate: rate })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function RemoveModel(id: number, token: string)
{
    let endPoint = `product-entry/model/delete`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ id: id })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}
