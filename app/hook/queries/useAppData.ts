import { useEffect, useState } from "react"
import { ApplicationData } from "../../api/home/home"
import { useAddApplicationData } from "../loadData"
import { categoryDB, countryDB, engineDB, manufacturerDB, modelDB, productsDB, settingsDB, stateDB, trimDB } from "../../model/Product"

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
        const response: any = await ApplicationData()
        console.log("+++++++++++++++++++++++")
        console.log(response)
        console.log("+++++++++++++++++++++++")
        // return
        if(response?.status === true)
        {
          productsDB.clear()
          countryDB.clear()
          categoryDB.clear()
          stateDB.clear()
          manufacturerDB.clear()
          modelDB.clear()
          trimDB.clear()
          engineDB.clear()
          settingsDB.clear()
          await LoadedData(response?.data)
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
                                isLoading: true,
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