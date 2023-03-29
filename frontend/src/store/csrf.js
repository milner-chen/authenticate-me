// get the current user from the sessionStorage
// export const restoreCSRF = async () => {
//     const res = await csrfFetch('/api/session');
//     storeCSRFToken(res);
//     return res;
// }

// custom fetch that includes the csrf token

const csrfFetch = async (url, options={}) => {
    options.headers ||= {};
    options.method ||= 'GET';
    if (options.method.toUpperCase() !== 'GET') {
        options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
        options.headers['Content-Type'] = 'application/json';
        console.log(options.method);
    }

    const res = await fetch(url, options);
    if (res.status >= 400) {
        console.log('this is an error being thrown');
        throw res;
    }
    console.log('stuff went through fine');
    return res;

}

export default csrfFetch;