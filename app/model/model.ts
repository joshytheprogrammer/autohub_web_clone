export type IModel = {
    id: number,
    manufacturer_id: number,
    name: string,
    rate: number
}[]

export const ModelInitialData = {
    id: -1,
    manufacturer_id: -1,
    name: "",
    rate: 1
}

export const Models: IModel = 
[    
  {
    id: 1,
    manufacturer_id: 1,
    name: "4Runners",
    rate: 1
  },
  {
    id: 2,
    manufacturer_id: 1,
    name: "Camry",
    rate: 2
  },
  {
    id: 3,
    manufacturer_id: 1,
    name: "Corolla",
    rate: 1
  },
  {
    id: 4,
    manufacturer_id: 2,
    name: "Aspire",
    rate: 2
  },
  {
    id: 5,
    manufacturer_id: 2,
    name: "Contour",
    rate: 2
  },
  {
    id: 6,
    manufacturer_id: 3,
    name: "Accord",
    rate: 1
  },
  {
    id: 7,
    manufacturer_id: 3,
    name: "Passport",
    rate: 3
  } 
]