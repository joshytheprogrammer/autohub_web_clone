import { BASE_URL } from "../../../../constant/Path"


export async function Questionaires(token: string)
{
    let endPoint = `academic/test/questionire/all`
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

export async function NewQuestionaire(name: string, description: string, token: string)
{
    let endPoint = `academic/test/questionire/create`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ name: name, description: description })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function RenameQuestionaire(id: number, name: string, description: string, token: string)
{
    let endPoint = `academic/test/questionire/rename`
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

export async function RemoveQuestionaire( id: number, token: string)
{
    let endPoint = `academic/test/questionire/remove`
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

// Test Questions
export async function QuestionaireQuestion(id: number, token: string)
{
    let endPoint = `academic/test/question/all/${id}`
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

export async function NewTestObjectiveQuestion(data: { questionaireId: number, courseId: number, question: string, optionA: string, optionB: string, optionC: string, optionD: string, answer: string, mark: string }, token: string)
{
    let endPoint = `academic/test/question/create`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'POST',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ questionaire_id: data?.questionaireId, course_id: data?.courseId, question: data?.question, option_a: data?.optionA, option_b: data?.optionB, option_c: data?.optionC, option_d: data?.optionD, answer: data?.answer, mark: data?.mark })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function UpdateTestObjectiveQuestion(data: { id:number, questionaireId: number, courseId: number, question: string, optionA: string, optionB: string, optionC: string, optionD: string, answer: string, mark: string }, token: string)
{
    let endPoint = `academic/test/question/rename`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        },   
        body: JSON.stringify({ id: data?.id, questionaire_id: data?.questionaireId, course_id: data?.courseId, question: data?.question, option_a: data?.optionA, option_b: data?.optionB, option_c: data?.optionC, option_d: data?.optionD, answer: data?.answer, mark: Number(data?.mark) })
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function RemoveQuestion( id: number, token: string)
{
    let endPoint = `academic/test/question/remove`
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

// Test Objective Questions
export async function HasUserPaid(token: string)
{
    let endPoint = `academic/test/question/all`
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

export async function SubmitTestObjective(answer: any, token: string)
{
    let endPoint = `academic/test/question/all`
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


export async function SubmitObjectiveTestQuestion(data: any, token: string)
{
    let endPoint = `academic/students/submt-test-objective`
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