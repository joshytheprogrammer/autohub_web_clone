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
        setWishList(toWishList: any)
        {
            set(() => ({ toWishList: toWishList }))
        },

        showType: 'list',
        getShowType()
        {
            return get().showType
        },
        setShowType(showType: any)
        {
            set(() => ({ showType: showType }))
        }
    }   
)

export default createProductSlice