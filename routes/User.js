const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const Note = require('../models/Note');

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: 'admin',
      sub: userID,
    },
    '0NtbJkk6hr',
    { expiresIn: '20h' }
  );
};

userRouter.post('/register', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(500).json({ message: { msgBody: 'Error', msgError: true } });
    } else if (user) {
      res
        .status(500)
        .json({ message: { msgBody: 'User already exists', msgError: true } });
    } else {
      const newUser = new User({ username, password });
      newUser.save((err) => {
        if (err) {
          res
            .status(500)
            .json({ message: { msgBody: 'Error', msgError: true } });
        } else {
          res
            .status(201)
            .json({ message: { msgBody: 'User created', msgError: false } });
        }
      });
    }
  });
});

userRouter.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username } = req.user;
      const token = signToken(_id);
      res.cookie('access_token', token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: username });
    }
  }
);

userRouter.get(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { username } = req.user;
    res.clearCookie('access_token');
    res.json({ user: username, success: true });
  }
);

userRouter.post(
  '/note',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const note = new Note({ content: req.body.content, date: new Date() });
    note.save((err) => {
      if (err) {
        res.status(500).json({ message: { msgBody: 'Error', msgError: true } });
      } else {
        req.user.notes.push(note);
        req.user.save((err) => {
          if (err) {
            res
              .status(500)
              .json({ message: { msgBody: 'Error', msgError: true } });
          } else {
            res.status(200).json({
              message: {
                msgBody: 'Note created succesfully',
                msgError: false,
              },
            });
          }
        });
      }
    });
  }
);

userRouter.get(
  '/notes',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate('notes')
      .exec((err, document) => {
        if (err) {
          console.log(err);
          res
            .status(500)
            .json({ message: { msgBody: 'Error', msgError: true } });
        } else {
          res.status(200).json({ notes: document, isAuthenticated: true });
        }
      });
  }
);

userRouter.get(
  '/authenticated',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { username } = req.user;
    res.status(200).json({ isAuthenticated: true, user: username });
  }
);

module.exports = userRouter;
