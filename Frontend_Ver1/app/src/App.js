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
import Topup from "./BuyCardWeb/Topup";
import PaymentMethod from "./BuyCardWeb/PaymentMethod";
import EcoSignin from "./EcoBicycle/Components/Authentication/Eco.SignIn/Eco.Signin";
import EcoMembership from "./EcoBicycle/Components/Authentication/Eco.SignIn/Membership/Eco.Membership";
import EcoCreateMember from "./EcoBicycle/Components/Authentication/Eco.SignIn/CreateMember/EcoCreateMember";
import LoginAccount from "./EcoBicycle/Components/Authentication/Eco.Signup/LoginAccount";


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
                          <Route path="/topup" element={<Topup/>}/>
                          <Route path="/pay/:output" element={<PaymentMethod/>}/>


                      </Route>
                      <Route path='/admin/home' element={<Admin/>}>
                          <Route index element={<HomeAdmin/>}/>
                          <Route path='/admin/home/stations' element={<Station/>}></Route>
                          <Route path='/admin/home/orders' element={<Station/>}></Route>
                          <Route path='/admin/home/bikes' element={<Bike/>}></Route>
                          <Route path='/admin/home/cards' element={<Card/>}></Route>
                      </Route>

                        <Route path='/test' element={<Station/>}></Route>

                    </Routes>




                </BrowserRouter>
                <BrowserRouter>
                    <Routes>
                        {/*<Route path="/ecobicycle" element={<HomeEcoBicycle />}>*/}
                        {/*    <Route index element={<ContentsEco/>}/>*/}

                        {/*    <Route path="signup" element={<EcoSignin />}/>*/}
                        {/*    <Route path="newsignin" element={<EcoMembership/>} />*/}
                        {/*    <Route path="create_account" element={<EcoCreateMember/>} />*/}
                        {/*    <Route path="sign_account" element={<LoginAccount/>} />*/}
                        {/*    <Route path="home" element={<MainEco />} />*/}
                        {/*</Route>*/}
                    </Routes>
                </BrowserRouter>
            </AuthContextProvider>

        </>
    );
}

export default App;
