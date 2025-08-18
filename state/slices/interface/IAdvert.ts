export interface IAdvert
{     
    productId: number,
    setProductId: (productId: number) => void
    getProductId: () => void

    onEdit: string,
    setOnEdit: (onEdit: string) => void
    getOnEdit: () => void

    country: number,
    setCountry: (country: number) => void
    getCountry: () => void

    countryName: string,
    setCountryName: (countryName: string) => void
    getCountryName: () => void

    states: number,
    setStates: (states: number) => void
    getStates: () => void

    stateName: string,
    setStateName: (stateName: string) => void
    getStateName: () => void

    LGA: number,
    setLGA: (LGA: number) => void
    getLGA: () => void

    LgaName: string,
    setLgaName: (LgaName: string) => void
    getLgaName: () => void

    OurLgaName: string,
    setOurLgaName: (OurLgaName: string) => void
    getOurLgaName: () => void

    category: number,
    setCategory: (category: number) => void
    getCategory: () => void

    categoryName: string,
    setCategoryName: (categoryName: string) => void
    getCategoryName: () => void

    manufacturer: number,
    setManufacturer: (manufacturer: number) => void
    getManufacturer: () => void

    manufacturerName: string,
    setManufacturerName: (manufacturerName: string) => void
    getManufacturerName: () => void

    model: number,
    setModel: (model: number) => void
    getModel: () => void

    modelName: string,
    setModelName: (modelName: string) => void
    getModelName: () => void

    generation: number,
    setGeneration: (generation: number) => void
    getGeneration: () => void

    generationName: string,
    setGenerationName: (generationName: string) => void
    getGenerationName: () => void

    serie: number,
    setSerie: (serie: number) => void
    getSerie: () => void

    serieName: string,
    setSerieName: (serieName: string) => void
    getSerieName: () => void

    trim: number,
    setTrim: (trim: number) => void
    getTrim: () => void

    trimName: string,
    setTrimName: (trimName: string) => void
    getTrimName: () => void

    colour: number,
    setColour: (colour: number) => void
    getColour: () => void

    colourName: string,
    setColourName: (colourName: string) => void
    getColourName: () => void

    year: string,
    setYear: (year: string) => void
    getYear: () => void

    yearName: string,
    setYearName: (yearName: string) => void
    getYearName: () => void

    transmission: number,
    setTransmission: (transmission: number) => void
    getTransmission: () => void

    transmissionName: string,
    setTransmissionName: (transmissionName: string) => void
    getTransmissionName: () => void

    condition: number,
    setCondition: (condition: number) => void
    getCondition: () => void

    conditionName: string,
    setConditionName: (conditionName: string) => void
    getConditionName: () => void

    fuel: number,
    setFuel: (fuel: number) => void
    getFuel: () => void

    fuelName: string,
    setFuelName: (fuelName: string) => void
    getFuelName: () => void

    mileage: string,
    setMileage: (mileage: string) => void
    getMileage: () => void

    location: string,
    setLocation: (location: string) => void
    getLocation: () => void

    chasis_no: string,
    setChasisNo: (chasis_no: string) => void
    getChasisNo: () => void

    description: string,
    setDescription: (description: string) => void
    getDescription: () => void

    price: string,
    setPrice: (price: string) => void
    getPrice: () => void

    others: string,
    setOthers: (others: string) => void
    getOthers: () => void

    theManufacturerName: string,
    setTheManufacturerName: (theManufacturerName: string) => void
    getTheManufacturerName: () => void

    theModelName: string,
    setTheModelName: (theModelName: string) => void
    getTheModelName: () => void

    theTrimName: string,
    setTheTrimName: (theTrimName: string) => void
    getTheTrimName: () => void

    categories: [],
    setCategories: (categories: []) => void
    getCategories: () => void

    countries: [],
    setCountries: (countries: []) => void
    getCountries: () => void

    statess: [],
    setStatess: (statess: []) => void
    getStatess: () => void

    lgas: [],
    setLGAS: (lgas: []) => void
    getLGAS: () => void

    manufacturers: [],
    setManufactuers: (manufacturers: []) => void
    getManufacturers: () => void

    models: [],
    setModels: (models: []) => void
    getModels: () => void

    //
    generations: [],
    setGenerations: (generations: []) => void
    getGenerations: () => void    

    series: [],
    setSeries: (series: []) => void
    getSeries: () => void

    trims: [],
    setTrims: (trims: []) => void
    getTrims: () => void

    colours: [],
    setColours: (colours: []) => void
    getColours: () => void

    fuels: [],
    setFuels: (fuels: []) => void
    getFuels: () => void

    transmissions: [],
    setTransmissions: (transmissions: []) => void
    getTransmissions: () => void

    conditions: [],
    setConditions: (conditions: []) => void
    getConditions: () => void

    productDetail: [],
    setProductDetail: (productDetail: []) => void
    getProductDetail: () => void

    //    
    theSerieName: string,
    setTheSerieName: (theSerieName: string) => void
    getTheSerieName: () => void
    
    theGenerationName: string,
    setTheGenerationName: (theGenerationName: string) => void
    getTheGenerationName: () => void
    
    imagePosition: number,
    setImagePosition: (imagePosition: number) => void
    getImagePosition: () => void
        
    saveOption: string,
    setSaveOption: (saveOption: string) => void
    getSaveOption: () => void
    
}