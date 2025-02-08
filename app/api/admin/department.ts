import { BASE_URL } from "../../../constant/Path";


export async function Departments(token: string)
{
    let endPoint = 'admin/department/all'
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

export async function AddDepartment(name: string, description: string, token: string)
{
    let endPoint = `admin/department/create`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',      
          'Authorization': `Bearer ${token}`     
        },
        body: JSON.stringify({ name: name, description: description }),    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      const x: any = await response.json() 
      return x
}

export async function UpdateDepartment(id: number, name: string, description: string, token: string)
{
    let endPoint = `admin/department/update`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',      
          'Authorization': `Bearer ${token}`     
        },
        body: JSON.stringify({ id: id, name: name, description: description }),    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      const x: any = await response.json() 
      return x
}

export async function RemoveDepartment(id: number, token: string)
{
    let endPoint = `admin/department/delete`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',      
          'Authorization': `Bearer ${token}`     
        },
        body: JSON.stringify({ id: id }),    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      const x: any = await response.json() 
      return x
}