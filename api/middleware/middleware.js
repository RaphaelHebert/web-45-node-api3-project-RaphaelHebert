const users = require('../users/users-model')

function logger(req, res, next) {
 console.log(`${req.method}, ${req.url}, ${new Date}`);
 next()
}

function validateUserId(req, res, next) {
  console.log('validating validateUserId...')

  const id = parseInt(req.params.id)
  if(!id){
    next({ message: "not found", status: 404 })
  }
  users.getById(id)
    .then(user => {
      if(user){
        req.user = user
        next()
      }else{
        next({ message: "user not found", status: 404 })
    }})
    .catch(next)
}
     


function validateUser(req, res, next) {
  if ( !req.body.name ){
    next({ message: "missing required name field", status: 400 })
  }else{
    next()
  }
}

function validatePost(req, res, next) {
  console.log('validating post...')
  if(!req.body.text){
    next({ message: "missing required text field", status: 400 })
  }else{
    next()
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
// do not forget to expose these functions to other modules
