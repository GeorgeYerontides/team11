export class CaretakerModel {
    public _id!: string; // generated by mongoDB
    public name!: string;
    public surname!: string;
    public status!: boolean;
    public createdAt!: Date; // generated by mongoDB
    public updatedAt!: Date; // generated by mongoDB
    constructor(model?: any) {
      Object.assign(this, model);
    }
  
  }
