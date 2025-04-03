import { Appbar } from "../Component/Appbar"
import { Balance } from "../Component/Balance";
import { Users }  from "./Component/Users";

export const Dashboard = ()=>{
    

    return <div>
        <Appbar/>
        <div className="m-8">
            <Balance/>
            <Users/>
        </div>
        
    </div>
}