import { RequestPoint } from "../../api/endPoint"


export const useProduct = () =>
{    
   const Dashboard = async () => 
   {  
     let ApiUrl = `/api/students/dashboard`
     return await RequestPoint({ url: ApiUrl, method: "GET", data: null, isHeader: true })
   }  

   const ProductDetail = async (url: string) => 
   {  
     let ApiUrl = `/api/detail/${url}`
     return await RequestPoint({ url: ApiUrl, method: "GET", data: null, isHeader: false })
   }

   const ActiveProduct = async (currentPage: number, perPage: number) => 
   { 
     let ApiUrl = `api/users/user-active-product/${currentPage}/${perPage}`
     return await RequestPoint({ url: ApiUrl, method: "GET", data: { currentPage, perPage }, isHeader: true })
   }   

   const PendingProduct = async (currentPage: number, perPage: number) => 
   { 
     let ApiUrl = `api/users/user-pending-product/${currentPage}/${perPage}`
     return await RequestPoint({ url: ApiUrl, method: "GET", data: { currentPage, perPage }, isHeader: true })
   }  

   const DraftedProduct = async (currentPage: number, perPage: number) => 
   { 
     let ApiUrl = `api/users/user-draft-product/${currentPage}/${perPage}`
     return await RequestPoint({ url: ApiUrl, method: "GET", data: { currentPage, perPage }, isHeader: true })
   } 

   const SoldProduct = async (currentPage: number, perPage: number) => 
   { 
     let ApiUrl = `api/users/user-sold-product/${currentPage}/${perPage}`
     return await RequestPoint({ url: ApiUrl, method: "GET", data: { currentPage, perPage }, isHeader: true })
   }

   const WishListProduct = async (currentPage: number, perPage: number) => 
   { 
     let ApiUrl = `api/users/user-wishlist/${currentPage}/${perPage}`
     return await RequestPoint({ url: ApiUrl, method: "GET", data: { currentPage, perPage }, isHeader: true })
   }

   const UserDetail = async () => 
   {
     let ApiUrl = `/api/users/profile`
     return await RequestPoint({ url: ApiUrl, method: "GET", data: null, isHeader: true })
   }

   const ProductImages = async (productId: number) => 
   {
     let ApiUrl = `/api/users/product-images/${productId}`
     return await RequestPoint({ url: ApiUrl, method: "GET", data: null, isHeader: true })
   }

   const LandingData = async () => 
   {
     let ApiUrl = `/api/landing-data`
     return await RequestPoint({ url: ApiUrl, method: "GET", data: null, isHeader: false })
   }

   const ProductsOnShelf = async (currentPage: number) => 
   {
     const perPage: number = 8
     let ApiUrl = `/api/active/${currentPage}/${perPage}`
     return await RequestPoint({ url: ApiUrl, method: "GET", data: null, isHeader: false })
   }

   const UserWishList = async () => 
   {
     let ApiUrl = `/api/users/wish-list`
     return await RequestPoint({ url: ApiUrl, method: "GET", data: null, isHeader: true })
   }

   return { Dashboard, ProductDetail, ActiveProduct, PendingProduct, DraftedProduct, SoldProduct, WishListProduct, UserDetail, ProductImages, LandingData, ProductsOnShelf, UserWishList }
}
