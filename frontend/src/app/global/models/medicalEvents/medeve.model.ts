export class medicalEventModel {
    public _id!: string; // generated by mongoDB
    public patientName!: string;
    public patientSurname!: string;
    public caretakerName!: string;
    public caretakerSurame!: string;
    public cause!: string;
    public room!: string;
    public date!: Date;
    public filled!: boolean;
    public report!:string;
    public createdAt!: Date; // generated by mongoDB
    public updatedAt!: Date; // generated by mongoDB
    constructor(model?: any) {
      Object.assign(this, model);
    }
  
  }
