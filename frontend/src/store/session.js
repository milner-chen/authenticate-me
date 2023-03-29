import csrfFetch from "./csrf";

// ACTIONS

const RECEIVE_USER = 'session/RECEIVE_USER';
const REMOVE_USER = 'session/REMOVE_USER';

export const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        payload: user
    }
}

// ACTION CREATORS

export const removeUser = (userId) => {
    return {
        type: REMOVE_USER,
        userId
    }
}

// THUNKS

export const login = (user) => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    const data = await res.json();
    // set currentUser in storage after they are logged in
    storeCurrentUser(data.user);
    dispatch(receiveUser(data.user));
    return res;
}

const storeCurrentUser = (user) => {
    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    } else {
        sessionStorage.removeItem('currentUser');
        console.log('user should be null');
    }
}

export const restoreSession = () => async (dispatch) => {
    const res = await csrfFetch('/api/session');
    // console.log(res);
    storeCSRFToken(res);
    const data = await res.json();
    // console.log(data);
    storeCurrentUser(data.user);
    dispatch(receiveUser(data.user));
    return res;
}

// does not need to be async
export const storeCSRFToken = (res) => {
    // cannot access like a normal js object with []
    // use method .get()
    const token = res.headers.get('X-CSRF-Token');
    if (token) {
        sessionStorage.setItem('X-CSRF-Token', token);
    } 
    // else {
    //     // but null will be coerced into a string value
    //     // this means it will be a truthy value
    //     // sessionStorage.removeItem()
    //     sessionStorage.setItem('X-CSRF-Token', null);
    // }
}

export const signup = (user) => async (dispatch) => {
    // make fetch to add user to backend db
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        // remember to turn object into JSON
        body: JSON.stringify(user)
    });
    // parse response
    const data = await res.json();
    // store user from response in sessionStorage
    storeCurrentUser(data.user);
    // add user to the store
    dispatch(receiveUser(data.user));
}
// nest under user
// const initialState = { user: null };
const initialState = { user: JSON.parse(sessionStorage.getItem('currentUser')) };

// REDUCER

const sessionReducer = (state=initialState, action) => {
    Object.freeze(state);
    const newState = { ...state };
    switch (action.type) {
        case RECEIVE_USER:
            // newState[action.payload.id] = action.payload;
            newState.user = action.payload;
            console.log(newState);
            return newState;
        case REMOVE_USER:
            // delete newState[action.userId];
            newState.user = null;
            console.log("newState:", newState)
            return newState;
            // return { ...state, user: null };
        default:
            return state;
    }
}

export default sessionReducer;