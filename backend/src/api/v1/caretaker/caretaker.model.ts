import { Document, Schema, Model, model } from 'mongoose';
import { DefaultSchemaOptions } from '../../../models/shared';


// ------------------------------------------
// Interface declaration
export interface ICaretaker extends Document {
    name: string;
    surname: string;
    status: boolean;

}

// ------------------------------------------
// Schema definition
const caretakerSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    status: { type: Boolean, required: true },

    
  },
  { ...DefaultSchemaOptions }
);

// ------------------------------------------
// Schema model exports
export const CaretakerModel: Model<ICaretaker> = model<ICaretaker>(
  'Caretaker', caretakerSchema, 'Caretaker'
);
