import { BASE_URL } from "../../../../../constant/Path"


export async function GetTrim(currentPage: number, perPage: number, searchQuery: string, type: number | string, token: string)
{     
    let theQuery: string = searchQuery.trim()
    let endPoint = (theQuery.length === 0) ? `product-entry/trim/${currentPage}/${perPage}/${type}` :  `product-entry/trim/${currentPage}/${perPage}/${theQuery}/${type}`
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

export async function AddTrim(manufactureId: number, modelId: number, name: string, rate: number, token: string)
{
    let endPoint = `product-entry/trim/create`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ manufacturer_id: manufactureId, model_id: modelId, name: name, rate: rate })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function UpdateTrim(id: number,  manufactureId: number, modelId: number, name: string, rate: number, token: string)
{
    let endPoint = `product-entry/trim/update`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ id: id, manufacturer_id: manufactureId, model_id: modelId, name: name, rate: rate })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function RemoveTrim(id: number, token: string)
{
    let endPoint = `product-entry/trim/delete`
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
