import { Document, Schema, Model, model } from 'mongoose';
import { DefaultSchemaOptions } from '../../../models/shared';


// ------------------------------------------
// Interface declaration
export interface INotification extends Document {
    senderName: string;
    senderSurname: string;
    timeSent: Date;
    typeNotification: number;
    title:string;
}

// ------------------------------------------
// Schema definition
const notificationSchema = new Schema(
  {
    senderName: { type: String, required: true },
    senderSurname: { type: String, required: true },
    timeSent: { type: Date, required: true },
    typeNotification: { type: Number, required: true },
    title: { type: String, required: true },

    
  },
  { ...DefaultSchemaOptions }
);

// ------------------------------------------
// Schema model exports
export const NotificationModel: Model<INotification> = model<INotification>(
  'Notification', notificationSchema, 'Notification'
);
