import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FcLike } from 'react-icons/fc';

const themes = {
    winter: "winter",
    dracula: "dracula",
};
function LocalStorageTheme() {
    return localStorage.getItem("mode") || themes.winter;
}

function Navbar({ likedRecipes }) {
    const [theme, setTheme] = useState(LocalStorageTheme());
    const { user } = useSelector(state => state.currentUser);
    const [totalLikes, setTotalLikes] = useState(0);

    function handleClick() {
        const newTheme = theme === themes.winter ? themes.dracula : themes.winter;
        setTheme(newTheme);
        toast.success("Mode changed successfully");
    }
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("mode", theme);
    }, [theme]);

    return (
        <div className="navbar">
            <div className="navbar-start flex-1">
                <h4 className='text-3xl font-bold mb-3'>Recipes app</h4>
            </div>

            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <span className="badge badge-sm indicator-item">{totalLikes}</span>
                        </div>
                    </div>
                </div>
                <h4 className="text-xl font-bold mb-3">{user?.displayName}</h4>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Avatar" src={user?.photoURL} />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/create">Create recipe</Link>
                        </li>
                        <li>
                            <button onClick={handleClick}>Change theme</button>
                        </li>
                        <li>
                            <button onClick={() => signOut(auth)} className="btn btn-sm ">
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
