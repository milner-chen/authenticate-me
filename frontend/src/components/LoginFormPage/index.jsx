import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './LoginForm.css';

const LoginFormPage = () => {

    // get the current user stored in the session slice of state
    const dispatch = useDispatch();
    // debugger;
    const currentUser = useSelector(state => {
        const testing = state.session.user;
        console.log(testing);
        return testing;
    });
    // if user is already logged in, redirect to homepage
    
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    // store errors as a
    const [errors, setErrors] = useState([]);
    
    if (currentUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        // empty out errors?
        setErrors([]);
            //const res = 
            dispatch(sessionActions.login({ credential, password }))
            .catch(async res => {
                const data = await res.json();
                if (data.errors) setErrors(data.errors);
                // else if (data) setErrors([data]);
                // else setErrors([res.statusText]);
            })
            // .then(() => console.log('error caught:', errors));
            // wtf is it not console logging

        // if response was not ok, parse + set errors
        // if (!res.ok) {

        //     const data = res.json()
        //     setErrors(data.errors);
        // }
        // console.log(errors);
        // console.log(res);
    }
    // console.log(errors);

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map(error => <li key={error}>{error}</li> )}
            </ul>
            <label>Username or Email:
                <input type="text" value={credential} onChange={e => setCredential(e.target.value)} />
            </label>

            <label>Password:
                <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="submit" >Submit</button>
        </form>
    )
}

export default LoginFormPage;