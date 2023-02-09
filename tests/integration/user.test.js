import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

let token;
let tokenn;
let id;

describe('Apis Test For Users', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('Register valid User', () => {
    it('GivenValidUserDetailsShouldSaveInDatabase', (done) => {
      const inputBody = {
        firstname: 'yogesh',
        lastname: 'potdar',
        email: 'potdar47@gmail.com',
        password: 'paperok'
      };
      request(app)
        .post('/api/v1/Users/')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });

    it('GivenInvalidFirstname,ShouldThrowErrorr', (done) => {
      const inputBody = {
        firstname: 'y',
        lastname: 'potdar',
        email: 'potdar47@gmail.com',
        password: 'paperok'
      };
      request(app)
        .post('/api/v1/Users/')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });

    it('GivenInvalidLastname,ShouldThrowError', (done) => {
      const inputBody = {
        firstname: 'yogesh',
        lastname: 'p',
        email: 'potdar47@gmail.com',
        password: 'paperok'
      };
      request(app)
        .post('/api/v1/Users/')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });

    it('GivenInvalidEmail,ShouldThrowError', (done) => {
      const inputBody = {
        firstname: 'yogesh',
        lastname: 'potdar',
        email: 'potdar47@.com',
        password: 'paperok'
      };
      request(app)
        .post('/api/v1/Users/')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });

    it('GivenInvalidPassword,ShouldThrowError', (done) => {
      const inputBody = {
        firstname: 'yogesh',
        lastname: 'potdar',
        email: 'potdar47@gmail.com',
        password: 66
      };
      request(app)
        .post('/api/v1/Users/')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  describe('LoginByValidUser', async () => {
    it('GivenValidUserLoginDetailsShouldBeAllowedIntoAccount', (done) => {
      const inputBody = { email: 'potdar47@gmail.com', password: 'paperok' };
      request(app)
        .post('/api/v1/users/Userlogin')
        .send(inputBody)
        .end((err, res) => {
          token = res.body.data;
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });

    it('GivenInvalidEmail,ShouldThrowCorrespondingError', (done) => {
      const inputBody = { email: 'potda@.com', password: 'paperok' };
      request(app)
        .post('/api/v1/users/Userlogin')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });

    it('GivenInvalidPassword,ShouldThrowError', (done) => {
      const inputBody = { email: 'potdar47@gmail.com', password: 876 };
      request(app)
        .post('/api/v1/users/Userlogin')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  describe('/notes', () => {
    it('ShouldCreateNoteAndReturnNoteDetails', (done) => {
      const note = { titel: 'football match', description: 'fifa' };
      request(app)
        .post('/api/v1/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(note)
        .end((err, res) => {
          id = res.body.data._id;

          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
    it('ShouldNotCreateNoteAndReturnErrorTitelReq', (done) => {
      const note = { description: 'fifa' };
      request(app)
        .post('/api/v1/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(note)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  describe('/notes', () => {
    it('GivenTokenShouldRetrieveAllTheNotesOfTheUser', (done) => {
      request(app)
        .get('/api/v1/notes')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
    it('GivenTokenShouldNotRetrieveAllTheNotesOfTheUser ', (done) => {
      request(app)
        .get('/api/v1/notes')
        .set('Authorization', `Bearer ${tokenn}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  describe('/notes/_id', () => {
    it('GivenTokenShouldRetrieveNoteOfParticularid ', (done) => {
      request(app)
        .get(`/api/v1/notes/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
    it('GivenTokenShouldNotRetrieveNoteOfParticularid ', (done) => {
      request(app)
        .get(`/api/v1/notes/${id}`)
        .set('Authorization', `Bearer ${tokenn}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  describe('notes/_id', () => {
    it('GivenTokenShouldUpdateGivenNoteOfTheParticularId', (done) => {
      const inputBody = {
        Title: 'Mission OK',
        Decription: 'OKUT'
      };
      request(app)
        .put(`/api/v1/notes/${id}`)
        .send(inputBody)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
    it('GivenTokenShouldNotUpdateGivenNoteOfTheParticularId', (done) => {
      const inputBody = {
        Title: 'Mission OK',
        Decription: 'OKUT'
      };
      request(app)
        .put(`/api/v1/notes/${id}`)
        .send(inputBody)
        .set('Authorization', `Bearer ${tokenn}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  describe('notes/_id', () => {
    it('GivenTokenShouldDeleteNoteOfTheParticularId ', (done) => {
      request(app)
        .delete(`/api/v1/notes/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
    it('GivenTokenShouldNotDeleteNoteOfTheParticularId ', (done) => {
      request(app)
        .delete(`/api/v1/notes/${id}`)
        .set('Authorization', `Bearer ${tokenn}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
});
