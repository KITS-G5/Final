import Header from "./Header/Header";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./Home";
import { AuthContextProvider } from "./Context/AuthContext";
import Signin from "./Components/Authentication/Signin";
import Admin from "./Admin";
import HomeAdmin from "./Admin/Page/Home/home.admin";
import BuyCardWeb from "./BuyCardWeb";
import Search from "./Search";
import Bike from "./Admin/Page/Bikes/bike";
import EditBike from "./Admin/Page/Bikes/editBike";
//import addbike
import AddBike from "./Admin/Page/Bikes/addBike";
import Card from "./Admin/Page/Cards/card";
import Station from "./Admin/Page/Station/station";
import Topup from "./BuyCardWeb/Topup";
import PaymentMethod from "./BuyCardWeb/PaymentMethod";
import EcoSignin from "./EcoBicycle/Components/Authentication/Eco.SignIn/Eco.Signin";
import EcoMembership from "./EcoBicycle/Components/Authentication/Eco.SignIn/Membership/Eco.Membership";
import EcoCreateMember from "./EcoBicycle/Components/Authentication/Eco.SignIn/CreateMember/EcoCreateMember";
import LoginAccount from "./EcoBicycle/Components/Authentication/Eco.Signup/LoginAccount";
import Contact from "./Contact";
import AdminUser from "./AdminUser";
import AddStation from "./Admin/Page/Station/addStation";
import User from "./Admin/Page/User/user";
import HomeEcoBicycle from "./EcoBicycle/Layout/Home/home.ecobicycle";
import ContentsEco from "./EcoBicycle/Layout/Contents/contents.eco";
import Demo from "./EcoBicycle/Components/Authentication/Eco.Signup/User";
import MainEco from "./EcoBicycle/Page/Main/main.eco";
import EcoPaymentMethod from "./EcoBicycle/Page/PaymentMethods/Eco.PaymentMethor";
import EcoTopup from "./EcoBicycle/Page/Topup";
import RentBike from "./EcoBicycle/Page/RentBike/RentBike";
import ReturnBikeTest from "./EcoBicycle/Page/ReturnBike/Test02";
import CheckValue from "./EcoBicycle/Page/ReturnBike/Checkvalue";
import {LoggerContext} from "./Context/GlobalContext";
import {Fragment} from "react";
import SigninHome from "./Components/Authentication/Signin/SigninHome";
import Confirm from "./Components/Authentication/ProtectedRoute/Confirm";


function App() {
    return (
        <Fragment>
            <LoggerContext.Provider >
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Header />}>
                            <Route index element={<Home />} />
                            <Route path="/buyweb" element={<BuyCardWeb />} />
                            <Route path='signin' element={<SigninHome />} />
                            <Route path='buycard' element={<EcoCreateMember />} />
                            <Route path='confirm/:phone' element={<Confirm />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/topup" element={<Topup />} />
                            <Route path="/pay/:cardNo/:output" element={<PaymentMethod />} />
                            {/*<Route path="/contact" element={<Contact/>}/>*/}
                        </Route>
                        <Route path='/admin/home' element={<Admin />}>
                            <Route index element={<HomeAdmin />} />
                            <Route path='/admin/home/stations' element={<Station />}></Route>
                            <Route path='/admin/home/orders' element={<Station />}></Route>
                            <Route path='/admin/home/bikes' element={<Bike />}>
                                {/* <Route path='addbike' element={<AddBike />}></Route> */}
                            </Route>
                            <Route path='/admin/home/users' element={<User />}></Route>
                            <Route path='/admin/home/cards' element={<Card />}></Route>
                        </Route>
                        <Route path='addbike' element={<AddBike />}></Route>
                        <Route path='addstation' element={<AddStation />}></Route>
                        <Route path='/edit/:id' element={<EditBike />}></Route>
                        <Route path={'/admin/user/'}>
                            <Route index element={<AdminUser/>}/>
                            <Route path={'/admin/user/:cardNum'} element={<AdminUser/>}/>
                            <Route path={'/admin/user/topup'} element = {<Topup/>}/>
                        </Route>


                        <Route path="/ecobicycle" element={<HomeEcoBicycle />}>
                            <Route index element={<ContentsEco/>}/>
                            {/*<Route path='sign_account' element={<LoginAccount/>}/>*/}
                            <Route path='sign_account' element={<Demo/>}/>

                            <Route path='signup' element={<EcoSignin/>}></Route>
                            <Route  path='signup/new_signin' element={<EcoMembership/>}/>
                            {/*<Route  path='signup/new_signin/create_account' element={<EcoCreateMember/>}/>*/}
                            <Route path='main/:data' element={<MainEco/>}></Route>
                            <Route path='main/:data/topup' element={<EcoTopup/>}></Route>
                            <Route path='rentbike/:id' element={<RentBike/>}></Route>
                            <Route path='return_bike' element={<ReturnBikeTest />}></Route>
                            <Route path='return_bike/:id' element={<CheckValue />}></Route>
                            <Route path='main/:data/topup/pay/:cardNo/:output' element={<EcoPaymentMethod/>}></Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </LoggerContext.Provider>

        </Fragment>
    );
}

export default App;
