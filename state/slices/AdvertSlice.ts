import { StateCreator } from "zustand";
import { IAdvert } from "./interface/IAdvert";


const createAdvertSlice: StateCreator<IAdvert> = (set, get) => (
    {
        productId: -1,
        setProductId(id)
        {
            set(() => ({productId: id}))
        },
        getProductId()
        {
            return get().productId
        },

        onEdit: "no",
        setOnEdit(onEdit)
        {
            set(() => ({onEdit: onEdit}))
        },
        getOnEdit()
        {
            return get().onEdit
        },
        
        country: -1,
        setCountry(country)
        {
            set(() => ({country: country}))
        },
        getCountry()
        {
            return get().country
        },
        
        countryName: "",
        setCountryName(countryName)
        {
            set(() => ({countryName: countryName}))
        },
        getCountryName()
        {
            return get().countryName
        },
        
        states: -1,
        setStates(states)
        {
            set(() => ({states: states}))
        },
        getStates()
        {
            return get().states
        },
        
        stateName: "",
        setStateName(stateName)
        {
            set(() => ({stateName: stateName}))
        },
        getStateName()
        {
            return get().stateName
        },
        
        LGA: -1,
        setLGA(LGA)
        {
            set(() => ({LGA: LGA}))
        },
        getLGA()
        {
            return get().LGA
        },
        
        LgaName: "",
        setLgaName(LgaName)
        {
            set(() => ({LgaName: LgaName}))
        },
        getLgaName()
        {
            return get().LgaName
        },

        category: -1,
        setCategory(category)
        {
            set(() => ({category: category}))
        },
        getCategory()
        {
            return get().category
        },        

        categoryName: "",
        setCategoryName(categoryName)
        {
            set(() => ({categoryName: categoryName}))
        },
        getCategoryName()
        {
            return get().categoryName
        },        

        manufacturer: -1,
        setManufacturer(manufacturer)
        {
            set(() => ({manufacturer: manufacturer}))
        },
        getManufacturer()
        {
            return get().manufacturer
        },         

        manufacturerName: "",
        setManufacturerName(manufacturerName)
        {
            set(() => ({manufacturerName: manufacturerName}))
        },
        getManufacturerName()
        {
            return get().manufacturerName
        },        

        model: -1,
        setModel(model)
        {
            set(() => ({model: model}))
        },
        getModel()
        {
            return get().model
        },       

        modelName: "",
        setModelName(modelName)
        {
            set(() => ({modelName: modelName}))
        },
        getModelName()
        {
            return get().modelName
        },
                
        trim: -1,
        setTrim(trim)
        {
            set(() => ({trim: trim}))
        },
        getTrim()
        {
            return get().trim
        },      

        trimName: "",
        setTrimName(trimName)
        {
            set(() => ({trimName: trimName}))
        },
        getTrimName()
        {
            return get().trimName
        },     

        engine: -1,
        setEngine(engine)
        {
            set(() => ({engine: engine}))
        },
        getEngine()
        {
            return get().engine
        },  

        engineName: "",
        setEngineName(engineName)
        {
            set(() => ({engineName: engineName}))
        },
        getEngineName()
        {
            return get().engineName
        }, 
        
        colour: -1,
        setColour(colour)
        {
            set(() => ({colour: colour}))
        },
        getColour()
        {
            return get().colour
        },        
        
        colourName: "",
        setColourName(colourName)
        {
            set(() => ({colourName: colourName}))
        },
        getColourName()
        {
            return get().colourName
        },        
        
        year: "x",
        setYear(year)
        {
            set(() => ({year: year}))
        },
        getYear()
        {
            return get().year
        },      
        
        yearName: "",
        setYearName(yearName)
        {
            set(() => ({yearName: yearName}))
        },
        getYearName()
        {
            return get().yearName
        },
                               
        transmission: -1,
        setTransmission(transmission)
        {
            set(() => ({transmission: transmission}))
        },
        getTransmission()
        {
            return get().transmission
        },
                               
        transmissionName: "",
        setTransmissionName(transmissionName)
        {
            set(() => ({transmissionName: transmissionName}))
        },
        getTransmissionName()
        {
            return get().transmissionName
        },
                               
        condition: -1,
        setCondition(condition)
        {
            set(() => ({condition: condition}))
        },
        getCondition()
        {
            return get().condition
        },
                               
        conditionName: "",
        setConditionName(conditionName)
        {
            set(() => ({conditionName: conditionName}))
        },
        getConditionName()
        {
            return get().conditionName
        },
                               
        fuel: -1,
        setFuel(fuel)
        {
            set(() => ({fuel: fuel}))
        },
        getFuel()
        {
            return get().fuel
        },
                               
        fuelName: "",
        setFuelName(fuelName)
        {
            set(() => ({fuelName: fuelName}))
        },
        getFuelName()
        {
            return get().fuelName
        },
                               
        mileage: "",
        setMileage(mileage)
        {
            set(() => ({mileage: mileage}))
        },
        getMileage()
        {
            return get().mileage
        },
                               
        location: "",
        setLocation(location)
        {
            set(() => ({location: location}))
        },
        getLocation()
        {
            return get().location
        },
                
        chasis_no: "",
        setChasisNo(chasis_no)
        {
            set(() => ({chasis_no: chasis_no}))
        },
        getChasisNo()
        {
            return get().chasis_no
        },
                
        description: "",
        setDescription(description)
        {
            set(() => ({description: description}))
        },
        getDescription()
        {
            return get().description
        },

        price: "",
        setPrice(price)
        {
            set(() => ({price: price}))
        },
        getPrice()
        {
            return get().price
        },

        others: "no",
        setOthers(others)
        {
            set(() => ({others: others}))
        },
        getOthers()
        {
            return get().others
        },   

        theManufacturerName: "",
        setTheManufacturerName(theManufacturerName)
        {
            set(() => ({theManufacturerName: theManufacturerName}))
        },
        getTheManufacturerName()
        {
            return get().theManufacturerName
        },   

        theModelName: "",
        setTheModelName(theModelName)
        {
            set(() => ({theModelName: theModelName}))
        },
        getTheModelName()
        {
            return get().theModelName
        },  

        theTrimName: "",
        setTheTrimName(theTrimName)
        {
            set(() => ({theTrimName: theTrimName}))
        },
        getTheTrimName()
        {
            return get().theTrimName
        },  

        theEngineName: "",
        setTheEngineName(theEngineName)
        {
            set(() => ({theEngineName: theEngineName}))
        },
        getTheEngineName()
        {
            return get().theEngineName
        },  

        makerModels: [],
        setTheMakerModels(makerModels)
        {
            set(() => ({makerModels: makerModels}))
        },
        getTheMakerModels()
        {
            return get().makerModels
        },  

        modelTrim: [],
        setTheModelTrim(modelTrim)
        {
            set(() => ({modelTrim: modelTrim}))
        },
        getTheModelTrim()
        {
            return get().modelTrim
        }, 

        trimEgine: [],
        setTrimEngine(trimEgine)
        {
            set(() => ({trimEgine: trimEgine}))
        },
        getTrimEngine()
        {
            return get().trimEgine
        }, 

        statesModels: [],
        setStateModel(statesModels)
        {
            set(() => ({statesModels: statesModels}))
        },
        getStateModel()
        {
            return get().statesModels
        }, 

        LGAModel: [],
        setLGAModel(LGAModel)
        {
            set(() => ({LGAModel: LGAModel}))
        },
        getLGAModel()
        {
            return get().LGAModel
        },  

        imagePosition: -1,
        setImagePosition(imagePosition)
        {
            set(() => ( { imagePosition: imagePosition } ))
        },
        getImagePosition()
        {
            return get().imagePosition
        },    

        saveOption: '',
        setSaveOption(saveOption)
        {
            set(() => ({ saveOption: saveOption} ))
        },
        getSaveOption()
        {
            return get().saveOption
        },     

 
    }
)


export default createAdvertSlice