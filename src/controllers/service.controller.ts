import { Request, Response } from "express";
import { service_model } from "../models/service.models";

export const postService = (req: Request, res: Response) => {
    try {
        new service_model(req.body).save((error) => {
            if (!error) res.json({ msg: "saved" })
            else res.json({ msg: error })
        })
    } catch (error) {
        res.json({error: error})
    }
}

export const getService = (req: Request, res: Response) => {
    
}
