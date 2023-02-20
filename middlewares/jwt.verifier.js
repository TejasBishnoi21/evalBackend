var jwt = require('jsonwebtoken');


const jwtVerifier = ((req, res, next)=>{
    const token = req.headers.auth;
    const url = req.originalUrl
    jwt.verify(token, 'masai', (err, decoded)=>{
        if(decoded)
        {
            if(req.originalUrl === '/posts/add')
            {
                req.body.user = decoded.ID
            }
            next()
        }
        else res.send(err.message)
      });
})

module.exports = { jwtVerifier }