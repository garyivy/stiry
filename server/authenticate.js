const jwt = require('jsonwebtoken');
const User = require('./models.js');

function authenticate(request, response, next) {
  const { authentication } = request.headers;
  try {
    // If token is decoded successfully, find user and attach to our request
    // for use in our route or other middleware    
    console.log(request.headers); 
    let decoded = jwt.verify(authentication, 'afraid-of-a-little-bunny');
    const user = User.findById(decoded._id).exec().then((user) => {
      if (!user) {
        response.sendStatus(401);
      } else {
        request.currentUser = user;
        next();
      }
    })
  }
  catch(error) {
    console.log(error);  // TODO: Remove?
    response.sendStatus(401);
  }
}

module.exports = authenticate;