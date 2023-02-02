import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const  user  = await jwt.verify(bearerToken, process.env.JWT_SECRET_KEY);
    // res.locals.user = user;
    // res.locals.token = bearerToken;
    req.body.userId = user.email;
    next();
  } catch (error) {
    next(error);
  }
};


export const userAuther= async (req, res, next) => {
  try {
    let bearertoken = req.params.token;
    console.log("Bearer token-----------------",bearertoken);
    if (!bearertoken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: `Authorization token is required`};

    const user = await jwt.verify(bearertoken, process.env.PASSWORDKEY);
    req.body.email = user.email;
    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `UnAuthorised token`
    });
  }
};
