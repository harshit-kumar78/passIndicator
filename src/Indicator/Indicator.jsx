import React, { useEffect, useRef, useState } from 'react'
import "./Indicator.css";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
const Indicator = () => {
    const passwordRef = useRef(null);
    const pRef = useRef(null);
    const spanRef = useRef(null);
    const indicatorRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showToggle, setShowToggle] = useState(false);

    const calculateStrength = (password) => {
        let strength = '';
        const regexMedium = /(?=.*[0-9])(?=.*[a-z])(?=.{8,})/;
        const regexStrong = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

        if (regexStrong.test(password)) {
            strength = 'strong';
        } else if (regexMedium.test(password)) {
            strength = 'medium';
        } else {
            strength = 'weak';
        }

        return strength;
    };
    useEffect(() => {
        const handleInput = () => {
            const passwordValue = passwordRef.current.value;
            const strength = calculateStrength(passwordValue);

            spanRef.current.innerText = strength;

            if (!passwordValue) {
                pRef.current.style.display = "none";
                passwordRef.current.style.border = "none";
                indicatorRef.current.childNodes[0].classList.remove("bgred");
                indicatorRef.current.childNodes[1].classList.remove("bgyellow");
                indicatorRef.current.childNodes[2].classList.remove("bggreen");
                setShowToggle(false);
            } else {
                setShowToggle(true);
                if (strength === "weak") {
                    passwordRef.current.style.border = "2px solid red";
                    spanRef.current.classList.remove('green');
                    spanRef.current.classList.remove('yellow');
                    spanRef.current.classList.add('red');

                    indicatorRef.current.childNodes[1].classList.remove("bgyellow");
                    indicatorRef.current.childNodes[2].classList.remove("bggreen");
                    indicatorRef.current.childNodes[0].classList.add("bgred");
                } else if (strength === "medium") {
                    passwordRef.current.style.border = "2px solid yellow";
                    spanRef.current.classList.remove('red');
                    spanRef.current.classList.remove('green');
                    spanRef.current.classList.add('yellow');

                    indicatorRef.current.childNodes[2].classList.remove("bggreen");
                    indicatorRef.current.childNodes[1].classList.add("bgyellow");
                    indicatorRef.current.childNodes[0].classList.add("bgred");
                } else if (strength === "strong") {
                    passwordRef.current.style.border = "2px solid green";
                    spanRef.current.classList.remove('red');
                    spanRef.current.classList.remove('yellow');
                    spanRef.current.classList.add('green');
                    indicatorRef.current.childNodes[0].classList.add("bgred");
                    indicatorRef.current.childNodes[1].classList.add("bgyellow");
                    indicatorRef.current.childNodes[2].classList.add("bggreen");
                }
                pRef.current.style.display = "block"
            }
        };

        const passwordInput = passwordRef.current;
        passwordInput.addEventListener('input', handleInput);
        handleInput();

        return () => {
            passwordInput.removeEventListener('input', handleInput);
        };
    }, [])

    return (
        <div className='indicator'>
            <div className="input-box">
                <input type={showPassword ? "text" : "password"} name="password" placeholder='Password' ref={passwordRef} />
                <button>Save</button>
            </div>
            <div className='indicator-bars' ref={indicatorRef}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            {showToggle && (
                <div className="toggle-button">
                    {showPassword ? (
                        <LuEyeOff size="30px" onClick={() => setShowPassword(!showPassword)} />
                    ) : (
                        <LuEye size="30px" onClick={() => setShowPassword(!showPassword)} />
                    )}
                </div>
            )}
            <p ref={pRef}>Password is <span ref={spanRef}></span></p>
        </div>

    )
}

export default Indicator