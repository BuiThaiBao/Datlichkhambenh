import bcrypt from "bcryptjs"
import db from "../models/index"
const salt = bcrypt.genSaltSync(10)
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password)
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        fullname: data.fullname,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender,
        roleId: data.roleId,
        positionId: data.positionId,
      })
      resolve("Ok! create successfully")
    } catch (e) {
      reject(e)
    }
  })
}
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await bcrypt.hashSync(password, salt)
      resolve(hashPassword)
    } catch (error) {
      reject(e)
    }
  })
}
let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        raw: true,
      })
      resolve(users)
    } catch (e) {
      reject(e)
    }
  })
}
let getUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = await db.User.findOne({
        where: { id: id },
      })
      if (userData) {
        resolve(userData)
      } else {
        resolve([])
      }
      resolve(userData)
    } catch (e) {
      reject(e)
    }
  })
}
let updateUserData = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      })
      if (user) {
        user.fullname = data.fullname
        user.phonenumber = data.phonenumber
        user.address = data.address
        await user.save()
        resolve()
      } else {
        resolve()
      }
    } catch (e) {
      reject(e)
    }
  })
}
let deleteUserById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      })
      if (user) {
        await user.destroy()
      }
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}
module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserById: getUserById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
}
