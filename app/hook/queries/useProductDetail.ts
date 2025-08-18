"use client"

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
    
    const [appData, setAppData] = useState({ data: null, isLoading: false, isSuccess: false, isError: false, error: "", completed: '', category: null, featured: [], otherUserProduct: [], otherProduct: [], plus: "" })
    useEffect(() => 
    {
        setAppData((data) => ({ ...data, isLoading: true}))
        callApi()     
    }, [])

    const callApi = async () => 
    {
        const response: any = await Detail(slug, token)
        // console.log(response)
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
                        featured: response?.data?.featured,
                        otherUserProduct: response?.data?.other_user_product,
                        otherProduct: response?.data?.other_product,
                        plus: response?.plus
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
                                featured: [],
                                otherUserProduct: [],
                                otherProduct: [],
                                plus: ""
                              }
                  )
        } 
    }
    const { data, isLoading, isSuccess, isError, error, completed, category, featured, otherUserProduct, otherProduct, plus } = appData
    return { data, isLoading, isSuccess, isError, error, completed, category, featured, otherUserProduct, otherProduct, plus }
}