import { BASE_URL } from "../../../constant/Path";

export async function AgreementRegister()
{
    let endPoint = 'agreement-registration'
    let ApiUrl = `${BASE_URL}${endPoint}`
    try 
    {    
        const response = await fetch(ApiUrl, 
        {
            method: 'GET',    
            headers: {    
              'Content-Type': 'application/json'     
            }
        
        }) 
        if(!response.ok)
        {
            throw new Error(`HTTP Error! status: ${response}`)
            // return { status: false, data: response } 
        } 
        const result = await response.json() 
        return result
        // return { status: true, data: result, url: ApiUrl }

    } catch (error) {
        throw new Error(`HTTP Error! status: ${error}`)
    }
}

export async function AgreementRegistration(token: string)
{
    let endPoint = 'c-m-s/agreement-registration'
    let ApiUrl = `${BASE_URL}${endPoint}`
    try 
    {    
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
            throw new Error(`HTTP Error! status: ${response}`)
            // return { status: false, data: response } 
        } 
        const result = await response.json() 
        return result
        // return { status: true, data: result, url: ApiUrl }

    } catch (error) {
        throw new Error(`HTTP Error! status: ${error}`)
    }
}

export async function RegistrationAgreement(token: string, content: string)
{
    let endPoint = 'c-m-s/registration-agreement'
    let ApiUrl = `${BASE_URL}${endPoint}`
    try 
    {
        const response = await fetch(ApiUrl, 
        {
            method: 'PUT',    
            headers: {    
              'Content-Type': 'application/json',     
              'Authorization': `Bearer ${token}`  
            },
            body: JSON.stringify({ token: token, agreement: content }),    
        })  
        if(!response.ok)
        {
            throw new Error(`HTTP Error! status: ${response}`)
            // return { status: false, data: response } 
        } 
        const result = await response.json() 
        return result
        // return { status: true, data: result, url: ApiUrl }

    } catch (error) {
        throw new Error(`HTTP Error! status: ${error}`)
    }
}

/////////////////////////////////////////////////////////////



export async function AffiliateAgreementRegister()
{
    let endPoint = 'affiliate-agreement-registration'
    let ApiUrl = `${BASE_URL}${endPoint}`
    try 
    {    
        const response = await fetch(ApiUrl, 
        {
            method: 'GET',    
            headers: {    
              'Content-Type': 'application/json'     
            }
        
        }) 
        if(!response.ok)
        {
            throw new Error(`HTTP Error! status: ${response}`)
            // return { status: false, data: response } 
        } 
        const result = await response.json() 
        return result
        // return { status: true, data: result, url: ApiUrl }

    } catch (error) {
        throw new Error(`HTTP Error! status: ${error}`)
    }
}

export async function AffiliateAgreementRegistration(token: string)
{
    let endPoint = 'c-m-s/affiliate-agreement-registration'
    let ApiUrl = `${BASE_URL}${endPoint}`
    try 
    {    
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
            throw new Error(`HTTP Error! status: ${response}`)
            // return { status: false, data: response } 
        } 
        const result = await response.json() 
        return result
        // return { status: true, data: result, url: ApiUrl }

    } catch (error) {
        throw new Error(`HTTP Error! status: ${error}`)
    }
}

export async function AffiliateRegistrationAgreement(token: string, content: string)
{
    let endPoint = 'c-m-s/affiliate-registration-agreement'
    let ApiUrl = `${BASE_URL}${endPoint}`
    try 
    {
        const response = await fetch(ApiUrl, 
        {
            method: 'PUT',    
            headers: {    
              'Content-Type': 'application/json',     
              'Authorization': `Bearer ${token}`  
            },
            body: JSON.stringify({ token: token, agreement: content }),    
        })  
        if(!response.ok)
        {
            throw new Error(`HTTP Error! status: ${response}`)
            // return { status: false, data: response } 
        } 
        const result = await response.json() 
        return result
        // return { status: true, data: result, url: ApiUrl }

    } catch (error) {
        throw new Error(`HTTP Error! status: ${error}`)
    }
}


///////////////////////////////////////////////////////////



export async function DealerRegister()
{
    let endPoint = 'dealer-agreement'
    let ApiUrl = `${BASE_URL}${endPoint}`
    try 
    {    
        const response = await fetch(ApiUrl, 
        {
            method: 'GET',    
            headers: {    
              'Content-Type': 'application/json'     
            }
        
        }) 
        if(!response.ok)
        {
            throw new Error(`HTTP Error! status: ${response}`)
            // return { status: false, data: response } 
        } 
        const result = await response.json() 
        return result
        // return { status: true, data: result, url: ApiUrl }

    } catch (error) {
        throw new Error(`HTTP Error! status: ${error}`)
    }
}

export async function DealerRegistration(token: string)
{
    let endPoint = 'c-m-s/dealer-agreement'
    let ApiUrl = `${BASE_URL}${endPoint}`
    try 
    {    
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
            throw new Error(`HTTP Error! status: ${response}`)
            // return { status: false, data: response } 
        } 
        const result = await response.json() 
        return result
        // return { status: true, data: result, url: ApiUrl }

    } catch (error) {
        throw new Error(`HTTP Error! status: ${error}`)
    }
}

export async function DealerAgreement(token: string, content: string)
{
    let endPoint = 'c-m-s/dealer-agreement'
    let ApiUrl = `${BASE_URL}${endPoint}`
    try 
    {
        const response = await fetch(ApiUrl, 
        {
            method: 'PUT',    
            headers: {    
              'Content-Type': 'application/json',     
              'Authorization': `Bearer ${token}`  
            },
            body: JSON.stringify({ token: token, agreement: content }),    
        })  
        if(!response.ok)
        {
            throw new Error(`HTTP Error! status: ${response}`)
            // return { status: false, data: response } 
        } 
        const result = await response.json() 
        return result
        // return { status: true, data: result, url: ApiUrl }

    } catch (error) {
        throw new Error(`HTTP Error! status: ${error}`)
    }
}
