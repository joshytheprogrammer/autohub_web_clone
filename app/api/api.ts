import axios from 'axios';
import Cookies from 'js-cookie';


const api = axios.create(
  {
    baseURL: process.env.URL,
    // timeout: 10000, // 10 seconds
    //  headers: {    
    //        'Content-Type': 'application/json',      
    //        'Authorization': `Bearer ${Cookies.get('user-in-use')}`     
    //  }
  }
);

api.interceptors.request.use(
  (config: any) => {
     const token = `Bearer ${Cookies.get('user-in-use')}` 
     console.log(token)
     console.log("We don use token")    
     if(token)
     {
        config.headers.Authorization = token
        config.headers['contentType'] = 'application/json'
     }
     return config
  },
  (error: any) => {
     return Promise.reject(error)
  }
)

api.interceptors.response.use(
   (response: any) => 
   {
     return response
   },
   (error: any) => 
   {console.log(error)
      console.log("E don happen")
      if(error?.data?.status === 401)
      {
         localStorage.clear()
         window.location.href = '/login'
         // return false 
      }

      if(error?.data?.status === 403)
      {
         localStorage.clear()
         window.location.href = '/login'
         // return false 
      }

      // if(error?.data?.status === 404)
      // {
      //    // redirect to a custom not found error page  
      //    window.location.href = 'kfieirienreirnier'       
      // }

      // if(error?.data?.status === 500)
      // {
      //    // redirect to a custom server error page
      //    console.log(error?.data)
      //    console.log(error?.data?.data)
      // }
   }
)

export default api;