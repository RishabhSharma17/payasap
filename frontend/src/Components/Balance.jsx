import { useEffect, useState } from "react"
import axios from "axios"

export const Balance = ()=>{
    const [val,setVal] = useState(null);
    useEffect(()=>{
        axios.get('http://localhost:3000/api/v1/account/balance',{
            headers:{
                Authorization:'Bearer '+localStorage.getItem("token")
            }
        })
            .then(res=>{
                setVal(res.data.balance.toFixed(2));
            })
    });
    return <div className="flex">
        <div className="font-bold text-lg">
        Your Balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {val}
        </div>
    </div>
}