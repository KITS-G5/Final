import Header from "./Header/Header";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Home from "./Home";
import {AuthContextProvider} from "./Context/AuthContext";
import Signin from "./Components/Authentication/Signin";
import Admin from "./Admin";
import HomeAdmin from "./Admin/Page/Home/home.admin";
import BuyCardWeb from "./BuyCardWeb";
import Search from "./Search";
import Bike from "./Admin/Page/Bikes/bike";
import Card from "./Admin/Page/Cards/card";
import Station from "./Admin/Page/Station/station";
import AddBike from "./Admin/Page/Bikes/addBike";

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
                          <Route path='/admin/home/stations' element={<Station/>}></Route>
                          <Route path='/admin/home/orders' element={<Station/>}></Route>
                          <Route path='/admin/home/bikes' element={<Bike/>}>

                          </Route>
                          <Route path='/admin/home/cards' element={<Card/>}></Route>
                      </Route>
                        <Route path='/add-bike' element={<AddBike/>}></Route>

                    </Routes>
                </BrowserRouter>
            </AuthContextProvider>
        </>
    );
}

export default App;
