import userService from '../services/userService';
let handleLogin = async(req,res) => {
    let email =req.body.email;   
    let password = req.body.password;
    //check email exists
    if(!email || !password) {
        return res.status(400).json({
            errCode: 1,
            message: "Please provide both email and password"
        })
    }
    let userData = await userService.handleUserLogin(email,password)
    //compare password 
    //return user infor
    //access_token:JWT
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage ,
        user: userData.user ? userData.user : {}
    })
}

module.exports = {
    handleLogin: handleLogin
}