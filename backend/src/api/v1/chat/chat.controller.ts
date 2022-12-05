import { Request, Response, NextFunction, Router } from 'express';
import { ResourceController } from '../../shared';
import { StatusCodes } from 'http-status-codes';
import { Logger } from '../../shared/utils/logger';
import { ChatModel, IChat } from './chat.model';


export class ChatController extends ResourceController<IChat>{
    private logger: Logger = new Logger();
    constructor() {
        super(ChatModel);
    }
    /**
     * Apply all routes for tasks
     *
     * @returns {Router}
     */
    public applyRoutes(): Router {
        const router = Router();
        router
            .get('/', this.getMessages)
            .post('/', this.postChat)
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
     getMessages = async (req: Request, res: Response) => {
        this.logger.debug('getLocation request');
        // you can pre-process the request here before passing it to the super class method
        const allRoutine = await this.getAll(req, res);
        this.logger.debug(allRoutine);
        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.OK)
            .json(allRoutine);
    }

    postChat = async (req: Request, res: Response) => {
        this.logger.debug('postItem request');
        const task = await this.create(req, res);
        return res
            .status(StatusCodes.OK)
            .json(task);
    }


}
