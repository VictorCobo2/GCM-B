import express from 'express'
import { login, postSchool, putSchool } from '../controllers/school.controller';
import { JwtValidator } from '../helpers/global';

export const school_route = express.Router();

school_route.get("/login/:nit/:password", login)

school_route.post("/school/add", postSchool)
school_route.put("/school/edit", JwtValidator, putSchool)