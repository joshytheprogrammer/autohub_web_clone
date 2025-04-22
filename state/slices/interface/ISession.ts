export interface ISession
{     
    FName: string
    getFName: () => void
    setFName: (FName: any) => void
    
    SName: string
    getSName: () => void
    setSName: (SName: any) => void
    
    UType: string
    getUType: () => void
    setUType: (UType: any) => void

    
    userRoles: []
    getUserRoles: () => void
    setUserRoles: (userRoles: any) => void
    
    userToken: string
    getUserToken: () => void
    setUserToken: (token: any) => void
    
    registered: string
    getRegistered: () => void
    setRegistered: (registered: any) => void
    
    passport: string
    getPassport: () => void
    setPassport: (passport: any) => void
    
    sideType: string
    getSideType: () => void
    setSideType: (sideType: any) => void
    
}
