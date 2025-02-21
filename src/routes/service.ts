import { Router } from "express";
import { Course, GetCity, GetTutorsFilter, Timing, Classtype, Education } from "../controllers/service";
import { GetCity2, GetCountry, GetState } from "../controllers/address";
import { Form } from "../controllers/form";

const ServiceRoutes:Router = Router()

ServiceRoutes.post('/form', Form)


// ServiceRoutes.post('/city', GetCity)
// ServiceRoutes.post('/course', Course)
// ServiceRoutes.post('/classtype', Classtype)
// ServiceRoutes.post('/education', Education)
// ServiceRoutes.post('/timing', Timing)
// ServiceRoutes.post('/tutors', GetTutorsFilter)
// ServiceRoutes.post('/tutorslist', GetTutorsFilter)

// //getcountry
// ServiceRoutes.get('/getcountry', GetCountry)
// ServiceRoutes.post('/getstate', GetState)
// ServiceRoutes.post('/getcity', GetCity2)


export default ServiceRoutes