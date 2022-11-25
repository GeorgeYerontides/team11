import { Request, Response, NextFunction, Router } from 'express';
import { ResourceController } from '../../shared';
import { StatusCodes } from 'http-status-codes';
import { Logger } from '../../shared/utils/logger';

import { INotification, NotificationModel } from './notification.model';
export class NotificationController extends ResourceController<INotification>{
    private logger: Logger = new Logger();
    constructor() {
        super(NotificationModel);
    }
    /**
     * Apply all routes for tasks
     *
     * @returns {Router}
     */
    public applyRoutes(): Router {
        const router = Router();
        router
            .get('/', this.getNotifications)
            .get('/initialize', this.initializePatients)
 
            .post('/', this.postNotification)
            .delete('/:id', this.deleteNotification);

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
     getNotifications = async (req: Request, res: Response) => {
        this.logger.debug('getRoutine request');
        // you can pre-process the request here before passing it to the super class method
        const allRoutine = await this.getAll(req, res);
        this.logger.debug(allRoutine);
        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.OK)
            .json(allRoutine);
    }

 
    deleteNotification = async (req: Request, res: Response) => {
        this.logger.debug('deleteTask request');
        // you can pre-process the request here before passing it to the super class method
        const task = await this.delete(req.params.id, req, res);
        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.OK)
            .json(task);

    }

    postNotification = async (req: Request, res: Response) => {
        this.logger.debug('postTask request');
        // you can pre-process the request here before passing it to the super class method
        const task = await this.create(req, res);
        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.OK)
            .json(task);
    }

    initializePatients = async (req: Request, res: Response) => {
        this.logger.debug('initialize items request');
        let items: any[] = [

            {
                senderName: "Kostas",
                senderSurname: "Lamprou",
                timeSent:  new Date("2022-11-24T07:15:09.989+00:00"),
                typeNotification: 1,
                title: "Missed Call"
            },
           
            {
                senderName: "Kostas",
                senderSurname: "Lamprou",
                timeSent:  new Date("2022-11-24T07:15:09.989+00:00"),
                typeNotification: 4,
                title: "Missed Video Call"

            },
            {
                senderName: "Kostas",
                senderSurname: "Lamprou",
                timeSent:  new Date("2022-11-24T07:15:09.989+00:00"),
                typeNotification: 1,
                title: "Missed Call"

            },


           
        ]

        await NotificationModel.insertMany(items)
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
