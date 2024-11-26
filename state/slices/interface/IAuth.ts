export interface IAuth
{          
    memberAgreement: number
    getMemberAgreement: () => void
    setMemberAgreement: (memberAgreement: any) => void
    
    passportFor: string
    getPassportFor: () => void
    setPassportFor: (passportFor: any) => void
    
    dealerAgreements: number
    getDealerAgreement: () => void
    setDealerAgreement: (dealerAgreements: any) => void
    
    passportForDealer: string
    getPassportForDealer: () => void
    setPassportForDealer: (passportForDealer: any) => void
    
    firstname: string
    getFirstname: () => void
    setFirstname: (firstname: any) => void
    
    surname: string
    getSurname: () => void
    setSurname: (surname: any) => void
    
    middlename: string
    getMiddlename: () => void
    setMiddlename: (middlename: any) => void
    
    email: string
    getEmail: () => void
    setEmail: (email: any) => void
    
    phone: string
    getPhone: () => void
    setPhone: (phone: any) => void
    
    password: string
    getPassword: () => void
    setPassword: (password: any) => void
    
    companyName: string
    getCompanyName: () => void
    setCompanyName: (companyName: any) => void
    
    companyAddress: string
    getCompanyAddress: () => void
    setCompanyAddress: (companyAddress: any) => void
    
    rcNumber: string
    getRCNumber: () => void
    setRCNumber: (rcNumber: any) => void

}