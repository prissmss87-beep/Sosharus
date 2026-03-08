import './styles.css'
import X from '../../assets/x.svg'
import api from "../../services/api"
import { useEffect, useState, useRef } from 'react'

export default function Main() {

    const [users, setUsers] = useState([])

    const inputName = useRef()
    const inputAge = useRef()
    const inputEmail = useRef()

    async function getUsers(){
        const usersBrute = await api.get("/users")

        setUsers(usersBrute.data)
        console.log(users)
    }

    async function createUsers(){
        
        await api.post("/users", {
            name: inputName.current.value,
            age: inputAge.current.value,
            email: inputEmail.current.value
        })

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

        <div className='wrapper'>
            <div className='back'>
                <form className='form'>
                    <h1>Sign Up</h1>
                    <input placeholder='Username' className='username' name='name' type='text' ref={inputName}/>
                    <input placeholder='Age' className="email" name='age' type='number' ref={inputAge}/>
                    <input placeholder='Email' className='password' name='email' type='email' ref={inputEmail}/>
                    <button onClick={createUsers} className='button' type='button'>Sign Up</button>
                </form>
            </div> 

            {users.map((user) => (
                <div key={user.id} >
                    <div>
                        <p>Name: {user.name}</p>
                        <p>Idade: {user.age}</p>
                        <p>Email: {user.email}</p>
                    </div>
                    <button onClick={() => deleteUsers(user.id)}>
                        <img src={X} />
                    </button>
                </div>

            ))}

        </div>
    )
}