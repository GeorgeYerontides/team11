import { Document, Schema, Model, model } from 'mongoose';
import { DefaultSchemaOptions } from '../../../models/shared';


// ------------------------------------------
// Interface declaration
export interface IChat extends Document {
    senderName: string;
    senderSurname: string;
    receiverName: string;
    receiverSurame: string;
    time: Date;
    message: string;

}

// ------------------------------------------
// Schema definition
const chatSchema = new Schema(
  {
    senderName: { type: String, required: true },
    senderSurname: { type: String, required: true },
    receiverName: { type: String, required: true },
    receiverSurame: { type: String, required: true },
    time: { type: Date, required: true },
    message: { type: String, required: true },
  

    
  },
  { ...DefaultSchemaOptions }
);

// ------------------------------------------
// Schema model exports
export const ChatModel: Model<IChat> = model<IChat>(
  'chat', chatSchema, 'chat'
);
