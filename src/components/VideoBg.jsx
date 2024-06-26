import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import videoBg from '/public/VideoBg.mp4';

function VideoBg() {
    return (
        <div className='main-bg'>
            <video src={videoBg} autoPlay loop muted />
            <div className="content container">
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
}

export default VideoBg;
