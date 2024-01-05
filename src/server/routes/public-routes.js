import { Router } from 'express';


const router = Router();

// Landing Page (Accessible to everyone)
router.get('/', (req, res) => {
  res.send('Welcome to the Landing Page!');
});

// CreateDate Page (Accessible to everyone)
router.get('/create-date', (req, res) => {
  res.send('Welcome to the CreateDate Page!');
});

export default router;