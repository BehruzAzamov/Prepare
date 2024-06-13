import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

function MainLayout() {
    return (
        <div className='container'>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default MainLayout