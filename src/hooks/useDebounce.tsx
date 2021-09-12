import {useEffect,useState} from "react";
//防抖动hook
function useDebounce(value:any,delay = 300) {
    const [debouncedValue,setDebouncedValue] = useState(value)
    useEffect(()=>{
        const handler = window.setTimeout(()=>{
            setDebouncedValue(value)
        },delay)
        return (()=>{
            clearTimeout(handler)
        })
    },[value,delay])
    return debouncedValue
}

export default useDebounce;