import { Schema, model } from "mongoose";
import mongoose from "mongoose";

console.clear()

interface service {
    type: string;
    course: string;
    quota: number;
    students: number;
    id_school: Schema.Types.ObjectId;
}

const service_schema = new Schema<service>({
    type: {
        type: String,
        enum: ["PREESCOLAR", "PRIMARIA", "SECUNDARIA"],
        required: true
    },
    course: {
        type: String,
        required: true
    },
    quota: {
        type: Number,
        required: true
    },
    students: {
        type: Number,
        default: 0
    },
    id_school: {
        type: mongoose.Types.ObjectId,
        ref: "schools",
        required: true
    }
})

export const service_model = model<service>("services", service_schema)
