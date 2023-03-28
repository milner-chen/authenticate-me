// get the current user from the sessionStorage
export const restoreCSRF = async () => {
    const res = await csrfFetch('/api/session');
    storeCSRFToken(res);
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

// custom fetch that includes the csrf token

const csrfFetch = async (url, options={}) => {
    options.headers ||= {};
    options.method ||= 'GET';
    if (options.method.toUpperCase() !== 'GET') {
        options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
        options.headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(url, options);
    if (res.status >= 400) throw res;
    return res;

}

export default csrfFetch;