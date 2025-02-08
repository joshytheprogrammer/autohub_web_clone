import { BASE_URL } from "../../../../constant/Path"

// Objective Duration
export async function ExamObjectiveDuration(duration: string, token: string)
{
    let endPoint = `academic/exam/set-exam-objective-time`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ duration: duration })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

// Theory Question
export async function ExamTheoryDurationn(duration: string, token: string)
{
    let endPoint = `academic/exam/set-exam-theory-time`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  
        },   
        body: JSON.stringify({ duration: duration })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

// Objective Questionaire
export async function ExamQuestionaires(token: string)
{
    let endPoint = `academic/exam/all`
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

// objective questionaire 
export async function ExamObjectiveQuestionaires(token: string)
{
    let endPoint = `academic/exam/questionire/objective/all`
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

export async function NewExamObjectiveQuestionaire(name: string, description: string, token: string)
{
    let endPoint = `academic/exam/questionire/objective/create`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ name: name, type: 'objective', description: description })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function RenameExamObjectiveQuestionaire(id: number, name: string, description: string, token: string)
{
    let endPoint = `academic/exam/questionire/objective/rename`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ id: id, name: name, description: description })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function RemoveExamObjectiveQuestionaire( id: number, token: string)
{
    let endPoint = `academic/exam/questionire/objective/remove`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ id: id })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

// theory questionaire 
export async function ExamTheoryQuestionaires(token: string)
{
    let endPoint = `academic/exam/questionire/theory/all`
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

export async function NewExamTheoryQuestionaire(name: string, description: string, token: string)
{
    let endPoint = `academic/exam/questionire/theory/create`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ name: name, type: 'theory', description: description })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function RenameExamTheoryQuestionaire(id: number, name: string, description: string, token: string)
{
    let endPoint = `academic/exam/questionire/theory/rename`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ id: id, name: name, description: description })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function RemoveExamTheoryQuestionaire( id: number, token: string)
{
    let endPoint = `academic/exam/questionire/theory/remove`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ id: id })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}




// Objective Question
export async function ExamObjectiveQuestions(id: number, token: string)
{
    let endPoint = `academic/exam/objective/questions/${id}`
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

export async function NewExamObjectiveQuestion(data: { questionaireId: number, question: string, optionA: string, optionB: string, optionC: string, optionD: string, answer: string, mark: string }, token: string)
{console.log(data)
    let endPoint = `academic/exam/objective/create`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ questionaire_id: data?.questionaireId, question: data?.question, option_a: data?.optionA, option_b: data?.optionB, option_c: data?.optionC, option_d: data?.optionD, answer: data?.answer, mark: data?.mark })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function UpdateExamObjectiveQuestion(data: { id:number, questionaireId: number, question: string, optionA: string, optionB: string, optionC: string, optionD: string, answer: string, mark: string }, token: string)
{
    let endPoint = `academic/exam/objective/rename`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ id: data?.id, questionaire_id: data?.questionaireId, question: data?.question, option_a: data?.optionA, option_b: data?.optionB, option_c: data?.optionC, option_d: data?.optionD, answer: data?.answer, mark: Number(data?.mark) })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function RemoveExamQuestion( id: number, token: string)
{
    let endPoint = `academic/exam/objective/remove`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ id: id })
    })     
    if(!response.ok)
    {
      throw new Error(`HTTP Error! status: ${response.status}`)
    }     
    return await response.json()
}


// Theory Question
export async function ExamTheoryQuestions(id: number, token: string)
{
    let endPoint = `academic/exam/theory/questions/${id}`
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

export async function NewExamTheoryQuestion(data: { questionaireId: number, question: string, mark: string }, token: string)
{
    let endPoint = `academic/exam/theory/create`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ questionaire_id: data?.questionaireId, question: data?.question, mark: data?.mark })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function ChangeExamTheoryQuestion(data: { id: number, questionaireId: number, question: string, mark: string }, token: string)
{
    let endPoint = `academic/exam/theory/update`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ id: data?.id, questionaire_id: data?.questionaireId, question: data?.question, mark: data?.mark })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function RemoveExamTheoryQuestion(id: number, token: string)
{
    let endPoint = `academic/exam/theory/delete`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ id: id })
    })     
    if(!response.ok)
    {
       throw new Error(`HTTP Error! status: ${response.status}`)
    }     
    return await response.json()
}



export async function StudentExamTheoryQuestion(id: number, token: string)
{ 
   let endPoint = `academic/students/exam-theory-answer/${id}`
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

export async function EnrollStudent(id: number, token: string)
{ 
   let endPoint = `academic/students/confirm-student`
   let ApiUrl = `${BASE_URL}${endPoint}`

   const response = await fetch(ApiUrl, 
   {
      method: 'PUT',    
      headers: {    
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`   
      },   
      body: JSON.stringify({ id: id })
   })     
   if(!response.ok)
   {
      throw new Error(`HTTP Error! status: ${response.status}`)
   }     
   return await response.json()
}



// submit exam objective questions
export async function SubmitExamQuestions(data: any, token: string)
{
    let endPoint = `academic/students/submit-exam`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ data: data })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}