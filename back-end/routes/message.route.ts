import { messagesController } from '../controllers';

const { Router } = require('express');

const router = Router();

router.get('/fetchAllTasks', messagesController.fetchAllTasks);

export default router;
