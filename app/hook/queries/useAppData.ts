import { useEffect, useState } from "react"
import { useAddApplicationData } from "../loadData"
import { categoryDB, countryDB, engineDB, manufacturerDB, modelDB, productsDB, settingsDB, sliderDB, stateDB, trimDB } from "../../model/Product"

const getDetail = async () => 
{
  let endPoint = `/api/landing-data`
  let ApiUrl = `${process.env.URL}${endPoint}`
  return await fetch(ApiUrl).then((res) => res.json());
}

export const useAppData = () => 
{
    const { LoadedData } = useAddApplicationData()
    const [appData, setAppData] = useState({ data: null, isLoading: false, isSuccess: false, isError: false, error: "", completed: '' })
    useEffect(() => 
    {
        setAppData((data) => ({ ...data, isLoading: true}))
        callApi()     
    }, [])

    const callApi = async () => 
    {
        const response: any = await getDetail()
        if(response)
        {
          productsDB.clear()
          countryDB.clear()
          categoryDB.clear()
          stateDB.clear()
          manufacturerDB.clear()
          modelDB.clear()
          trimDB.clear()
          engineDB.clear()
          sliderDB.clear()
          settingsDB.clear()
          await LoadedData(response)
          setAppData({
                                  data: response,
                                  isLoading: false,
                                  isSuccess: true,
                                  isError: false,
                                  error: "",
                                  completed: "yes"
                                }
                    )
        } else {
          setAppData({
                                data: null,
                                isLoading: true,
                                isSuccess: false,
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