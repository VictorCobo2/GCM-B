import express from 'express'
import { postService, putService } from '../controllers/service.controller';
import { JwtValidator } from '../helpers/global';

export const service_route = express.Router();

service_route.post("/service/add/:id", JwtValidator, postService)
service_route.put("/service/edit/:id", JwtValidator, putService)

