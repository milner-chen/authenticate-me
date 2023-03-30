import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileButton from './ProfileButton';

const Navigation = () => {
    const currentUser = useSelector(state => state.session.user);

    let links;
    currentUser ?
    links = <ProfileButton user={currentUser} /> :
    links =
    <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
    </>

    return (
        <ul>
            <Link to='/'>Home</Link>
            {links}
        </ul>
    )
}

export default Navigation