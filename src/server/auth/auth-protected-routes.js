// The following are routes related to authentication with Auth0 for protected routes:
import { Router } from 'express';
import checkJwt from '../auth0-middleware.js';
import axios from 'axios';

const router = Router();

// Dashboard Page (Protected: Requires Authentication)
router.get('/dashboard', checkJwt, (req, res) => { 


  console.log('Authorization Header:', req.headers.authorization);
  // try {
  //   console.log('Authenticated user:', req.auth);

  //   const accessToken = req.headers.authorization.split(' ')[1];
  //   const response = await axios.get('https://dateplannerapi.com/userinfo', 
  //   { 
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`
  //     }
  //   });

  //   const userInfo = response.data;
  //   console.log(userInfo)
  //   res.json(userInfo);
  // } catch (error) {
  //   res.status(500).send(error.message);
  // }
  res.json({ message: 'Hello David!' });
});

export default router;




