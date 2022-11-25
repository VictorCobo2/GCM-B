import { Request, Response } from "express";
import { delete_response, edit_response, generarJwt, get_all_response } from "../helpers/global";
import { school_model } from "../models/school.model";
import bcrypt from "bcrypt";

export const postSchool = (req: Request, res: Response) => {
  try {
    let llave = "";
    new school_model(req.body).save((error: any) => {
      if (!error) res.json({ msg: "SC-01", alert: "success" });
      else {
        if (error.code) {
          for (const property in error.keyPattern) {
            llave = `${property}`;
          }
          res.json({ msg: `03-${llave}`, alert: "error" });
        }else{
            res.json({ msg: `SC-99`, alert: "error" });
        }
      }
    });
  } catch (error) {
    res.json({ msg: `SC-99`, alert: "error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { nit, password } = req.params;
    const data = await school_model.findOne({ nit: nit });
    if (data) {
      const compare = await bcrypt.compare(password, data.password);
      if (compare) {
        data.password = " ";
        const token = await generarJwt(data.id);
        res.json({ data, token });
      } else res.status(405).send({ msg: "UE", alert:"error" });
    } else res.status(405).send({ msg: "UE", alert:"error" });
  } catch (error) {
    res.json({ A: error });
  }
};

export const putSchool = async (req: Request, res: Response) => {
  try {
    delete req.body.password;
    const data = await school_model.updateOne({ _id: req.body._id }, req.body);
    edit_response("SC", data, "", res);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const deleteSchool = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await school_model.deleteOne({ _id: id });
    delete_response("SC", data, "", res);
  } catch (error) {
    res.json({ msg: `SC-99`, alert: "error" });
  }
};

export const getAllSchool = async (req: Request, res: Response) => {
  try {
    const data = await school_model.aggregate([
      {
        $lookup:{
          from:"services",
          foreignField:"id_school",
          localField:"_id",
          as:"services"
        }
      }
    ])
    get_all_response("SC", data, res)
  } catch (error) {
    console.log(error)
    res.json({ msg: `SC-99`, alert: "error" });
  }
};