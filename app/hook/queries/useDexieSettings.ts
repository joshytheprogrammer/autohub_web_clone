import { useEffect, useState } from "react"
import { useLiveQuery } from "dexie-react-hooks";
import { settingsDB } from "../../model/Product";

export const useDexieSettings = () => 
{
    const [ slideTimer, setSlideTImer] = useState<number>(0)
    const timer = useLiveQuery(() => settingsDB.get(1));
    let timing: number = Number(timer?.timer)
    console.log(timer)
    console.log(timing)
    setSlideTImer(timing)

    return {slideTimer}
}