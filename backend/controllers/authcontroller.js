export const register = async (req, res) => {
    try {
        const{fullname, username, password, confirmpassword, gender} = req.body;
        if(password !== confirmpassword){
            return res.status(400).json({message: "Password does not match"});
        }
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({message: "Username already exists"});
        }
        const boyProfilePic = "https://avatar.iran.liara.run/public/boy?username=${username}";
        const girlProfilePic = "https://avatar.iran.liara.run/public/girl?username=${username}";
        const newuser = new User({
            fullname,
            username,
            password,
            gender,
            profilePic: gender=="male"?boyProfilePic:girlProfilePic
    })
    await newuser.save();
    res.status(201).json({
        _id: newuser._id,
        fullname: newuser.fullname,
        username: newuser.username,
        profilePic: newuser.profilePic
    });
    }
    catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Something went wrong"});
    }
}

export const login = (req, res) => {
    res.send('Login user');
}

export const logout = (req, res) => {
    console.log('Logout user');
}