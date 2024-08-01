export const register = async (req, res) => {
    try {
        const{fullname, username, password, confirmpassword, gender} = req.body;
    } catch (error) {
        
    }
}

export const login = (req, res) => {
    res.send('Login user');
}

export const logout = (req, res) => {
    console.log('Logout user');
}