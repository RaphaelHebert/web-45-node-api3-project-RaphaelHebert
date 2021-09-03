const express = require('express');

const users = require('../users/users-model')
const posts = require('../posts/posts-model')

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
  res.status(200).send(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  console.log(req.body)
  users.insert(req.body)
  .then(newUser => {
    res.status(200).json(newUser)
  })
  .catch(next)
});

router.put('/:id',validateUserId, validateUser, (req, res, next) => {
  users.update(req.params.id, req.body)
  .then(updatedUser => {
    res.status(200).json(updatedUser)
  })
  .catch(next)
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, (req, res, next) => {
  let userToDelete = ''
  users.getById(req.params.id)
    .then(user => userToDelete = user)
    .catch(next)
  users.remove(req.params.id)
    .then(() => res.status(200).json(userToDelete))
    .catch(next)
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts',validateUserId, (req, res, next) => {
  users.getUserPosts(req.params.id)
  .then(userPosts => {
    res.status(200).json(userPosts)
  })
  .catch(next)
})

router.post('/:id/posts', validateUserId, validatePost,(req, res, next) => {
  const newPost = {
    text: req.body.text,
    user_id: req.params.id
  }
  // let allPosts = ''
  // posts.get()
  //   .then( posts => allPosts = posts)
  //   .catch(err => console.log(err.message))
  // console.log('all posts', allPosts)
  posts.insert(newPost)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(next)
  

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
