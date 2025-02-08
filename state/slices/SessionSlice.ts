import { StateCreator } from "zustand";
import { IAuth } from "./interface/IAuth";
import { ISession } from "./interface/ISession";


const createSessionSlice: StateCreator<ISession> = (set, get) => (
    {   
        FName: "",
        getFName()
        {
            return get().FName
        },
        setFName(FName: any)
        {
            set(() => ({ FName: FName }))
        },

        SName: "",
        getSName()
        {
            return get().SName
        },
        setSName(SName: any)
        {
            set(() => ({ SName: SName }))
        },

        UType: "",
        getUType()
        {
            return get().UType
        },
        setUType(UType: any)
        {
            set(() => ({ UType: UType }))
        },
        
        userRoles: [],
        getUserRoles()
        {
            return get().userRoles
        },
        setUserRoles(userRoles: any)
        {
            set(() => ({ userRoles: userRoles }))
        },

        userToken: "",
        getUserToken()
        {
            return get().userToken
        },
        setUserToken(userToken: any)
        {
            set(() => ({ userToken: userToken }))
        },

        registered: "",
        getRegistered()
        {
            return get().registered
        },
        setRegistered(registered: any)
        {
            set(() => ({ registered: registered }))
        },

        passport: "",
        getPassport()
        {
            return get().passport
        },
        setPassport(passport: any)
        {
            set(() => ({ passport: passport }))
        },

        sideType: "",
        getSideType()
        {
            return get().sideType
        },
        setSideType(sideType: any)
        {
            set(() => ({ sideType: sideType }))
        },

    }   
)

export default createSessionSlice