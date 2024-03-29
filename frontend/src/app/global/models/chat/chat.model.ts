export class ChatModel {
    public _id!: string; // generated by mongoDB
    public senderName!: string;
    public senderSurname!: string;
    public receiverName!: string;
    public receiverSurame!: string;
    public time!: Date;
    public message!: string;
    public createdAt!: Date; // generated by mongoDB
    public updatedAt!: Date; // generated by mongoDB
    constructor(model?: any) {
      Object.assign(this, model);
    }
  
  }
