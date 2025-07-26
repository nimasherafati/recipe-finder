import {useState, useEffect} from 'react';

export default function useLocalStorage<T>(key:string , initialValue:T){
    const [value, setValue] = useState<T>(() => {
        if(typeof window === 'undefined') return initialValue;
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn('error reading from localStorage :',key,error);
            return initialValue;
        }
    })

    useEffect(() => {
        try {
            window.localStorage.setItem(key,JSON.stringify(value));
        } catch (error) {
            console.warn('error writing to localStorage : ',key,error)
        }
    },[key,value])

    return [value,setValue] as const ;
} 