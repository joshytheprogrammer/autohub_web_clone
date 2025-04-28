
export interface IContentSlice
{          
    aboutUs: string
    getAboutUs:  () => void
    setAboutUs:  (aboutUs: string) => void

    contactUs: string
    getContactUs:  () => void
    setContactUs:  (contactUs: string) => void

    agreement: string
    getAgreement:  () => void
    setAgreement:  (agreement: string) => void

    maceosContent: string
    getMaceosContent:  () => void
    setMaceosContent:  (maceosContent: string) => void

}