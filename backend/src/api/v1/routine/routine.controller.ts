import { Request, Response, NextFunction, Router } from 'express';
import { ResourceController } from '../../shared';
import { StatusCodes } from 'http-status-codes';
import { Logger } from '../../shared/utils/logger';
import { IRoutine, RoutineModel } from './routine.model';
export class routineController extends ResourceController<IRoutine>{
    private logger: Logger = new Logger();
    constructor() {
        super(RoutineModel);
    }
    /**
     * Apply all routes for tasks
     *
     * @returns {Router}
     */
    public applyRoutes(): Router {
        const router = Router();
        router
            .get('/', this.getRoutine)
            .get('/initializeKostas', this.initializeRoutineKostas)
            .get('/initialize', this.initializeRoutine)
  //          .get('/:id', this.getRoutine)
//            .post('/', this.postTask)
            .put('/:id', this.updateEvent)
            .delete('/:id', this.deleteTask);

        return router;
    }

    /**
     * In all of the methods below, we are using the super class methods to perform the CRUD operations.
     * Request and Response are passed to the super class methods so that they can be extracted and used.
     * In case you need to do any preprocessing (e.g., filter a body's field) you can do it before calling the super class methods.
     */
    /**
     * Sends a message containing all tasks back as a response
     * @param req
     * @param res 
     */
     getRoutine = async (req: Request, res: Response) => {
        this.logger.debug('getRoutine request');
        // you can pre-process the request here before passing it to the super class method
        const allRoutine = await this.getAll(req, res);
        this.logger.debug(allRoutine);
        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.OK)
            .json(allRoutine);
    }

    updateEvent = async (req: Request, res: Response) => {
        this.logger.debug('updateEvent request');
        // you can pre-process the request here before passing it to the super class method
        const task = await this.update(req.params.id, req.body.blacklist, req, res);
        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.OK)
            .json(task);
    }
 
    deleteTask = async (req: Request, res: Response) => {
        this.logger.debug('deleteTask request');
        // you can pre-process the request here before passing it to the super class method
        const task = await this.delete(req.params.id, req, res);
        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.OK)
            .json(task);

    }

    initializeRoutineKostas = async (req: Request, res: Response) => {
        this.logger.debug('initialize items request');
        let items: any[] = [

            {
                patient: "Kostas Lamprou",
                title: "Watch Tv",
                startTime: new Date("2022-11-24T08:00:09.989+00:00"),
                endTime: new Date("2022-11-24T11:00:09.989+00:00"),
                reqiresCaretaker: false,
                type: 'Entertainment',
                description: 'The patient watches his favorite TV shows',
                completed: false
            },
            {
                patient: "Kostas Lamprou",
                title: "Call Children",
                startTime: new Date("2022-11-24T11:00:09.989+00:00"),
                endTime: new Date("2022-11-24T13:00:09.989+00:00"),
                reqiresCaretaker: false,
                type: 'Entertainment',
                description: 'Scheduled call with family member.',
                completed: false
            },
            {
                patient: "Kostas Lamprou",
                title: "Afternoon Nap",
                startTime: new Date("2022-11-24T13:00:09.989+00:00"),
                endTime: new Date("2022-11-24T15:00:09.989+00:00"),
                reqiresCaretaker: false,
                type: 'Relaxation',
                description: 'The patient goes on a morning walk in the gardens and socializes with other elders. Morning walk is supervised by nurses.',
                completed: false
            },
            {
                patient: "Kostas Lamprou",
                title: "Morning Walk",
                startTime:  new Date("2022-11-24T05:00:09.989+00:00"),
                endTime:  new Date("2022-11-24T05:00:09.989+00:00"),
                reqiresCaretaker: false,
                type: 'Entertainment',
                description: 'The patient goes on a morning walk in the gardens and socializes with other elders. Morning walk is supervised by nurses.',
                completed: true
            },
            {
                patient: "Kostas Lamprou",
                title: "Take insulin shot",
                startTime: new Date("2022-11-24T06:00:09.989+00:00"),
                endTime: undefined,
                reqiresCaretaker: false,
                type: 'Medical',
                description: 'Insulin dosage is 95 mg/dL for the patient.',
                completed: true
            },
            {
                patient: "Kostas Lamprou",
                title: "Check Blood Pressure",
                startTime: new Date("2022-11-24T07:30:09.989+00:00"),
                endTime: undefined,
                reqiresCaretaker: true,
                type: 'Medical',
                description: 'The caretaker takes the blood pressure of the patient and records for monitoring.',
                completed: false
            },
    


           
        ]

        await RoutineModel.insertMany(items)
            .then(function (docs) {
                res.json(docs);
            })
            .catch(function (err) {
                res.status(500);
            });
        return res
            .status(StatusCodes.OK);
    }

    initializeRoutine = async (req: Request, res: Response) => {
        this.logger.debug('initialize items request');
        let items: any[] = [

            {
                patient: "Kostas Lamprou",
                title: "Watch Tv",
                startTime: new Date("2022-11-24T11:00:09.989+00:00"),
                endTime: new Date("2022-11-24T13:00:09.989+00:00"),
                reqiresCaretaker: false,
                type: 'Entertainment',
                description: 'The patient goes on a morning walk in the gardens and socializes with other elders. Morning walk is supervised by nurses.',
                completed: true
            },
            {
                patient: "Call Children",
                title: "Watch Tv",
                startTime: new Date("2022-11-24T11:00:09.989+00:00"),
                endTime: new Date("2022-11-24T13:00:09.989+00:00"),
                reqiresCaretaker: false,
                type: 'Entertainment',
                description: 'The patient goes on a morning walk in the gardens and socializes with other elders. Morning walk is supervised by nurses.',
                completed: true
            },
            {
                patient: "Kostas Lamprou",
                title: "Morning Walk",
                startTime:  new Date("2022-11-24T05:00:09.989+00:00"),
                endTime:  new Date("2022-11-24T05:00:09.989+00:00"),
                reqiresCaretaker: false,
                type: 'Entertainment',
                description: 'The patient goes on a morning walk in the gardens and socializes with other elders. Morning walk is supervised by nurses.',
                completed: true
            },
            {
                patient: "Kostas Lamprou",
                title: "Take insulin shot",
                startTime: new Date("2022-11-24T06:00:09.989+00:00"),
                endTime: undefined,
                reqiresCaretaker: false,
                type: 'Entertainment',
                description: 'The patient goes on a morning walk in the gardens and socializes with other elders. Morning walk is supervised by nurses.',
                completed: true
            },
    


           
        ]

        await RoutineModel.insertMany(items)
            .then(function (docs) {
                res.json(docs);
            })
            .catch(function (err) {
                res.status(500);
            });
        return res
            .status(StatusCodes.OK);
    }

}
