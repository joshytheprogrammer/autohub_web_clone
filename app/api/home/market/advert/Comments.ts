import { BASE_URL } from "../../../../../constant/Path"


export type ProductCommentProps =
{
    product_id: string
    vendor_id: string 
    comments: string
}

export async function ProductComments(ProductId: number)
{
    let endPoint = `product/comments/${ProductId}`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'GET',    
        headers: {    
          'Content-Type': 'application/json',    
        }
    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      const x = await response.json() 
      return x?.data
}

export async function Comments(data: ProductCommentProps, token: string, userType: string)
{
    let endPoint = `${userType}/comment`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',      
          'Authorization': `Bearer ${token}`  
        },    
        body: JSON.stringify(data),
    
      })    
      return await response.json()    
}

export async function FlUnFlow(Vendor: Number, token: string, userType: string)
{
    let endPoint = `${userType}/flw-unflw`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',     
          'Authorization': `Bearer ${token}`   
        },    
        body: JSON.stringify({ vendor: Vendor }),
    
      })    
      return await response.json()    
}

export async function Followers(user: number, token ='', usertype = '')
{
    let endPoint = `followers`    
    if(token)
    {      
      let ApiUrl = `${BASE_URL}${usertype}/${endPoint}/${user}`
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
      const x = await response.json() 
      return x

    } else {
      let ApiUrl = `${BASE_URL}${endPoint}/${user}`
      const response = await fetch(ApiUrl, 
      {
        method: 'GET',    
        headers: {    
          'Content-Type': 'application/json'
        }
     
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      const x = await response.json() 
      return x
    }      
}

export async function UserWishList(productId: number, token: string, type: string)
{
    let endPoint = `${type}/wish-list`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',      
          'Authorization': `Bearer ${token}`     
        },
        body: JSON.stringify({ product_id: productId }),    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      const x = await response.json()
      return x
}

export async function ProductWishList(token: string, type: string)
{
    let endPoint = `${type}/wish-list`
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