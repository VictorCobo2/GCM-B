import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

console.clear();

interface school {
  user: string;
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
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  nit: {
    type: String,
    unique: true,
    required: true,
  },
  ubication: {
    longitude:{
        type:Number,
        required:true
    },
    latitude:{
        type:Number,
        required:true
    }
  },
  description: {
    type: String,
    required: true,
  },
  contact: {
    website: {
      type: String,
      required: true,
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
