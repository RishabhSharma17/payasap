import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance";
import { Users }  from "./Users";

export const Dashboard = ()=>{
    

    return <div>
        <Appbar/>
        <div className="m-8">
            <Balance/>
            <Users/>
        </div>
        
    </div>
}