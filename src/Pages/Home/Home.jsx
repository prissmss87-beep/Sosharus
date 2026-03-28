import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import neh from '../../assets/neh.svg'

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
        <img src={neh} className={styles.bixo} />
        <div className={styles.mae}>
        {user && (
          <button className={styles.logout} onClick={Logout}>
            Logout
          </button>
        )}

        <Link to="/login" className={styles.login}>
          Login
        </Link>

        <Link to="/register" className={styles.register}>
          Cadastro
        </Link>
        </div>
      </nav>

      <div className={styles.header}>
        <h1 className={styles.texto}>
          Seja bem vindo{user ? `, ${user.name}` : ", Please Login"}!
        </h1>
        {user && (
          <>
            <br/>
            <Link to={`/u/${user.profileUrl}`}>My Profile</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;