import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

console.clear();

interface school {
  name: string;
  password: string;
  photo: string;
  nit: string;
  ubication: {
    longitude:number,
    latitude:number
  };
  description: string;
  contact: {
    website: string;
    email: string;
    phone: string;
    whatsapp: string;
  };
}

const school_schema = new Schema<school>({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default:"https://www.pngitem.com/pimgs/m/24-245816_instapirate-clip-arts-instagram-sin-foto-de-perfil.png"
  },
  nit: {
    type: String,
    unique: true,
    required: true,
  },
  ubication: {
    longitude:{
        type:Number,
        default:""
    },
    latitude:{
        type:Number,
        default:""
    }
  },
  description: {
    type: String,
    required: true,
  },
  contact: { 
    website: {
      type: String,
      default:""
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String, 
      unique: true,
      required: true,
    },
    whatsapp: {
      type: String,
      unique: true,
      required: true,
    },
  },
});

school_schema.pre("save", function (next) {
  bcrypt.hash(this.password, 10, (err: any, newPassword) => {
    if (err) next(new Error("Error al encriptar"));
    else {
      this.password = newPassword;
      next();
    }
  });
});

export const school_model = model<school>("schools", school_schema);
