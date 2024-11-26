export type ICountry = {
    id: number
    name: string,
    state: {
        id: number,
        country_id: number,
        name: string,
        rate: number
    }[]
}[]

export type ICountr = {
  id: number
  name: string,
  state: {
      id: number,
      country_id: number,
      name: string,
      rate: number
  }[]
}

export const CountryInitialData = 
[
  {
    id: -1,
    name: "",
    state: [{
        id: -1,
        country_id: -1,
        name: "",
        rate: -1
    }]
  }
]

export const Country: ICountry = 
[
  {
    id: 1,
    name: "Nigeria",
    state: [
      {
        id: 1,
        country_id: 1,
        name: "Lagos",
        rate: 0
      },
      {
        id: 2,
        country_id: 1,
        name: "Abuja",
        rate: 1
      }
    ]
  },
  {
    id: 2,
    name: "Ghana",
    state: [
      {
        id: 1,
        country_id: 2,
        name: "Accra",
        rate: 0
      }
    ]
  },
  {
    id: 3,
    name: "Iran",
    state: [
      {
        id: 1,
        country_id: 1,
        name: "Tehran",
        rate: 0
      }
    ]
  } 
]

