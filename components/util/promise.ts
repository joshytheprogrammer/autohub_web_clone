        

export async function ResponsePromise(rms: any) 
{
    let ans: { responseState: boolean, data: any }
    rms.then((response: any) => 
    {
        ans.responseState = true 
        ans.data = response
        return ans
    }).catch((error: any) => {
        ans.responseState = true 
        ans.data = error
        return ans
    })
}
