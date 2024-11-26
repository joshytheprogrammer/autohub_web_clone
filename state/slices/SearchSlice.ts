import { StateCreator } from "zustand";
import { ISearchSlice } from "./interface/ISearchSlice";


const createSearchSlice: StateCreator<ISearchSlice> = (set, get) => (
    {     
        searchCountry: "",
        getSearchCountry()
        {
            return get().searchCountry
        },
        setSearchCountry(searchCountry: any)
        {
            set(() => ({ searchCountry: searchCountry }))
        },
        
        searchCountryState: [],
        getSearchCountryState()
        {
            return get().searchCountryState
        },
        setSearchCountryState(searchCountryState: any)
        {
            set(() => ({ searchCountryState: searchCountryState }))
        },

        searchState: "",
        getSearchState()
        {
            return get().searchState
        },
        setSearchState()
        {
            set(() => ({ searchState: this.searchState }))
        },

        searchManufacturer: "",
        getSearchManufacturer()
        {
            return get().searchManufacturer
        },
        setSearchManufacturer()
        {
            set(() => ({ searchManufacturer: this.searchManufacturer }))
        },
        
        searchManufacturerModel: [],
        getSearchManufacturerModel()
        {
            return get().searchManufacturerModel
        },
        setSearchManufacturerModel(searchManufacturerModel: any)
        {
            set(() => ({ searchManufacturerModel: searchManufacturerModel }))
        },

        searchModel: "",
        getSearchModel()
        {
            return get().searchModel
        },
        setSearchModel()
        {
            set(() => ({ searchModel: this.searchModel }))
        }

 
    }
)


export default createSearchSlice