import { Request, Response } from "express";
import { edit_response } from "../helpers/global";
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

export const putService = async (req: Request, res: Response) => {
    try {
        console.log("hola")
        const {id} = req.params 
        console.log(req.body)
        const data = await service_model.updateOne({_id:id}, req.body, {runValidators:true})
        edit_response("SV", data, "", res)
    } catch (error) {
        res.json({error: error})
    }
}
