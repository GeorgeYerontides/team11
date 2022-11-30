import { Request, Response, NextFunction, Router } from 'express';
import { ResourceController } from '../../shared';
import { StatusCodes } from 'http-status-codes';
import { Logger } from '../../shared/utils/logger';


import { ILocation, LocationModel } from './location.model';
export class LocationController extends ResourceController<ILocation>{
    private logger: Logger = new Logger();
    constructor() {
        super(LocationModel);
    }
    /**
     * Apply all routes for tasks
     *
     * @returns {Router}
     */
    public applyRoutes(): Router {
        const router = Router();
        router
            .get('/', this.getLocations)
            .get('/initialize', this.initializLocation)
            .put('/:id', this.updateLocations)
            .get('/:name/:surname', this.getLocationByName)
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
     getLocations = async (req: Request, res: Response) => {
        this.logger.debug('getLocation request');
        // you can pre-process the request here before passing it to the super class method
        const allRoutine = await this.getAll(req, res);
        this.logger.debug(allRoutine);
        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.OK)
            .json(allRoutine);
    }

    getLocationByName = async (req: Request, res: Response) => {
        this.logger.debug('getTaskById request');
        // you can pre-process the request here before passing it to the super class method
        const task = await this.getOneName(req.params.name,req.params.surname, req, res);

        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.OK)
            .json(task);
    }

    updateLocations = async (req: Request, res: Response) => {
        this.logger.debug('updateLocation request');
        // you can pre-process the request here before passing it to the super class method
        const task = await this.update(req.params.id, req.body.blacklist, req, res);
        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.OK)
            .json(task);
    }
    initializLocation = async (req: Request, res: Response) => {
        this.logger.debug('initialize items request');
        let items: any[] = [
            {
                name: "Andreas",
                surname: "Mixahl",
                location: "Living Room",

            },
            {
                name: "Giorgos",
                surname: "Trifonos",
                location: "Living Room",

            },{
                name: "Dimitra",
                surname: "Papa",
                location: "Living Room",

            },
            {
                name: "Kostas",
                surname: "Lamprou",
                location: "Living Room",
              
            },


           
        ]
    

        await LocationModel.insertMany(items)
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
