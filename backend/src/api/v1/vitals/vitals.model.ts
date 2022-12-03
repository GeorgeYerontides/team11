import { Document, Schema, Model, model } from 'mongoose';
import { DefaultSchemaOptions } from '../../../models/shared';


// ------------------------------------------
// Interface declaration
export interface IVitals extends Document {
  name: string;
  surname: string;
  status: string;
  heartRate: number;
  spo2: number;
  stress: string;
}

// ------------------------------------------
// Schema definition
const VitalSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    status: { type: String, required: true },
    heartRate: { type: Number, required: true },
    spo2: { type: Number, required: true },
    stress: { type: String, required: true },

  },
  { ...DefaultSchemaOptions }
);

// ------------------------------------------
// Schema model exports
export const VitalsModel: Model<IVitals> = model<IVitals>(
  'Vital', VitalSchema, 'Vital'
);
