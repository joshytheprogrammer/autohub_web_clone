import axios from "axios";
import Cookies from 'js-cookie';

// const client = axios.create({baseURL: import.meta.env.BASE_URL })
const client = axios.create({baseURL: process.env.URL})


export const RequestPoint = async ( options: any ) => 
{
    if(options.isHeader)
    {
        client.defaults.headers.common.Authorization = `Bearer ${Cookies.get('user-in-use')}`
    }
    const onSuccess = async (responseData: any) => 
    {
        if(responseData?.data?.status === 403)
        {
            localStorage.clear()
            window.location.href = '/login'
        }
        if(responseData.data.status === 200)
        {
            const response: any = {
                statusCode: responseData?.data?.status,
                message: responseData?.data?.message,
                statusText: responseData?.statusText,
                data: responseData?.data
            }
            return await response
        }
    }
    const onError = (error: any) => 
    {
        if(error?.status === 404 || error?.status === 403 || error?.status === 400)
        {
            const response: any = 
            {
                statusCode: error?.response?.status,
                message: error.response.data.message,
                statusText: error?.response?.statusText,
            }
            return new Promise((_, reject) => {
                reject(response)
            })
        }
        if(error?.status === 401)
        {
            localStorage.clear()
            window.location.href = '/login'
        }
        if(error?.status === 500)
        {
            const response: any = 
            {
                statusCode: error?.response?.status,
                message: error?.response?.data?.message,
                statusText: error?.response?.statusText,
            }
            return new Promise((_, reject) => {
                reject(response)
            })
        }
    }
    try 
    {
        const response = await client(options)
        return onSuccess(response)
    } catch (error) {
        return onError(error)
    }
}
