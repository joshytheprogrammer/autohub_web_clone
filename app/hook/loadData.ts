import { categoryDB, countryDB, engineDB, manufacturerDB, modelDB, productsDB, settingsDB, stateDB, trimDB } from "../model/Product"

export const useAddApplicationData = () =>
  {    
    
      const LoadedData = async (data: any) => 
      {        
          const products = productsDB.count()

          if(await products === 0)
          {        
            productsDB.bulkAdd(data?.products)
            countryDB.bulkAdd(data?.country)
            categoryDB.bulkAdd(data?.category)
            stateDB.bulkAdd(data?.state)
            manufacturerDB.bulkAdd(data?.manufacturer)
            modelDB.bulkAdd(data?.model)
            trimDB.bulkAdd(data?.trim)
            engineDB.bulkAdd(data?.engine)
            settingsDB.add(data?.settings)
          }        
          const allProduct = await productsDB.toArray() 
          const productLength = await productsDB.count()
          let ids: any[] = []
          for (let index = 0; index < productLength; index++) 
          {
              ids.push(allProduct[index])      
          }        
      }
  
      return { LoadedData }
  }