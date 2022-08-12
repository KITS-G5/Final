import './App.css';
import Header from "./Header/Header";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Home from "./Home";

function App() {
    return (
        <>
            <div>
                <BrowserRouter>
                    <Routes>
                      <Route path='/' element={<Header/>}>
                          <Route index element={<Home/>}/>
                      </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
