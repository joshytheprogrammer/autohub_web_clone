import { useEffect, useState } from "react"
import { Detail } from "../../api/home/home"
import { UseStore } from "../../../state/store"

export type ProductDetailProps =
{
   slug: string
}

export const useProductDetail = (slug: string) => 
{
    const userToken = UseStore((state) => state)
    const token: string = userToken.getUserToken()
    
    const [appData, setAppData] = useState({ data: null, isLoading: false, isSuccess: false, isError: false, error: "", completed: '', category: null, featured: [] })
    useEffect(() => 
    {
        setAppData((data) => ({ ...data, isLoading: true}))
        callApi()     
    }, [])

    const callApi = async () => 
    {
        const response: any = await Detail(slug, token)
        console.log(response)
        if(response?.status === 200)
        {
          setAppData({
                        data: response?.data?.product,
                        isLoading: false,
                        isSuccess: response?.status,
                        isError: false,
                        error: "",
                        completed: "yes",
                        category: response?.data?.category,
                        featured: response?.data?.featured
                      }
                    )
        } else {
          setAppData({
                                data: null,
                                isLoading: false,
                                isSuccess: response?.status,
                                isError: true,
                                error: response?.data,
                                completed: "no",
                                category: null,
                                featured: []
                              }
                  )
        } 
    }
    const { data, isLoading, isSuccess, isError, error, completed, category, featured } = appData
    return { data, isLoading, isSuccess, isError, error, completed, category, featured }
}