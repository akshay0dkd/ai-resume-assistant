const express = require("express")
const authcontroller = require("../controllers/auth.controller")
const authRouter = express.Router()
const  authMiddleware = require("../middlewares/auth.middleware")   

console.log("auth routes loaded")
/** 
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public   
 * **/

authRouter.post("/register",authcontroller.registerUserController) 


/**
 * @route POST /api/auth/login 
 * @description login user with email and password
 * @access Public 
 */
authRouter.post("/login",authcontroller.loginUserController)

/**
 * @route POST /api/auth/logout
 * @description logout user by clearing the token cookie
 * @access Public 
 */
authRouter.get("/logout",authcontroller.logoutUserController)
 
/**
 * @route GET /api/auth/get-me
 * @description get the details of the logged in user by verifying the token cookie
 * @access Private
 */

authRouter.get("/get-me", authMiddleware.authUser, authcontroller.getMeController)    


module.exports = authRouter