import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../../services/api"

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
            style={{
                backgroundImage: `url(${user.background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                color: "white"
            }}
        >
            <h1>{user.name}</h1>
            <p>{user.bio}</p>

            {user.music && (
                <iframe
                    width="300"
                    height="80"
                    src={user.music}
                    title="music"
                />
            )}
        </div>
    )
}

export default Public