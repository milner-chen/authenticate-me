import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal';

const Navigation = () => {
    const currentUser = useSelector(state => state.session.user);

    let links;
    currentUser ?
    links = <ProfileButton user={currentUser} /> :
    links =
    <>
        {/* <Link to="/login">Login</Link> */}
        <LoginFormModal />
        <Link to="/signup">Signup</Link>
    </>;

    return (
        <ul>
            <Link to='/'>Home</Link>
            {links}
        </ul>
    )
}

export default Navigation;