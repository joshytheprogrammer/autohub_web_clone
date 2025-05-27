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

    LGA: number,
    setLGA: (LGA: number) => void
    getLGA: () => void

    LgaName: string,
    setLgaName: (LgaName: string) => void
    getLgaName: () => void

    states: number,
    setStates: (states: number) => void
    getStates: () => void

    stateName: string,
    setStateName: (stateName: string) => void
    getStateName: () => void

    category: number,
    setCategory: (category: number) => void
    getCategory: () => void

    categoryName: string,
    setCategoryName: (category: string) => void
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

    trim: number,
    setTrim: (trim: number) => void
    getTrim: () => void

    trimName: string,
    setTrimName: (trimName: string) => void
    getTrimName: () => void

    engine: number,
    setEngine: (engine: number) => void
    getEngine: () => void

    engineName: string,
    setEngineName: (engine: string) => void
    getEngineName: () => void

    colour: number,
    setColour: (colour: number) => void
    getColour: () => void

    colourName: string,
    setColourName: (colour: string) => void
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
    setTransmissionName: (transmission: string) => void
    getTransmissionName: () => void

    condition: number,
    setCondition: (condition: number) => void
    getCondition: () => void

    conditionName: string,
    setConditionName: (condition: string) => void
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

    theEngineName: string,
    setTheEngineName: (theEngineName: string) => void
    getTheEngineName: () => void
    
    makerModels: [],
    setTheMakerModels: (makerModels: []) => void
    getTheMakerModels: () => void
    
    modelTrim: [],
    setTheModelTrim: (modelTrim: []) => void
    getTheModelTrim: () => void

    trimEgine: [],
    setTrimEngine: (trimEgine: []) => void
    getTrimEngine: () => void
    
    statesModels: [],
    setStateModel: (statesModels: []) => void
    getStateModel: () => void
    
    LGAModel: [],
    setLGAModel: (LGAModel: []) => void
    getLGAModel: () => void
    
    imagePosition: number,
    setImagePosition: (imagePosition: number) => void
    getImagePosition: () => void
        
    saveOption: string,
    setSaveOption: (saveOption: string) => void
    getSaveOption: () => void
    
}