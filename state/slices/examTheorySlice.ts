import { StateCreator } from "zustand";
import { IExamTheory } from "./interface/IExamTheory";

const createExamTheorySlice: StateCreator<IExamTheory> = (set, get) => (
    {
        selectedExamTheoryOption: [],
        setSelectedExamTheoryOption(x)
        {
            set((state) => ({ selectedExamTheoryOption: [...state.selectedExamTheoryOption, x] }))
        },
        getSelectedExamTheoryOption()
        {
            return get().selectedExamTheoryOption
        },

        setEmptyExamTheory(selectedExamTheoryOption)
        {
            set((state) => ({selectedExamTheoryOption: selectedExamTheoryOption}))
        },
        getEmptyExamTheory()
        {
            return get().selectedExamTheoryOption
        },

        selectedExamTheoryAnswerValue: '',
        setSelectedExamTheoryAnswerValue(selectedExamTheoryAnswerValue)
        {
            set((state) => ({selectedExamTheoryAnswerValue: selectedExamTheoryAnswerValue}))
        },
        getSelectedExamTheoryAnswerValue()
        {
            return get().selectedExamTheoryAnswerValue
        },

        forceExamTheory: 'no',
        setForceExamTheory(forceExamTheory)
        {
            set((state) => ({forceExamTheory: forceExamTheory}))
        },
        getForceExamTheory()
        {
            return get().forceExamTheory
        },

        defaultExamTheoryAnswer: [],
        setDefaultExamTheoryAnswer(defaultExamTheoryAnswer)
        {
            set((state) => ({defaultExamTheoryAnswer: defaultExamTheoryAnswer}))
        },
        getDefaultExamTheoryAnswer()
        {
            return get().defaultExamTheoryAnswer
        },

        examTheoryIdentifier: '',
        setExamTheoryIdentifier(examTheoryIdentifier)
        {
            set((state) => ({examTheoryIdentifier: examTheoryIdentifier}))
        },
        getExamTheoryIdentifier()
        {
            return get().examTheoryIdentifier
        },

        
        

        dataLoadedExamTheory: false,
        setDataLoadedExamTheory(dataLoadedExamTheory)
        {
            set((state) => ({dataLoadedExamTheory: dataLoadedExamTheory}))
        },
        getDataLoadedExamTheory()
        {
            return get().dataLoadedExamTheory
        },

        firstDataLoadedExamTheory: '',
        setFirstDataLoadedExamTheory(firstDataLoadedExamTheory)
        {
            set((state) => ({firstDataLoadedExamTheory: firstDataLoadedExamTheory}))
        },
        getFirstDataLoadedExamTheory()
        {
            return get().firstDataLoadedExamTheory
        },

        additionExamTheory: '',
        setAdditionExamTheory(additionExamTheory)
        {
            set((state) => ({additionExamTheory: additionExamTheory}))
        },
        getAdditionExamTheory()
        {
            return get().additionExamTheory
        },
///
        durationExamTheory: '',
        setDurationExamTheory(durationExamTheory)
        {
            set((state) => ({durationExamTheory: durationExamTheory}))
        },
        getDurationExamTheory()
        {
            return get().durationExamTheory
        },

        questionIdExamTheory: '',
        setQuestionIdExamTheory(questionIdExamTheory)
        {
            set((state) => ({questionIdExamTheory: questionIdExamTheory}))
        },
        getQuestionIdExamTheory()
        {
            return get().questionIdExamTheory
        },

        plusExamTheory: '',
        setPlusExamTheory(plusExamTheory)
        {
            set((state) => ({plusExamTheory: plusExamTheory}))
        },
        getPlusExamTheory()
        {
            return get().plusExamTheory
        }
    }
)

export default createExamTheorySlice;