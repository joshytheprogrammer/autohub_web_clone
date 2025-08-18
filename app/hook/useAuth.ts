import { useRouter } from "next/router"
import { useState } from "react"
import useSWR from "swr"
import api from "../api/api"
import axios from "axios"

export const useAuth = ({middleware}: any) => 
{
    const router = useRouter()
    
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const { data: user, error, mutate } = useSWR('/api/auth/login', () => api.post('/api/auth/login') )

    const csrf = () => axios.get('/sanctum/csrf-token')

    const login = async ({setErrors, ...props}: any) => 
    {
       setErrors([])

       await csrf()

       await axios.post('login', props)
            .then(async () => await mutate() && router.push('/'))
            .catch((error: any) => {
              // if(error.response.status !=== )
              // {

              // }
                setErrors(Object.values(error.response.status.errors).flat())
            })
    }

    const logout = async () => 
    {
       await axios.post('logout')
       mutate()
       return router.push('/')
    }


   return {
      user,
      csrf,
      isLoading,
      login,
      logout
   }

}