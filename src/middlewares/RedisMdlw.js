import HttpStatus from 'http-status-codes';
import { client } from '../config/redisdb';

export const redisAllAuth = async (req, res, next) => {
  try {
    const getAllNotes = await client.get(`ok1`);
    const notes = JSON.parse(getAllNotes);
    if (notes != null) {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: notes,
        message: 'Get All Notes Done from Redis Sucessfully.'
      });
    } else next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
    next(error);
  }
};

export const redisSingleAuth = async (req, res, next) => {
  try {
    const allNotes = await client.get(req.params._id);
    const notes = JSON.parse(allNotes);
    if (notes != null) {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: notes,
        message: 'Single Note Fetched By Id.'
      });
    } else next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
    next(error);
  }
};
