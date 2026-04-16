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
    const [discord, setDiscord] = useState("")
    const [instagram, setInstagram] = useState("")
    const [steam, setSteam] = useState("")

    async function saveProfile() {
        
        await api.put(`/profile/${user.id}`, {
            bio,
            music,
            background,
            discord,
            instagram,
            steam
        })
        setUser(response.data)
        localStorage.setItem("user", JSON.stringify(response.data))
        alert("Profile Updated")
    }

    return(
        <div>
           <div className={styles.divisao}> <h1 className={styles.texto}>My Profile</h1> </div>  
            <div className={styles.parte}>
                <div className={styles.inputs}>
                    <input className={styles.desc} placeholder='Description' value={bio} onChange={e => setBio(e.target.value)}/>
                    <input className={styles.msc} placeholder='Music Link(Embed)' value={music} onChange={e => setMusic(e.target.value)}/>
                    <input className={styles.image} placeholder='Image Link' value={background} onChange={e => setBackground(e.target.value)}/>
                    <input className={styles.disc} placeholder='Discord Profile' value={discord} onChange={e => setDiscord(e.target.value)}/>
                    <input className={styles.ig} placeholder='Instagram Profile' value={instagram} onChange={e => setInstagram(e.target.value)}/>
                    <input className={styles.steam} placeholder='Steam Profile' value={steam} onChange={e => setSteam(e.target.value)}/>
                    <button className={styles.save} onClick={saveProfile}>Save</button>
                    <p className={styles.maita}>Public Profile: {user.profileUrl ? `http://localhost:5173/u/${user.profileUrl}`: "Not Defined"} </p>
                </div>
            </div>
        </div>
    )
}

export default Profile