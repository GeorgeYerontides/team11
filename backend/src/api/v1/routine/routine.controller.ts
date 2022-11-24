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

    initializeRoutine = async (req: Request, res: Response) => {
        this.logger.debug('initialize items request');
        let items: any[] = [
            {
                title: "Morning Walk",
                startTime: new Date(2022,16,12,7,0,0),
                endTime: new Date(2022,16,12,8,0,0),
                reqiresCaretaker: false,
                type: 'Entertainment',
                description: 'The patient goes on a morning walk in the gardens and socializes with other elders. Morning walk is supervised by nurses.',
                completed: true
            },
            {
                title: "Take insulin shot",
                startTime: new Date(2022,16,12,7,0,0),
                endTime: null,
                reqiresCaretaker: false,
                type: 'Entertainment',
                description: 'The patient goes on a morning walk in the gardens and socializes with other elders. Morning walk is supervised by nurses.',
                completed: true
            },

            {
                title: "Take insulin shot",
                startTime: new Date(2022,16,12,7,0,0),
                endTime: null,
                reqiresCaretaker: true,
                type: 'Entertainment',
                description: 'The patient goes on a morning walk in the gardens and socializes with other elders. Morning walk is supervised by nurses.',
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

}
