import { useEffect, useState } from "react"
import { AdvertData } from "../../api/home/market/advert/createAdvert"

export const useCreateAd = () => 
{
    const [appData, setAppData] = useState({ data: null, isLoading: false, isSuccess: false, isError: false, error: "", completed: '' })
    useEffect(() => 
    {
        setAppData((data) => ({ ...data, isLoading: true}))
        callApi()     
    }, [])

    const callApi = async () => 
    {
        const response: any = await AdvertData()
        if(response?.status === true)
        {
          setAppData({
                        data: response?.data,
                        isLoading: false,
                        isSuccess: response?.status,
                        isError: false,
                        error: "",
                        completed: "yes"
                      }
                    )
        } else {
          setAppData({
                        data: null,
                        isLoading: false,
                        isSuccess: response?.status,
                        isError: true,
                        error: response?.data,
                        completed: "no"
                    }
                  )
        } 
    }
    const { data, isLoading, isSuccess, isError, error, completed } = appData
    return { data, isLoading, isSuccess, isError, error, completed }
}