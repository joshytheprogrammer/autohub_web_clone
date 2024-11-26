import { StateCreator } from "zustand";
import { IProductOnHomePage } from "./interface/IProductOnHomePage";
import { ITheme } from "./interface/ITheme";


const createThemeSlice: StateCreator<ITheme> = (set, get) => (
    {           
        marketPlaceLink: "",
        getMarketPlaceLink()
        {
            return get().marketPlaceLink
        },
        setMarketPlaceLink(marketPlaceLink: any)
        {
            set(() => ({ marketPlaceLink: marketPlaceLink }))
        }
    }   
)

export default createThemeSlice