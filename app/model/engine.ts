export type IEngine = {
    id: number,
    trim_id: number,
    name: string,
    rate: number
}[]

export const EngineInitialData = {
    id: -1,
    trim_id: -1,
    name: "",
    rate: 1
}

export const Engine: IEngine = 
[    
  {
    id: 1,
    trim_id: 1,
    name: "One One One",
    rate: 1
  },
  {
    id: 2,
    trim_id: 2,
    name: "Two Two Two",
    rate: 2
  }
]