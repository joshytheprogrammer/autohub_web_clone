export interface IExamTheory
{          
    selectedExamTheoryOption: any
    setSelectedExamTheoryOption: (selectedExamTheoryOption: any) => void
    getSelectedExamTheoryOption: () => void

    setEmptyExamTheory: (selectedExamTheoryOption: any) => void
    getEmptyExamTheory: () => void

    selectedExamTheoryAnswerValue: string
    setSelectedExamTheoryAnswerValue: (selectedExamTheoryAnswerValue: any) => void
    getSelectedExamTheoryAnswerValue: () => void

    forceExamTheory: string
    setForceExamTheory: (forceExamTheory: any) => void
    getForceExamTheory: () => void

    defaultExamTheoryAnswer: []
    setDefaultExamTheoryAnswer: (defaultExamTheoryAnswer: any) => void
    getDefaultExamTheoryAnswer: () => void

    examTheoryIdentifier: string
    setExamTheoryIdentifier: (examTheoryIdentifier: any) => void
    getExamTheoryIdentifier: () => void

    dataLoadedExamTheory: boolean
    setDataLoadedExamTheory: (dataLoadedExamTheory: any) => void
    getDataLoadedExamTheory: () => void

    firstDataLoadedExamTheory: string
    setFirstDataLoadedExamTheory: (firstDataLoadedExamTheory: any) => void
    getFirstDataLoadedExamTheory: () => void

    additionExamTheory: string
    setAdditionExamTheory: (additionExamTheory: any) => void
    getAdditionExamTheory: () => void

    durationExamTheory: string
    setDurationExamTheory: (durationExamTheory: any) => void
    getDurationExamTheory: () => void

    questionIdExamTheory: string
    setQuestionIdExamTheory: (questionIdExamTheory: any) => void
    getQuestionIdExamTheory: () => void

    plusExamTheory: string
    setPlusExamTheory: (plusExamTheory: any) => void
    getPlusExamTheory: () => void


}