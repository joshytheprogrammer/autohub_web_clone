import { StateCreator } from "zustand";
import { IProductOnHomePage } from "./interface/IProductOnHomePage";


const createProductSlice: StateCreator<IProductOnHomePage> = (set, get) => (
    {         
        products: [],
        getProducts()
        {
            return get().products
        },
        setProducts(products: any)
        {
            set(() => ({ products: products }))
        },

        toWishList: false,
        getToWishList()
        {
            return get().toWishList
        },
        setWishList()
        {
            set(() => ({ toWishList: this.toWishList }))
        }
    }   
)

export default createProductSlice