import styles from "./Perfil.module.css";
import X from '../../assets/x.svg'
import api from "../../services/api"
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"

function Profile() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const [bio, setBio] = useState("")
    const [music, setMusic] = useState("")
    const [background, setBackground] = useState("")

    async function saveProfile() {
        
        await api.put(`/profile/${user.id}`, {
            bio,
            music,
            background
        })
        setUser(response.data)
        localStorage.setItem("user", JSON.stringify(response.data))
        alert("Profile Updated")
    }

    return(
        <div>
            
            <h1>My Profile</h1>
            <input placeholder='Description' value={bio} onChange={e => setBio(e.target.value)}/>
            <input placeholder='Music Link(Embed)' value={music} onChange={e => setMusic(e.target.value)}/>
            <input placeholder='Image Link' value={background} onChange={e => setBackground(e.target.value)}/>
            <button onClick={saveProfile}>Save</button>
            <p>Public Profile: {user.profileUrl ? `http://localhost:3000/u/${user.profileUrl}`: "Not Defined"} </p>
        </div>
    )
}

export default Profile
