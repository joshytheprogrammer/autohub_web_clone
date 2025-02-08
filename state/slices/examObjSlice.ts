import { StateCreator } from "zustand";
import { IExamObjective } from "./interface/IExamObjective";

const createExamObjectiveSlice: StateCreator<IExamObjective> = (set, get) => (
    {
        selectedExamOption: [],
        setSelectedExamObjectiveOption(x)
        { 
            // console.log("- Set Slice - | - Set Slice - | - Set Slice - | ")
            // console.log(x)
            // console.log("- Set Slice - | - Set Slice - | - Set Slice - | ")
            set((state) => ({ selectedExamOption: [...state.selectedExamOption, x] }))
        },
        getSelectedExamObjectiveOption()
        { 
            // console.log("- Get Slice - | - Get Slice - | - Get Slice - | ")
            // console.log(this.selectedExamOption)
            // console.log("- Get Slice - | - Get Slice - | - Get Slice - | ")
            return get().selectedExamOption
        },

        setEmptyExamObjective(selectedExamOption)
        {
            set(() => ({selectedExamOption: selectedExamOption}))
        },
        getEmptyExamObjective()
        {
            return get().selectedExamOption
        },

        forceExamObj: 'no',
        setForceExamObj(forceExamObj)
        {
            set(() => ({forceExamObj: forceExamObj}))
        },
        getForceExamObj()
        {
            return get().forceExamObj
        },

        defaultExamObjectiveAnswer: [],
        setDefaultExamObjectiveAnswer(defaultExamObjectiveAnswer)
        {
            set(() => ({defaultExamObjectiveAnswer: defaultExamObjectiveAnswer}))
        },
        getDefaultExamObjectiveAnswer()
        {
            return get().defaultExamObjectiveAnswer
        },        

        examObjectiveIdentifier: '',
        setExamObjectiveIdentifier(examObjectiveIdentifier)
        {
            set(() => ({examObjectiveIdentifier: examObjectiveIdentifier}))
        },
        getExamObjectiveIdentifier()
        {
            return get().examObjectiveIdentifier
        },

        dataLoadedExamObj: false,
        setDataLoadedExamObj(dataLoadedExamObj)
        {
            set(() => ({dataLoadedExamObj: dataLoadedExamObj}))
        },
        getDataLoadedExamObj()
        {
            return get().dataLoadedExamObj
        },

        firstDataLoadedExamObj: '',
        setFirstDataLoadedExamObj(firstDataLoadedExamObj)
        {
            set(() => ({firstDataLoadedExamObj: firstDataLoadedExamObj}))
        },
        getFirstDataLoadedExamObj()
        {
            return get().firstDataLoadedExamObj
        },

        additionExamObj: '',
        setAdditionExamObj(additionExamObj)
        {
            set(() => ({additionExamObj: additionExamObj}))
        },
        getAdditionExamObj()
        {
            return get().additionExamObj
        },

        durationExamObj: '',
        setDurationExamObj(durationExamObj)
        {
            set(() => ({durationExamObj: durationExamObj}))
        },
        getDurationExamObj()
        {
            return get().durationExamObj
        },

        questionIdExamObj: '',
        setQuestionIdExamObj(questionIdExamObj)
        {
            set(() => ({questionIdExamObj: questionIdExamObj}))
        },
        getQuestionIdExamObj()
        {
            return get().questionIdExamObj
        },

        plusExamObj: '',
        setPlusExamObj(setPlusExamObj)
        {
            set(() => ({setPlusExamObj: setPlusExamObj}))
        },
        getPlusExamObj()
        {
            return get().setPlusExamObj
        }
    }
)

export default createExamObjectiveSlice;