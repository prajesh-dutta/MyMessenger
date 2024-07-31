export const register = (req, res) => {
    res.send('Register user');
}

export const login = (req, res) => {
    res.send('Login user');
}

export const logout = (req, res) => {
    console.log('Logout user');
}