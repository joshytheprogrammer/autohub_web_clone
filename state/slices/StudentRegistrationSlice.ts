import { StateCreator } from "zustand";
import { IStudentRegistration } from "./interface/IStudentRegistration";


const createStudentRegistrationSlice: StateCreator<IStudentRegistration> = (set, get) => 
(
    {           
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

        phone: "",
        getPhone()
        {
            return get().phone
        },
        setPhone(phone: any)
        {
            set(() => ({ phone: phone }))
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

        companyName: "",
        getCompanyName()
        {
            return get().companyName
        },
        setCompanyName(companyName: any)
        {
            set(() => ({ companyName: companyName }))
        }, 

        homeAddress: "",
        getHomeAddress()
        {
            return get().homeAddress
        },
        setHomeAddress(homeAddress: any)
        {
            set(() => ({ homeAddress: homeAddress }))
        }, 

        specialization: "",
        getSpecialization()
        {
            return get().specialization
        },
        setSpecialization(specialization: any)
        {
            set(() => ({ specialization: specialization }))
        }, 

        yearsIn: "",
        getYearsIn()
        {
            return get().yearsIn
        },
        setYearsIn(yearsIn: any)
        {
            set(() => ({ yearsIn: yearsIn }))
        }, 

        region: "",
        getRegion()
        {
            return get().region
        },
        setRegion(region: any)
        {
            set(() => ({ region: region }))
        }, 

        city: "",
        getCity()
        {
            return get().city
        },
        setCity(city: any)
        {
            set(() => ({ city: city }))
        },

        dob: "",
        getDob()
        {
            return get().dob
        },
        setDob(dob: any)
        {
            set(() => ({ dob: dob }))
        }, 

        gender: "",
        getGender()
        {
            return get().gender
        },
        setGender(gender: any)
        {
            set(() => ({ gender: gender }))
        }, 

        qualification: "",
        getQualification()
        {
            return get().qualification
        },
        setQualification(qualification: any)
        {
            set(() => ({ qualification: qualification }))
        }, 
          
    } 
)

export default createStudentRegistrationSlice