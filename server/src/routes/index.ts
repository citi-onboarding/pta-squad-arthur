import { Router } from 'express';
import UserRouter from './UserRoutes';


const router = Router();

// Add new routes here
router.use('/user', UserRouter);


// Default route
router.route('/').get((_, res) => {
  res.status(200).send('Made with 💚 and &lt; &#x0002F; &gt; by CITi');
});

export default router;
