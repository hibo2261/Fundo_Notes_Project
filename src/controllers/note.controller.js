import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';

export const createNote = async (req, res, next) => {
    console.log("--------------",req.body);
    try {
        const data = await NoteService.createNote(req.body);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Note created successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const updateNote = async (req, res, next) => {
    try {
        const data = await NoteService.updateNote(req.params._id, req.body);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'Note updated successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const getAll= async (req,res,next)=>{
    try {
        const data = await NoteService.getAll(req.body.userId);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: "All notes fetched successfully"
        })
    } catch (error) { 
        next(error)
    }
};

export const getById = async (req, res, next) => {
    try {
        const data = await NoteService.getById(req.params._id);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'Note Fetched successfully'
        });
    } catch (error) {
        next(error);
    }
    
};


//Controller to delete a note
export const deleteNote = async (req, res, next) => {
    try {
      await NoteService.deleteNote(req.params._id);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: [],
        message: 'Note deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }


  
//   export const trash = async (req, res, next) => {
//     try {
//         const data = await NoteService.sendToTrash(req.params._id, req.body.userId);
//         res.status(HttpStatus.ACCEPTED).json({
//             code: HttpStatus.ACCEPTED,
//             data: data,
//             message: 'OK'
//         });
//     } catch (error) {
//         next(error);
//     }
// };

export const trash = (req, res, next) => {
    NoteService.sendToTrash(req.params._id, req.body.userId)
      .then(data => {
        res.status(HttpStatus.ACCEPTED).json({
          code: HttpStatus.ACCEPTED,
          data: data,
          message: 'OK'
        });
      })
      .catch(error => {
        next(error);
      });
  };
  

// export const recovertrash = async (req, res, next) => {
//     try {
//         const data = await NoteService.recoverFromTrash(req.params._id, req.body.userId);
//         res.status(HttpStatus.ACCEPTED).json({
//             code: HttpStatus.ACCEPTED,
//             data: data,
//             message: 'OK'
//         });
//     } catch (error) {
//         next(error);
//     }
// };

export const recovertrash = (req, res, next) => {
    NoteService.recoverFromTrash(req.params._id, req.body.userId)
    .then(data => {
    res.status(HttpStatus.ACCEPTED).json({
    code: HttpStatus.ACCEPTED,
    data: data,
    message: 'OK'
    });
    })
    .catch(error => {
    next(error);
    });
    };

// export const archive = async (req, res, next) => {
//     try {
//         const data = await NoteService.sendToArchive(req.params._id, req.body.userId);
//         res.status(HttpStatus.ACCEPTED).json({
//             code: HttpStatus.ACCEPTED,
//             data: data,
//             message: 'OK'
//         });
//     } catch (error) {
//         next(error);
//     }
// };

export const archive = (req, res, next) => {
    NoteService.sendToArchive(req.params._id, req.body.userId)
    .then(data => {
    res.status(HttpStatus.ACCEPTED).json({
    code: HttpStatus.ACCEPTED,
    data: data,
    message: 'OK'
    });
    })
    .catch(error => {
    next(error);
    });
    };

// export const recoverarchive = async (req, res, next) => {
//     try {
//         const data = await NoteService.recoverFromArchive(req.params._id, req.body.userId);
//         res.status(HttpStatus.ACCEPTED).json({
//             code: HttpStatus.ACCEPTED,
//             data: data,
//             message: 'OK'
//         });
//     } catch (error) {
//         next(error);
//     }
// };

export const recoverarchive = (req, res, next) => {
    NoteService.recoverFromArchive(req.params._id, req.body.userId)
    .then(data => {
    res.status(HttpStatus.ACCEPTED).json({
    code: HttpStatus.ACCEPTED,
    data: data,
    message: 'OK'
    });
    })
    .catch(error => {
    next(error);
    });
    };



