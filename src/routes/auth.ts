import { Router } from "express";
import {  SignUp, login } from "../controllers/auth";
import { isAuthenticated } from '../utils/isAuthenticated'
import { formSubmit } from "../controllers/formSubmit";

const AuthRoutes:Router = Router()

AuthRoutes.post('/login', login)
AuthRoutes.post('/signup', SignUp)

AuthRoutes.post('/submitdata', formSubmit)
// AuthRoutes.post('/createcourse', isAuthenticated,  CreateCourse)

export default AuthRoutes