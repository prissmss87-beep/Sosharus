import styles from "./Login.module.css";
import X from '../../assets/x.svg'
import api from "../../services/api"
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"

export default function Main() {

    const navigate = useNavigate()

    const inputPassword = useRef()
    const inputEmail = useRef()

    

    async function login() {

        const email = inputEmail.current.value
        const password = inputPassword.current.value

        try{
            const response = await api.post("/login", {password, email})
    
            const {token, user} = response.data

            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))

            navigate("/")
        }
        catch (error) {
            alert(error.response?.data?.message || "Login error")
        }
        
        
        
    }

    return (
    
        <div className={styles.wrapper}>
            <div className={styles.back}>
                <form className={styles.form} onSubmit={e => e.preventDefault()}>
                    <h1>Login</h1>
                    <input placeholder='Password' className={styles.password} name='password' type='password' ref={inputPassword}/>
                    <input placeholder='Email' className={styles.email} name='email' type='email' ref={inputEmail}/>
                    <button onClick={login} className={styles.button} type='button'>Login</button>
                </form>
    
                <div className={styles.link}>
                    <Link to="/register">Doesnt have an account?</Link>
                </div>
    
            </div> 
    
    
        </div>
    )
}
