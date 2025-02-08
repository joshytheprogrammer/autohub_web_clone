import { BASE_URL } from "../../../../constant/Path"


export async function NewStudent(data: { firstname:string, middlename: string, surname: string, phone: string, email: string, companyName: string, company_address: string, specialization: string, yearsIn:  string | number, region: string, city: string, dob: string | Date, gender: string | number, qualification: string, password: string }, token: string)
{
    let endPoint = `academic/registration/new`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        }, 
        body: JSON.stringify({ firstname: data?.firstname, middlename: data?.middlename, surname: data?.surname, phone: data?.phone, email: data?.email, companyName: data?.companyName, company_address: data?.company_address, specialization: data?.specialization, yearsIn: data?.yearsIn, region: data?.region, city: data?.city, birth: data?.dob, gender: data?.gender, qualification: data?.qualification, password: data?.password })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}


export async function ExistingUserStudent(data: { middlename: string, companyName: string, company_address: string, specialization: string, yearsIn:  string | number, region: string, city: string, dob: string | Date, gender: string | number, qualification: string, password: string }, token: string)
{
    let endPoint = `academic/registration/existing`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        }, 
        body: JSON.stringify({ middlename: data?.middlename, companyName: data?.companyName, company_address: data?.company_address, specialization: data?.specialization, yearsIn: data?.yearsIn, region: data?.region, city: data?.city, birth: data?.dob, gender: data?.gender, qualification: data?.qualification, password: data?.password })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function AllStudent(currentPage: number, perPage: number, searchQuery: string, token: string)
{ 
   let theQuery: string = searchQuery.trim()
   let endPoint = (theQuery.length === 0) ? `academic/students/enrolled/${currentPage}/${perPage}` :  `academic/students/enrolled/${currentPage}/${perPage}/${theQuery}`
   let ApiUrl = `${BASE_URL}${endPoint}`

   const response = await fetch(ApiUrl, 
   {
       method: 'GET',    
       headers: {    
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`   
       },   
     })     
     if(!response.ok)
     {
        throw new Error(`HTTP Error! status: ${response.status}`)
     }     
     return await response.json()
}

export async function MarkTheory(currentPage: number, perPage: number, searchQuery: string, token: string)
{ 
   let theQuery: string = searchQuery.trim()
   let endPoint = (theQuery.length === 0) ? `academic/students/marking/${currentPage}/${perPage}` :  `academic/students/marking/${currentPage}/${perPage}/${theQuery}`
   let ApiUrl = `${BASE_URL}${endPoint}`

   const response = await fetch(ApiUrl, 
   {
       method: 'GET',    
       headers: {    
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`   
       },   
     })     
     if(!response.ok)
     {
        throw new Error(`HTTP Error! status: ${response.status}`)
     }     
     return await response.json()
}

export async function HasUserPaid(token: string)
{ 
   let endPoint = `student/has-user-paid`
   let ApiUrl = `${BASE_URL}${endPoint}`

   const response = await fetch(ApiUrl, 
   {
       method: 'GET',    
       headers: {    
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`   
       },   
     })     
     if(!response.ok)
     {
        throw new Error(`HTTP Error! status: ${response.status}`)
     }     
     return await response.json()
}

export async function MakeFeePayment(receipt: string, token: string)
{ 
   let endPoint = `student/upload-receipt`
   let ApiUrl = `${BASE_URL}${endPoint}`

   const response = await fetch(ApiUrl, 
   {
       method: 'PUT',    
       headers: {    
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`   
       },   
       body: JSON.stringify({ receipt: receipt })
     })   
     if(!response.ok)
     {
        throw new Error(`HTTP Error! status: ${response.status}`)
     }     
     return await response.json()
}

export async function TimeTable(token: string)
{ 
   let endPoint = `student/time-table`
   let ApiUrl = `${BASE_URL}${endPoint}`

   const response = await fetch(ApiUrl, 
   {
       method: 'GET',    
       headers: {    
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`   
       }
     })   
     if(!response.ok)
     {
        throw new Error(`HTTP Error! status: ${response.status}`)
     }     
     return await response.json()
}

export async function StudentDashboard(token: string)
{ 
   let endPoint = `student/dashboard`
   let ApiUrl = `${BASE_URL}${endPoint}`

   const response = await fetch(ApiUrl, 
   {
       method: 'GET',    
       headers: {    
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`   
       }
     })   
     if(!response.ok)
     {
        throw new Error(`HTTP Error! status: ${response.status}`)
     }     
     return await response.json()
}

export async function Courses(token: string)
{ 
   let endPoint = `student/courses`
   let ApiUrl = `${BASE_URL}${endPoint}`

   const response = await fetch(ApiUrl, 
   {
       method: 'GET',    
       headers: {    
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`   
       }
     })   
     if(!response.ok)
     {
        throw new Error(`HTTP Error! status: ${response.status}`)
     }     
     return await response.json()
}

export async function courses(token: string)
{ 
   let endPoint = `student/courses`
   let ApiUrl = `${BASE_URL}${endPoint}`

   const response = await fetch(ApiUrl, 
   {
       method: 'GET',    
       headers: {    
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`   
       }
     })   
     if(!response.ok)
     {
        throw new Error(`HTTP Error! status: ${response.status}`)
     }     
     return await response.json()
}

export async function FAQ(id: number, token: string)
{ 
   let endPoint = `student/course-faq/${id}`
   let ApiUrl = `${BASE_URL}${endPoint}`

   const response = await fetch(ApiUrl, 
   {
       method: 'GET',    
       headers: {    
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`   
       }
     })   
     if(!response.ok)
     {
        throw new Error(`HTTP Error! status: ${response.status}`)
     }     
     return await response.json()
}

export async function MarkStudentExamTheory(id: number, token: string)
{
   let endPoint = `academic/students/student-exam-theory-answer/${id}`
   let ApiUrl = `${BASE_URL}${endPoint}`

   const response = await fetch(ApiUrl, 
   {
       method: 'GET',    
       headers: {    
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`   
       }
     })   
     if(!response.ok)
     {
        throw new Error(`HTTP Error! status: ${response.status}`)
     }     
     return await response.json()
}

export async function ScoreStudentScoreExam(data: { score: number, questionId: number, userId: number }, token: string)
{
   let endPoint = `academic/students/score-student`
   let ApiUrl = `${BASE_URL}${endPoint}`

   const response = await fetch(ApiUrl, 
   {
       method: 'PUT',    
       headers: {    
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`   
       },   
       body: JSON.stringify({ score: data?.score,  exam_theory_question_id : Number(data?.questionId), user_id: data?.userId })
     })   
     if(!response.ok)
     {
        throw new Error(`HTTP Error! status: ${response.status}`)
     }     
     return await response.json()
}

export async function StudentScores(id: number, token: string)
{
   let endPoint = `academic/students/result/${id}`
   let ApiUrl = `${BASE_URL}${endPoint}`

   const response = await fetch(ApiUrl, 
   {
       method: 'GET',    
       headers: {    
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`   
       }
     })   
     if(!response.ok)
     {
        throw new Error(`HTTP Error! status: ${response.status}`)
     }     
     return await response.json()
}

export async function ExamUserTimeTable(id: number, token: string)
{
   let endPoint = `academic/students/user-exam-time-table/${id}`
   let ApiUrl = `${BASE_URL}${endPoint}`

   const response = await fetch(ApiUrl, 
   {
       method: 'GET',    
       headers: {    
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`   
       }
     })   
     if(!response.ok)
     {
        throw new Error(`HTTP Error! status: ${response.status}`)
     }     
     return await response.json()
}

export async function ExamScheduleChange(data: { user_id: number, exam_date: string }, token: string)
{
   let endPoint = `academic/students/user-exam-time-table`
   let ApiUrl = `${BASE_URL}${endPoint}`

   const response = await fetch(ApiUrl, 
   {
       method: 'PUT',    
       headers: {    
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`   
       },
       body: JSON.stringify({ user_id: data?.user_id, exam_date: data?.exam_date })
     })   
     if(!response.ok)
     {
        throw new Error(`HTTP Error! status: ${response.status}`)
     }     
     return await response.json()
}



export async function ChangeUserTestSchedule(id: number, token: string)
{
   let endPoint = `academic/students/change-time-table-schedule/${id}`
   let ApiUrl = `${BASE_URL}${endPoint}`
   
   const response = await fetch(ApiUrl, 
   {
       method: 'GET',    
       headers: {    
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`   
       }
  })   
  if(!response.ok)
  {
     throw new Error(`HTTP Error! status: ${response.status}`)
  } else {
    return await response.json()
  }
}

export async function ChangeUserTimeTestSchedule(data: { id: number, userId: number, dateStarted: string, dateEnded: string, dateForTest: string }, token: string)
{
   let endPoint = `academic/students/change-test-schedule`
   let ApiUrl = `${BASE_URL}${endPoint}`
   const response = await fetch(ApiUrl, 
   {
       method: 'PUT',    
       headers: {    
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`   
       },
       body: JSON.stringify({ id: data?.id,  user_id: data?.userId,   date_started: data?.dateStarted,   date_ended: data?.dateEnded,   date_for_test: data?.dateForTest  })
  })   
  if(!response.ok)
  {
     console.log(response?.status)
     throw new Error(`HTTP Error! status: ${response.status}`)
  } else {
    return await response.json()
  }
}
