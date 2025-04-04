import { useState } from "react";
import { BottomWarning } from "../Component/BottomWarning";
import { Button } from "../Component/Button";
import { Heading } from "../Component/Heading";
import { InputBox } from "../Component/InputBox";
import { SubHeading } from "../Component/SubHeading";
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signin = ()=>{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg w-80 text-center p-2 px-4 h-max">
                <Heading label={"Sign in"}/>
                <SubHeading label={"Enter your credentials to access your account"}/>
                <InputBox onChange={(e)=>{
                    setUsername(e.target.value);
                }} label={"Email"} placeholder={"rishabh@gmail.com"}/>
                <InputBox onChange={(e)=>{
                    setPassword(e.target.value);
                }} label={"Password"} placeholder={"123456"}/>
                <div className="pt-4">
                    <Button onClick={async ()=>{
                        const response = await axios.post("https://payasap.vercel.app/api/v1/user/signin",{
                            username,
                            password
                        })
                        localStorage.setItem("token",response.data.token)
                        navigate("/dashboard");
                    }} label={"Sign in"}/>
                </div>
                
                <BottomWarning label={"Don't have an account?"} buttontxt={"Sign up"} to={"/signup"}/>
            </div>
            
        </div>
        
    </div>
}