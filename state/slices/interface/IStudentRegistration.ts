
export interface IStudentRegistration
{   
    firstname: string
    getFirstname: () => void
    setFirstname: (firstname: any) => void

    surname: string
    getSurname: () => void
    setSurname: (surname: any) => void

    middlename: string
    getMiddlename: () => void
    setMiddlename: (middlename: any) => void

    phone: string
    getPhone: () => void
    setPhone: (phone: any) => void

    email: string
    getEmail: () => void
    setEmail: (email: any) => void

    companyName: string
    getCompanyName: () => void
    setCompanyName: (companyName: any) => void

    homeAddress: string
    getHomeAddress: () => void
    setHomeAddress: (homeAddress: any) => void

    specialization: string
    getSpecialization: () => void
    setSpecialization: (specialization: any) => void

    yearsIn: string
    getYearsIn: () => void
    setYearsIn: (yearsIn: any) => void

    region: string
    getRegion: () => void
    setRegion: (region: any) => void

    city: string
    getCity: () => void
    setCity: (city: any) => void

    dob: string
    getDob: () => void
    setDob: (dob: any) => void

    gender: string
    getGender: () => void
    setGender: (gender: any) => void

    qualification: string
    getQualification: () => void
    setQualification: (qualification: any) => void

    // const data = { firstname, middlename, surname, phone, email, companyName, homeAddress, specialization, yearsIn, region, city, dob, gender, qualification }
}