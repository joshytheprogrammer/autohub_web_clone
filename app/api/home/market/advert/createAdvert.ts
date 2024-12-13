import { BASE_URL } from "../../../../../constant/Path"


export async function AdvertData()
{
    let endPoint = 'landing-data'
    let ApiUrl = `${BASE_URL}${endPoint}`
    try 
    {
        let response = await fetch(ApiUrl)
        if(!response.ok)
        {
            throw new Error(`HTTP Error! status: ${response.status}`)
        }            
        const result = await response.json()      
        return { status: true, data: result }

    } catch (error) {
        return { status: false, data: error } 
    }
}

export async function AdvertWithSpecificData(slug: string)
{
    let endPoint = `modified-data/${slug}`
    let ApiUrl = `${BASE_URL}${endPoint}`
    try 
    {
        let response = await fetch(ApiUrl)
        if(!response.ok)
        {
            throw new Error(`HTTP Error! status: ${response.status}`)
        }            
        const result = await response.json()      
        return { status: true, data: result }

    } catch (error) {
        return { status: false, data: error } 
    }
}