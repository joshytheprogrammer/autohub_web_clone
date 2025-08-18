import { BASE_URL } from "../../../constant/Path"
import api from "../api"


export async function AutoHubSignUp(data: Member | Dealer)
{
    let endPoint = `auth/${data?.url}`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',    
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

export async function Authenticate(email: string, password: string)
{
    let endPoint = `auth/login`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',    
        },
        body: JSON.stringify({ email: email, password: password }),    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function ForgotPassword(email: string)
{
    let endPoint = `auth/forgot-password`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',    
        },
        body: JSON.stringify({ email: email }),    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function ChangeUserPassword(password: string, confirmPassword: string, currentPassword: string, token: string)
{
    let endPoint = `auth/change-password`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },
        body: JSON.stringify({ password: password, confirm_password: confirmPassword, current_password: currentPassword }),    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function NewPassword(password: string, confirmPassword: string, user: string)
{
    let endPoint = `auth/set-new-password`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: password, confirm_password: confirmPassword, user: user }),    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}