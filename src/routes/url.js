import { Router } from 'express';
import UrlController from '../controller/UrlController';

const routes = Router();

routes.get('/', UrlController.show);
routes.get('/:alias', UrlController.index);
routes.put('/create/:CUSTOM_ALIAS?', UrlController.store);

export default routes;
