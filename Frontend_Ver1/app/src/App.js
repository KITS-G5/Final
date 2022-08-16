import Header from "./Header/Header";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Home from "./Home";
import {AuthContextProvider} from "./Context/AuthContext";
import Signin from "./Components/Authentication/Signin";
import Admin from "./Admin";
import HomeAdmin from "./Admin/Page/Home/home.admin";
import BuyCardWeb from "./BuyCardWeb";
import Search from "./Search";

function App() {
    return (
        <>
            <AuthContextProvider>
                <BrowserRouter>
                    <Routes>
                      <Route path='/' element={<Header/>}>
                          <Route index element={<Home/>}/>
                          <Route path="/buyweb" element={<BuyCardWeb/>}/>
                          <Route path='signin' element={<Signin/>}/>
                          <Route path="/search" element={<Search/>}/>
                      </Route>
                      <Route path='/admin/home' element={<Admin/>}>
                          <Route index element={<HomeAdmin/>}/>
                      </Route>
                    </Routes>
                </BrowserRouter>
            </AuthContextProvider>
        </>
    );
}

export default App;
