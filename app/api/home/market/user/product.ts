import { BASE_URL } from "../../../../../constant/Path"



export async function ActiveProducts(currentPage: number, perPage: number, token: string, userType: string)
{
    let endPoint = `${userType}/user-active-product/${currentPage}/${perPage}`
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
}

export async function PendingProducts(currentPage: number, perPage: number, token: string, userType: string)
{
    let endPoint = `${userType}/user-pending-product/${currentPage}/${perPage}`
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
}

export async function DraftProducts(currentPage: number, perPage: number, token: string, userType: string)
{
    let endPoint = `${userType}/user-draft-product/${currentPage}/${perPage}`
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
}

export async function SoldProducts(currentPage: number, perPage: number, token: string, userType: string)
{
    let endPoint = `${userType}/user-sold-product/${currentPage}/${perPage}`
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
}

export async function WishListProducts(currentPage: number, perPage: number, token: string, userType: string)
{
    let endPoint = `${userType}/user-wishlist/${currentPage}/${perPage}`
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
}

export async function MakeProductActive(productId: number, token: string, userType: string)
{
    let endPoint = `${userType}/save-draft`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',      
          'Authorization': `Bearer ${token}`     
        },
        body: JSON.stringify({ product_id: productId})
    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      const x: any = await response.json() 
      return x
}

export async function DeleteProduct(productId: number, usertype: string, token: string)
{
    let endPoint = `${usertype}/remove-product`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',        
          'Authorization': `Bearer ${token}`   
        },    
        body: JSON.stringify({ product_id: productId}),
    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      const x: any = await response.json() 
      return x
}

export async function RemoveUserWishList(productId: number, usertype: string, token: string)
{
    let endPoint = `${usertype}/remove-wish-list`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',        
          'Authorization': `Bearer ${token}`   
        },    
        body: JSON.stringify({ product_id: productId}),
    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      const x: any = await response.json() 
      return x
}

export async function MarkProductSold(productId: number, usertype: string, token: string)
{
    let endPoint = `${usertype}/mark-as-sold`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',        
          'Authorization': `Bearer ${token}`
        },    
        body: JSON.stringify({ product_id: productId}),
    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      const x: any = await response.json() 
      return x
}