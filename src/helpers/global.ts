
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
      res.json({ msg: `${nom}-02`, alert:"error" }).status(204);
    else res.json({ msg: `${nom}-01`, alert:"success" }).status(200);
  };
  
  export const edit_response = (
    nom: String,
    doc: any,
    codigo = "",
    res: Response
  ) => {
    
    if (doc === null) res.json({ msg: "No existe documento", cod_error: "01" }).status(204);
    else if (doc.matchedCount == 0)
      res.json({ msg: `${nom}-02-EDIT`, alert:"error" }).status(204);
    else if(doc.acknowledged === false) res.json({ msg: `${nom}-03-EDIT`, alert:"error" })  

    else res.json({ msg: `${nom}-01-EDIT`, alert:"success" }).status(200);
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
  
  export const get_all_response = (nom: String, doc: any, res: Response) => {
    if (doc.length === 0)
      res.json({ msg: `${nom}-02` , alert: "error" }).status(200);
    else res.json(doc).status(204);
  };
  

  export function getDistanciaMetros(lat1: number, lon1: number, lat2: number, lon2: number) {
    const rad = function (x: number) {
      return (x * Math.PI) / 180;
    };
    const EARTH_RADIUS = 6378.137;
    let distance_latitude = rad(lat2 - lat1);
    let dist_longitude = rad(lon2 - lon1);
    let angles =
      Math.sin(distance_latitude / 2) * Math.sin(distance_latitude / 2) +
      Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dist_longitude / 2) * Math.sin(dist_longitude / 2);
  
    let round = 2 * Math.atan2(Math.sqrt(angles), Math.sqrt(1 - angles));
  
    let distance = EARTH_RADIUS * round * 1000;
  
    return distance;
  }