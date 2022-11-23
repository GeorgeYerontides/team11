export class Alert {
    public patient: string;
    public level: string;
    public message?:string;
    public time?:string;


    constructor(patient:string, level: string, message?:string, time?:string ){
        this.patient  = patient;
        this.level = level;
        this.message = message;
        this.time = time;

    }
}