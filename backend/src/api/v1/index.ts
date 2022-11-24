import * as express from 'express';
import { ExampleController } from './example/example.controller';
import { ItemShopController } from './item-shop/item-shop.controller';
import { PatientController } from './patient/patient.controller';
import { routineController } from './routine/routine.controller';
import { TaskController } from './task/task.controller';
const apiV1Router = express.Router();


apiV1Router
  // Example routes
  .use(
    '/example',
    new ExampleController().applyRoutes()
  )
  .use(
    '/item-shop',
    new ItemShopController().applyRoutes()
  )
  .use(
    '/tasks',
    new TaskController().applyRoutes()
  )
  .use(
    '/patient',
    new PatientController().applyRoutes()
  )
  .use(
    '/routine',
    new routineController().applyRoutes()
  );

export { apiV1Router };

