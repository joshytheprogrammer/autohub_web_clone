"use client"

import { useEffect } from "react"
import MemberDealerNavigation from "../../../components/MemberDealerNavigation"
import { UseStore } from "../../../state/store"
import StudentDealerNavigation from "../../../components/StudentDealerNavigation"

type naviTpe = 
{
    name: string,
    url: string
}
type UserTypeNavigationProps = 
{
      marketPlace: naviTpe[],
      classRoom: naviTpe[]
}

export default function UserTypeNavigation({ marketPlace = [], classRoom = [] }: UserTypeNavigationProps) 
{
      const Session = UseStore((state) => state)
      const TypeNavitaion = Session.getSideType()

      useEffect(() => 
      {
           
      }, [TypeNavitaion])
      
      return (
            <>
                  {
                        ((TypeNavitaion === 'member') || (TypeNavitaion === 'dealer')) && <MemberDealerNavigation marketPlace={marketPlace} bg='bg-green-800' hover='bg-green-600' />
                  }

                  {
                        TypeNavitaion === 'student' && <StudentDealerNavigation classRoom={classRoom} bg='bg-blue-800' hover='bg-blue-600'   />
                  }
            </>
      )
}
