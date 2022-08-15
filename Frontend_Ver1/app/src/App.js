import Header from "./Header/Header";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Home from "./Home";
import {AuthContextProvider} from "./Context/AuthContext";
import Signin from "./Components/Authentication/Signin";
import Admin from "./Admin";
import HomeAdmin from "./Admin/Page/Home/home.admin";
import HomeEcoBicycle from "./EcoBicycle/Layout/Home/home.ecobicycle";
import MainEco from "./EcoBicycle/Page/Main/main.eco";
import Nopage from "./Layout/Nopage/Nopage";
import BuyCardEco from "./EcoBicycle/Page/BuyCard";
import Prepaid from "./EcoBicycle/Page/BuyCard/Prepaid/Prepaid";

function App() {
    return (
        <>
            <AuthContextProvider>
                <BrowserRouter>
                    <Routes>
                      <Route path='/' element={<Header/>}>
                          <Route index element={<Home/>}/>
                          <Route path='signin' element={<Signin/>}/>

                      </Route>
                      <Route path='/admin/home' element={<Admin/>}>
                          <Route index element={<HomeAdmin/>}/>
                      </Route>


                    </Routes>

                </BrowserRouter>
                <BrowserRouter>
                    <Routes>
                        <Route path='/ecobicycle' element={<HomeEcoBicycle/>}>
                            <Route index element={<MainEco/>}/>
                            <Route path='buy_card' element={<BuyCardEco/>}>
                            </Route>
                            <Route  path='buy_card/prepaid' element={<Prepaid/>}/>
                            <Route path='*' element={<Nopage/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthContextProvider>
        </>
    );
}

export default App;
