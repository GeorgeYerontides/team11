export class Message {
    public title: string;
    public message: string;
    public type: number;
    public timestamp: string;



    constructor(name:string, desc: string,  type:number,timestamp:string){
        this.title  = name;
        this.message = desc;
        this.type = type;
        this.timestamp = timestamp
    }
}