import { BASE_URL } from "../../../../constant/Path"


export async function GetUsers(currentPage: number, perPage: number, searchQuery: string, token: string)
{
    let theQuery: string = searchQuery.trim()
    let endPoint = (theQuery.length === 0) ? `user/users/${currentPage}/${perPage}` :  `user/users/${currentPage}/${perPage}/${theQuery}`
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

export async function ActionOnUser(id: number, action: string, token: string)
{
    let endPoint = `user/action`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ id: id, action: action })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function GetMembers(currentPage: number, perPage: number, searchQuery: string, token: string)
{
    let theQuery: string = searchQuery.trim()
    let endPoint = (theQuery.length === 0) ? `user/members/${currentPage}/${perPage}` :  `user/members/${currentPage}/${perPage}/${theQuery}`
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

export async function GetDealers(currentPage: number, perPage: number, searchQuery: string, token: string)
{
    let theQuery: string = searchQuery.trim()
    let endPoint = (theQuery.length === 0) ? `user/dealers/${currentPage}/${perPage}` :  `user/dealers/${currentPage}/${perPage}/${theQuery}`
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

export async function GetStaffs(currentPage: number, perPage: number, searchQuery: string, token: string)
{
    let theQuery: string = searchQuery.trim()
    let endPoint = (theQuery.length === 0) ? `user/staffs/${currentPage}/${perPage}` :  `user/staffs/${currentPage}/${perPage}/${theQuery}`
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

export async function NewStaff(data: { firstname: string, surname: string, phone: string, email: string, departmentId: number, roleId: number, token: string })
{
    let endPoint = `user/new-staff`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data?.token}`   
        },   
        body: JSON.stringify({ firstname: data?.firstname, surname: data?.surname, phone: data?.phone, email: data?.email, role_id: data?.roleId, department_id: data?.departmentId })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function ChangeDepartment(userId: number, departmentId: number, token: string)
{
    let endPoint = `user/change-department`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',      
          'Authorization': `Bearer ${token}`     
        },
        body: JSON.stringify({ user_id: userId, department_id: departmentId }),    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      const x: any = await response.json() 
      return x
}

export async function ChangeRole(userId: number, roleId: number, token: string)
{
    let endPoint = `user/change-role`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',      
          'Authorization': `Bearer ${token}`     
        },
        body: JSON.stringify({ user_id: userId, role_id: roleId }),    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      const x: any = await response.json() 
      return x
}