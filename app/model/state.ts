export type IState = {
    id: number,
    country_id: number,
    name: string,
    rate: number
}[]

export const StateInitialData = {
    id: -1,
    country_id: -1,
    name: "",
    rate: 1
}

export const States: IState = [    
  {
    id: 1,
    country_id: 1,
    name: "Abuja",
    rate: 1
  },
  {
    id: 2,
    country_id: 1,
    name: "Lagos",
    rate: 2
  },
  {
    id: 3,
    country_id: 2,
    name: "Accra",
    rate: 1
  },
  {
    id: 4,
    country_id: 2,
    name: "Ghana",
    rate: 2
  } 
]