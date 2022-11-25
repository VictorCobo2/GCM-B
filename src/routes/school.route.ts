import express from 'express'
import { deleteSchool, getAllSchool, login, postSchool, putSchool } from '../controllers/school.controller';
import { JwtValidator } from '../helpers/global';

export const school_route = express.Router();

school_route.get("/login/:nit/:password", login)

school_route.post("/school/add", postSchool)
school_route.put("/school/edit", JwtValidator, putSchool)
school_route.delete("/school/delete/:id", JwtValidator, deleteSchool)
school_route.get("/school/getAll/:longitude/:latitude", JwtValidator, getAllSchool)