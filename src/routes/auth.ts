import { Router } from "express";
import {  Forgotpassword, ForgotpasswordToken, SignUp, login } from "../controllers/auth";
import { isAuthenticated } from '../utils/isAuthenticated'
import { formSubmit, SendMailFuc } from "../controllers/formSubmit";
import { TableData, getEditData, imageUpload } from "../controllers/table";
import { Gps } from "../controllers/gps";
import { Form } from "../controllers/form";

const AuthRoutes:Router = Router()

AuthRoutes.post('/login', login)
AuthRoutes.post('/signup', SignUp)
AuthRoutes.post('/forgot-password', Forgotpassword)
AuthRoutes.post('/reset-password/:token', ForgotpasswordToken)

AuthRoutes.post('/submitdata', isAuthenticated, formSubmit)
AuthRoutes.post('/form', isAuthenticated, Form)
AuthRoutes.post('/tabledata', TableData)
AuthRoutes.post('/geteditdata', getEditData)

AuthRoutes.get('/imagekit', imageUpload)

AuthRoutes.post('/mailsend', SendMailFuc)
AuthRoutes.post('/gps', Gps)



// AuthRoutes.post('/createcourse', isAuthenticated,  CreateCourse)

export default AuthRoutes