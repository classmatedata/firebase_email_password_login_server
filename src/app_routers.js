const express = require('express');
const router = express.Router();
const verifyToken = require('./app_middleware.js');

const firebaseAuthController = require('./controller_firebase-auth.js');
const PostsController = require('./controller_posts.js');


// Auth routes
router.post('/api/register', firebaseAuthController.registerUser);
router.post('/api/login', firebaseAuthController.loginUser);
router.post('/api/logout', firebaseAuthController.logoutUser);
router.post('/api/reset-password', firebaseAuthController.resetPassword);

//posts routes
router.get('/api/posts', verifyToken, PostsController.getPosts);

module.exports = router;