import { create } from 'zustand'
import createProductSlice from './slices/ProductSlice'
import { persist } from 'zustand/middleware'
import { IProductOnHomePage } from './slices/interface/IProductOnHomePage'
import createAdvertSlice from './slices/AdvertSlice';
import { IAdvert } from './slices/interface/IAdvert';
import createSearchSlice from './slices/SearchSlice';
import createAuthSlice from './slices/AuthSlice';
import { ISearchSlice } from './slices/interface/ISearchSlice';
import { IAuth } from './slices/interface/IAuth';
import createThemeSlice from './slices/ThemeSlice';
import { ITheme } from './slices/interface/ITheme';
import createSessionSlice from './slices/SessionSlice';
import { ISession } from './slices/interface/ISession';
import createStudentRegistrationSlice from './slices/StudentRegistrationSlice';
import { IStudentRegistration } from './slices/interface/IStudentRegistration';
import createTestObjectiveSlice from './slices/testObjSlice';
import createExamObjectiveSlice from './slices/examObjSlice';
import createExamTheorySlice from './slices/examTheorySlice';
import { ITestObjective } from './slices/interface/ITestObjective';
import { IExamObjective } from './slices/interface/IExamObjective';
import { IExamTheory } from './slices/interface/IExamTheory';


export const UseStore = create<any, [ ['zustand/persist', [IProductOnHomePage, IAdvert, ISearchSlice, IAuth, ITheme, ISession, IStudentRegistration, ITestObjective, IExamObjective, IExamTheory]], ['zustand/devtools', never] ] >(persist((...a) => 
(
    {
        ...createProductSlice(...a),
        ...createAdvertSlice(...a),
        ...createSearchSlice(...a),
        ...createAuthSlice(...a),
        ...createThemeSlice(...a),
        ...createSessionSlice(...a),
        ...createStudentRegistrationSlice(...a),
        ...createTestObjectiveSlice(...a),        
        ...createExamObjectiveSlice(...a),        
        ...createExamTheorySlice(...a)
    }
), { name: 'autohub' }));
