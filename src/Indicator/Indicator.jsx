import React, { useEffect, useRef } from 'react'
import "./Indicator.css"
const Indicator = () => {
    const passwordRef = useRef(null);
    const pRef = useRef(null);
    const spanRef = useRef(null);

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

            } else {

                if (strength === "weak") {
                    passwordRef.current.style.border = "2px solid red";
                    spanRef.current.classList.remove('green');
                    spanRef.current.classList.remove('yellow');
                    spanRef.current.classList.add('red');
                } else if (strength === "medium") {
                    passwordRef.current.style.border = "2px solid yellow";
                    spanRef.current.classList.remove('red');
                    spanRef.current.classList.remove('green');
                    spanRef.current.classList.add('yellow');
                } else if (strength === "strong") {
                    passwordRef.current.style.border = "2px solid green";
                    spanRef.current.classList.remove('red');
                    spanRef.current.classList.remove('yellow');
                    spanRef.current.classList.add('green');
                }
                pRef.current.style.display = "block"
            }
        };

        const passwordInput = passwordRef.current;
        passwordInput.addEventListener('input', handleInput);
        handleInput();

        return () => {
            alert('called');
            passwordInput.removeEventListener('input', handleInput);
        };
    }, [])

    return (
        <div className='indicator'>
            <div className="input-box">
                <input type="text" name="password" placeholder='Password' ref={passwordRef} />
                <button>Save</button>

            </div>
            <p ref={pRef}>Password is <span ref={spanRef}></span></p>
        </div>

    )
}

export default Indicator