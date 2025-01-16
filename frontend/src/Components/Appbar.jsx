import { Link } from "react-router-dom"
export const Appbar = ()=>{
    return <div className="flex justify-between shadow  h-14">
        <Link to={'/dashboard'}>
            <div className="flex flex-col justify-center h-full ml-4 font-semibold text-lg cursor-pointer">PayZap</div>
        </Link>
        <div className="flex justify-center">
            <Link to={'/signin'}>
                <button onClick={()=>{
                    localStorage.removeItem("token")
                }} type="button" className=" my-2 justify-center mr-8 text-white bg-red-700 hover:bg-red-800 focus:outline-none 
                focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5
                text-center me-2 mb-1">Log out</button>
            </Link>
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full  h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    U
                </div>
            </div>
        </div>
    </div>
}