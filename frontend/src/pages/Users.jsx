import { useEffect, useState } from "react";
import axios from "axios";    
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const Users = ()=>{
    const [users,setUsers] = useState([]);
    const [filter,setFilter] = useState("");
    useEffect(()=>{
        axios.get("https://payasap.vercel.app/api/v1/user/bulk?filter="+filter)
            .then(response =>{
                console.log(response);
                setUsers(response.data.user);
            })
    },[filter])


    if(users.length === 0) return <div>
        Loading ...
    </div>

    return  <>
        <div className="text-lg mt-6 font-bold">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e)=>{
                setFilter(e.target.value);
            }} placeholder="Search Users..." className="w-full px-2 py-1 border rounded border-slate-300"/>
        </div>
        <div>
            {users.map(user=><User user={user} key={Math.random()}/>)}
        </div>
    </>
}

function User({user}){
    const navigate = useNavigate();
    return <div className="flex justify-between">
        <div className="flex">
            
            <div className="rounded-full  h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstname[0].toUpperCase()}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full font-semibold">
                <div>
                    {user.firstname} {user.lastname}
                </div>
            </div>

        </div>
        <div className="flex flex-col justify-center h-full">
            <Button onClick={(e)=>{
                navigate("/send?id="+ user.id+"&name="+user.firstname);
            }} label={"Send Money"}/>
        </div>
    </div>
}