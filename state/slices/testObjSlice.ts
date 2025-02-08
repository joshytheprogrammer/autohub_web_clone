import { StateCreator } from "zustand";
import { ITestObjective } from "./interface/ITestObjective";


const createTestObjectiveSlice: StateCreator<ITestObjective> = (set, get) => (
    {

        selectedOption: [],
        setSelectedOption(x)
        {
            set((state) => ({ selectedOption: [...state.selectedOption, x] }))

            // set((state) => ({
            //     selectedOption: { ...state.selectedOption, selectedOption: [...state.selectedOption, x] }
            //   }))
        },
        getSelectedOption()
        {
            return get().selectedOption
        },

        setEmptyTestObjective(selectedOption)
        {
            set((state) => ({selectedOption: selectedOption}))
        },
        getEmptyTestObjective()
        {
            return get().selectedOption
        },

        course: -1,
        setCourse(course)
        {
            set((state) => ({course: course}))
        },
        getCourse()
        {
            return get().course
        },

        force: 'no',
        setForce(force)
        {
            set((state) => ({force: force}))
        },
        getForce()
        {
            return get().force
        },

        defaultTestObjectiveAnswer: [],
        setDefaultTestObjectiveAnswer(defaultTestObjectiveAnswer)
        {
            set((state) => ({defaultTestObjectiveAnswer: defaultTestObjectiveAnswer}))
        },
        getDefaultTestObjectiveAnswer()
        {
            return get().defaultTestObjectiveAnswer
        },

        testObjectiveIdentifier: '',
        setTestObjectiveIdentifier(testObjectiveIdentifier)
        {
            set((state) => ({testObjectiveIdentifier: testObjectiveIdentifier}))
        },
        getTestObjectiveIdentifier()
        {
            return get().testObjectiveIdentifier
        },

        dataLoaded: false,
        setDataLoaded(dataLoaded)
        {
            set((state) => ({dataLoaded: dataLoaded}))
        },
        getDataLoaded()
        {
            return get().dataLoaded
        },

        firstDataLoaded: '',
        setFirstDataLoaded(firstDataLoaded)
        {
            set((state) => ({firstDataLoaded: firstDataLoaded}))
        },
        getFirstDataLoaded()
        {
            return get().firstDataLoaded
        },

        addition: '',
        setAddition(addition)
        {
            set((state) => ({addition: addition}))
        },
        getAddition()
        {
            return get().addition
        },

        duration: '',
        setDuration(duration)
        {
            set((state) => ({duration: duration}))
        },
        getDuration()
        {
            return get().duration
        },

        questionId: '',
        setQuestionId(questionId)
        {
            set((state) => ({questionId: questionId}))
        },
        getQuestionId()
        {
            return get().questionId
        },

        plus: '',
        setPlus(plus)
        {
            set((state) => ({plus: plus}))
        },
        getPlus()
        {
            return get().plus
        },

        courseId: -1,
        setCourseId(courseId)
        {
            set((state) => ({courseId: courseId}))
        },
        getCourseId()
        {
            return get().plus
        }
    }
)

export default createTestObjectiveSlice;