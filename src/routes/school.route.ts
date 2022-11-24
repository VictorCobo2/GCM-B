import express from 'express'
import { postSchool } from '../controllers/school.controller';

export const school_route = express.Router();

school_route.post("/school/add", postSchool)