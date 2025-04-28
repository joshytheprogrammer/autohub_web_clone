import { StateCreator } from "zustand";
import { IContentSlice } from "./interface/IContentSlice";


const CreateContentSlice: StateCreator<IContentSlice> = (set, get) => (
    {         
        aboutUs: "",
        getAboutUs()
        {
            return get().aboutUs
        },
        setAboutUs(aboutUs: any)
        {
            set(() => ({ aboutUs: aboutUs }))
        },

        contactUs: "",
        getContactUs()
        {
            return get().contactUs
        },
        setContactUs(contactUs: any)
        {
            set(() => ({ contactUs: contactUs }))
        },

        agreement: "",
        getAgreement()
        {
            return get().agreement
        },
        setAgreement(agreement: any)
        {
            set(() => ({ agreement: agreement }))
        },

        maceosContent: "",
        getMaceosContent()
        {
            return get().maceosContent
        },
        setMaceosContent(maceosContent: any)
        {
            set(() => ({ maceosContent: maceosContent }))
        },
    }   
)

export default CreateContentSlice