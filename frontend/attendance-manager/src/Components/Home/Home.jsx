import '../Home/Home.css'
import {BrowserRouter , Routes , Route} from "react-router-dom";
import Register from "../Auth/register";
import Login from "../Auth/Login";
export default function Home(){
    return <>
     <BrowserRouter>
              <Routes>
                <Route path='/' element={<div>Insert Your main Component here</div>}/>
                <Route path='/signin' element={<Login/>}/>
                <Route path='/signup' element={<Register/>}/>
              </Routes>
    </BrowserRouter>
    </>
}
