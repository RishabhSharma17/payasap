import { Appbar } from "../components/Appbar"
import { Balance } from "../Components/Balance"
import { Users } from "../Components/Users"

export const Dashboard = ()=>{
    

    return <div>
        <Appbar/>
        <div className="m-8">
            <Balance/>
            <Users/>
        </div>
        
    </div>
}