"use client"

import { useEffect } from "react"
import { UseStore } from "../../../../../state/store"

type AgreementProp = 
{
    onClick: (currentSection: number) => void
}

export async function Agreement({onClick}: AgreementProp) 
{
  
  const advertState = UseStore((state) => state)  

  useEffect(() => 
  {
     advertState.setRegistered("")
  }, [])
  
  const agreementList: string[] = [
    `All members registering as a company must be CAC certified: A non-individual account must be a registered company with CAC. However, an individual who is into automobile business but has not registered his/her company with CAC can be profiled by us and get registered as an Affiliate Dealer with us but must register his/her company with CAC within a span of three months.`,
    `Thank you for choosing us. AutoHub Nigeria is the first automobile inter-business company in Nigeria and Africa at large. We wish to do business with you as we provide both online and offline sales services to all our members. Our goal is to integrate your goals into our dream and give your business a great turnover.`,
    ` No false declaration of the condition of a vehicle: The condition of all vehicles must be stated exactly the way they are. Under no condition should you conceal the condition of a given vehicle in your description. This we consider misleading and criminally intended. If discovered, such an ad would be immediately declined by our moderator.`,
  ]


  return (
      <div 
          className="w-full mx-auto my-4 d-flex items-center justify-center pl-10 pr-10 pb-10 md:-mt-30 mt-1 gap-5"
      >   
          <div 
              className="max-h-[calc(100vh-400px)] w-full bg-white rounded-[10px] relative flex flex-col justify-between overflow-hidden"
          >
            <div 
                className="h-full overflow-y-auto p-10 relative"
            >
              <h1 
                  className="text-center font-bold text-lg sm:text-xl md:text-2xl text-brandGreen"
              >
                SELL SMARTER, BUY SMARTER
              </h1>

              <h3 
                  className="text-brandGreen text-center mt-6 mb-2 uppercase"
              >
                Register For Free
              </h3>

              <div 
                  className="flex flex-col gap-5"
              >
                <p 
                    className="text-center"
                >
                  Thank you for choosing us. AutoHub Nigeria is the first automobile inter-business company in Nigeria and Africa at
                  large. We wish to do business with you as we provide both online and offline sales services to all our members. Our
                  goal is to integrate your goals into our dream and give your business a great turnover.
                </p>

                <p 
                    className="text-center"
                >
                  Please, carefully read our membership agreement below because upon signing up with us, it would be accepted that
                  you have read and agreed to it. Meanwhile, this sales agreement is subject to change of which a prior notification
                  would be sent to you.
                </p>
              </div>

            <h3 
              className="text-brandGreen text-center mt-6 mb-2 uppercase"
            >
              MEMBERSHIP AGREEMENT
            </h3>

            <ol 
                className="list-decimal flex flex-col gap-4 px-4"
            >
              {
                agreementList.map((item, index) => 
                (
                  <li key={index}
                  >
                    <p className="ml-4">{item}</p>
                  </li>
                ))}
            </ol>

            <p className="my-6">Thank you.</p>
            </div>

            {/* Action */}
            <div 
                className="shrink-0 h-20 w-full px-10 pb-14 pt-10 justify-end flex px-4 items-center bg-blue-600"
            >
                {/* <button
                  onClick={() => {
                      onClick()
                  }}
                  className="text-white px-4 font-semibold"
                >
                    Back
                </button> */}
                <button
                  className="h-[50px] bg-green-600 text-white px-4 rounded-lg font-semibold border-2 border-blue-300 hover:bg-green-800 mt-2"
                  onClick={() => 
                  { 
                    advertState.setMemberAgreement(1)
                    onClick(1)
                  }}
                >
                  Agree
                </button>
            </div>
        </div>
    </div>
  )
}
