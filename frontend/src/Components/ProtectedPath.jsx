import { Navigate } from "react-router-dom";

export const ProtectedPath = ({children}) => {
    const token = localStorage.getItem("token");

    if(!token){
        return <Navigate to={'/signup'} replace/>
    }

    return children;
}