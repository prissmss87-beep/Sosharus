import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import neh from '../../assets/neh.svg'
import sosharu from '../../assets/sosharu.png'

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.reload();
  }

  return (
    <div>
      <nav className={styles.cu}>
        <img src={sosharu} className={styles.bixo}/>
        <div className={styles.mae}>
        {user && (
          <button className={styles.button} onClick={Logout}>
            Logout
          </button>
        )}


        </div>
      </nav>

      <div className={styles.header}>

        <div className={styles.menu}>
          <div className={styles.text}>
            <h1 className={styles.texto}>
              Share about yourself with people from everywhere!
            </h1>
          </div>
          <div className={styles.PB}>
            {!user && (
            <>
            <Link to="/login" className={styles.buttonL}>
              Login
            </Link>

           <Link to="/register" className={styles.buttonR}>
              Register
            </Link>
          
            </>
            )}
          </div>
          <div className={styles.PB}>
            {user && (
             <>
               <br/>
               <Link to={`/u/${user.profileUrl}`}className={styles.buttonP}>My Profile</Link>          
             </>
            )}
    
            {user && (
              <>
                <br/>
               <Link to="/profile" className={styles.buttonE}>Edit Profile</Link>
              </>
            )}
          </div>
          </div>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className={styles.bottom}>
          <div className={styles.contact}>
            <h1>Contact:</h1>
            <br/>
            <h2>Discord: 
              <a href="https://discord.gg/RCXEegty"> Sosharu</a>
            </h2>
            <br/>
            <br/>
            <h2>Instagram:
              <a href="https://www.instagram.com/sosharusite/"> SosharuSite</a> 
            </h2>
            <br/>
            <br/>
            <h2>Email: sosharu2026@gmail.com</h2>
          </div>
        </div>
      </div>
    );
}

export default Home;