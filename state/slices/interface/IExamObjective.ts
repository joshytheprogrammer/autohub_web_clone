export interface IExamObjective
{          
    selectedExamOption: any
    setSelectedExamObjectiveOption: (selectedExamOption: any) => void
    getSelectedExamObjectiveOption: () => void

    setEmptyExamObjective: (selectedExamOption: any) => void
    getEmptyExamObjective: () => void

    forceExamObj: string
    setForceExamObj: (forceExamObj: any) => void
    getForceExamObj: () => void

    defaultExamObjectiveAnswer: []
    setDefaultExamObjectiveAnswer: (defaultExamObjectiveAnswer: any) => void
    getDefaultExamObjectiveAnswer: () => void

    examObjectiveIdentifier: string
    setExamObjectiveIdentifier: (examObjectiveIdentifier: any) => void
    getExamObjectiveIdentifier: () => void

    dataLoadedExamObj: boolean
    setDataLoadedExamObj: (dataLoadedExamObj: any) => void
    getDataLoadedExamObj: () => void

    firstDataLoadedExamObj: string
    setFirstDataLoadedExamObj: (firstDataLoadedExamObj: any) => void
    getFirstDataLoadedExamObj: () => void

    additionExamObj: string
    setAdditionExamObj: (additionExamObj: any) => void
    getAdditionExamObj: () => void

    durationExamObj: string
    setDurationExamObj: (durationExamObj: any) => void
    getDurationExamObj: () => void

    questionIdExamObj: string
    setQuestionIdExamObj: (questionIdExamObj: any) => void
    getQuestionIdExamObj: () => void

    plusExamObj: string
    setPlusExamObj: (plusExamObj: any) => void
    getPlusExamObj: () => void


}