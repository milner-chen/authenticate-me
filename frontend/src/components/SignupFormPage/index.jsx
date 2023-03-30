import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
// import { useSelector } from "react-redux";
import './SignupForm.css';


const SignupFormPage = () => {

    const dispatch = useDispatch();
    // grabbing user from session slice of state
    const currentUser = useSelector(state => state.session.user);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    // redirect to home if currentUser is found
    if (currentUser) return <Redirect to="/" />;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (password === confirmPassword) {
            setErrors([]);
            dispatch(sessionActions.signup({
                username: username,
                email: email,
                password: password
            }))
            .catch(async res => {
                const data = await res.json();
                if (data.errors) setErrors(data.errors);
            })

            
        } else {
            setErrors([]);
            setErrors([...errors, "Passwords must match"]);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            <ul>
                {errors.map(error => <li key={error}>{error}</li> )}
            </ul>
            <label>Username
                <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                />
            </label>
            <label>Email
                <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
            </label>
            <label>Password
                <input
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
            </label>
            <label>Confirm Password
                <input
                type="text"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}

export default SignupFormPage;