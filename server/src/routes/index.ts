import { Router } from 'express';
import UserRouter from './UserRoutes';
import ConsultationRouter from './ConsultationRoutes';
import PatientRouter from './PatientRoutes';
import { emailRoutes } from './EmailRoutes';

const router = Router();

// Add new routes here
router.use('/user', UserRouter);
router.use('/consultation', ConsultationRouter)
router.use('/patient', PatientRouter); 
router.use('/email', emailRoutes);

// Default route
router.route('/').get((_, res) => {
  res.status(200).send('Made with 💚 and &lt; &#x0002F; &gt; by CITi');
});

export default router;