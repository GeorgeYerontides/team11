import { Document, Schema, Model, model } from 'mongoose';
import { DefaultSchemaOptions } from '../../../models/shared';


// ------------------------------------------
// Interface declaration
export interface IPatient extends Document {
  name: string;
  surname: string;
  age: number;
  weight: number;
  height: number;
  emergencyName: string;
  emergencyPhone: string;
  emergencyEmail: string;
  cameraUrl: string;
}

// ------------------------------------------
// Schema definition
const patientSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    emergencyName: { type: String, required: true },
    emergencyPhone: { type: String, required: true },
    emergencyEmail: { type: String, required: true },
    cameraUrl: { type: String, required: true },
    
  },
  { ...DefaultSchemaOptions }
);

// ------------------------------------------
// Schema model exports
export const PatientModel: Model<IPatient> = model<IPatient>(
  'Patient', patientSchema, 'Patient'
);
