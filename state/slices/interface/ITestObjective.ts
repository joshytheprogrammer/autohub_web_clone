export interface ITestObjective
{          
    selectedOption: any
    setSelectedOption: (selectedOption: any) => void
    getSelectedOption: () => void

    setEmptyTestObjective: (selectedOption: any) => void
    getEmptyTestObjective: () => void

    course: number
    setCourse: (course: any) => void
    getCourse: () => void

    force: string
    setForce: (force: any) => void
    getForce: () => void

    defaultTestObjectiveAnswer: []
    setDefaultTestObjectiveAnswer: (defaultTestObjectiveAnswer: any) => void
    getDefaultTestObjectiveAnswer: () => void

    testObjectiveIdentifier: string
    setTestObjectiveIdentifier: (testObjectiveIdentifier: any) => void
    getTestObjectiveIdentifier: () => void

    dataLoaded: boolean
    setDataLoaded: (dataLoaded: any) => void
    getDataLoaded: () => void

    firstDataLoaded: string
    setFirstDataLoaded: (firstDataLoaded: any) => void
    getFirstDataLoaded: () => void

    addition: string
    setAddition: (addition: any) => void
    getAddition: () => void

    duration: string
    setDuration: (duration: any) => void
    getDuration: () => void

    questionId: string
    setQuestionId: (questionId: any) => void
    getQuestionId: () => void

    plus: string
    setPlus: (plus: any) => void
    getPlus: () => void

    courseId: number
    setCourseId: (courseId: any) => void
    getCourseId: () => void


}