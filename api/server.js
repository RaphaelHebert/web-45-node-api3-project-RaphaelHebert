const cors = require('cors'); // middleware we install from NPM
const { logger } = require('./middleware/middleware')

const express = require('express');
const server = express();

// const serverPosts = require('./posts/server-posts')
const serverUsers = require('./users/users-router')

server.use(express.json())
server.use(cors())
server.use(logger)
server.use('/api/users', serverUsers)

// server.use('/api/posts', serverPosts)

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
