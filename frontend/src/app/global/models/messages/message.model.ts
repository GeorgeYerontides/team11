export class Message {
    public title: string;
    public message: string;
    public imageSender: string;
    public type: number;
    public timestamp: string;



    constructor(name:string, desc: string, imagePath:string, type:number,timestamp:string){
        this.title  = name;
        this.message = desc;
        this.imageSender = imagePath;
        this.type = type;
        this.timestamp = timestamp
    }
}