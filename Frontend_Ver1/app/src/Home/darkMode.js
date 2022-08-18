import "./darkmode.css";
import {ChangeEventHandler} from "react";

const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
};
const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
};
const storedTheme = localStorage.getItem("theme");

const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

// const toggleTheme = (e) => {
//     if (e.target.checked) {
//         setDark();
//     } else {
//         setLight();
//     }
// };
const toggleTheme: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) {
        setDark();
    } else {
        setLight();
    }
};


const darkMode = () => {

    return (
        <>
            <div className={'toggle-theme-wrapper'}>
                <span>☀</span>
                <label className={'toggle-theme'} htmlFor={'checkbox'}>
                    <input type={"checkbox"} id={'checkbox'} onChange={toggleTheme}/>
                    <div className={'slider round'}></div>
                </label>
                <span>🌒</span>
            </div>
        </>
    );
};
export default darkMode;