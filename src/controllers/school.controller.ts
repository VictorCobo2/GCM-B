import { Request,  Response} from "express";
import { school_model } from "../models/school.model";

export const postSchool = (req:Request, res:Response)=>{
    try {
        new school_model(req.body).save((error)=>{
            if(!error) res.json({msg:"saved"})
            else res.json({msg:error})
        })
    } catch (error) {
        
    }
}