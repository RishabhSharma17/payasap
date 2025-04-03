import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Heading } from "../Component/Heading";
import { SubHeading } from "../Component/SubHeading";
import { InputBox } from "../Component/InputBox";
import { Button } from "../Component/Button";
import { BottomWarning } from "../Component/BottomWarning";

export const Signup = ()=>{
    const [firstname,setFirstName] = useState("");
    const [lastname,setLastName] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg w-80 text-center p-2 px-4 h-max">
                <Heading label={"Sign up"}/>
                <SubHeading label={"Enter your infomation to create an create"}/>
                <InputBox onChange={(e)=>{
                    setFirstName(e.target.value);
                }} label={"First Name"} placeholder={"rishabh"}/>
                <InputBox onChange={(e)=>{
                    setLastName(e.target.value);
                }} label={"Last Name"} placeholder={"Sharma"}/>
                <InputBox onChange={(e)=>{
                    setUsername(e.target.value);
                }} label={"Email"} placeholder={"rishabh@gmail.com"}/>
                <InputBox onChange={(e)=>{
                    setPassword(e.target.value);
                }} label={"Password"} placeholder={"123456"}/>
                <div className="pt-4">
                    <Button onClick={async ()=>{
                        const response = await axios.post("https://payasap.vercel.app/api/v1/user/signup",{
                            username,
                            password,
                            firstname,
                            lastname
                        });
                        localStorage.setItem("token",response.data.token);
                        navigate("/dashboard");

                    }} label={"Signup"}/>
                </div>
                
                <BottomWarning label={"Already have an account?"} buttontxt={"Sign in"} to={"/signin"}/>
            </div>
            
        </div>
        
    </div>
}