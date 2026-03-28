import styles from "./Register.module.css";
import X from '../../assets/x.svg'
import api from "../../services/api"
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"

export default function Main() {

    const navigate = useNavigate()

    const [users, setUsers] = useState([])

    const inputName = useRef()
    const inputPassword = useRef()
    const inputEmail = useRef()
    const inputAge = useRef()

    async function getUsers(){
        const usersBrute = await api.get("/users")

        setUsers(usersBrute.data)
        console.log(users)
    }

    async function createUsers(){

        const password = inputPassword.current.value

        if(password.length < 7){
            alert("A password precisa ter pelo menos 6 caracteres")
            return
        }
        
        await api.post("/users", {
            name: inputName.current.value,
            password: inputPassword.current.value,
            email: inputEmail.current.value,
            age: inputAge.current.value
            
        })

        navigate("/")
        getUsers()
    }

    async function deleteUsers(id){
        await api.delete(`/users/${id}`)

        getUsers()
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (

        <div className={styles.wrapper}>
            <div className={styles.back}>
                <form className={styles.form}>
                    <h1>Sign Up</h1>
                    <input placeholder='Username' className={styles.username} name='name' type='text' ref={inputName}/>
                    <input placeholder='Password' className={styles.password} name='password' type='text' ref={inputPassword}/>
                    <input placeholder='Email' className={styles.email} name='email' type='email' ref={inputEmail}/>
                    <input placeholder='Age' className={styles.age} name='age' type='number' ref={inputAge}/>
                    <button onClick={createUsers} className={styles.button} type='button'>Sign Up</button>
                </form>

                <div className={styles.link}>
                    <Link to="/login">Already have an account?</Link>
                </div>

            </div> 


        </div>
    )
}