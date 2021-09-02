const express = require('express');

const users = require('../users/users-model')
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware')


// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res, next) => {
  users.get()
  .then(allUsers => {
    console.log(allUsers)
    res.status(200).json(allUsers)
  })
  .catch(next)
});

router.get('/:id',validateUserId, (req, res, next) => {
  console.log("req.user", req.user)
  res.status(200).json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id',validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id',validateUser, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  const id = req.params.id
  users.getUserPosts(id)
  .then(userPosts => {
    console.log(userPosts)
    res.status(200).json({ message: userPosts })
  })
  .catch(err => console.log(err.message))

  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts',validateUser, validatePost,(req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use((err, req, res, next) => { 
  res.status(err.status || 500).json({
    message: err.message,
  })
});

module.exports = router

// do not forget to export the router
