import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
export const useFetch=(url:string,name:string)=>{
    return useQuery({queryKey:[name],queryFn:()=>{
        axios.get(url).then((res)=>res.data).catch((err:Error)=>err.message)
    }})
}