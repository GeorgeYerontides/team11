import * as express from 'express';
import { CaretakerController } from './caretaker/caretaker.controler';
import { ChatController } from './chat/chat.controller';
import { ExampleController } from './example/example.controller';
import { ItemShopController } from './item-shop/item-shop.controller';
import { LocationController } from './location/location.controler';
import { MedEveController } from './medical_events/medeve.controller';
import { NotificationController } from './notification/notification.controller';
import { PatientController } from './patient/patient.controller';
import { routineController } from './routine/routine.controller';
import { TaskController } from './task/task.controller';
import { VitalsController } from './vitals/vitals.controler';
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
    '/notification',
    new NotificationController().applyRoutes()
  )
  .use(
    '/location',
    new LocationController().applyRoutes()
  )  
  .use(
    '/vitals',
    new VitalsController().applyRoutes()
  )  
  .use(
    '/caretaker',
    new CaretakerController().applyRoutes()
  )
  .use(
    '/medicalEvents',
    new MedEveController().applyRoutes()
  )
  .use(
    '/chat',
    new ChatController().applyRoutes()
  )
  .use(
    '/routine',
    new routineController().applyRoutes()
  );

export { apiV1Router };

