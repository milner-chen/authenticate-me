import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';

const ProfileButton = ({ user }) => {

    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    // const handleclick = (e) => {
    //     setShowMenu(true);
    // }

    const openMenu = () => {
        // if menu is not already open, set it to true + open
        if (!showMenu) setShowMenu(true);
    }

    useEffect(() => {
        const closeMenu = () => {
            setShowMenu(false);
        }
        if (showMenu) {
            document.addEventListener('click', closeMenu);
            return () => document.removeEventListener('click', closeMenu);
        }
    }, [showMenu]);

    return (
        <>    
            <div className="dropdown">
                <i onClick={openMenu} className="fa-solid fa-user"></i>
                {showMenu && 
                    <div className="user-info">
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                        <button onClick={() => dispatch(sessionActions.logout())}>Logout</button>
                    </div>
                }
            </div>
        </>
    )
}

export default ProfileButton;