import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { ProtectedPath } from "./Component/ProtectedPath";

function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
          
              <Route path="/signup" element={<Signup/>}></Route>
        
              <Route path="/signin" element={<Signin/>}></Route>
              <Route path="/dashboard" element={
                <ProtectedPath>
                  <Dashboard/>
                </ProtectedPath>
              }></Route>
              <Route path="/send" element={
                <ProtectedPath>
                  <SendMoney/>
                </ProtectedPath>
              }></Route>
            <Route path="/" element={
              localStorage.getItem("token") ? <Navigate to={'/dashboard'} replace/> : <Navigate to={'/signup'} replace/>
            } />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App