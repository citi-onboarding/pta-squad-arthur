import { Router } from 'express';
import UserRouter from './UserRoutes';
import ConsultationRouter from './ConsultationRoutes';


const router = Router();

// Add new routes here
router.use('/user', UserRouter);
router.use('/consultation', ConsultationRouter)

// Default route
router.route('/').get((_, res) => {
  res.status(200).send('Made with 💚 and &lt; &#x0002F; &gt; by CITi');
});

export default router;
