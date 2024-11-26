import { StateCreator } from "zustand";
import { IAuth } from "./interface/IAuth";


const createAuthSlice: StateCreator<IAuth> = (set, get) => (
    {          
        memberAgreement: 0,
        getMemberAgreement()
        {
            return get().memberAgreement
        },
        setMemberAgreement(memberAgreement: any)
        {
            set(() => ({ memberAgreement: memberAgreement }))
        },
        
        passportFor: "",
        getPassportFor()
        {
            return get().passportFor
        },
        setPassportFor(passportFor: any)
        {
            set(() => ({ passportFor: passportFor }))
        },
        
        dealerAgreements: 0,
        getDealerAgreement()
        {
            return get().dealerAgreements
        },
        setDealerAgreement(dealerAgreements: any)
        {
            set(() => ({ dealerAgreements: dealerAgreements }))
        },
        
        passportForDealer: "",
        getPassportForDealer()
        {
            return get().passportForDealer
        },
        setPassportForDealer(passportForDealer: any)
        {
            set(() => ({ passportForDealer: passportForDealer }))
        },
        
        firstname: "",
        getFirstname()
        {
            return get().firstname
        },
        setFirstname(firstname: any)
        {
            set(() => ({ firstname: firstname }))
        },
        
        surname: "",
        getSurname()
        {
            return get().surname
        },
        setSurname(surname: any)
        {
            set(() => ({ surname: surname }))
        },
        
        middlename: "",
        getMiddlename()
        {
            return get().middlename
        },
        setMiddlename(middlename: any)
        {
            set(() => ({ middlename: middlename }))
        },
        
        email: "",
        getEmail()
        {
            return get().email
        },
        setEmail(email: any)
        {
            set(() => ({ email: email }))
        },

        phone: "",
        getPhone()
        {
            return get().phone
        },
        setPhone(phone: any)
        {
            set(() => ({ phone: phone }))
        },

        password: "",
        getPassword()
        {
            return get().password
        },
        setPassword(password: any)
        {
            set(() => ({ password: password }))
        },

        companyName: "",
        getCompanyName()
        {
            return get().companyName
        },
        setCompanyName(companyName: any)
        {
            set(() => ({ companyName: companyName }))
        },

        companyAddress: "",
        getCompanyAddress()
        {
            return get().companyAddress
        },
        setCompanyAddress(companyAddress: any)
        {
            set(() => ({ companyAddress: companyAddress }))
        },

        rcNumber: "",
        getRCNumber()
        {
            return get().rcNumber
        },
        setRCNumber(rcNumber: any)
        {
            set(() => ({ rcNumber: rcNumber }))
        },

    }   
)

export default createAuthSlice