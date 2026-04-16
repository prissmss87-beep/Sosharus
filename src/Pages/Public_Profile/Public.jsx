import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../../services/api"
import styles from "./Public.module.css";
import instaIcon from "../../assets/insta.svg"
import steamIcon from "../../assets/steamic.svg"

function Public() {

    const { profileUrl } = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function loadUser() {
            try {
                const res = await api.get(`/u/${profileUrl}`)
                setUser(res.data)
            } catch (err) {
                console.error(err)
                setUser(null)
            }
        }

        loadUser()
    }, [profileUrl])

    if (!user) return <h1>Perfil não encontrado</h1>

    return (
        
        <div className={styles.image}
        
            style={{
                backgroundImage: `url(${user.background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div className={styles.card}>
                <h1>{user.name}</h1>
                <p className={styles.bio}>{user.bio}</p>
                <p>{user.discord}</p>

                {user.instagram && (
                <a 
                    href={user.instagram} 
                    className={styles.social}
                >
                    <img src={instaIcon} className={styles.icon} />
                </a>
                )}

                {user.steam && (
                <a 
                    href={user.steam} 
                    className={styles.social}
                >
                    <img src={steamIcon} className={styles.icon} />
                </a>
                )}



                {user.music && (
                    <iframe
                       width="300"
                      height="80"
                       src={user.music}
                       title="music"
                    />
                )}
            </div>
        </div>
    )
}

export default Public