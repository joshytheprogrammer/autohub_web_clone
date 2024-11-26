export type ITrim = {
    id: number,
    model_id: number,
    name: string,
    rate: number
}[]

export const TrimInitialData = {
    id: -1,
    model_id: -1,
    name: "",
    rate: 1
}

export const Trim: ITrim = 
[    
  {
    id: 1,
    model_id: 1,
    name: "Four Four Four",
    rate: 1
  },
  {
    id: 2,
    model_id: 1,
    name: "4 4 4 4 4 4 4",
    rate: 2
  },
  {
    id: 3,
    model_id: 1,
    name: "Fr Fr Fr Fr Fr",
    rate: 1
  },
  {
    id: 4,
    model_id: 2,
    name: "Cam Cam Cam Cam Cam",
    rate: 2
  },
  {
    id: 5,
    model_id: 2,
    name: "Ry Ry Ry Ry Ry",
    rate: 2
  }
]