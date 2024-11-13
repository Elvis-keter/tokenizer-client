export const setToken = (token) => {
    localStorage.setItem('jwt', token);
};

export const getToken = () => {
    return localStorage.getItem('jwt');
};

export const removeToken = () => {
    localStorage.removeItem('jwt');
};

export const setRefreshToken = (refreshToken) => {
    localStorage.setItem('refreshToken', refreshToken);
};

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};

export const removeRefreshToken = () => {
    localStorage.removeItem('refreshToken');
};
