import { useEffect, useState } from "react"
import { ProductComments } from "../../api/home/market/advert/Comments"


export const useProductComment = (productId: number) => 
{
  console.log(productId)
    const [appData, setAppData] = useState<any>({ data: null, isLoading: false, isSuccess: false, isError: false, error: "", completed: '' })
    useEffect(() => 
    {
        setAppData((data: any) => ({ ...data, isLoading: true}))
        callApi()     
    }, [])

    const refresh = () => 
    {
        callApi()
    }

    const callApi = async () => 
    {
        const response: any = await ProductComments(productId)
        if(response?.status === 200)
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