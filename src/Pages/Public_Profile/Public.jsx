import { useParams } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import api from "../../services/api"
import styles from "./Public.module.css";
import discordIcon from "../../assets/discordic.svg"

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
        <div
            className={styles.image}
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
                <div className={styles.row}>
                    <img src={discordIcon} className={styles.icond} />
                    <p>{user.discord}</p>
                </div>

                {user.instagram && (
                    <a href={user.instagram} className={styles.social}>
                        <img src={instaIcon} className={styles.icon} />
                    </a>
                )}

                {user.steam && (
                    <a href={user.steam} className={styles.steam}>
                        <img src={steamIcon} className={styles.icon} />
                    </a>
                )}
                

            {user.music && (
                <iframe
                        src={`${user.music}${user.music.includes("?") ? "&" : "?"}autoplay=1&mute=1`}
                        title="music"
                        allow="autoplay"
                    />
                )}

            </div>
        </div>
    )
}

export default Public