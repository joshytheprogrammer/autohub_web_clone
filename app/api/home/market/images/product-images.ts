import { BASE_URL } from "../../../../../constant/Path"



export async function Images(productId: number, usertype: string, token: string)
{
    let endPoint = `${usertype}/product-images/${productId}`
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

export async function FaceImage(imageId: number, productId: number, usertype: string, token: string)
{
    let endPoint = `${usertype}/face-image`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',        
          'Authorization': `Bearer ${token}`
        },    
        body: JSON.stringify({ image_id: imageId,  product_id: productId}),
    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      const x: any = await response.json() 
      return x
}

export async function AddImage(productId: number, picture: string, usertype: string, token: string)
{
    let endPoint = `${usertype}/add-product-image`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',     
          'Authorization': `Bearer ${token}`   
        },    
        body: JSON.stringify({ product_id: productId, picture: picture }),
    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      const x: any = await response.json() 
      return x
}

export async function DeleteImage(imageId: number, productId: number, usertype: string, token: string)
{
    let endPoint = `${usertype}/remove-image`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',        
          'Authorization': `Bearer ${token}`
        },    
        body: JSON.stringify({ image_id: imageId, product_id: productId }),
    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      const x: any = await response.json() 
      return x
}