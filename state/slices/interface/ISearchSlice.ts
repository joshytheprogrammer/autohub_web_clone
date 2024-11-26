export const SearchInitialData = 
{
    picture: "",
    productName: "",
    amount: "",
    country: "",
    state: "",
    wishList: false
}

export interface ISearchSlice
{          
    searchCountry: string
    getSearchCountry: () => void
    setSearchCountry: (searchCountry: string) => void

    searchCountryState: []
    getSearchCountryState: () => void
    setSearchCountryState: (searchCountryState: string) => void
    
    searchState: string
    getSearchState: () => void
    setSearchState: (searchState: string) => void
    
    searchManufacturer: string
    getSearchManufacturer: () => void
    setSearchManufacturer: (searchManufacturer: string) => void

    searchManufacturerModel: []
    getSearchManufacturerModel: () => void
    setSearchManufacturerModel: (ManufacturerModel: string) => void
    
    searchModel: string
    getSearchModel: () => void
    setSearchModel: (searchModel: string) => void
}