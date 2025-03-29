import db from "../models/index"
import bcrypt from "bcryptjs"
let handleUserLogin = (email,password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};

            let isExist =  await checkUserEmail(email)
            if (isExist) {
                //user already
                let user = await db.User.findOne({

                    where : { email : email },
                })
                if (user) {
                //compare password
                    let check = await bcrypt.compare(password, user.password); // false
                    if (check){
                    
                        userData.errCode=0
                        userData.errMessage = `Login Successful.`
                        userData.user = {
                            email: user.email,
                            roleId: user.roleId
                        };
                    }else{
                        userData.errCode=3
                        userData.errMessage = `Password is incorrect.`
                    }
                }else{
                    userData.errCode=2
                    userData.errMessage = `Email isn't Found.`
                    
                }
            }else{
                userData.errCode=1
                userData.errMessage = `Email isn't exist.`
                
            }
            resolve(userData)
            
            
        } catch (error) {
            reject(error)
           
        }
    })
}



let checkUserEmail = (userEmail) => {
    return new Promise( async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where : { email : userEmail }
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin
}