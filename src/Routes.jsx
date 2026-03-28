import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './Routes.css'
import Home from './Pages/Home/Home'
import Register from './Pages/Register/Register'
import Login from './Pages/login/Login'
import Public from './Pages/Public_Profile/Public'
import Profile from './Pages/Perfil/Perfil'

function Routesx() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='*' element={<h1>Not Found</h1>} />
                <Route path='/login' element={<Login />} />
                <Route path='/u/:profileUrl' element={<Public />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routesx