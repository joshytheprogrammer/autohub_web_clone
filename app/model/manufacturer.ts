export type IManufacturer = {
    id: number
    name: string
    rate: number
}[]

export type IManufacture = 
{
    id: number
    name: string
    rate: number
}

export const ManufacturerInitialData = 
{
    id: -1,
    name: "",
    rate: -1
}

export const Manufacturer: IManufacturer = 
[
  {
    id: 1,
    name: "Toyota",
    rate: 0
  },
  {
    id: 2,
    name: "Ford",
    rate: 1
  },
  {
    id: 3,
    name: "Honda",
    rate: 2
  } 
]

