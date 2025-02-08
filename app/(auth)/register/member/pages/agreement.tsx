"use client"

import { useEffect, useState } from "react"
import { UseStore } from "../../../../../state/store"

type AgreementProp = 
{
    onClick: (currentSection: number) => void
}

export async function Agreement({onClick}: AgreementProp) 
{

  const THANK_YOU = `Thank you for choosing us. AutoHub Nigeria is the first automobile inter-business company in Nigeria and Africa at
                  large. We wish to do business with you as we provide both online and offline sales services to all our members. Our
                  goal is to integrate your goals into our dream and give your business a great turnover.`
  const CERTIFY = `
                  Please, carefully read our membership agreement below because upon signing up with us, it would be accepted that
                  you have read and agreed to it. Meanwhile, this sales agreement is subject to change of which a prior notification
                  would be sent to you.`

  
  const agreementList: string[] = 
  [
    `All members registering as a company must be CAC certified: A non-individual account must be a registered company with CAC. However, an individual who is into automobile business but has not registered his/her company with CAC can be profiled by us and get registered as an Affiliate Dealer with us but must register his/her company with CAC within a span of three months.`,
    `Thank you for choosing us. AutoHub Nigeria is the first automobile inter-business company in Nigeria and Africa at large. We wish to do business with you as we provide both online and offline sales services to all our members. Our goal is to integrate your goals into our dream and give your business a great turnover.`,
    ` No false declaration of the condition of a vehicle: The condition of all vehicles must be stated exactly the way they are. Under no condition should you conceal the condition of a given vehicle in your description. This we consider misleading and criminally intended. If discovered, such an ad would be immediately declined by our moderator.`,
  ]

  const MEMBERSHIP_AGREEMENT = 'MEMBERSHIP AGREEMENT'
  const THANKS = 'Thank you.'
  const AGREE = `Agree`
  
  const advertState = UseStore((state) => state)  
  const [sellSmarter, setSellSmarter] = useState<string>("")
  const [register, setRegister] = useState<string>("")
  const [thankYou, setThankYou] = useState<string>("")
  const [thank, setThank] = useState<string>("")
  const [certify, setCertify] = useState<string>("")
  const [memberAgreement, setMemberAgreement] = useState<string>("")
  const [agreeList, setAgreementList] = useState<string[]>([])
  const [agree, setAgree] = useState<string>("")
  const [dom, setDom] = useState<boolean>(false)
 

  useEffect(() => 
  {
      setSellSmarter("Sell smarter, buy smarter")
      setRegister("Register For Free")
      setThankYou(THANK_YOU)
      setCertify(CERTIFY)
      setMemberAgreement(MEMBERSHIP_AGREEMENT)
      setAgreementList(agreementList)
      setThank(THANKS)
      setAgree(AGREE)
      advertState.setRegistered("")
      setDom(true)
  }, [])


  return (
      <>
        { dom &&
          <div 
              className="w-full mx-auto my-4 d-flex items-center justify-center md:pl-10 md:pr-10 pb-10 md:-mt-30 mt-1 gap-5"
          >   
              <section 
                    className="max-h-[calc(100vh-400px)] w-full bg-white rounded-[10px] relative flex flex-col justify-between overflow-hidden"
                >
                  <div 
                      className="h-full overflow-y-auto p-10 relative"
                  >
                    <div 
                        className="text-center font-bold text-lg sm:text-xl md:text-2xl text-brandGreen udivpercase"
                    >
                      {sellSmarter}
                    </div>

                    <h3 
                        className="text-brandGreen text-center mt-6 mb-2 uppercase"
                    >
                      {register}
                    </h3>

                    <div 
                        className="flex flex-col gap-5"
                    >
                      <p 
                          className="text-center"
                      >
                        {thankYou}
                      </p>

                      <p 
                          className="text-center"
                      >
                        {certify}
                      </p>
                    </div>

                  <h3 
                    className="text-brandGreen text-center mt-6 mb-2 uppercase"
                  >
                    {memberAgreement}
                  </h3>

                  <ol 
                      className="list-decimal flex flex-col gap-4 px-4"
                  >
                    {
                      agreeList?.map((item: string, index: number) => 
                      (
                        <li key={index}
                        >
                          <p className="ml-4">{item}</p>
                        </li>
                      ))}
                  </ol>

                  <p className="my-6">{thank}</p>
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
                        {agree}
                      </button>
                  </div>
              </section>
          </div>
        }
     </>
  )
}
