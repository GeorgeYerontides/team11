import { Document, Schema, Model, model } from 'mongoose';
import { DefaultSchemaOptions } from '../../../models/shared';


// ------------------------------------------
// Interface declaration
export interface IRoutine extends Document {
  patient: string;
  title: string;
  startTime: Date;
  endTime: Date;
  reqiresCaretaker: boolean;
  type: string;
  description: string;
  completed: boolean;
}

// ------------------------------------------
// Schema definition
const routineSchema = new Schema(
  {
    patient: { type: String, required: true },
    title: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: false },
    reqiresCaretaker: { type: Boolean, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, required: true },
    
  },
  { ...DefaultSchemaOptions }
);

// ------------------------------------------
// Schema model exports
export const RoutineModel: Model<IRoutine> = model<IRoutine>(
  'Routine', routineSchema, 'Routine'
);
