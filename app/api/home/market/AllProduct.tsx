import { BASE_URL } from "../../../../constant/Path"


export async function Landing()
{
    let endPoint = 'landing'
    let ApiUrl = `${BASE_URL}${endPoint}`
    try 
    {
        let response = await fetch(ApiUrl)
        if(!response.ok)
        {
            throw new Error(`HTTP Error! status: ${response.status}`)
        }            
        return await response.json()

    } catch (error) {
        return error   
    }
}

export async function AllProduct(currentPage: number)
{
    const perPage: number = 8
    let endPoint = 'active'
    let ApiUrl = `${BASE_URL}${endPoint}/${currentPage}/${perPage}`
    try 
    {
        let response = await fetch(ApiUrl)
        if(!response.ok)
        {
            throw new Error(`HTTP Error! status: ${response.status}`)
        }            
        const data = await response.json()
        // console.log(data)
        return data;

    } catch (error) {
        // console.log((`HTTP Error! status: ${error}`))
        return error   
    }
}

export async function CategoryProduct(currentPage: number, category: string)
{
    const perPage: number = 8
    let endPoint = 'category'
    let ApiUrl = `${BASE_URL}${endPoint}/${currentPage}/${perPage}/${category}`
    try 
    {
        let response = await fetch(ApiUrl)
        if(!response.ok)
        {
            throw new Error(`HTTP Error! status: ${response.status}`)
        }            
        const data = await response.json()
        return data;

    } catch (error) {
        // console.log((`HTTP Error! status: ${error}`))
        return error   
    }
}