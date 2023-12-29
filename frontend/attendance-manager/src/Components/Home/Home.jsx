import '../Home/Home.css'
import {BrowserRouter , Routes , Route} from "react-router-dom";
import Register from "../Auth/register";
import Login from "../Auth/Login";
import UserHome from '../UserHome/UserHome';
export default function Home(){
    return <>
     <BrowserRouter>
              <Routes>
                <Route path='/' element={<div>Insert Your main Component here</div>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/userhome' element={<UserHome/>}/>
              </Routes>
    </BrowserRouter>
    </>
}
