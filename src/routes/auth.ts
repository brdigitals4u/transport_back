import { Router } from "express";
import {  SignUp, login } from "../controllers/auth";
import { isAuthenticated } from '../utils/isAuthenticated'

const AuthRoutes:Router = Router()

AuthRoutes.post('/login', login)
AuthRoutes.post('/signup', SignUp)

// AuthRoutes.post('/address', isAuthenticated, Address)
// AuthRoutes.post('/createcourse', isAuthenticated,  CreateCourse)

export default AuthRoutes