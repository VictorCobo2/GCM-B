import { Request, Response } from "express";
import { edit_response, generarJwt } from "../helpers/global";
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
        }
        res.json({ msg: `03-${llave}`, alert: "error" });
      }
    });
  } catch (error) {
    res.json({ msg: `SC-99`, alert: "error" })
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
      } else res.status(405).send({ msg: "usuario o contra PAILAS" });
    } else res.status(405).send({ msg: "usuario o contra PAILAS" });
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
