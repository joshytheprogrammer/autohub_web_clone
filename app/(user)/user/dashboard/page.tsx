"use client"


export default function Dashboard() 
{

  const overview: { name: string, count: number }[] = 
  [
     {
        name: "Total Products",
        count: 23,
     },
     {
        name: "Total Views",
        count: 5209,      
     },
     {
        name: "Active Products",
        count: 8,      
     },
     {
        name: "Pending Products",
        count: 4,      
     },
     {
        name: "Sold Products",
        count: 11,      
     },
     {
        name: "Draft Products",
        count: 3,      
     },
     {
        name: "WishList Products",
        count: 2,      
     },
     {
        name: "Followers",
        count: 23,      
     }
  ]

  return (
          <>
            <div 
                className='md:col-span-9 col-span-12 bg-green-400 d-flex bg-green-50 border-shadow drop-shadow-lg md:block h-[fit] px-3 md:px-10 py-5 mt-3 md:rounded-2xl -mb-24 md:mb-0'
            > 
                <h1 
                    className='font-bold'
                >
                    Dashboard
                </h1>
                <div 
                    className="grid grid-cols-12 gap-5 mt-5"
                >
                    {
                      overview?.map((x: {name: string, count: number}, index: number) => {
                          return (
                              <div 
                                  key={index}
                                  className="col-span-6 md:col-span-3 px-3 py-5 flex justity-between items-center bg-white rounded-lg border-shadow border-2 border-green-200"
                              >
                                  <div 
                                      className="w-10/12 text-gray-400 font-bold"
                                  > 
                                      {x?.name}
                                  </div>
                                  <div 
                                      className="w-2/12 text-blue-500"
                                  >
                                      {x?.count}
                                  </div>
                              </div>
                          )
                      })
                    }
                </div>
                <div className="h-[120px]"></div>
            </div>
          </>
  )
}
