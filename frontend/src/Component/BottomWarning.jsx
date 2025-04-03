import { Link } from "react-router-dom"

export const BottomWarning = ({buttontxt,to,label})=>{
    return <div className="py-2 text-sm flex justify-center">
        <div>
            {label}
        </div>
        <Link className="pointer underline pl-1  cursor-pointer" to={to}>{buttontxt}</Link>
    </div>
}