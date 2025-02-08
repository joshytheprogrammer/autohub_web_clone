export interface ISession
{     
    FName: ""
    getFName: () => void
    setFName: (FName: any) => void
    
    SName: ""
    getSName: () => void
    setSName: (SName: any) => void
    
    UType: ""
    getUType: () => void
    setUType: (UType: any) => void

    
    userRoles: []
    getUserRoles: () => void
    setUserRoles: (userRoles: any) => void
    
    userToken: ""
    getUserToken: () => void
    setUserToken: (token: any) => void
    
    registered: ""
    getRegistered: () => void
    setRegistered: (registered: any) => void
    
    passport: ""
    getPassport: () => void
    setPassport: (passport: any) => void
    
    sideType: ""
    getSideType: () => void
    setSideType: (sideType: any) => void
    
}
