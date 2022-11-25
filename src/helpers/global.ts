
import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";


export const generarJwt = ( uid = "")=>{
    return new Promise ((resolve, reject)=>{
        const payload = {uid};
        jwt.sign( payload, `${process.env.SECRETKEY}`, {
            expiresIn: '24h'
        }, (err, token)=>{
            if (err) {
                console.log(err)
                reject('No se genero el token');
            }else{
                resolve(token);
            }
        })
    })

}

export const JwtValidator = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x_token');
    if (!token) {
      return res.status(401).json({
        msg: "ERROR access denied",
      });
    }
  
    try {
      jwt.verify(token, `${process.env.SECRETKEY}`);
      return next();
    } catch (error) {
      return res.status(401).json({
        msg: "Invalid token",
      });
    }
  };


 //Validate Response 

 export const delete_response = (
    nom: String,
    doc: any,
    codigo: any,
    res: Response
  ) => {
    if (doc === null) res.json({ msg: "No existe documento" }).status(204);
    else if (doc.deletedCount == 0)
      res.json({ msg: `El código (${codigo}) de ${nom} no existe.`, cod_error: "01" }).status(204);
    else res.json({ N1: "eliminado" }).status(200);
  };
  
  export const edit_response = (
    nom: String,
    doc: any,
    codigo = "",
    res: Response
  ) => {
    
    if (doc === null) res.json({ msg: "No existe documento", cod_error: "01" }).status(204);
    else if (doc.matchedCount == 0)
      res.json({ msg: `${nom}-02`, alert:"error" }).status(204);
    else if(doc.acknowledged === false) res.json({ msg: `${nom}-03`, alert:"error" })  

    else res.json({ msg: `${nom}-01`, alert:"success" }).status(200);
  };
  
  export const get_response = (
    nom: String,
    doc: any,
    codigo: any,
    res: Response
  ) => {
    if (doc === null || doc === undefined || doc.length < 1){
      res.json({ msg: `El código (${codigo}) de ${nom} no existe.`, cod_error: "01" }).status(204);
    } 
    else res.json(doc);
  };
  
  export const get_all_response = (doc: any, res: Response) => {
    if (doc.length === 0)
      res.json({ msg: `No hay datos disponibles.` , cod_error: "01" }).status(200);
    else res.json(doc).status(204);
  };
  