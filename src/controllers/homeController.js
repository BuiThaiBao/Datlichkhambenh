import { Json } from "sequelize/lib/utils"
import db from "../models/index"
import CRUDService from "../services/CRUDService"
import { UPDATE } from "sequelize/lib/query-types"
let getHomePage = async (req, res) => {
  return res.render("homepage.ejs")
}
let getCRUD = async (req, res) => {
  return res.render("crud.ejs")
}
let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body)
  // console.log(message)
  return res.send("post crud form server")
}
let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser()
  // console.log(data)
  return res.render("displayCRUD.ejs", { data: data })
}
let getEditCRUD = async (req, res) => {
  let id = req.params.id
  if (id) {
    let userData = await CRUDService.getUserById(id)
    return res.render("editCRUD.ejs", { data: userData })
  } else {
    return res.send("no user")
  }
}
let putCRUD = async (req, res) => {
  let data = req.body
  await CRUDService.updateUserData(data)
  return res.send("Update successfully")
}
let deleteCRUD = async (req, res) => {
  let id = req.params.id
  if (id) {
    await CRUDService.deleteUserById(id)
    return res.send("Delete successfully")
  } else {
    return res.send("no user")
  }
}

module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
}
