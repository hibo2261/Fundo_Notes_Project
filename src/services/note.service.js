// import { id } from '@hapi/joi/lib/base';
import Note from '../models/note.model';
import { client } from '../config/redisdb';

export const createNote = async (body) => {
  await client.del(body.email);
  const note = await Note.create(body);
  return note;
};

export const updateNote = async (_id, body) => {
  await client.del(_id);
  await client.del(body.email);
  const data = await Note.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

export const getAll = async (userId) => {
  const data = await Note.find({ userId, archive: false, trash: false });
  const ok1 = userId;
  await client.set(`${ok1}`, JSON.stringify(data));
  // await client.expire(`${ok1}`,10);
  // await client.del(`${ok1}`, JSON.stringify(data));

  // console.log("-----------------------------------------------------------",data);
  return data;
};

export const getById = async (_id, userId) => {
  const data = await Note.findById(_id, userId);
  await client.set(_id, JSON.stringify(data));
  return data;
};

// delete single note
export const deleteNote = async (id) => {
  await client.del(body.email);
  await client.del(_id);
  await Note.findByIdAndDelete(id);
  return '';
};

// Send note to trash
// export const sendToTrash = async (_id, userId) => {
//   try {
//       const data = await Note.findByIdAndUpdate({ _id, userId: userId }, { trash: true },{new : true});
//       return data;
//   } catch (err) {
//       throw new Error(err)
//   }
// };
export const sendToTrash = (_id, userId) =>
  new Promise((resolve, reject) => {
    Note.findByIdAndUpdate({ _id, userId }, { trash: true }, { new: true })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });

// Recover from trash
// export const recoverFromTrash = async (_id, userId) => {
//   try {
//       const data = await Note.findByIdAndUpdate({ _id, userId: userId }, { trash: false },{new : true});
//       return data;
//   } catch (err) {
//       throw new Error(err)
//   }
// };

export const recoverFromTrash = (_id, userId) =>
  new Promise((resolve, reject) => {
    Note.findByIdAndUpdate({ _id, userId }, { trash: false }, { new: true })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });

// Send to Archieve
// export const sendToArchive = async (_id, userId) => {
//   try {
//       const data = await Note.findByIdAndUpdate({ _id, userId: userId }, { archive: true },{new: true});
//       return data;
//   } catch (err) {
//       throw new Error(err)
//   }
// };

export const sendToArchive = (_id, userId) =>
  new Promise((resolve, reject) => {
    Note.findByIdAndUpdate({ _id, userId }, { archive: true }, { new: true })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });

// Recover from Archieve
// export const recoverFromArchive = async (_id, userId) => {
//   try {
//       const data = await Note.findByIdAndUpdate({ _id, userId: userId }, { archive: false });
//       return data;
//   } catch (err) {
//       throw new Error(err)
//   }
// };

export const recoverFromArchive = (_id, userId) =>
  new Promise((resolve, reject) => {
    Note.findByIdAndUpdate({ _id, userId }, { archive: false }, { new: true })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
