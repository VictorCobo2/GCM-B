import { Schema, model } from "mongoose";
console.clear()

interface school {
  user: string;
  password: string;
  photo: string;
  nit: string;
  ubication: string;
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
    required: true,
  },
  ubication: {
    type: String,
    required: true,
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
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    whatsapp: {
      type: String,
      required: true,
    },
  },
});

export const school_model = model<school>("model", school_schema)
