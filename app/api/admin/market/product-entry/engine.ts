import { BASE_URL } from "../../../../../constant/Path"


export async function GetEngine(currentPage: number, perPage: number, searchQuery: string, type: number | string, token: string)
{     
    let theQuery: string = searchQuery.trim()
    let endPoint = (theQuery.length === 0) ? `product-entry/engine/${currentPage}/${perPage}/${type}` :  `product-entry/engine/${currentPage}/${perPage}/${theQuery}/${type}`
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

export async function AddEngine(manufactureId: number, modelId: number, tridId: number, name: string, rate: number, token: string)
{
    let endPoint = `product-entry/engine/create`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ manufacturer_id: manufactureId, model_id: modelId, trim_id: tridId, name: name, rate: rate })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function UpdateEngine(id: number,  manufactureId: number, modelId: number, tridId: number, name: string, rate: number, token: string)
{
    let endPoint = `product-entry/engine/update`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ id: id, manufacturer_id: manufactureId, model_id: modelId, trim_id: tridId, name: name, rate: rate })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function RemoveEngine(id: number, token: string)
{
    let endPoint = `product-entry/engine/delete`
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
