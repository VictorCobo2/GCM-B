import { Request, Response } from "express";
import { service_model } from "../models/service.models";

export const postService = (req: Request, res: Response) => {
    try {
        new service_model(req.body).save((error) => {
            if (!error) res.json({msg:`SE-01`, alert:"success"})
            else {
                if(error.message) res.json({msg:`SE-02`, alert:"error"})
                else res.json({msg:`SE-99`, alert:"error"})
            }
        })
    } catch (error) {
        res.json({error: error})
    }
}

export const putService = (req: Request, res: Response) => {
    
}
