import { Document, Schema, Model, model } from 'mongoose';
import { DefaultSchemaOptions } from '../../../models/shared';


// ------------------------------------------
// Interface declaration
export interface IMedEve extends Document {
    patientName: string;
    patientSurname: string;
    caretakerName: string;
    caretakerSurame: string;
    cause: string;
    room: string;
    date: Date;
    report:string;
    filled: boolean;
}

// ------------------------------------------
// Schema definition
const medEveSchema = new Schema(
  {
    patientName: { type: String, required: true },
    patientSurname: { type: String, required: true },
    caretakerName: { type: String, required: true },
    caretakerSurame: { type: String, required: true },
    cause: { type: String, required: true },
    room: { type: String, required: true },
    date: { type: Date, required: true },
    report: { type: String, required: true },
    filled: { type: Boolean, required: true },


    
  },
  { ...DefaultSchemaOptions }
);

// ------------------------------------------
// Schema model exports
export const MedEveModel: Model<IMedEve> = model<IMedEve>(
  'MedEve', medEveSchema, 'MedEve'
);
