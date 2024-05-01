import express, { Router, RequestHandler } from 'express';
import messageRoute from './message.route';

interface Route {
  path: string;
  route: Router | RequestHandler;
}

const router: Router = express.Router();
const routes: Route[] = [
  {
    path: '/',
    route: messageRoute,
  },
];

routes.forEach((route: Route) => {
  router.use(route.path, route.route);
});

export default router;
