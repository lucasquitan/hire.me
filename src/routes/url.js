import { Router } from 'express';
import UrlController from '../controller/UrlController';

const routes = Router();

routes.get('/', UrlController.index);
routes.get('/:alias', UrlController.show);
routes.put('/create/:CUSTOM_ALIAS?', UrlController.store);
routes.delete('/:alias', UrlController.delete);

export default routes;
