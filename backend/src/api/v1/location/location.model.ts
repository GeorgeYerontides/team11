import { Document, Schema, Model, model } from 'mongoose';
import { DefaultSchemaOptions } from '../../../models/shared';


// ------------------------------------------
// Interface declaration
export interface ILocation extends Document {
    name: string;
    surname: string;
    location: string;

}

// ------------------------------------------
// Schema definition
const locationSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    location: { type: String, required: true },

    
  },
  { ...DefaultSchemaOptions }
);

// ------------------------------------------
// Schema model exports
export const LocationModel: Model<ILocation> = model<ILocation>(
  'Location', locationSchema, 'Location'
);
