import { Router } from 'express'
import AuthRoutes from './auth'
import ServiceRoutes from './service'

const rootRouter:Router = Router()

rootRouter.use('/auth', AuthRoutes)
rootRouter.use('/service', ServiceRoutes)


export default rootRouter