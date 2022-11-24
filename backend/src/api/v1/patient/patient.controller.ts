import { Request, Response, NextFunction, Router } from 'express';
import { ResourceController } from '../../shared';
import { StatusCodes } from 'http-status-codes';
import { Logger } from '../../shared/utils/logger';

import { IPatient, PatientModel } from './patient.model';
export class PatientController extends ResourceController<IPatient>{
    private logger: Logger = new Logger();
    constructor() {
        super(PatientModel);
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
            .get('/initialize', this.initializePatients)
            .get('/:name/:surname', this.getTaskByName)
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

    getTaskByName = async (req: Request, res: Response) => {
        this.logger.debug('getTaskById request');
        // you can pre-process the request here before passing it to the super class method
        const task = await this.getOneName(req.params.name,req.params.surname, req, res);

        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.OK)
            .json(task);
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

    initializePatients = async (req: Request, res: Response) => {
        this.logger.debug('initialize items request');
        let items: any[] = [

            {
                name: "Andreas",
                surname: "Mixahl",
                age: 69,
                weight: 75,
                height: 1.62,
                emergencyName: "Giannhs Mixahl",
                emergencyPhone: "6945873645",
                emergencyEmail: "gmixahl@gmail.com",
                cameraUrl: "https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
            },
           
            {
                name: "Giorgos",
                surname: "Trifonos",
                age: 82,
                weight: 55,
                height: 1.64,
                emergencyName: "Kostas Trigonos",
                emergencyPhone: "6945615645",
                emergencyEmail: "gmixahl@gmail.com",
                cameraUrl: "https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
            },
            {
                name: "Dimitra",
                surname: "Papa",
                age: 47,
                weight: 75,
                height: 1.92,
                emergencyName: "Manos Papa",
                emergencyPhone: "6945943545",
                emergencyEmail: "mpapa@gmail.com",
                cameraUrl: "https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
            },
            {
                name: "Giorgos",
                surname: "Lamprou",
                age: 82,
                weight: 67,
                height: 1.66,
                emergencyName: "Lampros Lamprou",
                emergencyPhone: "6945945687",
                emergencyEmail: "llamprou@gmail.com",
                cameraUrl: "https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
            },

           
        ]

        await PatientModel.insertMany(items)
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
